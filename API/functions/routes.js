const routes = require("express").Router()
const { parse } = require("dotenv");
const { request } = require("express");
const { db, bcrypt } = require("./configs");
const { client } = require("./pub");
require("dotenv").config();
// Rotas
const Crypt = async (password) => {
    const crypted = await bcrypt.hash(password, 10);
    return crypted;
}
const convertTime = (user, end) => {
    const result = (end - user.startTime) / 60000
    const cost = user.cost + (result / 5) * 0.25;
    return parseFloat(cost.toFixed(2));
}
routes.get("/hello-world/:id", async (req, res) => {
    const result = await Crypt(req.params.id);
    console.log(result);
    return res.status(200).send(result);
});
// Create
routes.post("/api/create", (req, res) => {
    (async () => {
        try {
            const Password = await Crypt(req.body.password);
            const document = db.collection("users");
            const user = await document.where('user', '==', req.body.user).get();
            if (!(user.empty)) {
                return res.status(404).send("User already exist.");
            } else {
                const newUser = await document.doc().create({
                    user: req.body.user,
                    name: req.body.name,
                    password: Password,
                    startTime: null,
                    endTime: null,
                    inside: false,
                    cost: 0,
                })
                return res.status(200).send();
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});
// login
routes.post("/api/login", (req, res) => {
    (async () => {
        try {
            const document = db.collection("users");
            const user = await document.where('user', '==', req.body.user).get();
            if (user.empty) {
                return res.status(404).send("User not found.");
            } else {
                user.forEach(async doc => {
                    if (await bcrypt.compare(req.body.password, doc.data().password)) {
                        return res.status(200).send({
                            id: doc.id,
                            name: doc.data().name
                        });
                    } else {
                        return res.status(404).send("Invalid Password.");
                    }
                });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send(error);
        }
    })();
});
// Read one by id
routes.get("/api/read/:id", (req, res) => {
    (async () => {
        try {
            const doc = db.collection("users").doc(req.params.id);
            const user = await doc.get();
            if (user.empty) {
                return res.status(404).send("User not found.");
            } else {
                return res.status(200).json({
                    user: user.data().user,
                    name: user.data().name
                });
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});
// Update
routes.post("/api/update/:id", (req, res) => {
    (async () => {
        try {
            const doc = db.collection("users");
            let body = {};
            if (req.body.newPassword) {
                const newPassword = await Crypt(req.body.newPassword);
                body.password = newPassword;
            }
            let verifyUser = {};
            if (req.body.user) {
                verifyUser = await doc.where('user', '==', req.body.user).get();
                let exists = false;
                verifyUser.forEach(doc => {
                    if (!(doc.id === req.params.id)) {
                        exists = true
                    }
                });
                if (exists) {
                    return res.status(404).send("User already exist.");
                }
                body.user = req.body.user;
            }
            if (req.body.name) {
                body.name = req.body.name;
            }
            const user = await doc.doc(req.params.id).get();
            let userData = user.data();
            if (user.empty) {
                return res.status(404).send("User not found.");
            }
            if (await bcrypt.compare(req.body.password, user.data().password)) {
                await doc.doc(req.params.id).update(
                    Object.assign(userData, body)
                );
                return res.status(200).send("Successful update");
            }
            return res.status(404).send("Invalid Password.");
        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});
//Delete
routes.delete("/api/delete/:id", (req, res) => {
    (async () => {
        try {
            const doc = db.collection("users").doc(req.params.id);
            const user = await doc.get();
            if (user.empty) {
                return res.status(404).send("User not found.");
            } else {
                if (await bcrypt.compare(req.body.password, user.data().password)) {
                    await doc.delete();
                    return res.status(200).send("Successful delete.");
                } else {
                    return res.status(404).send("Invalid Password.");
                }
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});

//Acess control
routes.get("/api/access/:id", (req, res) => {
    (async () => {
        try {
            const id = req.params.id;
            if (!id) {
                throw Error("Ivalid ID format.");
            }
            const doc = db.collection("users").doc(req.params.id);
            const user = await doc.get();
            const dateNow = Date.now();
            if (user.empty) {
                return res.status(404).send("User not found.");
            } else {
                if (user.data().cost == 0) {
                    if (user.data().inside) {
                        await doc.update({
                            endTime: dateNow,
                            inside: false,
                            cost: convertTime(user.data(), dateNow),
                        })
                        client.publish("Acess_parking", "LVC", (error) => {
                            console.log(error);
                        });
                        return res.status(200).send();
                    } else {
                        await doc.update({
                            startTime: dateNow,
                            endTime: 0,
                            inside: true
                        })
                        client.publish("Acess_parking", "LVC", (error) => {
                            console.log(error);
                        });
                        return res.status(200).send();
                    }
                } else {
                    return res.status(200).send("Must pay before.");
                }
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});

//Pay
routes.get("/api/pay/:id", (req, res) => {
    (async () => {
        try {
            const doc = db.collection("users").doc(req.params.id);
            const user = await doc.get();
            if (user.empty) {
                return res.status(404).send("User not found.");
            } else {
                if (!user.data().endTime) {
                    return res.status(404).send("Exit value not exists.");
                }
                await doc.update({
                    startTime: null,
                    endTime: null,
                    cost: 0,
                })
                return res.status(200).json({ cost: 0 });
            }
        } catch (error) {
            return res.status(500).send(error);
        }
    })();
});

//Return time and cost
routes.get("/api/time_cost/:id", (req, res) => {
    (async () => {
        try {
            const document = db.collection("users").doc(req.params.id);
            const user = await document.get();
            if (user.empty) {
                return res.status(404).send("User not found.");
            } else {
                return res.status(200).send({
                    startTime: user.data().startTime,
                    endTime: user.data().endTime,
                    cost: user.data().cost
                });
            }
        } catch (error) {
            console.log(error)
            return res.status(500).send(error);
        }
    })();
});
module.exports = routes;