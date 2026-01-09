/**
 * モジュール統合・エクスポート
 * 
 * モジュール定義の編集は各ロールファイルで行ってください:
 * - definitions/user.ts     : 一般会員
 * - definitions/business.ts : 事業者会員
 * - definitions/admin.ts    : 管理者
 * 
 * フロー関係の編集:
 * - flows.ts
 */

import { ModuleData } from '@/types';
import { parseFlow, mergeFlows, FlowMap } from '@/lib/flowParser';
import { userFlow, businessFlow, adminFlow } from './flows';
import {
  userModules,
  businessModules,
  adminModules,
  ModuleBaseData
} from './definitions/index';

// --------------------------------------------------------------------------
// フロー定義をパース
// ---------------------------------------------------------------------------
const parsedFlows: FlowMap = mergeFlows(
  parseFlow(userFlow),
  parseFlow(businessFlow),
  parseFlow(adminFlow)
);

// ---------------------------------------------------------------------------
// スキーマ変換: オブジェクト → JSON文字列
// ---------------------------------------------------------------------------
function formatSchema(obj: Record<string, unknown> | undefined): string {
  if (!obj) return '';
  return JSON.stringify(obj, null, 2);
}

function convertToModuleData(base: ModuleBaseData): ModuleData {
  return {
    id: base.id,
    role: base.role,
    name: base.name,
    description: base.description,
    endpoint: base.endpoint,
    endpoints: base.endpoints?.map(ep => ({
      ...ep,
      response: ep.response,
    })),
    relatedApi: base.relatedApi,
    relatedEndpoint: base.relatedEndpoint,
    schema: {
      request: formatSchema(base.request),
      response: formatSchema(base.response),
    },
    rules: base.rules,
    nextModuleIds: parsedFlows[base.id] || [],
  };
}

// ---------------------------------------------------------------------------
// 全モジュールを統合
// ---------------------------------------------------------------------------
const allModuleBaseData: ModuleBaseData[] = [
  ...userModules,
  ...businessModules,
  ...adminModules,
];

export const modules: ModuleData[] = allModuleBaseData.map(convertToModuleData);

// ---------------------------------------------------------------------------
// ヘルパー関数
// ---------------------------------------------------------------------------
export const getModulesByRole = (role: string): ModuleData[] => {
  return modules.filter(m => m.role === role);
};

export const getModuleById = (id: string): ModuleData | undefined => {
  return modules.find(m => m.id === id);
};

export const getPrevModules = (id: string): ModuleData[] => {
  return modules.filter(m => m.nextModuleIds.includes(id));
};
