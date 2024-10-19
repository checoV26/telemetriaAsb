$(document).ready(() => {});

$("#idProyect").on("change", function () {
  // validar el equipamiento del cliente
  conecctedMqtt();
});
let conecctedMqtt = () => {
  try {
    // Conexión al servidor MQTT
    connectToMQTT(config.mqttUrl, config.opcionesMqtt)
      .then(() => {
        $("#statusConnected").html(
          '<i class="fa-solid fa-circle text-success"></i> Conectado...'
        );
        // Después de la conexión, suscríbete a un tópico
        return subscribeToTopic("ASBOMBEO/DEMO/DATOS/DATAJSON");
      })
      .then(() => {
        // Escucha los mensajes del tópico
        listenToMessages((topic, message) => {
          var mensajeJon = JSON.parse(message);
          var arrayData = mensajeJon.device;
          console.log(mensajeJon);
          if (Array.isArray(arrayData)) {
            $("#viewCard").html(obtenerValores(arrayData));
          } else {
            console.log("Datos incorrectos");
          }
        });
      })
      .catch((err) => {
        $("#statusConnected").html(
          '<i class="fa-solid fa-circle text-danger"></i>Desconectado.....'
        );
      });
  } catch (error) {
    console.log(error);
  }
};
