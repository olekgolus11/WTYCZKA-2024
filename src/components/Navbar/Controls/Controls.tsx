import LanguageSwitch from "@/components/LanguageSwitch/LanguageSwitch";
import { facebookLink, instagramLink } from "@/services/socialLinks";
import { Facebook, Instagram } from "lucide-react";

const Controls = () => {
  return (
    <div className="flex gap-8 items-center justify-center xl:gap-4">
      <a href={facebookLink} target="_blank">
        <Facebook
          height={30}
          width={30}
          className="cursor-pointer hover:stroke-secondary-color transition-all duration-300"
        />
      </a>
      <a href={instagramLink} target="_blank">
        <Instagram
          height={30}
          width={30}
          className="cursor-pointer hover:stroke-secondary-color transition-all duration-300"
        />
      </a>
      <LanguageSwitch className="hover:rotate-[360deg] origin-center transition-all duration-300" />
    </div>
  );
};

export default Controls;
