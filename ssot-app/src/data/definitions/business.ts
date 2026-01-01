/**
 * 事業者会員 (Business) モジュール定義
 * 
 * 担当者: [担当者名]
 */

import { ModuleBaseData } from './types';

export const businessModules: ModuleBaseData[] = [
    // {
    //     id: 'business_login',
    //     role: 'business',
    //     name: 'ログイン',
    //     description: '事業者会員のログイン処理',
    //     endpoint: { method: 'POST', path: '/api/auth/business/login' },
    //     request: {
    //         email: 'string',
    //         password: 'string',
    //     },
    //     response: {
    //         token: 'string',
    //         business: {
    //             id: 'string',
    //             companyName: 'string',
    //         },
    //     },
    // },

    {
        id: 'M3-1',                          // モジュールID
        role: 'business',
        name: 'Google認証',    // 名称
        description: 'Google認証にアクセスしてログインする', // 概要
        endpoint: {
            method: 'POST',
            path: '/api/auth/google'
        },
        response: {
            "sessionId": "string"
        },
        rules: [
            'Google OAuth 2.0 を使用する',
            '認証成功時のみセッションIDを発行する',
            'MFA認証完了を必須とする',
            '認証に失敗した場合はセッションIDを発行しない',
        ]
    },

    {
        id: 'M3-2-1',                                  // モジュールID
        role: 'business',
        name: 'マイページの選択',                  // 名称
        description: 'マイページ画面を選択するボタン操作を行う', // 概要
        response: {
            "googleId": "string"
        },
    },

    {
        id: 'M3-2-2',                                  // モジュールID
        role: 'business',
        name: '事業者情報取得',                        // 名称
        description: '事業者会員情報を取得する',       // 概要
        endpoint: {
            method: 'GET',
            path: '/api/business/mypage/details'
        },
        request: {
            googleId: 'string'
        },
        response: {
            businessName: 'string',
            email: 'string',
            registeredAt: 'string',
            iconImageUrl: 'string'
        },
        rules: [
            'ログイン済みかつ本人のGoogle IDのみ指定可能とする',
            '入力されたGoogle IDをもとに事業者会員情報を取得する',
            '存在しないGoogle IDが指定された場合はエラーを返す',
        ]
    },

    {
        id: 'M3-2-3',                                  // モジュールID
        role: 'business',
        name: 'マイページ表示',                        // 名称
        description: 'マイページ画面を表示する',       // 概要
        request: {
            businessName: 'string',
            gmail: 'string',
            registDate: 'string',
            profieImage: 'string'
        },
    },

    {
        id: 'M3-3',                                   // モジュールID
        role: 'business',
        name: '会員情報匿名化',                        // 名称
        description: '事業者会員の情報を匿名化する',   // 概要
        endpoint: {
            method: 'PUT',
            path: '/api/business/member/anonymize'
        },
        request: {
            googleId: 'string'
        },
        rules: [
            '管理権限を持つ事業者本人のみ実行可能とする',
            '入力されたGoogle IDに紐づく会員情報を匿名化する',
            '識別可能な個人情報は復元不能な値に置き換える',
            '匿名化後も参照整合性は保持する',
            '物理削除は行わない'
        ]
    },

    {
        id: 'M3-4-1',                                  // モジュールID
        role: 'business',
        name: '事業者名入力',                          // 名称
        description: '変更する事業者名を入力する',     // 概要
        response: {
            newBusinessName: 'string'
        },
        rules: [
            '入力可能な文字数は1文字以上50文字以下とする',
            '使用禁止文字（制御文字，絵文字など）はエラーとする'
        ]
    },

    {
        id: 'M3-4-2',                                   // モジュールID
        role: 'business',
        name: '事業者名更新',                           // 名称
        description: '変更した事業者名を格納する',      // 概要
        endpoint: {
            method: 'PUT',
            path: '/api/business/member/name'
        },
        request: {
            newBusinessName: 'string'
        },
        rules: [
            '事業者名の更新は永続ストレージに反映する',
            '空文字や不正な形式の事業者名はエラーとする',
            'ログイン済みかつ本人のみ更新可能とする',
            '事業者名は1文字以上50文字以下とする',
            '不正な形式の事業者名はエラーとする'
        ],
    },

    {
        id: 'M3-4-3',                                   // モジュールID
        role: 'business',
        name: '事業者名反映',                           // 名称
        description: '変更した事業者名を画面に反映する', // 概要
        request: {
            newBusinessName: 'string'
        },
        rules: [
            '表示結果はUIの状態としてのみ扱う'
        ],
    },

    {
        id: 'M3-5-1',                                   // モジュールID
        role: 'business',
        name: '事業者アイコン入力',                     // 名称
        description: '変更する事業者アイコンを入力する', // 概要
        response: {
            newBusinessIcon: 'string'
        },
        rules: [
            '本モジュールではアイコン画像の保存や更新処理は行わない'
        ],
    },

    {
        id: 'M3-5-2',                                   // モジュールID
        role: 'business',
        name: '事業者アイコン更新',                     // 名称
        description: '変更した事業者アイコンを格納する', // 概要
        endpoint: {
            method: 'PUT',
            path: '/api/business/member/icon'
        },
        request: {
            newBusinessIcon: 'string'
        },
        rules: [
            '画像データは永続ストレージに保存する',
            '画像形式は PNG または JPEG のみ許可する',
            '画像サイズは5MB以下とする',
            'ログイン済みかつ本人のみ更新可能とする',
            '対応していない画像形式の場合はエラーを返す',
        ],
    },

    {
        id: 'M3-5-3',                                   // モジュールID
        role: 'business',
        name: '事業者アイコン反映',                     // 名称
        description: '変更した事業者アイコンを画面に反映する', // 概要
        request: {
            newBusinessIcon: 'string'
        },
    },

    {
        id: 'M3-6',                                    // モジュールID
        role: 'business',
        name: 'Stripe遷移',                            // 名称
        description: 'Stripeへのリダイレクト用URLを生成する', // 概要
        endpoint: {
            method: 'POST',
            path: '/api/business/stripe/redirect'
        },
        request: {
            googleId: 'string'
        },
        response: {
            redirectUrl: 'string'
        },
        rules: [
            'Stripeと連携してリダイレクト用URLを生成する',
            'Stripe連携に失敗した場合はエラーを返す',
            'ログイン済みかつ有効な事業者会員のみ実行可能とする',
            'Stripe顧客情報が未作成の場合は事前に作成する',
            '外部連携失敗時はURLを返却しない'
        ],
    },

    {
        id: 'M3-7-1',                                  // モジュールID
        role: 'business',
        name: '総投稿数取得',                          // 名称
        description: '事業者会員の総投稿数を取得する', // 概要
        endpoint: {
            method: 'GET',
            path: '/api/business/post/total'
        },
        request: {
            googleId: 'string'
        },
        response: {
            totalPostNumber: 'number'
        },
        rules: [
            '非公開または削除済みの投稿は集計対象外とする',
            '該当する事業者会員が存在しない場合はエラーを返す',
        ],
    },

    {
        id: 'M3-7-2',                                      // モジュールID
        role: 'business',   
        name: '総リアクション数取得',                      // 名称
        description: '事業者会員の総リアクション数を取得する', // 概要
        endpoint: {
            method: 'GET',
            path: '/api/business/reaction/total'
        },
        request: {
            googleId: 'string'
        },
        response: {
            totalReactionNumber: 'number'
        },
        rules: [
            '削除済みまたは無効化されたリアクションは集計対象外とする',
            '対象となる事業者会員が存在しない場合はエラーを返す',
        ],
    },

    {
        id: 'M3-7-3',                                  // モジュールID
        role: 'business',
        name: '総閲覧数取得',                          // 名称
        description: '事業者会員の総閲覧数を取得する', // 概要
        endpoint: {
            method: 'GET',
            path: '/api/business/view/total'
        },
        request: {
            googleId: 'string'
        },
        response: {
            totalViewNumber: 'number'
        },
        rules: [
            '削除済み投稿の閲覧履歴は集計対象外とする',
            '対象となる事業者会員が存在しない場合はエラーを返す',
        ],
    },

    {
        id: 'M3-7-4',                                          // モジュールID
        role: 'business',       
        name: 'エンゲージメント率取得',                        // 名称
        description: '事業者会員のエンゲージメント率を計算して取得する', // 概要
        endpoint: {
            method: 'GET',
            path: '/api/business/engagement'
        },
        request: {
            googleId: 'string'
        },
        response: {
            engagementRate: 'number'
        },
        rules: [
            'エンゲージメント率は「総リアクション数 ÷ 総閲覧数」に基づいて計算する',
            '総閲覧数が0の場合はエンゲージメント率を0として返却する',
            '対象となる事業者会員が存在しない場合はエラーを返す',
        ],
    },

    {
        id: 'M3-7-5',                                      // モジュールID
        role: 'business',   
        name: 'ダッシュボード表示',                        // 名称
        description: '事業者向けダッシュボード画面を表示する', // 概要
        request: {
            totalPostNumber: 'number',
            totalReactionNumber: 'number',
            totalViewNumber: 'number',
            engagementRate: 'number'
        },
    },

    {
        id: 'M3-7-6',                                          // モジュールID
        role: 'business',       
        name: '週間推移グラフ表示',                              // 名称
        description: 'リアクション数と閲覧数の週間推移をグラフで表示する', // 概要
        request: {
            weeklyReactionNumbers: 'number[]',
            weeklyViewNumbers: 'number[]'
        },
    },

    {
        id: 'M3-7-7',                                              // モジュールID
        role: 'business',
        name: '上位投稿表示',                                      // 名称
        description: 'リアクション数が多い上位5件の投稿を表示する', // 概要
        request: {
            topReactionPosts: [
                {
                    postId: 'string',
                    reactionNumber: 'number'
                }
            ]
        },
    }

];
