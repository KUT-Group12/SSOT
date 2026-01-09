/**
 * 一般会員 (User) モジュール定義
 * 
 * 担当者: [担当者名]
 */

import { ModuleBaseData } from './types';

export const userModules: ModuleBaseData[] = [
    {
        id: 'M1-1',
        role: 'user',
        name: 'ログイン画面表示',
        description: 'ログイン画面の表示する',
        request: {
            googleId: 'string',
            gmail: 'string',
        },
        response: {
            googleId: 'string',
        },
    },

    {
        id: 'M1-2',
        role: 'user',
        name: '会員情報取得',
        description: '会員情報を取得する',
        endpoint: {
            method: 'GET',
            path: '/api/member/info',
        },
        request: {
            googleId: 'string',
        },
        response: {
            gmail: 'string',
            role: 'string',
        },
    },

    {
        id: 'M1-3-1',
        role: 'user',
        name: 'ログアウト選択',
        description: 'ログアウト操作を選択する',
        response: {
            googleId: 'string',
        },
    },

    {
        id: 'M1-3-2',
        role: 'user',
        name: 'ログアウト画面',
        description: 'ログアウト画面を表示する',
        request: {
            gmail: 'string',
            role: 'string',
        },
    },

    {
        id: 'M1-3-3',
        role: 'user',
        name: 'ログアウトする',
        description: 'ログアウトする',
        endpoint: {
            method: 'PUT',
            path: '/api/auth/logout',
        },
        response: {
            sessionId: 'string',
        },
    },

    {
        id: 'M1-4-1',
        role: 'user',
        name: '退会選択',
        description: '退会を選択する',
        response: {
            googleId: 'string',
        },
    },

    {
        id: 'M1-4-2',
        role: 'user',
        name: '退会画面',
        description: '退会画面を表示',
        request: {
            gmail: 'string',
            role: 'string',
        },
    },

    {
        id: 'M1-4-3',
        role: 'user',
        name: '退会処理',
        description: '退会処理を実行する',
        endpoint: {
            method: 'PUT',
            path: '/api/auth/withdrawal',
        },
        request: {
            googleId: 'string',
        },
    },

    {
        id: 'M1-5-1',
        role: 'user',
        name: '問い合わせ画面を表示',
        description: '問い合わせ画面を表示する',
    },

    {
        id: 'M1-5-2',
        role: 'user',
        name: '問い合わせ入力',
        description: '問い合わせ内容を入力し送信する',
        response: {
            subject: 'string',
            text: 'string',
        },
        rules: [
            '件名と内容を入力しなければならない',
        ],
    },

    {
        id: 'M1-5-3',
        role: 'user',
        name: '問い合わせ内容格納',
        description: '問い合わせ内容格納する',
        endpoint: {
            method: 'POST',
            path: '/api/contact/validate',
        },
        request:{
            subject: 'string',
            text: 'string',
        },
    },

    {
        id: 'M1-6-1',
        role: 'user',
        name: '投稿一覧取得',
        description: '投稿内容一覧を取得する',
        endpoint: {
            method: 'GET',
            path: '/api/posts',
        },
        response: {
            postId: 'number',
        },
    },

    {
        id: 'M1-6-2',
        role: 'user',
        name: 'ピンサイズ判定',
        description: '投稿数が50以上か判定する',
        endpoint: {
            method: 'GET',
            path: '/api/posts/pin/scale',
        },
        request: {
            postId: 'number',
        },
        response: {
            pinSize: 'number',
        },
        rules: [
            '投稿数が50以上ならピンのサイズを1.3倍にする',
            '投稿数が50未満ならピンのサイズを通常サイズにする',
        ],
    },

    {
        id: 'M1-6-3',
        role: 'user',
        name: '地図表示画面の表示',
        description: '地図表示画面を表示する',
        request: {
            pinSize: 'number',
        },
    },

    {
        id: 'M1-7-1',
        role: 'user',
        name: 'ピンを選択',
        description: 'ピンを選択する',
        response: {
            postId: 'number',
        },
    },

    {
        id: 'M1-7-2',
        role: 'user',
        name: '投稿内容取得',
        description: '投稿内容を取得する',
        endpoint: {
            method: 'GET',
            path: '/api/posts/detail',
        },
        request: {
            postId: 'number',
        },
        response: {
            postId: 'number',
            placeId: 'number',
            genreId: 'number',
            title: 'string',
            numView: 'number',
            numReaction: 'number',
            userId: 'string',
            postData: 'number',
            text: 'string',
            postImage: 'string',
        },
    },

    {
        id: 'M1-7-3',
        role: 'user',
        name: '投稿閲覧画面を表示',
        description: '投稿内容閲覧画面を表示する',
        request: {
            postId: 'number',
            placeId: 'number',
            genreId: 'number',
            title: 'string',
            numView: 'number',
            numReaction: 'number',
            userId: 'string',
            postData: 'number',
            text: 'string',
            postImage: 'string',
        },
    },

    {
        id: 'M1-8-1',
        role: 'user',
        name: '位置情報を取得',
        description: '位置情報を取得する',
        endpoint: {
            method: 'GET',
            path: '/api/posts/location/select',
        },
        response: {
            latitude: 'number',
            longitude: 'number',
        },
    },

    {
        id: 'M1-8-2',
        role: 'user',
        name: '新規投稿画面を表示',
        description: '新規投稿画面を表示する',
        request: {
            latitude: 'number',
            longitude: 'number',
        },
        response: {
            title: 'string',
            placeId: 'number',
            genreId: 'number',
            text: 'string',
            postImage: 'string',
            userId: 'string',   
        },
        rules: [
            'タイトル，説明，緯度，経度が入力されていないといけない',
        ],
    },

    {
        id: 'M1-8-3',
        role: 'user',
        name: '投稿日時取得',
        description: '投稿日時を取得する',
        endpoint:{
            method: 'GET',
            path: '/api/posts/timestamp',
        },
        request: {
            postId: 'number',
        },
        response: {
            postData: 'number',
        },
    },

    {
        id: 'M1-8-4',
        role: 'user',
        name: '投稿内容を格納',
        description: '投稿内容を格納する',
        endpoint: {
            method: 'POST',
            path: '/api/posts',
        },
        request: {
            placeId: 'number',
            genreId: 'number',
            title: 'string',
            numView: 'number',
            numReaction: 'number',
            userId: 'string',
            postData: 'number',
            text: 'string',
            postImage: 'string',
        },
    },

    {
        id: 'M1-9-1',
        role: 'user',
        name: 'ブロック選択',
        description: 'ブロックを選択する',
        response: {
            blockerId: 'string',
        },
    },

    {
        id: 'M1-9-2',
        role: 'user',
        name: 'ブロック情報を格納',
        description: 'ブロック情報を格納する',
        endpoint: {
            method: 'POST',
            path: '/api/users/block',
        },
        request: {
            blockerId: 'string',
        },
    },

    {
        id: 'M1-10-1',
        role: 'user',
        name: 'ブロック解除を選択',
        description: 'ブロック解除を選択する',
        response: {
            blockerId: 'string',
        },
    },

    {
        id: 'M1-10-2',
        role: 'user',
        name: 'ブロック情報削除',
        description: 'ブロック情報を削除する',
        endpoint: {
            method: 'DELETE',
            path: '/api/users/block',
        },
        request: {
            blockerId: 'string',
        },
    },

    {
        id: 'M1-11-1',
        role: 'user',
        name: 'ブロックリスト取得',
        description: 'ブロックリストを取得する',
        endpoint: {
            method: 'GET',
            path: '/api/users/block/list',
        },
        request: {
            googleId: 'string',
        },
        response: {
            blockerId: 'string',
        },
    },

    {
        id: 'M1-11-2',
        role: 'user',
        name: 'ブロックリスト画面を表示',
        description: 'ブロックリスト画面を表示する',
        request: {
            blockerId: 'string',
        },
    },

    {
        id: 'M1-12-1',
        role: 'user',
        name: '通報画面を表示',
        description: '通報画面を表示する',
        endpoint: {
            method: 'POST',                     
            path: '/api/report/validate',
        },
        response: {
            userId: 'string',
            postId: 'number',
            reason: 'string',
            data: 'number',
        },
        rules: [
            '通報理由が空でない',
        ],
    },

    {
        id: 'M1-12-2',
        role: 'user',
        name: '通報内容を格納',
        description: '通報内容を格納する',
        endpoint: {
            method: 'POST',
            path: '/api/report',
        },
        request: {
            userId: 'string',
            postId: 'number',
            reason: 'string',
            data: 'number',
        },
    },

    {
        id: 'M1-13-1',
        role: 'user',
        name: '投稿削除選択',
        description: '自分の投稿の削除を選択する',
        response: {
            postId: 'number',
        },
    },

    {
        id: 'M1-13-2',
        role: 'user',
        name: '投稿内容を匿名化',
        description: '投稿内容を匿名化する',
        endpoint: {
            method: 'PUT',
            path: '/api/posts/anonymize',
        },
        request: {
            postId: 'number',
        },
    },

    {
        id: 'M1-14-1',
        role: 'user',
        name: '投稿履歴選択',
        description: '投稿履歴を選択する',
        response: {
            googleId: 'string',
        },
    },

    {
        id: 'M1-14-2',
        role: 'user',
        name: '自分の投稿一覧を取得',
        description: '自分の投稿一覧を取得する',
        endpoint: {
            method: 'GET',
            path: '/api/posts/history',
        },
        request: {
            googleId: 'string',
        },
        response: {
            postId: 'number',
            genreId: 'number',
            title: 'string',
            numReaction: 'number',
            postData: 'number',
            text: 'string',
        },
    },

    {
        id: 'M1-14-3',
        role: 'user',
        name: '投稿履歴表示',
        description: '投稿履歴を表示する',
        request: {
            postId: 'number',
            genreId: 'number',
            title: 'string',
            numReaction: 'number',
            postData: 'number',
            text: 'string',
        },
    },

    {
        id: 'M1-15-1',
        role: 'user',
        name: '設定選択',
        description: '設定を選択する',
        response: {
            googleId: 'string',
        },
    },

    {
        id: 'M1-15-2',
        role: 'user',
        name: '設定を表示',
        description: '設定を表示する',
    },

    {
        id: 'M2-1',
        role: 'user',
        name: 'ログイン',
        description: 'Google認証にアクセスして，DBに利用者情報を格納または，ログインする',
        endpoint: { 
            method: 'POST',
            path: '/api/users/register',
        },
        request: {
            googleId: 'string',
            gmail: 'string',
        },
        response:{
            sessionId: 'string',
        },
        rules: [
            'DBにユーザーが存在するとセッションIDを格納する',
            'DBにユーザーが存在してないと利用者情報とセッションIDを格納する',
        ],
    },

    {
        id: 'M2-2-1',
        role: 'user',
        name: 'マイページ画面選択',
        description: 'マイページ画面を選択する',
        response: {
            googleId: 'string',
        },
    },

    {
        id: 'M2-2-2',
        role: 'user',
        name: '一般会員情報を取得(マイページ画面用)',
        description: '一般会員情報を取得する(マイページ画面用)',
        endpoint: {
            method: 'GET',
            path: '/api/mypage/details',
        },
        request: {
            googleId: 'string',
        },
        response: {
            gmail: 'string',
            role: 'string',
            registrationDate: 'number',
        },
    },

    {
        id: 'M2-2-3',
        role: 'user',
        name: 'マイページ画面を表示',
        description: 'マイページ画面を表示する',
        request: {
            gmail: 'string',
            role: 'string',
            registrationDate: 'number',
        },
    },

    {
        id: 'M2-3-1',
        role: 'user',
        name: 'キーワード入力',
        description: 'キーワードを入力する',
        response: {
            keyword: 'string',
        },
    },

    {
        id: 'M2-3-2',
        role: 'user',
        name: 'キーワード検索',
        description: 'キーワード検索する',
        endpoint: {
            method: 'GET',
            path: '/api/posts/search',
        },
        request: {
            keyword: 'string',
        },
        response: {
            postId: 'number',
            placeId: 'number',
            genreId: 'number',
            title: 'string',
            numView: 'number',
            numReaction: 'number',
            userId: 'number',
            postData: 'number',
            text: 'string',
            postImage: 'string',
        },
    },

    {
        id: 'M2-3-3',
        role: 'user',
        name: 'キーワード検索結果を表示',
        description: 'キーワード検索結果を表示する',
        request: {
            postId: 'number',
            placeId: 'number',
            genreId: 'number',
            title: 'string',
            numView: 'number',
            numReaction: 'number',
            userId: 'number',
            postData: 'number',
            text: 'string',
            postImage: 'string',
        },
    },

    {
        id: 'M2-4-1',
        role: 'user',
        name: 'ジャンル選択',
        description: 'ジャンルを選択する',
        response: {
            genreId: 'number',
        },
    },

    {
        id: 'M2-4-2',
        role: 'user',
        name: 'ジャンル検索',
        description: 'ジャンル検索をする',
        endpoint: {
            method: 'GET',
            path: '/api/posts/search/genre',
        },
        request: {
            genreId: 'number',
        },
        response: {
            postId: 'number',
            placeId: 'number',
            genreId: 'number',
            title: 'string',
            numView: 'number',
            numReaction: 'number',
            userId: 'number',
            postData: 'number',
            text: 'string',
            postImage: 'string',
        },
    },

    {
        id: 'M2-4-3',
        role: 'user',
        name: 'ジャンル検索結果表示',
        description: 'ジャンル検索結果を表示する',
        request: {
            postId: 'number',
            placeId: 'number',
            genreId: 'number',
            title: 'string',
            numView: 'number',
            numReaction: 'number',
            userId: 'number',
            postData: 'number',
            text: 'string',
            postImage: 'string',
        },
    },

    {
        id: 'M2-5-1',
        role: 'user',
        name: '期間選択',
        description: '期間を選択する',
        response: {
            postData: 'number',
        },
    },

    {
        id: 'M2-5-2',
        role: 'user',
        name: '投稿の期間で絞り込む',
        description: '投稿の期間で絞り込みを行う',
        endpoint: {
            method: 'GET',
            path: '/api/posts/search/period',
        },
        request: {
            postData: 'number',
        },
        response: {
            postId: 'number',
            placeId: 'number',
            genreId: 'number',
            title: 'string',
            numView: 'number',
            numReaction: 'number',
            userId: 'number',
            postData: 'number',
            text: 'string',
            postImage: 'string',
        },
    },

    {
        id: 'M2-5-3',
        role: 'user',
        name: '期間検索結果表示',
        description: '期間検索結果を表示する',
        request: {
            postId: 'number',
            placeId: 'number',
            genreId: 'number',
            title: 'string',
            numView: 'number',
            numReaction: 'number',
            userId: 'number',
            postData: 'number',
            text: 'string',
            postImage: 'string',
        },
    },

    {
        id: 'M2-6-1',
        role: 'user',
        name: 'リアクションボタンを押す',
        description: 'リアクションボタンを押す',
        response: {
            postId: 'number',
        },
    },

    {
        id: 'M2-6-2',
        role: 'user',
        name: 'リアクション情報を格納する',
        description: 'リアクション情報を格納する',
        endpoint: {
            method: 'POST',
            path: '/api/posts/reaction',
        },
        request: {
            postId: 'number',
        },
        rules: [
            'リアクションをすで行っている場合リアクション数に-1をして格納する',
            'リアクションを行っていない場合リアクション数に+1をして格納する',
        ],
    },

    {
        id: 'M2-7-1',
        role: 'user',
        name: '事業者情報入力',
        description: '事業者情報を入力する',
        response: {
            businessName: 'string',
            address: 'string',
            phone: 'number',
        },
        rules: [
            '店舗名と電話番号と住所を入力していないといけない',
        ],
    },

    {
        id: 'M2-7-2',
        role: 'user',
        name: '事業者情報を格納',
        description: '事業者場を格納する',
        endpoint: {
            method: 'POST',
            path: '/api/business/application',
        },
        request: {
            businessName: 'string',
            address: 'string',
            phone: 'number',
        },
    },

    {
        id: 'M2-8-1',
        role: 'user',
        name: 'リアクション履歴取得',
        description: 'リアクション履歴を取得する',
        endpoint: {
            method: 'GET',
            path: '/api/posts/history/reactions',
        },
        request: {
            googleId: 'number',
        },
        response: {
            postId: 'number',
            title: 'string',
            numReaction: 'number',
            postData: 'number',
            text: 'string',
            genreId: 'number',
        },
    },

    {
        id: 'M2-8-2',
        role: 'user',
        name: 'リアクション履歴画面を表示',
        description: 'リアクション履歴画面を表示する',
        request: {
            postId: 'number',
            title: 'string',
            numReaction: 'number',
            postData: 'number',
            text: 'string',
            genreId: 'number',
        },
    },
];
