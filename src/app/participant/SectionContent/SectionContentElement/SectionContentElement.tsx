const SectionContentElement = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`min-w-full overflow-y-auto px-4 py-6 flex items-center justify-top flex-col gap-6 xl:justify-center sm:px-10 xl:px-32 ${className}`}
    >
      {children}
    </div>
  );
};

export default SectionContentElement;
