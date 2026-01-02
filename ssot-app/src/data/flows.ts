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
  LoginScreen -> AdminInputInformation
  AdminInputInformation -> AdminGetTotalUserNumber
  AdminInputInformation -> AdminGetActiveUserNumber
  AdminInputInformation -> AdminGetTotalPostNumber
  AdminInputInformation -> AdminGetTotalReactionNumber
  AdminInputInformation -> AdminGetBusinessAccountNumber
  AdminInputInformation -> AdminGetNotReportNumber

  # ダッシュボードへの遷移
  AdminDashboardGraphScreen -> AdminIntegration
  ProcessReportScreen -> AdminIntegration
  AdminUpdateUserListUI -> AdminIntegration
  ProcessBusinessRequestScreen -> AdminIntegration
  ProcessContactScreen -> AdminIntegration



  # ダッシュボードまでのロジック
  AdminGetTotalUserNumber -> AdminIntegration
  AdminGetActiveUserNumber -> AdminIntegration
  AdminGetTotalPostNumber -> AdminIntegration
  AdminGetTotalReactionNumber -> AdminIntegration
  AdminGetBusinessAccountNumber -> AdminIntegration
  AdminGetNotReportNumber -> AdminIntegration
  AdminIntegration -> AdminDashboardScreen

  # ダッシュボードからの遷移
  AdminDashboardScreen -> AdminGetReportDetails
  AdminDashboardScreen -> AdminGetBusinessApplications
  AdminDashboardScreen -> AdminGetContactMessages
  AdminDashboardScreen -> AdminGetUserDetails

  # 通報画面の表示
  AdminGetReportDetails -> AdminDisplayReportManagement
  AdminDisplayReportManagement -> ProcessReportScreen

  # 事業者申請画面の表示
  AdminGetBusinessApplications -> AdminDisplayBusinessApplicationList
  AdminDisplayBusinessApplicationList -> AdminDeleteApplicationData
  AdminDeleteApplicationData -> ProcessBusinessRequestScreen

  # ユーザー管理画面の表示
  AdminGetUserDetails -> AdminDisplayUserManagement
  AdminDisplayUserManagement -> AdminSelectUserDeletion
  AdminSelectUserDeletion -> AdminDeleteAccount
  AdminDeleteAccount -> SendUserMessage
  SendUserMessage -> AdminUpdateUserListUI
  AdminUpdateUserListUI -> AdminUpdateUserListUI


  # お問い合わせ画面の表示
  AdminGetContactMessages -> AdminDisplayContactManagement
  AdminDisplayContactManagement -> ProcessContact
  ProcessContact -> ProcessContactScreen

  #ログアウトまでの遷移
  AdminDashboardGraphScreen -> AdminSelectLogout
  ProcessReportScreen -> AdminSelectLogout
  AdminUpdateUserListUI -> AdminSelectLogout
  ProcessBusinessRequestScreen -> AdminSelectLogout
  ProcessContactScreen -> AdminSelectLogout


  #ログアウト処理
  AdminSelectLogout -> AdminLogout
  AdminLogout -> LoginScreen
`;

// 全フロー定義をエクスポート
export const flowDefinitions = {
    user: userFlow,
    business: businessFlow,
    admin: adminFlow,
};
