import type { Metadata } from "next";
import { Suspense } from "react";

import { fetchCategoriesAction } from "@/app/actions/product";
import { envs } from "@/core/config/envs";
import FooterHome from "../(home)/_components/footer/FooterHome";
import { MobileBottomMenu } from "../(home)/_components/footer/MobileBottomMenu";
import { MainHeader } from "../(home)/_components/header/MainHeader";
import { MobileMainHeader } from "../(home)/_components/header/MobileMainHeader";
import { NavigationMenu } from "../(home)/_components/navegation/NavigationMenu";

export const metadata: Metadata = {
  title: `Empresa - ${envs.NEXT_PUBLIC_COMPANY_NAME}`,
};

export default async function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await fetchCategoriesAction();

  return (
    <>
      <MobileMainHeader />
      <MainHeader />
      <NavigationMenu />
      <main className="min-h-[60vh] py-12">{children}</main>
      <Suspense fallback={<div>Loading...</div>}>
        <FooterHome />
      </Suspense>
      <MobileBottomMenu categories={categories} />
    </>
  );
}
