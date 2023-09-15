const TextWithAnchor = ({
  text,
  href,
  linkStart,
  linkEnd,
}: {
  text: string;
  href: string;
  linkStart: number;
  linkEnd: number;
}) => {
  return (
    <p>
      {text.split(" ").slice(0, linkStart).join(" ") + " "}
      <a
        href={href}
        target="_blank"
        className="font-semibold hover:text-secondary-color transition-colors duration-300 ease-in-out underline underline-offset-[6px]"
      >
        {text.split(" ").slice(linkStart, linkEnd).join(" ")}
      </a>
      {" " + text.split(" ").slice(linkEnd).join(" ")}
    </p>
  );
};

export default TextWithAnchor;
