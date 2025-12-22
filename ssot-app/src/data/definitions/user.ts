/**
 * 一般会員 (User) モジュール定義
 * 
 * 担当者: [担当者名]
 */

import { ModuleBaseData } from './types';

export const userModules: ModuleBaseData[] = [
    {
        id: 'user_login',
        role: 'user',
        name: 'ログイン',
        description: '一般会員のログイン処理',
        endpoint: { method: 'POST', path: '/api/auth/login' },
        request: {
            email: 'string',
            password: 'string',
        },
        response: {
            token: 'string',
            user: {
                id: 'string',
                name: 'string',
            },
        },
        rules: [
            'パスワードは8文字以上必須',
            'ログイン試行は5回まで',
        ],
    },

    {
        id: 'user_dashboard',
        role: 'user',
        name: 'ダッシュボード',
        description: '一般会員のダッシュボード表示',
        endpoint: { method: 'GET', path: '/api/user/dashboard' },
        response: {
            user: { id: 'string', name: 'string' },
            recentOrders: '[]',
            notifications: '[]',
        },
    },

    {
        id: 'user_profile',
        role: 'user',
        name: 'プロフィール',
        description: 'ユーザープロフィールの表示・編集',
        endpoint: { method: 'GET', path: '/api/user/profile' },
        response: {
            id: 'string',
            name: 'string',
            email: 'string',
            phone: 'string',
        },
    },

    {
        id: 'user_orders',
        role: 'user',
        name: '注文履歴',
        description: 'ユーザーの注文履歴一覧',
        endpoint: { method: 'GET', path: '/api/user/orders' },
        response: {
            orders: [
                { id: 'string', date: 'string', status: 'string', total: 'number' },
            ],
        },
    },
];
