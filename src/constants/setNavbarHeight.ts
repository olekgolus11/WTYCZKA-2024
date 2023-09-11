export default function setNavbarHeight() {
  const root = document.documentElement;
  const navbar = document.getElementById("navbar");
  const navbarHeight = navbar?.clientHeight;
  if (navbarHeight)
    root.style.setProperty("--nav-height", navbarHeight.toString() + "px");
}
