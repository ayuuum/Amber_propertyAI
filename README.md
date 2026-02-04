# SUMIKA（スミカ）

AIプロパティマネージャー LP + デモ通話ダッシュボード（Phase 1–2）

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
