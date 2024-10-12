const clientId = `brokerAsb:${Math.floor(Math.random() * (10000 - 1 + 1) + 1)}`;

const config = {
  clientId: clientId,
  mqttUrl: `ws://broker.hivemq.com:8000/mqtt`,
  opcionesMqtt: {
    clientId: clientId,
    clean: true,
  },
  topicInput: "182/asb/carcamo/input",
  topicOutput: "182/asb/carcamo/output",
};
