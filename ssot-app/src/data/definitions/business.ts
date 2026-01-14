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
    //         gmail: 'string',
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
            gmail: 'string',
            registeredAt: 'string',
            iconImageUrl: 'string'
        },
        rules: [
            '存在しないGoogle IDが指定された場合はエラーを返す',
            'エラー時は HTTP ステータスコードと errorCode，message を返却する',
            'レスポンス形式は { errorCode: string, message: string }'
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
            '識別可能な個人情報は復元不能な値に置き換える',
            '主キーおよび外部キーは変更しない',
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
            '外部連携失敗時はURLを返却しない',
            'エラー時は HTTP ステータスコードと errorCode，message を返却する',
            'レスポンス形式は { errorCode: string, message: string }'
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
            '小数点第3位で四捨五入する'
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
        rules: [
            'reactionNumber の降順で上位5件を抽出する',
        ],
    },

    {
        id: 'M1-1',
        role: 'business',
        name: 'ログイン',
        description: '事業者のログイン画面の表示',
        endpoint: {
            method: 'POST',
            path: 'api/auth/business/login',
        },
        request: {
            gmail: 'string',
            mfaCode: 'string',
        },
        response: {
            token: 'string',
            business: {
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
        id: 'M1-2',                                        // モジュールID
        role: 'business',
        name: '会員情報取得',                              // 名称
        description: '会員情報を取得する',                 // 概要
        endpoint: {
            method: 'GET',
            path: '/api/business/member'
        },
        request: {
            googleId: 'string'
        },
        response: {
            gmail: 'string',
            role: 'string'
        },
        rules: [
            'Google ID に紐づく会員情報のみを取得する',
            '該当する会員情報が存在しない場合はエラーを返す',
            'roleは"user/business/admin"のどれかのみとする',
            'エラー時は HTTP ステータスコードと errorCode，message を返却する',
            'レスポンス形式は { errorCode: string, message: string }'
        ],
    },

    {
            id: 'M1-3-1',
            role: 'business',
            name: 'ログアウトの選択',
            description: 'Webページでログアウトボタンをクリックする',
            endpoint: {
                method: 'POST',
                path: '/auth/logout'
            },
            response: {
                'status' : 'logged_out',
            }
    },

    {
        id: 'M1-3-2',                                  // モジュールID
        role: 'business',
        name: 'ログアウト画面表示',                    // 名称
        description: 'ログアウト画面を表示する',       // 概要
        request: {
            gmail: 'string',
            role: 'string'
        },
        rules: [
            'roleは"user/business/admin"のどれかのみとする'
        ],
    },

    {
        id: 'M1-3-3',                                      // モジュールID
        role: 'business',
        name: 'ログアウト',                                // 名称
        description: 'ログイン中のセッションを無効化する', // 概要
        endpoint: {
            method: 'POST',
            path: '/api/auth/logout'
        },
        response: {
            expiredSessionId: 'string'
        },
    },

    {
        id: 'M1-4-1',                                      // モジュールID
        role: 'business',
        name: '退会選択',                                  // 名称
        description: '退会操作を選択する',                 // 概要
        response: {
            googleId: 'string'
        },
    },

    {
        id: 'M1-4-2',                                  // モジュールID
        role: 'business',
        name: '退会画面表示',                          // 名称
        description: '退会確認画面を表示する',         // 概要
        request: {
            gmail: 'string',
            role: 'string'
        },
        rules: [
            'roleは"user/business/admin"のどれかのみとする'
        ],
    },

    {
        id: 'M1-4-3',                                      // モジュールID
        role: 'business',
        name: '退会処理',                                  // 名称
        description: '会員の退会処理を実行する',           // 概要
        endpoint: {
            method: 'POST',
            path: '/api/member/withdrawal'
        },
        request: {
            googleId: 'string'
        },
        rules: [
            '退会後は同一の Google ID で新規登録が可能な状態とする'
        ],
    },

    {
        id: 'M1-5-1',                                  // モジュールID
        role: 'business',
        name: '問い合わせ画面表示',                    // 名称
        description: '問い合わせ画面を表示する',       // 概要
    },

    {
        id: 'M1-5-2',                                  // モジュールID
        role: 'business',
        name: '問い合わせ入力',                        // 名称
        description: '問い合わせ内容を入力して送信する', // 概要
        response: {
            subject: 'string',
            message: 'string'
        },
    },

    {
        id: 'M1-5-3',                                   // モジュールID
        role: 'business',
        name: '問い合わせ送信',                         // 名称
        description: '問い合わせ内容を保存する',        // 概要
        endpoint: {
            method: 'POST',
            path: '/api/contact'
        },
        request: {
            subject: 'string',
            message: 'string'
        },
    },

    {
        id: 'M1-6-1',                               // モジュールID
        role: 'business',
        name: '投稿一覧取得',                      // 名称
        description: '投稿内容の一覧を取得する',  // 概要
        endpoint: {
            method: 'GET',
            path: '/api/business/posts'
        },
        response: {
            postIds: 'string[]'
        }
    },

    {
        id: 'M1-6-2',                                       // モジュールID
        role: 'business',
        name: '投稿数判定',                                 // 名称
        description: '投稿数が50件以上かを判定する',        // 概要
        request: {
            postIds: 'string[]'
        },
        response: {
            isLargePin: 'boolean'
        },
        rules: [
            '投稿数が50件以上の場合は true を返す',
            '投稿数が50件未満の場合は false を返す'
        ],
    },

    {
        id: 'M1-6-3',                                       // モジュールID
        role: 'business',
        name: '地図表示画面',                               // 名称
        description: '地図表示画面を表示する',              // 概要
        request: {
            isLargePin: 'boolean'
        },
        rules: [
            'isLargePin が true の場合は大きいピンを表示する',
            'isLargePin が false の場合は小さいピンを表示する'
        ],
    },

    {
        id: 'M1-7-1',                                  // モジュールID
        role: 'business',
        name: 'ピン選択',                              // 名称
        description: '地図上のピンを選択する',         // 概要
        response: {
            postId: 'string'
        },
    },

    {
        id: 'M1-7-2',                                   // モジュールID
        role: 'business',
        name: '投稿詳細取得',                           // 名称
        description: '指定された投稿の詳細情報を取得する', // 概要
        endpoint: {
            method: 'GET',
            path: '/api/posts/{postId}'
        },
        request: {
            postId: 'string'
        },
        response: {
            postId: 'string',
            locationId: 'string',
            genreId: 'string',
            title: 'string',
            viewCount: 'number',
            reactionCount: 'number',
            authorId: 'string',
            postedAt: 'string',
            description: 'string',
            images: 'string[]'
        },
        rules: [
            'postedAt は日本標準時（JST, UTC+9）の日時とする',
            'フォーマットは ISO 8601 形式（YYYY-MM-DDTHH:mm）とする',
        ],
    },

    {
        id: 'M1-7-3',                                   // モジュールID
        role: 'business',
        name: '投稿閲覧画面表示',                       // 名称
        description: '投稿内容の閲覧画面を表示する',     // 概要
        request: {
            postId: 'string',
            locationId: 'string',
            genreId: 'string',
            title: 'string',
            viewCount: 'number',
            reactionCount: 'number',
            authorId: 'string',
            postedAt: 'string',
            description: 'string',
            images: 'string[]'
        },
        rules: [
            'postedAt は日本標準時（JST, UTC+9）の日時とする',
            'フォーマットは ISO 8601 形式（YYYY-MM-DDTHH:mm）とする',
        ],
    },

    {
        id: 'M1-8-1',                                   // モジュールID
        role: 'business',
        name: '位置情報取得',                           // 名称
        description: '現在の位置情報を取得する',         // 概要
        endpoint: {
            method: 'GET',
            path: '/api/location'
        },
        response: {
            latitude: 'number',
            longitude: 'number'
        },
        rules: [
            '緯度および経度は WGS84 座標系で返す'
        ],
    },

    {
        id: 'M1-8-2',                                   // モジュールID
        role: 'business',
        name: '新規投稿画面表示',                       // 名称
        description: '新規投稿用の入力画面を表示する',   // 概要
        request: {
            latitude: 'number',
            longitude: 'number'
        },
        response: {
            title: 'string',
            locationId: 'string',
            genreId: 'string',
            description: 'string',
            images: 'string[]',
            postedAt: 'string',
            authorId: 'string'
        },
        rules: [
            'postedAt は日本標準時（JST, UTC+9）の日時とする',
            'フォーマットは ISO 8601 形式（YYYY-MM-DDTHH:mm）とする',
        ],
    },

    {
        id: 'M1-8-3',                                   // モジュールID
        role: 'business',
        name: '投稿日時取得',                           // 名称
        description: '指定された投稿の投稿日時を取得する', // 概要
        endpoint: {
            method: 'GET',
            path: '/api/posts/{postId}/timestamp'
        },
        request: {
            postId: 'string'
        },
        response: {
            postedAt: 'string'
        },
        rules: [
            'postedAt は日本標準時（JST, UTC+9）の日時とする',
            'フォーマットは ISO 8601 形式（YYYY-MM-DDTHH:mm）とする',
        ],
    },

    {
        id: 'M1-8-4',                                   // モジュールID
        role: 'business',
        name: '投稿内容格納',                           // 名称
        description: '新規投稿の内容を保存する',        // 概要
        endpoint: {
            method: 'POST',
            path: '/api/posts'
        },
        request: {
            locationId: 'string',
            genreId: 'string',
            title: 'string',
            viewCount: 'number',
            reactionCount: 'number',
            authorId: 'string',
            postedAt: 'string',
            description: 'string',
            images: 'string[]'
        },
        rules: [
            'postedAt は日本標準時（JST, UTC+9）の日時とする',
            'フォーマットは ISO 8601 形式（YYYY-MM-DDTHH:mm）とする',
        ],
    },

    {
        id: 'M1-9-1',                                      // モジュールID
        role: 'business',
        name: 'ブロック選択',                              // 名称
        description: 'ブロック対象のユーザーを選択する',  // 概要
        response: {
            blockedGoogleId: 'string'
        },
    },

    {
        id: 'M1-9-2',                                     // モジュールID
        role: 'business',
        name: 'ブロック登録',                             // 名称
        description: 'ブロックしたユーザー情報を登録する', // 概要
        endpoint: {
            method: 'POST',
            path: '/api/block'
        },
        request: {
            blockedGoogleId: 'string'
        },
    },

    {
        id: 'M1-10-1',                                      // モジュールID
        role: 'business',
        name: 'ブロック解除選択',                          // 名称
        description: 'ブロック解除対象のユーザーを選択する', // 概要
        response: {
            blockedGoogleId: 'string'
        },
    },

    {
        id: 'M1-10-2',                                      // モジュールID
        role: 'business',
        name: 'ブロック解除',                              // 名称
        description: 'ブロック情報を削除する',              // 概要
        endpoint: {
            method: 'DELETE',
            path: '/api/block'
        },
        request: {
            blockedGoogleId: 'string'
        },
    },

    {
        id: 'M1-12-1',                                      // モジュールID
        role: 'business',
        name: '通報画面表示',                               // 名称
        description: '通報画面を表示する',                   // 概要
        response: {
            reportedGoogleId: 'string',
            targetPostId: 'string',
            reportReason: 'string',
            reportedAt: 'string'
        },
        rules: [
            'reportedAt は日本標準時（JST, UTC+9）の日時とする',
            'フォーマットは ISO 8601 形式（YYYY-MM-DDTHH:mm）とする',
        ],
    },

    {
        id: 'M1-12-2',                                      // モジュールID
        role: 'business',
        name: '通報登録',                                  // 名称
        description: '通報内容を格納する',                  // 概要
        endpoint: {
            method: 'POST',
            path: '/api/report'
        },
        request: {
            reportedGoogleId: 'string',
            targetPostId: 'string',
            reportReason: 'string',
            reportedAt: 'string'
        },
        rules: [
            'reportedAt は日本標準時（JST, UTC+9）の日時とする',
            'フォーマットは ISO 8601 形式（YYYY-MM-DDTHH:mm）とする',
        ],
    },

    {
        id: 'M1-13-1',                                      // モジュールID
        role: 'business',
        name: '投稿削除選択',                               // 名称
        description: '削除対象の投稿を選択する',             // 概要
        response: {
            postId: 'string'
        },
    },

    {
        id: 'M1-13-2',                                      // モジュールID
        role: 'business',
        name: '投稿匿名化',                                 // 名称
        description: '投稿内容を匿名化する',                 // 概要
        endpoint: {
            method: 'PUT',
            path: '/api/posts/anonymize'
        },
        request: {
            postId: 'string'
        },
        rules: [
            '投稿データは物理削除せず論理的に匿名化する'
        ],
    },

    {
        id: 'M1-14-1',                                      // モジュールID
        role: 'business',
        name: '投稿履歴選択',                               // 名称
        description: '自分の投稿履歴を表示するために選択する', // 概要
        response: {
            googleId: 'string'
        },
    },

    {
        id: 'M1-14-2',                                      // モジュールID
        role: 'business',
        name: '投稿履歴取得',                               // 名称
        description: '自分の投稿一覧を取得する',             // 概要
        endpoint: {
            method: 'GET',
            path: '/api/posts/history'
        },
        request: {
            googleId: 'string'
        },
        response: {
            postId: 'string',
            genreId: 'string',
            title: 'string',
            reactionCount: 'number',
            postedAt: 'string',
            description: 'string'
        },
        rules: [
            'postedAt は日本標準時（JST, UTC+9）の日時とする',
            'フォーマットは ISO 8601 形式（YYYY-MM-DDTHH:mm）とする',
        ],
    },

    {
        id: 'M1-14-3',                                      // モジュールID
        role: 'business',
        name: '投稿履歴表示',                               // 名称
        description: '自分の投稿履歴を表示する',             // 概要
        request: {
            postId: 'string',
            genreId: 'string',
            title: 'string',
            reactionCount: 'number',
            postedAt: 'string',
            description: 'string'
        },
        rules: [
            'postedAt は日本標準時（JST, UTC+9）の日時とする',
            'フォーマットは ISO 8601 形式（YYYY-MM-DDTHH:mm）とする',
        ],
    },

    {
        id: 'M1-15-1',                                      // モジュールID
        role: 'business',
        name: '設定選択',                                   // 名称
        description: 'ユーザー設定画面を表示するために選択する', // 概要
        response: {
            googleId: 'string'
        },
    },

    {
        id: 'M1-15-2',                                      // モジュールID
        role: 'business',
        name: '設定表示',                                   // 名称
        description: 'ユーザー設定画面を表示する',           // 概要
    },

];
