const clientId = `brokerAsb:${Math.floor(Math.random() * (10000 - 1 + 1) + 1)}`;
const mqttUrl = `ws://asbombeo.ddns.net:8083/mqtt`;
const opcionesMqtt = {
  clientId: clientId,
  clean: true,
};

$(document).ready(() => {
  conecctedMqtt();
  var g = new JustGage({
    id: "gauge",
    value: 67,
    min: 0,
    max: 100,
    title: "ejemplo 1",
  });
  setInterval(function () {
    g.refresh(getRandomInt(35, 98));
  }, 1000);
});

let conecctedMqtt = () => {
  clientMQTT = mqtt.connect(mqttUrl, opcionesMqtt);

  clientMQTT.on("connect", () => {
    $("#statusConnected").html(
      '<i class="fa-solid fa-circle text-success"></i> Conectado...'
    );

    // Suscribirse al tópico
    clientMQTT.subscribe(`pruebasAsb/#`, (err) => {
      if (!err) {
        // Publicar un mensaje de prueba
        publicarMensaje(
          clientMQTT,
          `pruebasAsb/datas`,
          JSON.stringify({ msg: "mensaje de prueba app web" }),
          () => {}
        );
      } else {
        alert("Error al suscribirse al tópico");
      }
    });
  });

  // Escuchar los mensajes recibidos
  clientMQTT.on("message", (topic, message) => {
    // Aquí puedes procesar el mensaje recibido
    const mensajeRecibido = message.toString();
    // Por ejemplo, puedes mostrarlo en la página
    $("#mensajesRecibidos").append(
      `<p><strong>${topic}</strong>: ${mensajeRecibido}</p>`
    );
  });

  // Manejo de desconexión
  clientMQTT.on("close", () => {
    $("#statusConnected").html(
      '<i class="fa-solid fa-circle text-danger"></i> Desconectado'
    );
  });
};

let publicarMensaje = (clientMQTT, topic, data, callback) => {
  clientMQTT.publish(topic, data, (error) => {
    if (!error) {
      //console.log(`data publicado en ${topic}: ${data}`);
      if (typeof callback === "function") {
        callback();
      }
    } else {
      console.log(`Error al publicar mensaje`, error);
    }
  });
};
