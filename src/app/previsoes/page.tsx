import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getFertilizers } from "@/lib/services";
import { ArrowLeft, BrainCircuit } from "lucide-react";
import Link from "next/link";

export default async function PrevisoesPage() {
    const fertilizers = await getFertilizers();

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-10">
            <header className="bg-white dark:bg-slate-950 border-b sticky top-0 z-10">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Link href="/" className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-slate-600" />
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="bg-purple-600 text-white p-2 rounded-lg">
                            <BrainCircuit size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Previsões Detalhadas</h1>
                            <p className="text-xs text-slate-500">Análise técnica de tendências</p>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 space-y-6">
                {fertilizers.map((fert) => (
                    <Card key={fert.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                            <div className="bg-slate-100 dark:bg-slate-800 p-6 md:w-1/3 flex flex-col justify-center border-b md:border-b-0 md:border-r">
                                <h3 className="text-2xl font-bold text-slate-800 mb-1">{fert.name}</h3>
                                <p className="text-muted-foreground mb-4">{fert.formulation}</p>

                                <div className="mb-4">
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tendência</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Badge className="text-sm px-3 py-1" variant={
                                            fert.trend === 'up' ? 'destructive' :
                                                fert.trend === 'down' ? 'success' : 'secondary'
                                        }>
                                            {fert.trend === 'up' ? 'ALTA' :
                                                fert.trend === 'down' ? 'QUEDA' : 'ESTÁVEL'}
                                        </Badge>
                                    </div>
                                </div>

                                <div>
                                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Confiança</span>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="text-2xl font-bold">{fert.confidence}%</div>
                                        <div className="text-xs text-slate-500">probabilidade de acerto</div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 md:w-2/3">
                                <h4 className="font-semibold mb-3">Análise dos Fatores</h4>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="border rounded p-3">
                                            <div className="text-xs text-slate-500 mb-1">Dólar vs Preço</div>
                                            <div className="font-medium">Impacto Alto</div>
                                            <div className="text-xs text-muted-foreground mt-1">Câmbio atual pressiona custos de importação.</div>
                                        </div>
                                        <div className="border rounded p-3">
                                            <div className="text-xs text-slate-500 mb-1">Demanda Sazonal</div>
                                            <div className="font-medium">Impacto Médio</div>
                                            <div className="text-xs text-muted-foreground mt-1">Início da safrinha aumenta procura.</div>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border border-l-4 border-l-purple-500">
                                        <p className="text-sm italic text-slate-700">"{fert.justification} Recomenda-se antecipar compra se estoque estiver baixo."</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </main>
        </div>
    );
}
