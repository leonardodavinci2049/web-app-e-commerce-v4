import { Suspense } from "react";
import FooterHome from "../(home)/_components/footer/FooterHome";
import { MobileBottomMenu } from "../(home)/_components/footer/MobileBottomMenu";
import { MainHeader } from "../(home)/_components/header/MainHeader";
import { MobileMainHeader } from "../(home)/_components/header/MobileMainHeader";
import { TopBar } from "../(home)/_components/header/TopBar";
import { NavigationMenu } from "../(home)/_components/navegation/NavigationMenu";

const CatalogLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <TopBar />
      <MobileMainHeader />
      <MainHeader />
      <NavigationMenu />
      {children}
      <Suspense fallback={<div>Loading...</div>}>
        <FooterHome />
      </Suspense>
      <MobileBottomMenu />
    </>
  );
};

export default CatalogLayout;
