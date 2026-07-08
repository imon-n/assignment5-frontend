import Navbar from "@/components/layout/Navbar";
import NavbarWrapper from "@/components/layout/NavbarWrapper";


export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarWrapper>
        <Navbar />
      </NavbarWrapper>
      {children}
    </div>
  );
}