document.getElementById("show-login").addEventListener("click", function () {
  document.getElementById("signup-container").style.display = "none";
  document.getElementById("login-container").style.display = "block";
});

document.getElementById("show-signup").addEventListener("click", function () {
  document.getElementById("signup-container").style.display = "block";
  document.getElementById("login-container").style.display = "none";
});
