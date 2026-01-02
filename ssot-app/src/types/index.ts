export type Role = 'user' | 'business' | 'admin';

export interface ModuleData {
  id: string;             // Unique ID (e.g., 'user_login')
  role: Role;             // Category
  name: string;           // Display Name (e.g., 'ログイン')
  description: string;
  endpoint?: {
    method: string;
    path: string;
  };
  endpoints?: Array<{
    name: string;
    method: string;
    path: string;
    response?: Record<string, unknown>;
  }>;

  request?: Record<string, unknown>;
  response?: Record<string, unknown>;

  // API参照（バックエンドモジュール用）
  relatedApi?: string;           // 参照するAPIモジュールのID
  relatedEndpoint?: string;      // 特定エンドポイントのpath（endpoints配列内）

  // React Flow logic
  nextModuleIds: string[]; // IDs of modules this module connects TO

  // Documentation details
  schema?: {
    request: string;      // JSON string or link to schema
    response: string;     // JSON string or link to schema
  };
  rules?: string[];       // Specific coding rules
}
