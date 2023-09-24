const SectionContentElement = ({
  children,
  className,
  elementType,
}: {
  children: React.ReactNode;
  className?: string;
  elementType: "form" | "text";
}) => {
  const textClassName =
    "flex flex-col items-center justify-start gap-6 xl:justify-center";
  return (
    <div
      className={`min-w-full overflow-y-auto px-4 py-6 sm:px-10 xl:px-32 ${
        elementType === "text" ? textClassName : ""
      } ${className ? className : ""}`}
    >
      {children}
    </div>
  );
};

export default SectionContentElement;
