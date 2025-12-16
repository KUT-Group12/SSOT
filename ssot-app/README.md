# SSOT Documentation Site

バックエンド開発のSSOT（Single Source of Truth）となるドキュメント閲覧サイトです。
モジュール間の遷移図（Flow）を視覚的に表示し，各ノードから詳細仕様へドリルダウンできます。

## 技術スタック

- **Framework**: Next.js 16 (App Router, TypeScript)
- **UI Library**: Tailwind CSS v4, shadcn/ui
- **Visualization**: React Flow + dagre (自動レイアウト)
- **Icon**: Lucide React

---

## ローカル開発環境での起動

### 必要な環境

- Node.js 20以上
- npm

### 手順

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで http://localhost:3000 にアクセスしてください。

### その他のコマンド

```bash
# プロダクションビルド
npm run build

# プロダクションサーバー起動
npm run start

# Lintチェック
npm run lint
```

---

## Docker環境での起動

### 必要な環境

- Docker
- Docker Compose (オプション)

### Docker Composeを使用する場合（推奨）

```bash
# ビルドと起動
docker compose up --build

# バックグラウンドで起動
docker compose up -d --build

# 停止
docker compose down
```

### Dockerコマンドを直接使用する場合

```bash
# イメージのビルド
docker build -t ssot-app .

# コンテナの起動
docker run -p 3000:3000 ssot-app

# バックグラウンドで起動
docker run -d -p 3000:3000 ssot-app
```

ブラウザで http://localhost:3000 にアクセスしてください。

---

## ディレクトリ構成

```
src/
├── app/
│   ├── page.tsx              # Role Selection Page
│   └── flow/[role]/page.tsx  # Module Flow Page
├── components/
│   ├── flow/                 # React Flow関連コンポーネント
│   └── ui/                   # shadcn/uiコンポーネント
├── data/
│   └── modules.ts            # モジュールデータ (SSOT)
├── lib/
│   └── utils.ts              # ユーティリティ
└── types/
    └── index.ts              # TypeScript型定義
```

---

## データの追加・編集

`src/data/modules.ts` を編集してモジュールを追加・変更できます。

```typescript
{
  id: 'unique_id',
  role: 'user' | 'business' | 'admin',
  name: '表示名',
  description: '説明',
  endpoint: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: '/api/...'
  },
  nextModuleIds: ['next_module_id'],
  schema: {
    request: '{ ... }',
    response: '{ ... }'
  },
  rules: ['ルール1', 'ルール2']
}
```
