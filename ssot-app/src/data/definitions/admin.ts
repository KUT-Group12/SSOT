
/**
 * 管理者 (Admin) モジュール定義
 *
 * 担当者: [担当者名]
 */

import { ModuleBaseData } from './types';


export const adminModules: ModuleBaseData[] = [
    {
        id: 'LoginScreen',
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
        id: 'AdminInputInformation',
        role: 'admin',
        name: 'Google認証にアクセスしてログイン',
        description: 'Google認証にアクセスしてログイン',
        endpoint: { method: 'GET', path: '' },
        request: {},
        response: {},
    },
    {
        id: 'AdminDashboardScreen',
        role: 'admin',
        name: '概要画面',
        description: '概要画面の表示',
        endpoint: { method: 'GET', path: '/api/admin/summary' },
        response: {
            'totalUserCount': 'int',
            'activeUserCount': 'int',
            'totalPostCount': 'int',
            'totalReactionCount': 'int',
            'businessAccountCount': 'int',
            'unprocessedReportCount': 'int',
        }
    },
    {
        id: 'AdminGetTotalPostNumber',
        role: 'admin',
        name: '総投稿数の取得',
        description: 'アプリ内の投稿の総数を取得する',
        relatedApi: 'AdminIntegration',
        relatedEndpoint: '/internal/posts/status',
    },
    {
        id: 'AdminGetTotalReactionNumber',
        role: 'admin',
        name: 'リアクション総数の取得',
        description: 'アプリ内のリアクションの総数を取得する',
        relatedApi: 'AdminIntegration',
        relatedEndpoint: '/internal/reactions/status'
    },
    {
        id: 'AdminGetBusinessAccountNumber',
        role: 'admin',
        name: '事業者アカウントの総数',
        description: 'アプリ内の事業者アカウントの総数を取得する',
        relatedApi: 'AdminIntegration',
        relatedEndpoint: '/internal/businessuser/status'
    },
    {
        id: 'AdminGetNotReportNumber',
        role: 'admin',
        name: '未処理通報数を取得',
        description: 'まだ処理が終わっていない通報の総数を取得する',
        relatedApi: 'AdminIntegration',
        relatedEndpoint: '/internal/reports/status'
    },
    {
        id: 'AdminIntegration',
        role: 'admin',
        name: '統合モジュール',
        description: '概要画面に必要なデータを複数APIから取得',
        endpoints: [
            {
                name: '総ユーザー数の取得',
                method: 'GET',
                path: '/internal/totaluser/status',
                response: {
                    count: 'int'
                }
            },
            {
                name: 'アクティブユーザー数の取得',
                method: 'GET',
                path: '/internal/activeuser/status',
                response: {
                    count: 'int'
                }
            },
            {
                name: '総投稿数',
                method: 'GET',
                path: '/internal/posts/status',
                response: {
                    count: 'int',
                }
            },
            {
                name: 'リアクション数',
                method: 'GET',
                path: '/internal/reactions/status',
                response: {
                    count: 'int',
                }
            },
            {
                name: '事業者アカウント数',
                method: 'GET',
                path: '/internal/businessuser/status',
                response: {
                    count: 'int'
                }
            },
            {
                name: '未処理レポート数',
                method: 'GET',
                path: '/internal/reports/status',
                response: {
                    count: 'int',
                }
            }
        ],
        response: {
            totalUserCount: 'int',
            activeUserCount: 'int',
            totalPostCount: 'int',
            totalReactionCount: 'int',
            businessAccountCount: 'int',
            unprocessedReportCount: 'int',
        },
        relatedApi: 'AdminDashboardScreen'
    },
    {
        id: 'AdminDisplayReportManagement',
        role: 'admin',
        name: '通報管理画面',
        description: '通報内容を全て表示して対応するための画面',
        endpoints: [
            {
                name: '通報内容の取得',
                method: 'GET',
                path: '/api/reports',
                response: {
                    items: [
                        {
                            reportId: 'int',
                            reporterGoogleId: 'string',
                            targetPostId: 'int',
                            reason: 'string',
                            reportedAt: 'ISO8601',
                            handled: 'boolean',
                            deleted: 'boolean'
                        }
                    ],
                    total: 'int',
                    page: 'int',
                    pageSize: 'int',
                }
            },
            {
                name: '通報を処理済みにする',
                method: 'PUT',
                path: '/api/reports/{id}/handle',
                request: {
                    handled: 'boolean',
                    adminNote: 'string',
                },
                response: {
                    reportId: 'int',
                    handled: 'boolean',
                    handledAt: 'ISO8601'
                }
            }
        ],
        rules: [
            'queryとして，以下のものをもつこと．',
            '?page=1&pageSize=20&handled=false',
            '例として，以下のようなリクエストをフロント側がおくる．',
            '/api/reports?page=1&pageSize=20&handled=false'
        ]
    },
    {
        id: 'AdminGetTotalUserNumber',
        role: 'admin',
        name: '総ユーザー数の取得',
        description: '総ユーザー数を取得する',
        relatedApi: 'AdminIntegration',
        relatedEndpoint: '/internal/totaluser/status',
    },
    {
        id: 'AdminGetActiveUserNumber',
        role: 'admin',
        name: 'アクティブユーザー数を取得',
        description: 'アクティブユーザー数を取得',
        relatedApi: 'AdminIntegration',
        relatedEndpoint: '/internal/activeuser/status'
    },
    {
        id: 'ProcessReportScreen',
        role: 'admin',
        name: '通報処理の反映',
        description: '通報を「処理済み」に反映する．',
        relatedApi: 'AdminDisplayReportManagement',
        relatedEndpoint: '/reports/{id}/handle'
    },
    {
        id: 'AdminGetReportDetails',
        role: 'admin',
        name: '通報内容を取得',
        description: '通報内容を全て取得',
        relatedApi: 'AdminDisplayReportManagement',
        relatedEndpoint: '/api/reports?page=1&pageSize=20&handled=false'

    },
    {
        id: 'AdminDisplayBusinessApplicationList',
        role: 'admin',
        name: '事業者申請画面の表示',
        description: '事業者申請を管理するための画面を表示する',
        endpoints: [
            {
                name: '申請の表示',
                method: 'GET',
                path: '/api/admin/applications',
                response: {
                    items: [
                        {
                            applicationId: 'int',
                            name: 'string',
                            address: 'string',
                            phone: 'string',
                            userId: 'string',
                            status: 'string',
                            createdAt: 'ISO8601',
                        }
                    ],
                    total: 'int',
                    page: 'int',
                    pageSize: 'int',
                }
            },
            {
                name: '申請の承認',
                method: 'PUT',
                path: '/api/admin/applications/{id}/approve',
                request: {
                    adminNote: 'string',
                },
                response: {
                    applicationId: 'int',
                    status: 'string',
                    approvedAt: 'ISO8601'
                }
            },
            {
                name: '申請の却下',
                method: 'PUT',
                path: '/api/admin/applications/{id}/reject',
                request: {
                    reason: 'string',
                },
                response: {
                    applicationId: 'int',
                    status: 'string',
                    reason: 'string',
                    rejectedAt: 'ISO8601'
                }
            }
        ],
        rules: [
            'statusは "pending" | "approved" | "rejected" のいずれか',
            'approvedAt, rejectedAtに関しては，日時フォーマットのISO8601に準ずること．',
            'queryとして，page/pageSize/statusを使用する．'
        ]
    },
    {
        id: 'AdminGetBusinessApplications',
        role: 'admin',
        name: '事業者申請情報の取得',
        description: 'DBから事業者申請情報を取得する',
        relatedApi: 'AdminDisplayBusinessApplicationList'
    },
    {
        id: 'AdminDeleteApplicationData',
        role: 'admin',
        name: '申請情報の匿名化',
        description: '確認した申請情報を匿名化処理を施す',
        relatedApi: '',
    },
    {
        id: 'ProcessBusinessRequestScreen',
        role: 'admin',
        name: '事業者申請の反映',
        description: '対応した事業者申請を反映する．',
    },
    {
        id: 'AdminGetUserDetails',
        role: 'admin',
        name: 'ユーザー情報の取得',
        description: '全ユーザーの情報を取得する',
        relatedApi: 'AdminDisplayUserManagement'
    },
    {
        id: 'AdminDisplayUserManagement',
        role: 'admin',
        name: 'ユーザー画面を表示',
        description: 'ユーザーを一覧で表示する',
        endpoint: { method: 'GET', path: '/api/admin/users' },
        response: {
            items: [
                {
                    googleId: 'string',
                    gmail: 'string',
                    role: 'string',
                    registrationDate: 'ISO8601',
                }
            ],
            total: 'int',
            page: 'int',
            pageSize: 'int',
        },
        rules: [
            'queryとして，page/pageSizeを用いる．',
            'roleは "admin" | "business" | "user" のいずれか',
            '登録日時に関してはISO8601で統一'
        ]
    },
    {
        id: 'AdminSelectUserDeletion',
        role: 'admin',
        name: 'ユーザー一覧から削除ボタンを選択',
        description: 'ユーザーを削除する',
        endpoint: { method: 'DELETE', path: '/api/admin/users/{userId}' },
        request: {
            reason: 'string',
        },
        response: {
            success: 'boolean',
            deletedAt: 'ISO8601',
        }
    },
    {
        id: 'AdminDeleteAccount',
        role: 'admin',
        name: 'ユーザー削除',
        description: 'アカウントをバックエンド側で削除する',
        relatedApi: 'AdminSelectUserDeletion',
    },
    {
        id: 'SendUserMessage',
        role: 'admin',
        name: 'メール送信',
        description: 'ユーザーに削除した旨のメールを送信する',
        relatedApi: 'AdminSelectUserDeletion'
    },
    {
        id: 'AdminUpdateUserListUI',
        role: 'admin',
        name: '処理反映',
        description: 'ユーザー一覧に処理を反映する',
    },
    {
        id: 'AdminGetContactMessages',
        role: 'admin',
        name: 'お問い合わせ情報の取得',
        description: 'お問い合わせ情報の全てを取得する',
        relatedApi: 'AdminDisplayContactManagement',
        relatedEndpoint: '/api/admin/contacts'
    },
    {
        id: 'AdminDisplayContactManagement',
        role: 'admin',
        name: 'お問い合わせ画面の表示',
        description: 'お問い合わせ画面をWeb側に表示する',
        endpoints: [
            {
                name: 'お問い合わせ一覧を取得する',
                method: 'GET',
                path: '/api/admin/contacts',
                response: {
                    items: [
                        {
                            contactId: 'int',
                            date: 'ISO8601',
                            subject: 'string',
                            text: 'string',
                            userId: 'string',
                            handled: 'boolean',
                        }
                    ],
                    total: 'int',
                    page: 'int',
                    pageSize: 'int',
                }
            },
            {
                name: '対応済みにする',
                method: 'PUT',
                path: '/api/admin/contacts/{contactId}/handle',
                request: {
                    handled: 'boolean',
                    adminNote: 'string',
                },
                response: {
                    contactId: 'int',
                    handled: 'boolean',
                    handledAt: 'ISO8601'
                }
            }
        ],
        rules: [
            'queryとして，page/pageSize/handledを用いる',
            '日時に関しては，ISO8601を用いること'
        ]
    },
    {
        id: 'ProcessContact',
        role: 'admin',
        name: '対応済みフラグの変更',
        description: '対応済みフラグをTrueにする',
        relatedApi: 'AdminDisplayContactManagement',
    },
    {
        id: 'ProcessContactScreen',
        role: 'admin',
        name: '問い合わせの反映',
        description: '対応した問い合わせを反映する',
    },
    {
        id: 'AdminSelectLogout',
        role: 'admin',
        name: 'ログアウトの選択',
        description: 'Webページでログアウトボタンをクリックする',
        endpoint: { method: 'POST', path: '/auth/logout' },
        response: {
            'status': 'logged_out',
        }
    },
    {
        id: 'AdminLogout',
        role: 'admin',
        name: 'ログアウト',
        description: 'バックエンド側の処理でログアウトを実行する',
        relatedApi: 'AdminSelectLogout'
    }
];
