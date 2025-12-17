import { ModuleData } from '@/types';
import { parseFlow, mergeFlows, FlowMap } from '@/lib/flowParser';
import { userFlow, businessFlow, adminFlow } from './flows';

// フロー定義をパース
const parsedFlows: FlowMap = mergeFlows(
  parseFlow(userFlow),
  parseFlow(businessFlow),
  parseFlow(adminFlow)
);

// モジュール基本データ（nextModuleIdsはフロー定義から自動生成）
type ModuleBaseData = Omit<ModuleData, 'nextModuleIds'>;

const moduleBaseData: ModuleBaseData[] = [
  // ===== User Role Modules =====
  {
    id: 'user_login',
    role: 'user',
    name: 'ログイン',
    description: '一般会員のログイン処理',
    endpoint: {
      method: 'POST',
      path: '/api/auth/login'
    },
    schema: {
      request: `{
  "email": "string",
  "password": "string"
}`,
      response: `{
  "token": "string",
  "user": {
    "id": "string",
    "name": "string"
  }
}`
    },
    rules: [
      'パスワードは8文字以上必須',
      'ログイン試行は5回まで'
    ]
  },
  {
    id: 'user_dashboard',
    role: 'user',
    name: 'ダッシュボード',
    description: '一般会員のダッシュボード表示',
    endpoint: {
      method: 'GET',
      path: '/api/user/dashboard'
    },
    schema: {
      request: '',
      response: `{
  "user": {
    "id": "string",
    "name": "string"
  },
  "recentOrders": [],
  "notifications": []
}`
    }
  },
  {
    id: 'user_profile',
    role: 'user',
    name: 'プロフィール',
    description: 'ユーザープロフィールの表示・編集',
    endpoint: {
      method: 'GET',
      path: '/api/user/profile'
    },
    schema: {
      request: '',
      response: `{
  "id": "string",
  "name": "string",
  "email": "string",
  "phone": "string"
}`
    }
  },
  {
    id: 'user_orders',
    role: 'user',
    name: '注文履歴',
    description: 'ユーザーの注文履歴一覧',
    endpoint: {
      method: 'GET',
      path: '/api/user/orders'
    },
    schema: {
      request: '',
      response: `{
  "orders": [
    {
      "id": "string",
      "date": "string",
      "status": "string",
      "total": "number"
    }
  ]
}`
    }
  },

  // ===== Business Role Modules =====
  {
    id: 'business_login',
    role: 'business',
    name: 'ログイン',
    description: '事業者会員のログイン処理',
    endpoint: {
      method: 'POST',
      path: '/api/auth/business/login'
    },
    schema: {
      request: `{
  "email": "string",
  "password": "string"
}`,
      response: `{
  "token": "string",
  "business": {
    "id": "string",
    "companyName": "string"
  }
}`
    }
  },
  {
    id: 'business_dashboard',
    role: 'business',
    name: 'ダッシュボード',
    description: '事業者のダッシュボード表示',
    endpoint: {
      method: 'GET',
      path: '/api/business/dashboard'
    },
    schema: {
      request: '',
      response: `{
  "company": {
    "id": "string",
    "name": "string"
  },
  "stats": {
    "totalProducts": "number",
    "pendingOrders": "number"
  }
}`
    }
  },
  {
    id: 'business_products',
    role: 'business',
    name: '商品管理',
    description: '商品の登録・編集・削除',
    endpoint: {
      method: 'GET',
      path: '/api/business/products'
    },
    schema: {
      request: '',
      response: `{
  "products": [
    {
      "id": "string",
      "name": "string",
      "price": "number",
      "stock": "number"
    }
  ]
}`
    }
  },
  {
    id: 'business_orders',
    role: 'business',
    name: '受注管理',
    description: '受注の確認・処理',
    endpoint: {
      method: 'GET',
      path: '/api/business/orders'
    },
    schema: {
      request: '',
      response: `{
  "orders": [
    {
      "id": "string",
      "customer": "string",
      "status": "string",
      "total": "number"
    }
  ]
}`
    }
  },

  // ===== Admin Role Modules =====
  {
    id: 'admin_login',
    role: 'admin',
    name: 'ログイン',
    description: '管理者のログイン処理',
    endpoint: {
      method: 'POST',
      path: '/api/auth/admin/login'
    },
    schema: {
      request: `{
  "email": "string",
  "password": "string",
  "mfaCode": "string"
}`,
      response: `{
  "token": "string",
  "admin": {
    "id": "string",
    "role": "string"
  }
}`
    },
    rules: [
      'MFA必須',
      'パスワードは12文字以上必須'
    ]
  },
  {
    id: 'admin_dashboard',
    role: 'admin',
    name: 'ダッシュボード',
    description: '管理者のダッシュボード表示',
    endpoint: {
      method: 'GET',
      path: '/api/admin/dashboard'
    },
    schema: {
      request: '',
      response: `{
  "stats": {
    "totalUsers": "number",
    "totalBusinesses": "number",
    "activeOrders": "number"
  }
}`
    }
  },
  {
    id: 'admin_users',
    role: 'admin',
    name: 'ユーザー管理',
    description: '一般会員の管理',
    endpoint: {
      method: 'GET',
      path: '/api/admin/users'
    },
    schema: {
      request: '',
      response: `{
  "users": [
    {
      "id": "string",
      "name": "string",
      "email": "string",
      "status": "string"
    }
  ]
}`
    }
  },
  {
    id: 'admin_businesses',
    role: 'admin',
    name: '事業者管理',
    description: '事業者会員の管理',
    endpoint: {
      method: 'GET',
      path: '/api/admin/businesses'
    },
    schema: {
      request: '',
      response: `{
  "businesses": [
    {
      "id": "string",
      "companyName": "string",
      "status": "string"
    }
  ]
}`
    }
  }
];

// フロー定義から nextModuleIds を解決してモジュールデータを生成
export const modules: ModuleData[] = moduleBaseData.map(module => ({
  ...module,
  nextModuleIds: parsedFlows[module.id] || []
}));

// Helper functions
export const getModulesByRole = (role: string): ModuleData[] => {
  return modules.filter(m => m.role === role);
};

export const getModuleById = (id: string): ModuleData | undefined => {
  return modules.find(m => m.id === id);
};

export const getPrevModules = (id: string): ModuleData[] => {
  return modules.filter(m => m.nextModuleIds.includes(id));
};
