# SSOT Documentation Site

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

バックエンド開発のSSOT（Single Source of Truth）となるドキュメント閲覧サイトです。
モジュール間の遷移図（Flow）を視覚的に表示し，各ノードから詳細仕様へドリルダウンできます。

## ✨ 特徴

- 🔄 **React Flow** によるインタラクティブなモジュール遷移図
- 📝 **DOT風記法** で簡潔にフロー関係を定義
- 🎨 **ダークモードUI** でモダンな外観
- 🐳 **Docker対応** で環境構築が容易
- 📱 **レスポンシブデザイン**

---

## 🚀 クイックスタート

### ローカル開発

```bash
# リポジトリのクローン
git clone https://github.com/KUT-Group12/SSOT.git
cd SSOT/ssot-app

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

ブラウザで http://localhost:3000 にアクセス

### Docker

```bash
cd ssot-app
docker compose up --build
```

---

## 📖 仕様の追加方法

新しいモジュールを追加するには、以下の2つのファイルを編集します。

### Step 1: モジュール基本情報を追加

担当ロールのファイルを編集:

| ロール | ファイル |
|--------|---------|
| 一般会員 | `ssot-app/src/data/definitions/user.ts` |
| 事業者会員 | `ssot-app/src/data/definitions/business.ts` |
| 管理者 | `ssot-app/src/data/definitions/admin.ts` |

```typescript
{
  id: 'user_payment',
  role: 'user',
  name: '決済',
  description: '決済処理を行う',
  endpoint: { method: 'POST', path: '/api/payments' },
  request: {
    amount: 'number',
    method: 'string',
  },
  response: {
    transactionId: 'string',
    status: 'string',
  },
  rules: ['金額は1円以上'],
}
```

### Step 2: フロー関係を定義

`ssot-app/src/data/flows.ts` でモジュール間の遷移を定義:

```typescript
export const userFlow = `
  # 既存のフロー
  user_login -> user_dashboard
  user_dashboard -> user_orders

  # 新しい遷移を追加
  user_orders -> user_payment
`;
```

### Step 3: 確認

```bash
npm run dev
```

ブラウザで `/flow/user` にアクセスし、新しいモジュールが表示されることを確認。

---

## 📁 ディレクトリ構造

```
ssot-app/
└── src/
    ├── app/
    │   ├── page.tsx                    # トップページ（ロール選択）
    │   └── flow/
    │       ├── [role]/page.tsx         # フロー図ページ
    │       └── [role]/[moduleId]/page.tsx  # モジュール詳細ページ
    ├── components/
    │   ├── flow/
    │   │   ├── CustomNode.tsx          # カスタムノードデザイン
    │   │   └── FlowViewer.tsx          # React Flowラッパー
    │   └── ui/                         # shadcn/uiコンポーネント
    ├── data/
    │   ├── definitions/                # ← モジュール定義
    │   │   ├── user.ts                 # 一般会員モジュール
    │   │   ├── business.ts             # 事業者会員モジュール
    │   │   └── admin.ts                # 管理者モジュール
    │   ├── flows.ts                    # フロー定義（DOT風記法）
    │   └── modules.ts                  # 統合（編集不要）
    ├── lib/
    │   ├── flowParser.ts               # DOT風記法パーサー
    │   └── utils.ts                    # ユーティリティ
    └── types/
        └── index.ts                    # TypeScript型定義
```

---

## 🔧 技術スタック

| カテゴリ | 技術 |
|---------|------|
| Framework | Next.js 16 (App Router, TypeScript) |
| UI Library | Tailwind CSS v4, shadcn/ui |
| Visualization | React Flow + dagre |
| Icons | Lucide React |
| Container | Docker |

---

## 📋 コマンド一覧

```bash
cd ssot-app
npm run dev      # 開発サーバー起動
npm run build    # プロダクションビルド
npm run start    # プロダクションサーバー起動
npm run lint     # Lintチェック
```

---

## 🐳 Docker

### Docker Compose（推奨）

```bash
cd ssot-app
docker compose up --build       # ビルドと起動
docker compose up -d --build    # バックグラウンド起動
docker compose down             # 停止
```

### Dockerコマンド

```bash
cd ssot-app
docker build -t ssot-app .
docker run -p 3000:3000 ssot-app
```

---

## 📄 データ型定義

```typescript
type Role = 'user' | 'business' | 'admin';

interface ModuleData {
  id: string;                    // ユニークID
  role: Role;                    // ロール
  name: string;                  // 表示名
  description: string;           // 説明
  endpoint?: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
  };
  nextModuleIds: string[];       // 遷移先（自動生成）
  schema?: {
    request: string;
    response: string;
  };
  rules?: string[];              // ルール
}
```

---

## 🤝 Contributing

1. このリポジトリをFork
2. Feature branchを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をCommit (`git commit -m 'Add amazing feature'`)
4. branchをPush (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

---

## 📜 License

MIT License - 詳細は [ssot-app/LICENSE](ssot-app/LICENSE) を参照してください。
