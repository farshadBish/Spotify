//navbar animation--------------------------------------
window.onscroll = function () {
  scrollNavbar()
}
window.onload = () => {
  searchTitle()
}
function scrollNavbar() {
  let navbarBg = document.querySelector(".nav-top")

  //console.log(navLinks);
  if (document.documentElement.scrollTop > 2) {
    navbarBg.classList.add("scroll")
    // Change the color of navLinks on scroll
  } else {
    navbarBg.classList.remove("scroll")
    // Change the color of navLinks back to default
  }
}
//-----------------------------------------------------
