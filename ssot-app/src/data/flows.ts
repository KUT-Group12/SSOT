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
  # ログイン・認証フロー
  M1-1 -> M2-1
  
  # 地図表示画面フロー
  M2-1 -> M1-6-1
  M1-6-1 -> M1-6-2
  M1-6-2 -> M1-6-3

  # ピン詳細
  M1-6-3 -> M1-7-1
  M1-7-1 -> M1-7-2
  M1-7-2 -> M1-7-3

  # 新規投稿フロー
  M1-7-3 -> M1-8-1
  M1-6-3 -> M1-8-1
  M1-8-1 -> M1-8-2
  M1-8-2 -> M1-8-3
  M1-8-3 -> M1-8-4

  # 検索フロー
  M1-6-3 -> M2-3-1
  M2-3-1 -> M2-3-2
  M2-3-2 -> M2-3-3

  M1-6-3 -> M2-4-1
  M2-4-1 -> M2-4-2
  M2-4-2 -> M2-4-3

  M1-6-3 -> M2-5-1
  M2-5-1 -> M2-5-2
  M2-5-2 -> M2-5-3

  # 問い合わせ
  M2-2-3 -> M1-5-1
  M1-3-2 -> M1-5-1
  M1-6-3 -> M1-5-1
  M1-5-1 -> M1-5-2
  M1-5-2 -> M1-5-3

  # ログアウト
  M2-2-3 -> M1-3-1
  M1-6-3 -> M1-3-1
  M1-3-1 -> M1-2
  M1-2 -> M1-3-2
  M1-3-2 -> M1-3-3
  M1-3-3 -> M1-1

  # マイページ
  M1-6-3 -> M2-2-1
  M2-2-1 -> M2-2-2
  M2-2-2 -> M2-2-3

  # 投稿内容削除フロー
  M1-14-3 -> M1-13-1
  M1-7-3 -> M1-13-1
  M1-13-1 -> M1-13-2

  # 投稿履歴フロー
  M2-2-3 -> M1-14-1
  M1-14-1 -> M1-14-2
  M1-14-2 -> M1-14-3

  # リアクション履歴フロー
  M2-2-3 -> M2-8-1
  M2-8-1 -> M2-8-2

  # 設定フロー
  M2-2-3 -> M1-15-1
  M1-15-1 -> M1-11-1
  M1-11-1 -> M1-11-2
  M1-11-2 -> M1-15-2

  # 事業者登録申請フロー
  M2-2-3 -> M2-7-1
  M2-7-1 -> M2-7-2

  # ブロック解除フロー
  M1-15-2 -> M1-10-1
  M1-10-1 -> M1-10-2

  # 退会フロー
  M1-15-2 -> M1-4-1
  M1-4-1 -> M1-4-2
  M1-4-2 -> M1-4-3
  M1-4-3 -> M1-1

  # ブロックフロー
  M1-7-3 -> M1-9-1
  M1-9-1 -> M1-9-2

  # 通報フロー
  M1-7-3 -> M1-12-1
  M1-12-1 -> M1-12-2

  # リアクションフロー
  M1-7-3 -> M2-6-1
  M2-6-1 -> M2-6-2
`;

// 事業者会員フロー
export const businessFlow = `
  # マイページ画面
  M3-2-1 -> M3-2-2
  M3-2-2 -> M3-2-3

  # 事業者名変更
  M3-4-1 -> M3-4-2
  M3-4-2 -> M3-4-3

  # 事業者アイコン変更
  M3-5-1 -> M3-5-2
  M3-5-2 -> M3-5-3

  # ダッシュボード画面
  M3-7-1 -> M3-7-2
  M3-7-2 -> M3-7-3
  M3-7-3 -> M3-7-4
  M3-7-4 -> M3-7-5
  M3-7-5 -> M3-7-6
  M3-7-6 -> M3-7-7

  # ログアウト
  M1-3-1 -> M1-2
  M1-2 -> M1-3-2
  M1-3-2 -> M1-3-3

  # 退会
  M1-4-1 -> M1-2
  M1-2 -> M1-4-2
  M1-4-2 -> M1-4-3
  M1-4-3 -> M3-3

  # お問い合わせ
  M1-5-1 -> M1-5-2
  M1-5-2 -> M1-5-3

  # 地図表示画面
  M1-6-1 -> M1-6-2
  M1-6-2 -> M1-6-3

  # 投稿閲覧
  M1-7-1 -> M1-7-2
  M1-7-2 -> M1-7-3

  # 新規投稿
  M1-8-1 -> M1-8-2
  M1-8-2 -> M1-8-3
  M1-8-3 -> M1-8-4

  # ブロック
  M1-9-1 -> M1-9-2

  # ブロック解除
  M1-10-1 -> M1-10-2

  # ブロックリスト取得
  M1-11-1 -> M1-11-2

  # 通報
  M1-12-1 -> M1-12-2

  # 投稿削除
  M1-13-1 -> M1-13-2

  # 投稿履歴
  M1-14-1 -> M1-14-2
  M1-14-2 -> M1-14-3

  # 設定
  M1-15-1 -> M1-15-2

  # ログイン -> Google認証
  M1-1 -> M3-1

  # Google認証 -> 地図表示画面
  M3-1 -> M1-6-1

  # -> 地図表示画面
  M3-2-3 -> M1-6-1
  M3-7-7 -> M1-6-1
  M1-5-3 -> M1-6-1
  M3-2-3 -> M1-6-1
  M1-8-4 -> M1-6-1
  M1-9-2 -> M1-6-1
  M1-12-2 -> M1-6-1

  # 地図表示画面 ->
  M1-6-3 -> M1-3-1
  M1-6-3 -> M1-5-1
  M1-6-3 -> M3-2-1
  M1-6-3 -> M1-8-1
  M1-6-3 -> M1-7-1
  M1-6-3 -> M3-7-1
  M1-6-3 -> M3-6

  # ログアウト -> ログイン
  M1-3-3 -> M1-1

  # マイページ ->
  M3-2-3 -> M1-4-1
  M3-2-3 -> M1-10-1
  M3-2-3 -> M1-11-1
  M3-2-3 -> M1-13-1
  M3-2-3 -> M1-14-1
  M3-2-3 -> M1-15-1
  M3-2-3 -> M3-4-1
  M3-2-3 -> M3-5-1
  
  # 退会 -> ログイン
  M3-3 -> M1-1

  # 投稿閲覧 ->
  M1-7-3 -> M1-9-1
  M1-7-3 -> M1-12-1
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
