$(document).ready(() => {
  // guardar topico base
  automaticConnection();
});

let automaticConnection = () => {
  var baseTopic = `${localStorage.getItem("baseTopic")}/AUTOMATICCONTROL`;
  console.log(baseTopic)
  if (baseTopic != "") {
    conecctedMqtt(baseTopic);
  } else {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "¡No se encontraron datos que consultar!",
      showConfirmButton: false,
      timer: 1500,
    });
  }
};

let conecctedMqtt = (topico) => {
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
        listenToMessages((topic, message) => {
          var mensajeJon = JSON.parse(message);
          var arrayData = mensajeJon.data;
          if (Array.isArray(arrayData)) {
            $("#viewCard").html(
              controlData(arrayData, listImages.automaticControl)
            );
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
