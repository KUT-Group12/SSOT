/**
 * モジュール定義の型
 */

import { Role } from '@/types';

// モジュール基本データ型（スキーマをオブジェクト形式で定義）
export interface ModuleBaseData {
    id: string;
    role: Role;
    name: string;
    description: string;
    endpoint?: {
        method: 'GET' | 'POST' | 'PUT' | 'DELETE';
        path: string;
    };
    request?: Record<string, unknown>;
    response?: Record<string, unknown>;
    rules?: string[];
}
