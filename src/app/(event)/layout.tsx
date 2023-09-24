import Navbar from "@/components/Navbar/Navbar";

export default function MainPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
