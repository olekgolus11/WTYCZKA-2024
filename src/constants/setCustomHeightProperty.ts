export default function setCustomHeightProperty(
  elementId: string,
  propertyName: string
) {
  const root = document.documentElement;
  const element = document.getElementById(elementId);
  if (element)
    root.style.setProperty(
      propertyName,
      element.offsetHeight.toString() + "px"
    );
}
