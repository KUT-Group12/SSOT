import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getModuleById, getPrevModules, getModulesByRole } from '@/data/modules';

const roleLabels: Record<string, string> = {
    user: '一般会員',
    business: '事業者会員',
    admin: '管理者',
};

interface PageProps {
    params: Promise<{ role: string; moduleId: string }>;
}

export default async function ModuleDetailPage({ params }: PageProps) {
    const { role, moduleId } = await params;
    const module = getModuleById(moduleId);

    if (!module || module.role !== role) {
        notFound();
    }

    const prevModules = getPrevModules(module.id);
    const nextModules = module.nextModuleIds
        .map(id => getModuleById(id))
        .filter(Boolean);

    return (
        <div className="min-h-screen bg-gray-900">
            {/* Header */}
            <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
                <div className="max-w-6xl mx-auto flex items-center gap-4">
                    <Link href={`/flow/${role}`}>
                        <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            フローに戻る
                        </Button>
                    </Link>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold text-white">{module.name}</h1>
                        <p className="text-gray-400 text-sm">{roleLabels[role]} / {module.id}</p>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Main Info */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Overview */}
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white">Overview</CardTitle>
                                <CardDescription className="text-gray-400">{module.description}</CardDescription>
                            </CardHeader>
                            {module.endpoint && (
                                <CardContent>
                                    <div className="bg-gray-900 rounded-lg p-4 font-mono">
                                        <span className={`font-bold ${module.endpoint.method === 'GET' ? 'text-green-400' :
                                                module.endpoint.method === 'POST' ? 'text-blue-400' :
                                                    module.endpoint.method === 'PUT' ? 'text-yellow-400' :
                                                        'text-red-400'
                                            }`}>
                                            {module.endpoint.method}
                                        </span>
                                        {' '}
                                        <span className="text-gray-300">{module.endpoint.path}</span>
                                    </div>
                                </CardContent>
                            )}
                        </Card>

                        {/* Schema */}
                        {module.schema && (
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-white">Schema</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {module.schema.request && (
                                        <div>
                                            <h4 className="text-sm font-semibold text-gray-400 mb-2">Request</h4>
                                            <pre className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto">
                                                {module.schema.request}
                                            </pre>
                                        </div>
                                    )}
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-400 mb-2">Response</h4>
                                        <pre className="bg-gray-900 rounded-lg p-4 text-sm text-gray-300 overflow-x-auto">
                                            {module.schema.response}
                                        </pre>
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Rules */}
                        {module.rules && module.rules.length > 0 && (
                            <Card className="bg-gray-800 border-gray-700">
                                <CardHeader>
                                    <CardTitle className="text-white">Rules</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="list-disc list-inside text-gray-300 space-y-2">
                                        {module.rules.map((rule, index) => (
                                            <li key={index}>{rule}</li>
                                        ))}
                                    </ul>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Right Column - Relations */}
                    <div className="space-y-6">
                        {/* Prev Modules */}
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white text-lg">Prev Modules</CardTitle>
                                <CardDescription className="text-gray-400">このモジュールの遷移元</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {prevModules.length > 0 ? (
                                    <div className="space-y-2">
                                        {prevModules.map((m) => (
                                            <Link key={m.id} href={`/flow/${role}/${m.id}`}>
                                                <Button
                                                    variant="outline"
                                                    className="w-full justify-start text-left border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
                                                >
                                                    <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                                                    <span className="truncate">{m.name}</span>
                                                </Button>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm">遷移元モジュールなし（開始点）</p>
                                )}
                            </CardContent>
                        </Card>

                        {/* Next Modules */}
                        <Card className="bg-gray-800 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-white text-lg">Next Modules</CardTitle>
                                <CardDescription className="text-gray-400">このモジュールの遷移先</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {nextModules.length > 0 ? (
                                    <div className="space-y-2">
                                        {nextModules.map((m) => m && (
                                            <Link key={m.id} href={`/flow/${role}/${m.id}`}>
                                                <Button
                                                    variant="outline"
                                                    className="w-full justify-start text-left border-gray-600 text-gray-300 hover:text-white hover:bg-gray-700"
                                                >
                                                    <ExternalLink className="w-4 h-4 mr-2 flex-shrink-0" />
                                                    <span className="truncate">{m.name}</span>
                                                </Button>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 text-sm">遷移先モジュールなし（終端点）</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>
        </div>
    );
}

// Generate static params for all modules
export async function generateStaticParams() {
    const roles = ['user', 'business', 'admin'];
    const params: { role: string; moduleId: string }[] = [];

    for (const role of roles) {
        const modules = getModulesByRole(role);
        for (const module of modules) {
            params.push({ role, moduleId: module.id });
        }
    }

    return params;
}
