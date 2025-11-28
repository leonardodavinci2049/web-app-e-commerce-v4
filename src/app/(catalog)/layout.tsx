import { Suspense } from "react";
import MainHeader from "@/components/header/main-header";
import MobileHeader from "@/components/header/mobile-header";

const CatalogLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <MobileHeader />
      <Suspense fallback={<div className="h-16" />}>
        <MainHeader />
      </Suspense>
      {children}
    </>
  );
};

export default CatalogLayout;
