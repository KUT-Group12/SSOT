/**
 * フロー定義 (DOT風記法)
 * 
 * 記法:
 *   source_module -> target_module
 * 
 * コメント:
 *   # または // で始まる行はコメントとして無視されます
 */

// 一般会員フロー
export const userFlow = `
  # ログイン認証フロー
  user_login -> user_dashboard
  
  # ダッシュボードからの遷移
  user_dashboard -> user_profile
  user_dashboard -> user_orders
`;

// 事業者会員フロー
export const businessFlow = `
  # ログイン認証フロー
  business_login -> business_dashboard
  
  # ダッシュボードからの遷移
  business_dashboard -> business_products
  business_dashboard -> business_orders
`;

// 管理者フロー
export const adminFlow = `
  # ログイン認証フロー
  admin_login -> admin_dashboard
  
  # ダッシュボードからの遷移
  admin_dashboard -> admin_users
  admin_dashboard -> admin_businesses
`;

// 全フロー定義をエクスポート
export const flowDefinitions = {
    user: userFlow,
    business: businessFlow,
    admin: adminFlow,
};
