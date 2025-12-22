/**
 * 管理者 (Admin) モジュール定義
 * 
 * 担当者: [担当者名]
 */

import { ModuleBaseData } from './types';

export const adminModules: ModuleBaseData[] = [
    {
        id: 'admin_login',
        role: 'admin',
        name: 'ログイン',
        description: '管理者のログイン処理',
        endpoint: { method: 'POST', path: '/api/auth/admin/login' },
        request: {
            email: 'string',
            password: 'string',
            mfaCode: 'string',
        },
        response: {
            token: 'string',
            admin: {
                id: 'string',
                role: 'string',
            },
        },
        rules: [
            'MFA必須',
            'パスワードは12文字以上必須',
        ],
    },

    {
        id: 'admin_dashboard',
        role: 'admin',
        name: 'ダッシュボード',
        description: '管理者のダッシュボード表示',
        endpoint: { method: 'GET', path: '/api/admin/dashboard' },
        response: {
            stats: {
                totalUsers: 'number',
                totalBusinesses: 'number',
                activeOrders: 'number',
            },
        },
    },

    {
        id: 'admin_users',
        role: 'admin',
        name: 'ユーザー管理',
        description: '一般会員の管理',
        endpoint: { method: 'GET', path: '/api/admin/users' },
        response: {
            users: [
                { id: 'string', name: 'string', email: 'string', status: 'string' },
            ],
        },
    },

    {
        id: 'admin_businesses',
        role: 'admin',
        name: '事業者管理',
        description: '事業者会員の管理',
        endpoint: { method: 'GET', path: '/api/admin/businesses' },
        response: {
            businesses: [
                { id: 'string', companyName: 'string', status: 'string' },
            ],
        },
    },
];
