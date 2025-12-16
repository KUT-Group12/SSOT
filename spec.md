## 1. Project Overview

バックエンド開発のSSOT（Single Source of Truth）となるドキュメント閲覧サイトを構築する．
モジュール間の遷移図（Flow）を視覚的に表示し，各ノードから詳細仕様（I/O定義，規約）へドリルダウンできるシステムとする．

## 2. Tech Stack (Fixed)

以下の技術スタックを厳守すること．

- **Framework**: Next.js 14+ (App Router, TypeScript)
- **UI Library**: Tailwind CSS, shadcn/ui (Cards, Sheets, Buttons)
- **Visualization**: React Flow (for Module Transition Diagrams)
- **Icon**: Lucide React
- **Data Source**: Local JSON files (No database required for MVP)

## 3. Core Features & Scope (MVP)

### 3.1 Page Structure

- `/`: **Role Selection Page**
    - 一般会員 (User), 事業者会員 (Business), 管理者 (Admin) の3つのカードを表示．
    - クリックで `/flow/[role]` へ遷移．
- `/flow/[role]`: **Module Flow Page**
    - React Flowを用いた遷移図を表示．
    - URLパラメータ `role` に基づき，表示するデータをフィルタリングする．
    - ノードをクリックすると，画面右側からDrawer (Sheet) が開き，詳細情報を表示する．

### 3.2 Module Detail (Drawer Content)

ノードクリック時に以下の情報を表示する．

- **Overview**: モジュール名，エンドポイント (Method/Path)，概要．
- **Schema**: リクエスト/レスポンスのJSON定義（Code Blockで表示）．
- **Relations**:
    - `Prev Modules`: 遷移元へのリンクボタン．
    - `Next Modules`: 遷移先へのリンクボタン．

## 4. Data Structure (TypeScript Interfaces)

データ管理は以下のインターフェースに従い，`src/data/modules.ts` 等で管理する．

```tsx

export type Role = 'user' | 'business' | 'admin';

export interface ModuleData {
  id: string;             // Unique ID (e.g., 'user_login')
  role: Role;             // Category
  name: string;           // Display Name (e.g., 'ログイン')
  description: string;
  endpoint?: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
  };
  // React Flow logic
  nextModuleIds: string[]; // IDs of modules this module connects TO
  
  // Documentation details
  schema?: {
    request: string;      // JSON string or link to schema
    response: string;     // JSON string or link to schema
  };
  rules?: string[];       // Specific coding rules
}
```

## 5. Directory Structure Reference

```
src/
├── app/
│   ├── page.tsx              // Role Selection
│   └── flow/
│       └── [role]/
│           └── page.tsx      // React Flow View
├── components/
│   ├── flow/
│   │   ├── CustomNode.tsx    // Custom Node Design
│   │   └── FlowViewer.tsx    // React Flow Wrapper
│   └── ui/                   // shadcn components
├── data/
│   └── modules.ts            // Mock Data (The Single Source of Truth)
└── lib/
    └── utils.ts
```

## 6. Implementation Steps

1. **Setup**: Next.jsプロジェクトの初期化とshadcn/ui, React Flowのインストール．
2. **Data Mocking**: `ModuleData` 型定義と，サンプルデータ（User Loginフローなど）の作成．
3. **Flow View**: `role` に基づいてノードとエッジを動的に生成・配置するロジックの実装（`dagre` 等の自動レイアウトアルゴリズムを使用しても良い）．
4. **Detail View**: ノードクリックイベントをハンドリングし，該当データの詳細をDrawerに表示する実装．