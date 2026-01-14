/**
 * モジュール定義の統合エントリポイント
 * 
 * 各ロールのモジュールは以下で定義:
 * - user.ts     : 一般会員モジュール
 * - business.ts : 事業者会員モジュール
 * - admin.ts    : 管理者モジュール
 */

export { userModules } from './user';
export { businessModules } from './business';
export { adminModules } from './admin';
export type { ModuleBaseData } from './types';
