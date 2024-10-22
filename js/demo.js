$(document).ready(() => {});

$("#idProyect").on("change", function () {
  // validar el equipamiento del cliente
  var topic = $(this).val();
  topic != "" ? conecctedMqtt(topic) : alert("No se encontraron datos que mostrar.");
});
let conecctedMqtt = (topico) => {
  console.log(topico);
  try {
    // Conexión al servidor MQTT
    connectToMQTT(config.mqttUrl, config.opcionesMqtt)
      .then(() => {
        $("#statusConnected").html(
          '<i class="fa-solid fa-circle text-success"></i> Conectado...'
        );
        // Después de la conexión, suscríbete a un tópico
        return subscribeToTopic(topico);
      })
      .then(() => {
        // Escucha los mensajes del tópico
        listenToMessages((topic, message) => {
          var mensajeJon = JSON.parse(message);
          var arrayData = mensajeJon.data;
          if (Array.isArray(arrayData)) {
            $("#viewCard").html(obtenerValores(arrayData));
          } else {
            console.error("Datos incorrectos");
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
