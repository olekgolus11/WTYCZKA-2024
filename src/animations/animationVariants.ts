const FadeInBottom = {
  initial: { opacity: 0, y: 50 },
  whileInView: { opacity: 1, y: 0 },
};

const FadeInLeft = {
  initial: { opacity: 0, x: -50 },
  whileInView: { opacity: 1, x: 0 },
};

const FadeInRight = {
  initial: { opacity: 0, x: 50 },
  whileInView: { opacity: 1, x: 0 },
};

const FadeInTop = {
  initial: { opacity: 0, y: -50 },
  whileInView: { opacity: 1, y: 0 },
};

export const getAnimationVariants = (animationName: string) => {
  switch (animationName) {
    case "FadeInBottom":
      return FadeInBottom;
    case "FadeInLeft":
      return FadeInLeft;
    case "FadeInRight":
      return FadeInRight;
    case "FadeInTop":
      return FadeInTop;
    default:
      return FadeInBottom;
  }
};
