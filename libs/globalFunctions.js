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

let newCardHtml = (
  name,
  frecuencia,
  voltaje,
  corriente,
  frecuencia2,
  newDigestor
) => {
  const card = `
  <div class="col-12 col-sm-6 col-md-6 mb-3">
                <div class="card ">
                    <div class="card-body">
                        <h5 class="card-title"><i class="fa-solid fa-circle text-success"></i> ${name}</h5>
                        <div class="row justify-content-start">

                            <div class="col-12 col-md-6">
                                <div class="col-md-12">
                                    <img src="../assets/images/soplador.JPG" class="custom-img soplador-img"
                                        alt="soplador">
                                </div>
                                <div class="col-md-12  row justify-content-start d-flex mt-3">
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

                            <div class="col-12 col-md-6 row justify-content-start d-flex">
                                <div class="col-md-7">
                                    <label>Frecuencia (Hz)</label>
                                </div>
                                <div class="col-md-3">
                                    <label class="digital-font font-size-25">${frecuencia}</label>
                                </div>
                                <div class="col-md-7">
                                    <label>Voltaje (V)</label>
                                </div>
                                <div class="col-md-3">
                                    <label class="digital-font font-size-25">${voltaje}</label>
                                </div>
                                <div class="col-md-7">
                                    <label>Corriente(A)</label>
                                </div>
                                <div class="col-md-3">
                                    <label class="digital-font font-size-25">${corriente}</label>
                                </div>
                            </div>
                            <div class="col-12 col-md-12 row justify-content-start d-flex mt-3">
                                <div class="col-md-6">
                                    <label for="">Ajuste frecuencia del soplador 1</label>
                                    <input type="range" class="form-control-range" id="">
                                </div>
                                <div class="col-md-6">
                                    <label for="" class="d-block">Fecuencia de referencia (Hz)</label>
                                    <label class="digital-font font-size-25 d-block">${frecuencia2}</label>
                                </div>

                            </div>
                            <div class="col-12 col-md-12 row justify-content-start d-flex mt-3">
                                ${newDigestor}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
  
  `;

  return card;
};

let newDigestores = (name) => {
  const dig = `
                <div class="col-md-12">
                    <label for="">${name}</label>
                    <input type="range" class="form-control-range" id="">
                </div>
  `;
  return dig;
};

let newDigestoresComplement = (name, value) => {
  const dig = `
                  <div class="col-md-6">
                      <label class="font-size-12">${name}</label>
                  </div>
                  <div class="col-md-6">
                      <label class="digital-font font-size-25">${value}</label>
                  </div>
    `;
  return dig;
};

let recorrerArray=()=>{
    
}
function generarNumeroRandom(min, max) {
  const numeroAleatorio = Math.random() * (max - min) + min;
  return parseFloat(numeroAleatorio.toFixed(2)); // Aplicamos toFixed al número generado
}


