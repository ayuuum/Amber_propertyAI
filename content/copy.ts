/**
 * SUMIKA LP 文言（アイデア検証段階・料金・導入事例なし）
 */

export const site = {
  name: "SUMIKA",
  nameRuby: "スミカ",
  tagline: "AIプロパティマネージャー",
} as const;

export const hero = {
  title: "入居者対応、まだ人がやってますか？",
  sub: "24時間365日、AIが入居者からの電話・メッセージに対応。修繕手配から進捗報告まで、自動化。",
  numberLine: "週20時間の入居者対応を、AIに任せる。",
  closing: "管理戸数を増やしても、人は増やさない。",
  cta: "無料デモを試す",
  ctaHref: "#cta",
  /** 画像を使う場合は /images/hero/hero-visual.png などを指定。空ならSVGイラストを表示 */
  imageSrc: "",
  imageAlt: "担当者がAIに任せて業務を楽にするイメージ",
} as const;

export const problem = {
  title: "不動産管理の現実",
  quotes: [
    { text: "水漏れです", timeLabel: "23:00", icon: "Droplets" },
    { text: "エアコンが動かない", timeLabel: "休日", icon: "Thermometer" },
    { text: "鍵をなくしました", timeLabel: "深夜", icon: "Key" },
  ],
  body: "入居者からの連絡は、昼夜を問わずやってきます。1件1件に対応し、業者を手配し、進捗を確認し、入居者に報告する。",
  question: "この繰り返しに、何時間使っていますか？",
  formula: "管理戸数 ÷ 60 ＝ 必要な人数",
  formulaNote: "これが、業界の「常識」でした。",
  formulaCta: "この常識、変えませんか？",
  flowBefore: [
    { label: "入居者連絡", icon: "Phone" },
    { label: "受付", icon: "ClipboardList" },
    { label: "業者手配", icon: "Wrench" },
    { label: "進捗確認", icon: "CheckCircle" },
    { label: "報告", icon: "User" },
  ],
  flowAfter: [
    { label: "入居者連絡", icon: "Phone" },
    { label: "AIが対応", icon: "Bot" },
    { label: "完了報告", icon: "CheckCircle" },
  ],
} as const;

export const solution = {
  title: "AIが、入居者対応の大半を引き受けます。",
  sub: "複雑な案件だけ人が見ればよい。",
  items: [
    {
      title: "24時間対応",
      body: "深夜の「お湯が出ない」にも即座に対応。AIが状況をヒアリングし、簡単なトラブルはその場で解決策を提案。",
      icon: "Clock",
    },
    {
      title: "修繕手配の自動化",
      body: "対応が必要な場合は、AIが複数の業者に同時連絡。最短で対応可能な業者をマッチングし、日程調整まで完了。",
      icon: "Wrench",
    },
    {
      title: "進捗の自動報告",
      body: "「いつ直るんですか？」の問い合わせはもう来ません。AIが入居者に進捗をリアルタイムで自動通知。",
      icon: "MessageSquare",
    },
    {
      title: "すべてを可視化",
      body: "AIの対応履歴はダッシュボードで一覧。必要なときだけ、人が介入すればOK。",
      icon: "LayoutDashboard",
    },
  ],
} as const;

export const numbers = {
  title: "想定効果",
  note: "※想定に基づくイメージです。",
  rows: [
    { label: "入居者対応時間", value: "週20時間 → 2時間", icon: "Clock" },
    { label: "初回応答時間", value: "平均4時間 → 即時", icon: "Zap" },
    { label: "1人あたり管理戸数", value: "60戸 → 200戸以上", icon: "Users" },
  ],
} as const;

export const features = {
  title: "できること",
  items: [
    {
      title: "AI電話対応",
      points: [
        "入居者からの電話に24時間自動応答",
        "日本語の自然な会話で状況をヒアリング",
        "緊急度を判断し、必要なら即エスカレーション",
      ],
    },
    {
      title: "マルチチャネル対応",
      points: [
        "電話・LINE・メール・SMSを一元管理",
        "入居者の好きなチャネルで連絡可能",
        "すべての履歴を自動で記録",
      ],
    },
    {
      title: "修繕手配の自動化",
      points: [
        "登録業者への一斉連絡",
        "空き状況の自動確認・日程調整",
        "見積もり取得と比較",
      ],
    },
    {
      title: "ダッシュボード",
      points: [
        "全物件の対応状況をリアルタイム表示",
        "未解決案件のアラート",
        "月次レポートの自動生成",
      ],
    },
    {
      title: "システム連携",
      points: [
        "主要な賃貸管理ソフトとAPI連携",
        "いい生活、ESいい物件One等に対応",
      ],
    },
  ],
} as const;

export const flow = {
  title: "最短3日で運用開始",
  steps: [
    { step: 1, title: "ヒアリング（30分）", detail: "現在の管理体制と課題をお聞きします" },
    { step: 2, title: "設定（1-2日）", detail: "物件情報と業者リストを登録" },
    { step: 3, title: "テスト運用（1週間）", detail: "一部物件で試験導入" },
    { step: 4, title: "本格稼働", detail: "全物件に展開、効果測定開始" },
  ],
} as const;

export const target = {
  company: {
    title: "管理戸数を増やしたい。でも人は増やせない。",
    sub: "そんな管理会社様へ。",
    body: "AIプロパティマネージャーなら、今のチームのまま、管理戸数を拡大できます。採用コスト、教育コスト、離職リスク。そこから解放されます。",
  },
  owner: {
    title: "副業大家のあなたへ。",
    body: "本業中に鳴る入居者からの電話。休日に対応する修繕の手配。もう、全部AIに任せませんか？24時間対応の管理人を、AIで。",
  },
} as const;

export const faq = {
  title: "よくある質問",
  items: [
    {
      q: "AIの対応品質は大丈夫ですか？",
      a: "不動産管理に特化した学習を行っており、一般的なトラブル対応の多くを自動処理できます。複雑なケースは即座に担当者へエスカレーションします。",
    },
    {
      q: "高齢の入居者でも使えますか？",
      a: "はい。電話での自然な会話に対応しているため、スマホやアプリが苦手な方でも問題ありません。",
    },
    {
      q: "既存の管理ソフトと連携できますか？",
      a: "いい生活、ESいい物件One、賃貸革命など主要ソフトとAPI連携可能です。詳細はお問い合わせください。",
    },
    {
      q: "セキュリティは大丈夫ですか？",
      a: "すべての通信は暗号化され、データは国内サーバーで管理しています。",
    },
    {
      q: "解約はいつでもできますか？",
      a: "はい。契約期間の縛りはなく、いつでも解約可能です。",
    },
  ],
} as const;

export const cta = {
  title: "まずは、AIと話してみてください。",
  body: "下のボタンから、デモ用の電話番号に発信できます。入居者になったつもりで、「エアコンが動かない」と伝えてみてください。AIがどう対応するか、30秒で体験できます。",
  primary: "AIに電話してみる",
  primaryHref: "tel:",
  secondary: "オンラインデモを予約する",
  secondaryHref: "/demo/request",
} as const;

export const footer = {
  catchphrase: "入居者対応は、深夜でも休日でも。まずはデモで体験を。",
} as const;
