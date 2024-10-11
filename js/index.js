$(document).ready(() => {
  $("#formLogin").on("submit", function (e) {
    login(e);
  });
});

let login = (e) => {
  e.preventDefault();
  spinner()
};
