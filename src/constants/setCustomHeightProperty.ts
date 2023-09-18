export default function setCustomHeightProperty(elementId: string, propertyName: string) {
  const root = document.documentElement;
  const navbar = document.getElementById(elementId);
  const navbarHeight = navbar?.clientHeight;
  if (navbarHeight)
    root.style.setProperty(propertyName, navbarHeight.toString() + "px");
}
