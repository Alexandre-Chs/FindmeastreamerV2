import { useLocale } from "next-intl";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";
import { Roboto } from "next/font/google";
import { ApiProvider } from "@/context/ApiProvider";
import { Analytics } from "@vercel/analytics/react";

const roboto = Roboto({
  weight: ["100", "300", "400", "500", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Findmeastreamer",
  description: "Find new little streamers!",
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

export default async function RootLayout({
  children,
  params,
}: RootLayoutProps) {
  const locale = useLocale();
  let messages = (await import(`../../../messages/${params.locale}.json`))
    .default;
  if (params.locale !== locale) {
    notFound();
  }
  return (
    <html lang={locale}>
      <body className={`${roboto.className} bg-[#17181C] text-white`}>
        <ApiProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
            <Analytics />
          </NextIntlClientProvider>
        </ApiProvider>
      </body>
    </html>
  );
}
