# SUMIKA（スミカ）

AIプロパティマネージャー LP + デモ通話・本番案件・業者手配・月次レポート（Phase 1–4）

## 機能概要

- **Phase 1–2**: LP、電話デモ、オンラインデモ予約フォーム、デモ通話・予約申込のダッシュボード
- **Phase 3**: 物件・案件・業者 CRUD、案件詳細と業者一斉連絡、業者返信フォーム、簡易レポート
- **Phase 4**: 月次レポート（Vercel Cron で毎月1日実行、集計結果をメール送信可能）。LINE/メール/SMS 受信・管理ソフト連携は今後の拡張として検討

## セットアップ

```bash
npm install
cp .env.local.example .env.local
# .env.local に必要な値を設定（デモ番号・Supabase）
npm run dev
```

## 環境変数

`.env.local.example` を参照。本番デプロイ時は Vercel の Environment Variables に同じ変数を設定する。

## デプロイ

- **Vercel**: GitHub にプッシュ後、[Vercel](https://vercel.com) でリポジトリをインポート。環境変数を設定してデプロイ。
- Phase 2 の Webhook 登録手順は [docs/phase2-vapi-webhook.md](docs/phase2-vapi-webhook.md) を参照。
- **月次レポート**: `vercel.json` の cron で毎月1日 0:00 UTC に `/api/cron/monthly-report` が呼ばれます。`CRON_SECRET` と（任意）`MONTHLY_REPORT_EMAIL`・`SENDGRID_API_KEY` を設定するとメール送信されます。
