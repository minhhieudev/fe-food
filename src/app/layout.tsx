'use client'
import Auth from "@/core/components/Auth";
import Client from "@/core/components/Client";
import ReduxProvider from "@/core/components/ReduxProvider";
import dynamic from "next/dynamic";
import { Cabin } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import ChatbotWidget from '@/app/orderFood/components/ChatbotWidget';
const inter = Cabin({ subsets: ["vietnamese"] });
const DynamicContainerPage = dynamic(
  () => import("../app/configPage/ContainerPage"),
  {
    ssr: false,
  }
);

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathName = usePathname();

  if (pathName === "/register") {
    return (
      <html lang="en">
        <body>
          <ReduxProvider>
            <Auth>
              <div className={inter.className}>
                {children}
              </div>
            </Auth>
          </ReduxProvider>
          <ChatbotWidget />
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Client>
            <Auth>
              <div className={inter.className}>
                <DynamicContainerPage>{children}</DynamicContainerPage>
              </div>
            </Auth>
          </Client>
          <ChatbotWidget />
        </ReduxProvider>
      </body>
    </html>
  );
};

export default RootLayout;
