/**
 * 共通モジュール定義
 * 
 * 複数ロールで共有される共通機能のモジュール
 * 担当者: [担当者名]
 */

import { ModuleBaseData } from './types';

export const commonModules: ModuleBaseData[] = [
    // 共通モジュールをここに追加
    // 例: 
    // {
    //   id: 'common_health_check',
    //   role: 'user', // 必要に応じて適切なロールを設定
    //   name: 'ヘルスチェック',
    //   description: 'サーバーの稼働状態確認',
    //   endpoint: { method: 'GET', path: '/api/health' },
    //   response: {
    //     status: 'string',
    //     timestamp: 'string',
    //   },
    // },
];
