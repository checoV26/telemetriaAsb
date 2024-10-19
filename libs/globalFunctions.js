let spinner = () => {
  $.blockUI({
    message: '<div class="spinner"></div>',
    css: {
      border: "none",
      backgroundColor: "transparent",
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)" /* Centrado */,
      textAlign: "center",
      width: "100%" /* Asegura que ocupe todo el ancho */,
      zIndex: 1060,
    },
    overlayCSS: {
      backgroundColor: "#000",
      opacity: 0.6,
      cursor: "wait",
      zIndex: 1060,
    },
  });
};

let newCardHtml = (contentCard, dataC) => {
  const card = `
<div class="col-12 col-sm-6 col-md-6 mb-3">
                <div class="card ">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fa-solid fa-circle text-success"></i> </h5>
                        <div class="row justify-content-start">

                            <div class="col-12 col-md-12">
                                <div class="col-md-12">
                                    <img src="../assets/images/soplador.JPG" class="custom-img soplador-img"
                                        alt="soplador">
                                </div>
                                <div class="col-md-6  row justify-content-start d-flex mt-3">
                                    <div class="col-md-4">
                                        <button type="button" class="btn btn-secondary btn-sm">Auto</button>
                                    </div>
                                    <div class="col-md-4">
                                        <button type="button" class="btn btn-danger btn-sm">Fuera</button>
                                    </div>
                                    <div class="col-md-4">
                                        <button type="button" class="btn btn-secondary btn-sm">Auto</button>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-md-12 mt-3">
                                <div class="col-12 col-md-12 row justify-content-center d-flex">
                                    ${contentCard}
                                </div>
                                 <div class="col-12 col-md-12 row justify-content-center d-flex">
                                    ${dataC}
                                 </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  `;

  return card;
};

let contentCard = (name, value) => {
  return `
        <div class="col-md-6">
            <p class=" h5">${name}</p>
        </div>
        <div class="col-md-6">
            <p class="digital-font h5">${value}</p>
        </div>
  `;
};

let titleD = (title) => {
  return `
        <div class="col-md-12">
            <p class=" h5"><b>${title}</b></p>
        </div>
  `;
};
let obtenerValores = (data) => {
  var newCard = "";
  var dataC = "";
  console.log(data);
  data.forEach((bomba, index) => {
    var contentC = "";
    Object.entries(bomba).forEach(([key, value]) => {
      // Verificar si el valor es un array
      if (Array.isArray(value)) {
        // Recorrer el array interno
        value.forEach((item, i) => {
          var titulo = `${key} ${item.id}`;
          dataC += titleD(titulo);
          item.data.forEach((b, v) => {
            dataC += contentCard(b.name, b.value);
          });
        });
      } else {
        contentC += contentCard(key, value);
      }
    });
    newCard += newCardHtml(contentC, dataC);
  });
  return newCard;
};

let tableA = (data) => {
  var filas = "";
  data.forEach((item) => {
    filas += `<tr>`;
    filas += `<td>${item.id}</td>`;
    filas += `<td>${item.menssge}</td>`;
    filas += `<td>${item.date}</td>`;
    filas += `</tr>`;
  });
  return filas;
};
function generarNumeroRandom(min, max) {
  const numeroAleatorio = Math.random() * (max - min) + min;
  return parseFloat(numeroAleatorio.toFixed(2)); // Aplicamos toFixed al número generado
}
