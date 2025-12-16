import { ModuleData } from '@/types';

export const modules: ModuleData[] = [
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
        nextModuleIds: ['user_dashboard'],
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
        nextModuleIds: ['user_profile', 'user_orders'],
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
        nextModuleIds: [],
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
        nextModuleIds: [],
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
        nextModuleIds: ['business_dashboard'],
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
        nextModuleIds: ['business_products', 'business_orders'],
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
        nextModuleIds: [],
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
        nextModuleIds: [],
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
        nextModuleIds: ['admin_dashboard'],
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
        nextModuleIds: ['admin_users', 'admin_businesses'],
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
        nextModuleIds: [],
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
        nextModuleIds: [],
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
