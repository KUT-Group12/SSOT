'use client';

import { use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FlowViewer from '@/components/flow/FlowViewer';
import { getModulesByRole } from '@/data/modules';
import { ModuleData } from '@/types';

const roleLabels: Record<string, string> = {
    user: '一般会員',
    business: '事業者会員',
    admin: '管理者',
};

export default function FlowPage({ params }: { params: Promise<{ role: string }> }) {
    const { role } = use(params);
    const router = useRouter();
    const modules = getModulesByRole(role);

    const handleNodeClick = (module: ModuleData) => {
        router.push(`/flow/${role}/${module.id}`);
    };

    return (
        <div className="h-screen flex flex-col bg-gray-900">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 px-4 py-3 flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        戻る
                    </Button>
                </Link>
                <h1 className="text-xl font-semibold text-white">
                    {roleLabels[role] || role} - Module Flow
                </h1>
                <p className="text-gray-400 text-sm ml-4">
                    ノードをクリックすると詳細ページに遷移します
                </p>
            </header>

            {/* Flow Viewer */}
            <div className="flex-1">
                <FlowViewer modules={modules} onNodeClick={handleNodeClick} />
            </div>
        </div>
    );
}
