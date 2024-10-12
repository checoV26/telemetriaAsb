/*const clientId = `brokerAsb:${Math.floor(Math.random() * (10000 - 1 + 1) + 1)}`;
const mqttUrl = `ws://broker.hivemq.com:8000/mqtt`;
const opcionesMqtt = {
  clientId: clientId,
  clean: true,
};*/
$(document).ready(() => {
  var datasStrig = {
    device: [
      {
        ID: "1",
        NAME: "BOMBA 1",
        ESTADO: "1",
        VOLTAJE: "75.28",
        CORRIENTE: "116.00",
        FRECUENCIA: "182.40",
        DIGESTORES: [
          {
            id: "1",
            data: [
              {
                name: "TEMPERATURA",
                value: "101.70",
              },
              {
                name: "OXIGENO",
                value: "172.68",
              },
              {
                name: "APERTURA",
                value: "166.98",
              },
            ],
          },
        ],
      },
      {
        ID: "2",
        NAME: "BOMBA 2",
        ESTADO: "1",
        VOLTAJE: "75.28",
        CORRIENTE: "116.00",
        FRECUENCIA: "182.40",
        DIGESTORES: [
          {
            id: "2",
            data: [
              {
                name: "TEMPERATURA",
                value: "101.70",
              },
              {
                name: "OXIGENO",
                value: "172.68",
              },
              {
                name: "APERTURA",
                value: "166.98",
              },
            ],
          },
        ],
      },
      {
        ID: "3",
        NAME: "BOMBA 3",
        ESTADO: "1",
        VOLTAJE: "75.28",
        CORRIENTE: "116.00",
        FRECUENCIA: "182.40",
        DIGESTORES: [
          {
            id: "3",
            data: [
              {
                name: "TEMPERATURA",
                value: "101.70",
              },
              {
                name: "OXIGENO",
                value: "172.68",
              },
              {
                name: "APERTURA",
                value: "166.98",
              },
            ],
          },
          {
            id: "3",
            data: [
              {
                name: "TEMPERATURA",
                value: "101.70",
              },
              {
                name: "OXIGENO",
                value: "172.68",
              },
              {
                name: "APERTURA",
                value: "166.98",
              },
            ],
          },
        ],
      },
      {
        ID: "3",
        NAME: "BOMBA 3",
        ESTADO: "1",
        VOLTAJE: "75.28",
        CORRIENTE: "116.00",
        FRECUENCIA: "182.40",
        DIGESTORES: [
          {
            id: "3",
            data: [
              {
                name: "TEMPERATURA",
                value: "101.70",
              },
              {
                name: "OXIGENO",
                value: "172.68",
              },
              {
                name: "APERTURA",
                value: "166.98",
              },
            ],
          },
          {
            id: "3",
            data: [
              {
                name: "TEMPERATURA",
                value: "101.70",
              },
              {
                name: "OXIGENO",
                value: "172.68",
              },
              {
                name: "APERTURA",
                value: "166.98",
              },
            ],
          },
        ],
      },
      {
        ID: "3",
        NAME: "BOMBA 3",
        ESTADO: "1",
        VOLTAJE: "75.28",
        CORRIENTE: "116.00",
        FRECUENCIA: "182.40",
        DIGESTORES: [
          {
            id: "3",
            data: [
              {
                name: "TEMPERATURA",
                value: "101.70",
              },
              {
                name: "OXIGENO",
                value: "172.68",
              },
              {
                name: "APERTURA",
                value: "166.98",
              },
            ],
          },
          {
            id: "3",
            data: [
              {
                name: "TEMPERATURA",
                value: "101.70",
              },
              {
                name: "OXIGENO",
                value: "172.68",
              },
              {
                name: "APERTURA",
                value: "166.98",
              },
            ],
          },
        ],
      },
    ],
  };
  //console.log(JSON.stringify(datasStrig));
});

$("#idProyect").on("change", function () {
  // validar el equipamiento del cliente
  conecctedMqtt();
});
let conecctedMqtt = () => {
  clientMQTT = mqtt.connect(config.mqttUrl, config.opcionesMqtt);

  clientMQTT.on("connect", () => {
    $("#statusConnected").html(
      '<i class="fa-solid fa-circle text-success"></i> Conectado...'
    );

    // Suscribirse al tópico
    clientMQTT.subscribe(`ASBOMBEO/DEMO/DATOS/DATAJSON`, (err) => {
      if (!err) {
        // Publicar un mensaje de prueba
        console.log("conectado");
      } else {
        alert("Error al suscribirse al tópico");
      }
    });
  });

  // Escuchar los mensajes recibidos
  clientMQTT.on("message", (topic, message) => {
    // Aquí puedes procesar el mensaje recibido
    const mensajeRecibido = message.toString();
    console.log(top);
    console.log(mensajeRecibido);
    let datos = JSON.parse(mensajeRecibido);
    let arrayData = datos.device;
    var newCard = "";

    arrayData.forEach((item) => {
      // 8
      // Recorrer el array de DIGESTORES
      var newDigestor =
        '<div class="col-md-6 row justify-content-start d-flex">';
      // el valor es un objero
      if (typeof item == Object) {

      }
      
      item.DIGESTORES.forEach((digestor) => {
        newDigestor += newDigestores(digestor.id);
        digestor.data.forEach((dataItem) => {
          newDigestor += newDigestoresComplement(dataItem.name, dataItem.value);
        });
      });
      newDigestor += "</div>";

      newCard += newCardHtml(
        item.NAME,
        item.FRECUENCIA,
        item.VOLTAJE,
        item.CORRIENTE,
        0.0,
        newDigestor
      );
    });
    $("#viewCard").html(newCard);
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
