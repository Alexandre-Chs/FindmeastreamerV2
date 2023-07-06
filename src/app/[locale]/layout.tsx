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
      title:
        "Findmeastreamer - Le meilleur moyen de trouver et promouvoir des streamers",
      description:
        "Gagnez en visibilité ! Notre tirage au sort toutes les heures met en avant un streamer. Découvrez de nouveaux talents et soutenez-les en passant un bon moment. Rejoignez notre communauté de streaming dès maintenant !",
    },
    en: {
      title: "Findmeastreamer - The best way to find and promote streamers",
      description:
        "Gain visibility! Our hourly draw highlights a streamer. Discover new talents and support them while having a great time. Join our streaming community now!",
    },
    es: {
      title:
        "Findmeastreamer - La mejor manera de encontrar y promocionar streamers",
      description:
        "¡Gana visibilidad! Nuestro sorteo por hora destaca a un streamer. Descubre nuevos talentos y apóyalos mientras disfrutas de un buen momento. ¡Únete a nuestra comunidad de streaming ahora!",
    },
    ko: {
      title: "Findmeastreamer - 스트리머를 찾고 홍보하는 최고의 방법",
      description:
        "가시성을 향상시키세요! 매 시간마다 진행되는 추첨으로 스트리머를 소개합니다. 즐거운 시간을 보내면서 새로운 재능을 발견하고 그들을 지원하세요. 지금 바로 스트리밍 커뮤니티에 참여하세요!",
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
