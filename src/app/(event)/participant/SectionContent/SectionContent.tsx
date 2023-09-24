import { useSelectedSectionContext } from "@/contexts/SelectedSectionContext";

const SectionContent = ({ children }: { children: React.ReactNode }) => {
  const { selectedSection } = useSelectedSectionContext();
  return (
    <section className="overflow-hidden section-content-wrapper">
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${selectedSection * 100}%)` }}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionContent;
