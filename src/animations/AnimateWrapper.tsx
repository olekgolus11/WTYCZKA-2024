import { motion } from "framer-motion";
import { getAnimationVariants } from "./animationVariants";

const AnimateWrapper = ({
  children,
  duration,
  delay,
  type,
  once,
  className,
}: {
  children: React.ReactNode;
  duration: number;
  delay: number;
  type: "FadeInLeft" | "FadeInRight" | "FadeInBottom" | "FadeInTop";
  once?: boolean;
  className?: string;
}) => {
  const animationVariant = getAnimationVariants(type);
  return (
    <motion.div
      initial={animationVariant.initial}
      whileInView={animationVariant.whileInView}
      transition={{ type: "spring", duration: duration, delay: delay }}
      className={`overflow-hidden ${className ? className : ""}`}
      viewport={{ once: once ? once : false }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateWrapper;
