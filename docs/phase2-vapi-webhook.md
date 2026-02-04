# Phase 2 次のステップ: Webhook 登録と動作確認

**前提**: Supabase の設定・`demo_calls` テーブル・認証用ユーザー作成が完了していること。

**ゴール**: デモ番号に電話して通話を終了すると `demo_calls` に 1 件保存され、ダッシュボードで一覧・録音リンクが確認できる状態にする。

---

## 1. あなたがやること（デプロイ or ローカル公開）

| # | やること | 詳細 |
|---|----------|------|
| 1 | デプロイするか決める | **A) 本番デプロイ**: Vercel 等にデプロイし、本番 URL を用意する。**B) ローカル検証**: ngrok 等で `http://localhost:3000` を公開 URL にする（例: `https://xxxx.ngrok.io`）。 |
| 2 | 本番の環境変数を設定（A の場合） | Vercel の Project Settings → Environment Variables に以下を追加: `NEXT_PUBLIC_DEMO_PHONE_NUMBER`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`。 |
| 3 | Webhook が届く URL を決める | A の場合: `https://your-app.vercel.app/api/webhooks/vapi`。B の場合: `https://xxxx.ngrok.io/api/webhooks/vapi`。 |

**B) ローカルで ngrok を使う場合**

1. ターミナルで `npm run dev` を起動したままにする。
2. 別ターミナルで `npx ngrok http 3000` を実行する。
3. 表示された HTTPS の URL（例: `https://abc123.ngrok.io`）をメモする。
4. Webhook URL は `https://abc123.ngrok.io/api/webhooks/vapi` とする。

---

## 2. Vapi で Webhook を登録（あなたがやること）

| # | やること | 詳細 |
|---|----------|------|
| 1 | Vapi Dashboard を開く | https://dashboard.vapi.ai |
| 2 | 対象の Phone Number または Assistant を開く | Phase 1 で Twilio 連携した番号に紐づいている Assistant を開く。 |
| 3 | Server URL を設定 | **Server URL**（または Server 設定）に、上記で決めた URL を入力（例: `https://your-app.vercel.app/api/webhooks/vapi`）。 |
| 4 | end-of-call-report を有効にする | **Server Messages**（または Webhook で送るイベント）に `end-of-call-report` を追加する。Vapi の UI によっては「End of call report」などのチェックを ON にする。 |
| 5 | 保存する | 設定を保存する。 |

**疎通確認**: ブラウザで `https://your-url/api/webhooks/vapi` を開く。`"Vapi webhook endpoint"` と表示されればエンドポイントは稼働している。

---

## 3. 動作確認（あなたがやること）

| # | やること | 確認方法 |
|---|----------|----------|
| 1 | デモ番号に電話する | LP の「AIに電話してみる」または手動で `+19143413276` に発信。 |
| 2 | AI と短く会話してから通話を終了する | 数秒話してから切る。 |
| 3 | Supabase で 1 件入っているか確認 | Supabase Dashboard → Table Editor → `demo_calls` に 1 行追加されているか確認。 |
| 4 | ダッシュボードで一覧を確認 | アプリの `/dashboard` にログインし、通話一覧に日時・発信元・録音リンク（Vapi が返している場合）が表示されるか確認。 |

---

## 4. うまくいかないときの確認ポイント

- **demo_calls にレコードが入らない**: Vapi の Server URL が正しいか、HTTPS で届くか確認。Vapi の Webhook ログやアプリのログ（Vercel Functions / ローカルターミナル）で 4xx/5xx が出ていないか確認。
- **録音リンクが「—」のまま**: Vapi の end-of-call-report の payload に `artifact.recording` が含まれるか、Vapi 側で録音が有効か確認。
- **ローカルで ngrok を使う場合**: `npm run dev` を起動したまま、ngrok で `http://localhost:3000` を公開し、Vapi の Server URL に ngrok の URL + `/api/webhooks/vapi` を設定する。

---

## 5. このあと（Phase 3 に向けて）

Phase 2 の「デモ通話の見える化」が完了したら、次は **Phase 3: 本番プロダクトの中核**（物件・案件・業者手配・本番用 AI フロー）に進める。
