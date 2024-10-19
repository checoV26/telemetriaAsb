$(document).ready(() => {
  obtenerA();
});

let obtenerA = () => {
  try {
    // Conexión al servidor MQTT
    connectToMQTT(config.mqttUrl, config.opcionesMqtt)
      .then(() => {
        // Después de la conexión, suscríbete a un tópico
        return subscribeToTopic("ASBOMBEO/DEMO/TABLAS/DATAJSON");
      })
      .then(() => {
        // Escucha los mensajes del tópico
        listenToMessages((topic, message) => {
          var mensajeJon = JSON.parse(message);
          console.log(mensajeJon);
          var arrayData = mensajeJon.table;
          if (Array.isArray(arrayData)) {
            $("#tblAlarmas tbody").html(tableA(arrayData));
          }
        });
      })
      .catch((err) => {
        console.error("Error al manejar la conexión MQTT: ", err);
      });
  } catch (error) {
    console.log(error);
  }
};
