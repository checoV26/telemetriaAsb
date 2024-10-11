

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