import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { User, Briefcase, Shield } from 'lucide-react';

const roles = [
  {
    id: 'user',
    title: '一般会員',
    titleEn: 'User',
    description: '一般会員向けのモジュールフローを表示します',
    icon: User,
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 'business',
    title: '事業者会員',
    titleEn: 'Business',
    description: '事業者会員向けのモジュールフローを表示します',
    icon: Briefcase,
    color: 'from-green-500 to-emerald-500',
  },
  {
    id: 'admin',
    title: '管理者',
    titleEn: 'Admin',
    description: '管理者向けのモジュールフローを表示します',
    icon: Shield,
    color: 'from-purple-500 to-pink-500',
  },
];

export default function RoleSelectionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            SSOT Documentation
          </h1>
          <p className="text-gray-400 text-lg">
            Single Source of Truth - バックエンドモジュール仕様書
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {roles.map((role) => (
            <Link key={role.id} href={`/flow/${role.id}`}>
              <Card className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-black/20 bg-gray-800/50 border-gray-700 backdrop-blur">
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <role.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-white text-xl">
                    {role.title}
                    <span className="block text-sm text-gray-400 font-normal mt-1">
                      {role.titleEn}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-400 text-center">
                    {role.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
