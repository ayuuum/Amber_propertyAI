import dynamic from "next/dynamic";
import Image from "next/image";
import { hero } from "@/content/copy";
import { Button } from "@/components/ui/Button";

const FlipText = dynamic(
  () => import("@/components/ui/flip-text").then((mod) => ({ default: mod.FlipText })),
  {
    ssr: false,
    loading: () => (
      <span className="inline-block text-ink">{hero.title}</span>
    ),
  }
);

export function Hero() {
  return (
    <section className="bg-cream py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-6">
        <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-16">
          {/* 左: コピー */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold leading-tight text-ink md:text-4xl lg:text-5xl">
              <FlipText
                word={hero.title}
                duration={0.4}
                delayMultiple={0.05}
                className="text-ink"
                containerClassName="md:justify-start"
              />
            </h1>
            <p className="mt-6 text-lg text-ink-sub md:text-xl">
              {hero.sub}
            </p>
            <p className="mt-3 text-base font-medium text-ink md:text-lg">
              {hero.numberLine}
            </p>
            <p className="mt-2 text-base text-ink-sub">{hero.closing}</p>
            <div className="mt-10">
              <Button
                href={hero.ctaHref}
                variant="primary"
                className="text-lg px-8 py-4"
              >
                {hero.cta}
              </Button>
            </div>
          </div>

          {/* 右: キービジュアル（提案B: 人からAIへ・任せる） */}
          <div className="relative order-first h-64 w-full max-w-sm shrink-0 md:order-none md:h-80 md:max-w-md">
            {hero.imageSrc ? (
              <div className="relative h-full w-full overflow-hidden rounded-2xl bg-cream-alt/80">
                <Image
                  src={hero.imageSrc}
                  alt={hero.imageAlt}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority
                />
              </div>
            ) : (
              <HeroVisual imageAlt={hero.imageAlt} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/** 提案B: 人からAIへ・任せる（担当者が楽に、AIが受け持つ）イラスト */
function HeroVisual({ imageAlt }: { imageAlt: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center rounded-2xl bg-cream-alt/80 p-6 md:p-8"
      role="img"
      aria-label={imageAlt}
    >
      <svg
        viewBox="0 0 320 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-full max-h-[220px] object-contain"
      >
        {/* 左: 人（担当者・リラックス） */}
        <g opacity="0.9">
          <circle cx="70" cy="55" r="22" fill="#F5F0E8" stroke="#2C2C2C" strokeWidth="2" />
          <ellipse cx="70" cy="58" rx="8" ry="6" fill="#2C2C2C" opacity="0.6" />
          <path
            d="M55 95 L70 78 L85 95 L82 160 L58 160 Z"
            fill="#F5F0E8"
            stroke="#2C2C2C"
            strokeWidth="2"
          />
          <rect x="62" y="115" width="16" height="50" rx="2" fill="#FDF8F0" stroke="#2C2C2C" strokeWidth="1.5" />
        </g>
        {/* デスク・PC */}
        <rect x="45" y="155" width="70" height="8" rx="2" fill="#2C2C2C" opacity="0.2" />
        <rect x="58" y="135" width="44" height="28" rx="4" fill="white" stroke="#2C2C2C" strokeWidth="1.5" opacity="0.9" />
        <rect x="65" y="142" width="30" height="3" rx="1" fill="#2C2C2C" opacity="0.3" />
        <rect x="65" y="148" width="20" height="3" rx="1" fill="#2C2C2C" opacity="0.2" />

        {/* 中央: 受け渡し（電話→AIへ） */}
        <g>
          <path
            d="M130 110 L180 110"
            stroke="#1a1a1a"
            strokeWidth="2"
            strokeDasharray="4 4"
            opacity="0.6"
          />
          <polygon points="176,106 186,110 176,114" fill="#1a1a1a" opacity="0.6" />
          <rect x="118" y="95" width="24" height="30" rx="4" fill="white" stroke="#1a1a1a" strokeWidth="1.5" />
          <circle cx="130" cy="108" r="4" fill="#1a1a1a" opacity="0.5" />
        </g>

        {/* 右: AI（クラウド・24h・対応済み） */}
        <g>
          <ellipse cx="250" cy="95" rx="35" ry="20" fill="white" stroke="#1a1a1a" strokeWidth="2" />
          <ellipse cx="235" cy="98" rx="18" ry="12" fill="white" stroke="#1a1a1a" strokeWidth="1.5" />
          <ellipse cx="265" cy="98" rx="18" ry="12" fill="white" stroke="#1a1a1a" strokeWidth="1.5" />
          <text x="250" y="99" textAnchor="middle" fill="#1a1a1a" style={{ fontFamily: "sans-serif", fontSize: "11px", fontWeight: "bold" }}>24h</text>
          <circle cx="250" cy="130" r="12" fill="white" stroke="#1a1a1a" strokeWidth="1.5" />
          <path d="M245 130 L248 133 L256 125" stroke="#1a1a1a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="250" y="155" textAnchor="middle" fill="#6B6B6B" style={{ fontFamily: "sans-serif", fontSize: "10px" }}>AIが対応</text>
        </g>

        {/* 下: 余白・落ち着き */}
        <rect x="50" y="175" width="220" height="2" rx="1" fill="#2C2C2C" opacity="0.08" />
      </svg>
    </div>
  );
}
