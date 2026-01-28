"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getHistory } from "@/lib/services";
import { ArrowLeft, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

// Client component because Recharts uses window/DOM
export default function HistoricoPage() {
    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        // Transform data for recharts
        // We need an array of objects like { date: '2023-08', '20-00-20': 2200, '25-00-30': 2700 }
        getHistory().then(hist => {
            if (hist.length > 0) {
                const transformed = hist[0].history.map((point, index) => {
                    const item: any = { date: point.date };
                    hist.forEach(h => {
                        item[h.name] = h.history[index].price;
                    });
                    return item;
                });
                setData(transformed);
            }
        });
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-10">
            <header className="bg-white dark:bg-slate-950 border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-slate-600" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="bg-blue-600 text-white p-2 rounded-lg">
                            <TrendingUp size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Histórico de Preços</h1>
                            <p className="text-xs text-slate-500">evolução últimos 6 meses</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <Card className="w-full h-[500px]">
                    <CardHeader>
                        <CardTitle>Evolução de Preços (Reais/Ton)</CardTitle>
                        <CardDescription>Comparativo entre os principais fertilizantes</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="20-00-20" stroke="#16a34a" strokeWidth={2} />
                                <Line type="monotone" dataKey="25-00-30" stroke="#dc2626" strokeWidth={2} />
                                <Line type="monotone" dataKey="04-14-08" stroke="#2563eb" strokeWidth={2} />
                            </LineChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>

                <div className="mt-8 text-sm text-center text-slate-500">
                    <p>Fonte: Cotações locais Heringer e média de mercado Zona da Mata.</p>
                </div>
            </main>
        </div>
    );
}
