import { Footer } from "../(home)/_components/Footer";
import { MainHeader } from "../(home)/_components/MainHeader";
import { MobileBottomMenu } from "../(home)/_components/MobileBottomMenu";
import { MobileMainHeader } from "../(home)/_components/MobileMainHeader";
import { NavigationMenu } from "../(home)/_components/NavigationMenu";
import { TopBar } from "../(home)/_components/TopBar";

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
