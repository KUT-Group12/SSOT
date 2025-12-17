/**
 * DOT風記法のフローパーサー
 * 
 * 入力例:
 * ```
 * user_login -> user_dashboard
 * user_dashboard -> user_profile
 * user_dashboard -> user_orders
 * ```
 * 
 * 出力例:
 * { 
 *   user_login: ['user_dashboard'], 
 *   user_dashboard: ['user_profile', 'user_orders'] 
 * }
 */

export type FlowMap = Record<string, string[]>;

/**
 * DOT風フロー定義をパースして、ソースモジュールIDから
 * ターゲットモジュールIDの配列へのマップを返す
 */
export function parseFlow(flowDefinition: string): FlowMap {
    const result: FlowMap = {};

    // 行ごとに分割
    const lines = flowDefinition
        .split('\n')
        .map(line => line.trim())
        .filter(line => line.length > 0 && !line.startsWith('#') && !line.startsWith('//'));

    for (const line of lines) {
        // "source -> target" 形式をパース
        const match = line.match(/^(\S+)\s*->\s*(\S+)$/);
        if (match) {
            const [, source, target] = match;
            if (!result[source]) {
                result[source] = [];
            }
            if (!result[source].includes(target)) {
                result[source].push(target);
            }
        }
    }

    return result;
}

/**
 * 複数のフロー定義をマージする
 */
export function mergeFlows(...flows: FlowMap[]): FlowMap {
    const result: FlowMap = {};

    for (const flow of flows) {
        for (const [source, targets] of Object.entries(flow)) {
            if (!result[source]) {
                result[source] = [];
            }
            for (const target of targets) {
                if (!result[source].includes(target)) {
                    result[source].push(target);
                }
            }
        }
    }

    return result;
}

/**
 * フローマップから特定のモジュールIDのnextModuleIdsを取得
 */
export function getNextModuleIds(flowMap: FlowMap, moduleId: string): string[] {
    return flowMap[moduleId] || [];
}
