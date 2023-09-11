import LanguageSwitch from "@/components/LanguageSwtich/LanguageSwitch";
import { Facebook, Instagram } from "lucide-react";

const Controls = () => {
  return (
    <div className="flex gap-4 items-center justify-center">
      <Facebook
        height={30}
        width={30}
        className="cursor-pointer hover:stroke-secondary-color transition-all duration-300"
      />
      <Instagram
        height={30}
        width={30}
        className="cursor-pointer hover:stroke-secondary-color transition-all duration-300"
      />
      <LanguageSwitch className="hover:rotate-[360deg] origin-center transition-all duration-300" />
    </div>
  );
};

export default Controls;
