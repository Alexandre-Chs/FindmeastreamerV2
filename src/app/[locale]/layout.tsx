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
        "Rejoignez notre communauté de streaming dès maintenant et bénéficiez gratuitement et facilement d'une visibilité accrue ! Chaque heure, nous organisons un tirage au sort mettant en avant un streamer. Profitez de cette opportunité pour découvrir de nouveaux talents et les soutenir tout en passant un agréable moment.",
    },
    en: {
      title: "Findmeastreamer - The best way to find and promote streamers",
      description:
        "Join our streaming community now and gain visibility easily and for free! Every hour, we hold a raffle that showcases a streamer. Take the opportunity to discover new talents and support them while having a great time.",
    },
    es: {
      title:
        "Findmeastreamer - La mejor manera de encontrar y promocionar streamers",
      description:
        "¡Únete a nuestra comunidad de transmisión en vivo ahora mismo y aumenta tu visibilidad de forma gratuita y fácil! Cada hora, realizamos un sorteo que destaca a un streamer. Aprovecha esta oportunidad para descubrir nuevos talentos y apoyarlos mientras pasas un buen rato.",
    },
    ko: {
      title: "Findmeastreamer - 스트리머를 찾고 홍보하는 최고의 방법",
      description:
        "지금 우리 스트리밍 커뮤니티에 가입하여 무료로 쉽게 가시성을 얻으세요! 매 시간마다 스트리머를 선정하는 추첨을 진행합니다. 즐겁게 시간을 보내며 새로운 재능을 발견하고 지원하는 기회를 살려보세요",
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4854700245396979"
          crossOrigin="anonymous"
        ></script>
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
