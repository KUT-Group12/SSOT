'use client';

import { useState, useCallback, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import FlowViewer from '@/components/flow/FlowViewer';
import { getModulesByRole, getModuleById, getPrevModules } from '@/data/modules';
import { ModuleData } from '@/types';

const roleLabels: Record<string, string> = {
    user: '一般会員',
    business: '事業者会員',
    admin: '管理者',
};

export default function FlowPage({ params }: { params: Promise<{ role: string }> }) {
    const { role } = use(params);
    const [selectedModule, setSelectedModule] = useState<ModuleData | null>(null);
    const [sheetOpen, setSheetOpen] = useState(false);

    const modules = getModulesByRole(role);

    const handleNodeClick = useCallback((module: ModuleData) => {
        setSelectedModule(module);
        setSheetOpen(true);
    }, []);

    const handleModuleLink = useCallback((moduleId: string) => {
        const module = getModuleById(moduleId);
        if (module) {
            setSelectedModule(module);
        }
    }, []);

    const prevModules = selectedModule ? getPrevModules(selectedModule.id) : [];

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
            </header>

            {/* Flow Viewer */}
            <div className="flex-1">
                <FlowViewer modules={modules} onNodeClick={handleNodeClick} />
            </div>

            {/* Detail Sheet */}
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto bg-gray-800 border-gray-700 text-white">
                    {selectedModule && (
                        <>
                            <SheetHeader>
                                <SheetTitle className="text-white text-xl">
                                    {selectedModule.name}
                                </SheetTitle>
                                <SheetDescription className="text-gray-400">
                                    {selectedModule.description}
                                </SheetDescription>
                            </SheetHeader>

                            <div className="mt-6 space-y-6">
                                {/* Endpoint */}
                                {selectedModule.endpoint && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 mb-2">Endpoint</h3>
                                        <div className="bg-gray-900 rounded-md p-3 font-mono text-sm">
                                            <span className={`font-bold ${selectedModule.endpoint.method === 'GET' ? 'text-green-400' :
                                                    selectedModule.endpoint.method === 'POST' ? 'text-blue-400' :
                                                        selectedModule.endpoint.method === 'PUT' ? 'text-yellow-400' :
                                                            'text-red-400'
                                                }`}>
                                                {selectedModule.endpoint.method}
                                            </span>
                                            {' '}
                                            <span className="text-gray-300">{selectedModule.endpoint.path}</span>
                                        </div>
                                    </div>
                                )}

                                {/* Schema */}
                                {selectedModule.schema && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 mb-2">Schema</h3>
                                        <div className="space-y-3">
                                            {selectedModule.schema.request && (
                                                <div>
                                                    <p className="text-xs text-gray-500 mb-1">Request</p>
                                                    <pre className="bg-gray-900 rounded-md p-3 text-xs text-gray-300 overflow-x-auto">
                                                        {selectedModule.schema.request}
                                                    </pre>
                                                </div>
                                            )}
                                            <div>
                                                <p className="text-xs text-gray-500 mb-1">Response</p>
                                                <pre className="bg-gray-900 rounded-md p-3 text-xs text-gray-300 overflow-x-auto">
                                                    {selectedModule.schema.response}
                                                </pre>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Rules */}
                                {selectedModule.rules && selectedModule.rules.length > 0 && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 mb-2">Rules</h3>
                                        <ul className="list-disc list-inside text-sm text-gray-300 space-y-1">
                                            {selectedModule.rules.map((rule, index) => (
                                                <li key={index}>{rule}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Relations */}
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-400 mb-2">Relations</h3>
                                    <div className="space-y-3">
                                        {/* Prev Modules */}
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Prev Modules</p>
                                            <div className="flex flex-wrap gap-2">
                                                {prevModules.length > 0 ? (
                                                    prevModules.map((m) => (
                                                        <Button
                                                            key={m.id}
                                                            variant="outline"
                                                            size="sm"
                                                            className="text-xs border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
                                                            onClick={() => handleModuleLink(m.id)}
                                                        >
                                                            <ExternalLink className="w-3 h-3 mr-1" />
                                                            {m.name}
                                                        </Button>
                                                    ))
                                                ) : (
                                                    <span className="text-gray-500 text-sm">-</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Next Modules */}
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1">Next Modules</p>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedModule.nextModuleIds.length > 0 ? (
                                                    selectedModule.nextModuleIds.map((id) => {
                                                        const nextModule = getModuleById(id);
                                                        return nextModule ? (
                                                            <Button
                                                                key={id}
                                                                variant="outline"
                                                                size="sm"
                                                                className="text-xs border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
                                                                onClick={() => handleModuleLink(id)}
                                                            >
                                                                <ExternalLink className="w-3 h-3 mr-1" />
                                                                {nextModule.name}
                                                            </Button>
                                                        ) : null;
                                                    })
                                                ) : (
                                                    <span className="text-gray-500 text-sm">-</span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
