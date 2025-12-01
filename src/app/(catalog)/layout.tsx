import { Footer } from "../(home)/_components/footer/Footer";
import { MainHeader } from "../(home)/_components/header/MainHeader";
import { MobileBottomMenu } from "../(home)/_components/footer/MobileBottomMenu";
import { MobileMainHeader } from "../(home)/_components/header/MobileMainHeader";
import { NavigationMenu } from "../(home)/_components/navegation/NavigationMenu";
import { TopBar } from "../(home)/_components/header/TopBar";

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
      <Footer />
      <MobileBottomMenu />
    </>
  );
};

export default CatalogLayout;
