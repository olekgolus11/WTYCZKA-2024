export const upperLineStyle = (iconState: boolean) => {
  return {
    transform: iconState ? "scaleX(0)" : "scaleX(1)",
    opacity: iconState ? "0" : "1",
    transitionDuration: "400ms",
    transformOrigin: "right",
    transitionProperty: "all",
  };
};
export const middleLineStyle = (iconState: boolean) => {
  return {
    transform: iconState ? "rotate(45deg)" : "translateY(6px)",
    transitionDuration: "500ms",
    transformOrigin: "center",
    transitionProperty: "all",
  };
};
export const lowerLineStyle = (iconState: boolean) => {
  return {
    transform: iconState ? "rotate(-45deg)" : "translateY(-6px)",
    transitionDuration: "500ms",
    transformOrigin: "center",
    transitionProperty: "all",
  };
};
