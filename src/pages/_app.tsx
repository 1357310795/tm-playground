import { ThemeContextProvider } from "@/contexts/theme";
import type { AppProps } from "next/app";
import Head from "next/head";
import { useEffect, useState } from "react";
import "@/styles/ui-1.0.0.css";
import "@/styles/layout.css";
import "@/styles/iconfont.css";
import { NotificationContextProvider } from "@/contexts/notification";

export default function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted)
    return (
      <>
        <Head>
          <title>加载中...</title>
        </Head>
        <></>
      </>
    );
    
  return (
    <ThemeContextProvider>
      <NotificationContextProvider>
        <Component {...pageProps} />
      </NotificationContextProvider>
    </ThemeContextProvider>
  )
}
