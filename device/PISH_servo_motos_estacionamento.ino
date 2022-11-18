#include <WiFi.h>
#include <ESP32Servo.h>
#include <PubSubClient.h>
      
#define TOPIC_PARK "Acess_parking"   

// WI-FI config
#define ssid "Sua Casa"       
#define PASSWORD "bu26ra30"

//MQTT Server
#define ID_MQTT "Park"
#define BROKER_MQTT "test.mosquitto.org" //URL do broker MQTT que se deseja utilizar
#define BROKER_PORT  1883               // Porta do Broker MQTT

// sensores
#define motor_servo 18

 // Instancia o Cliente MQTT passando o objeto espClient
WiFiClient wifiClient;                        
PubSubClient MQTT(wifiClient);     

Servo s;
int pos;

//Declaração das Funções
void mantemConexoes();  //Garante que as conexoes com WiFi e MQTT Broker se mantenham ativas
void conectaWiFi();     //Faz conexão com WiFi
void conectaMQTT();     //Faz conexão com Broker MQTT
void enviaPacote();     //Envia pacotes de informação
// setup 
void setup() {
  ESP32PWM::allocateTimer(0);
  ESP32PWM::allocateTimer(1);
  ESP32PWM::allocateTimer(2);
  ESP32PWM::allocateTimer(3);
  s.setPeriodHertz(50);
  s.attach(18,1000,2000);         
  s.write(0);
  // define velocidade de saida serial
  Serial.begin(115200);
  
  // conecta ao mqtt
  MQTT.setServer(BROKER_MQTT, BROKER_PORT);     
}

void mantemConexoes() {
    
  conectaWiFi(); //se não há conexão com o WiFI, a conexão é refeita
    if (!MQTT.connected()) {
       conectaMQTT(); 
    }
}

// conect to wifi
void conectaWiFi() {

  if (WiFi.status() == WL_CONNECTED) {
     return;
  }
        
  Serial.print("Conectando-se na rede: ");
  Serial.print(ssid);
  Serial.println("Aguarde!");

  WiFi.begin(ssid, PASSWORD); // Conecta na rede WI-FI  
  while (WiFi.status() != WL_CONNECTED) {
      Serial.print(".");
      //delay(500);
  }

  Serial.println();
  Serial.print("Conectado com sucesso, na rede: ");
  Serial.print(ssid);  
  Serial.println("IP obtido: ");
  Serial.println(WiFi.localIP()); 
}

void conectaMQTT() { 
    while (!MQTT.connected()) {
        Serial.print("Conectando ao Broker MQTT: ");
        Serial.println(BROKER_MQTT);
        if (MQTT.connect(ID_MQTT)) {
            Serial.println("Conectado ao Broker com sucesso!");
        } 
        else {
            Serial.println("Noo foi possivel se conectar ao broker.");
            Serial.println("Nova tentatica de conexao em 10s");
            //delay(10000);
        }
    }
      MQTT.subscribe("Acess_parking");
      MQTT.setCallback(AcessControl);
}

void AcessControl(char* topic, byte* payload, unsigned int tam){
  Serial.println("\n Publish received.");
  Serial.print("topic: ");
  Serial.println(topic);
  String messageTemp;
  for (int i = 0; i < tam; i++) {
    messageTemp += (char)payload[i];
  }
   Serial.print("Message: ");
   Serial.println(messageTemp);
   if(messageTemp == "LVC"){
    s.write(180);
    delay(5000);
    s.write(10);
   }
  
 
}

void EnviaDados(){
  //envia os dados pra algun lugar
}

// loop of execution
void loop() {
  mantemConexoes();
  MQTT.loop();
  //AcessControl();
  // EnviaDados();
  //s./write(20);
  //delay(500);
  //s.write(0);
  //delay(500);
}