import {
  upperLineStyle,
  middleLineStyle,
  lowerLineStyle,
} from "./navIconStyles";

const NavIcon = ({ iconState }: { iconState: boolean }) => {
  return (
    <div className="cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#f8fafc"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-menu"
      >
        <line
          x1="4"
          x2="20"
          y1="12"
          y2="12"
          style={upperLineStyle(iconState)}
        />
        <line
          x1="4"
          x2="20"
          y1="12"
          y2="12"
          style={middleLineStyle(iconState)}
        />
        <line
          x1="4"
          x2="20"
          y1="12"
          y2="12"
          style={lowerLineStyle(iconState)}
        />
      </svg>
    </div>
  );
};

export default NavIcon;
