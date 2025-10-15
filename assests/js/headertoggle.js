const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.querySelector(".nav-menu");
const userMenu = document.querySelector(".user-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  userMenu.classList.toggle("show");
});
