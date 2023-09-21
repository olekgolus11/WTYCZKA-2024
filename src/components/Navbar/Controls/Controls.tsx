import AnimateWrapper from "@/animations/AnimateWrapper";
import LanguageSwitch from "@/components/LanguageSwitch/LanguageSwitch";
import { facebookLink, instagramLink } from "@/services/socialLinks";
import { Facebook, Instagram } from "lucide-react";

const Controls = () => {
  return (
    <div className="flex gap-8 items-center justify-center xl:gap-4">
      <AnimateWrapper duration={1} delay={0.5} type="FadeInLeft">
        <a href={facebookLink} target="_blank">
          <Facebook
            height={30}
            width={30}
            className="cursor-pointer hover:stroke-secondary-color transition-all duration-300"
          />
        </a>
      </AnimateWrapper>
      <AnimateWrapper duration={1} delay={0.6} type="FadeInLeft">
        <a href={instagramLink} target="_blank">
          <Instagram
            height={30}
            width={30}
            className="cursor-pointer hover:stroke-secondary-color transition-all duration-300"
          />
        </a>
      </AnimateWrapper>
      <LanguageSwitch className="hover:rotate-[360deg] origin-center transition-all duration-300" />
    </div>
  );
};

export default Controls;
