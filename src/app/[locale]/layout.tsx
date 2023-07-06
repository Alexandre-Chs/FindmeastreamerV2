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

type RootLayoutProps = {
  children: React.ReactNode;
  params: {
    locale: string;
  };
};

const metadataLang: { [key: string]: { title: string; description: string } } =
  {
    fr: {
      title: "Findmeastreamer",
      description: "Description en fr",
    },
    en: {
      title: "Findmeastreamer",
      description: "Description en en",
    },
    es: {
      title: "Findmeastreamer",
      description: "Description en es",
    },
    ko: {
      title: "Findmeastreamer",
      description: "Description en ko",
    },
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
      <head>
        <title>{metadataLang[locale].title}</title>
        <meta name="description" content={metadataLang[locale].description} />
      </head>
      <body className={`${roboto.className} bg-[#17181C] text-white`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ApiProvider>
            {children}
            <Analytics />
          </ApiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
