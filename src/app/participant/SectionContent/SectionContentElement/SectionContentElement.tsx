const SectionContentElement = ({
  children,
  className,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return <div className={`min-w-full ${className}`}>{children}</div>;
};

export default SectionContentElement;
