import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans-jp",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SUMIKA（スミカ）｜AIプロパティマネージャー｜入居者対応を24時間自動化",
  description:
    "入居者対応をまだ人がやっていませんか？SUMIKAは24時間365日、AIが電話・メッセージに対応。修繕手配から進捗報告まで自動化。管理戸数を増やしても、人は増やさない。",
  openGraph: {
    title: "SUMIKA（スミカ）｜AIプロパティマネージャー",
    description:
      "入居者対応を24時間自動化。AIが電話・修繕手配・進捗報告を代行。まずはデモで体験を。",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className={notoSansJP.variable}>
      <body className="min-h-screen bg-cream font-sans text-ink antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
