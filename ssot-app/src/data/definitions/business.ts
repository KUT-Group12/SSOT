/**
 * 事業者会員 (Business) モジュール定義
 * 
 * 担当者: [担当者名]
 */

import { ModuleBaseData } from './types';

export const businessModules: ModuleBaseData[] = [
    {
        id: 'business_login',
        role: 'business',
        name: 'ログイン',
        description: '事業者会員のログイン処理',
        endpoint: { method: 'POST', path: '/api/auth/business/login' },
        request: {
            email: 'string',
            password: 'string',
        },
        response: {
            token: 'string',
            business: {
                id: 'string',
                companyName: 'string',
            },
        },
    },

    {
        id: 'business_dashboard',
        role: 'business',
        name: 'ダッシュボード',
        description: '事業者のダッシュボード表示',
        endpoint: { method: 'GET', path: '/api/business/dashboard' },
        response: {
            company: { id: 'string', name: 'string' },
            stats: {
                totalProducts: 'number',
                pendingOrders: 'number',
            },
        },
    },

    {
        id: 'business_products',
        role: 'business',
        name: '商品管理',
        description: '商品の登録・編集・削除',
        endpoint: { method: 'GET', path: '/api/business/products' },
        response: {
            products: [
                { id: 'string', name: 'string', price: 'number', stock: 'number' },
            ],
        },
    },

    {
        id: 'business_orders',
        role: 'business',
        name: '受注管理',
        description: '受注の確認・処理',
        endpoint: { method: 'GET', path: '/api/business/orders' },
        response: {
            orders: [
                { id: 'string', customer: 'string', status: 'string', total: 'number' },
            ],
        },
    },
];
