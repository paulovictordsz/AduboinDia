import { UpdateDataButton } from "@/components/update-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getFertilizers, getIndicators } from "@/lib/services";
import { ArrowDown, ArrowRight, ArrowUp, TrendingDown, TrendingUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const revalidate = 60; // Revalidate every minute

export default async function Dashboard() {
  const fertilizers = await getFertilizers();
  const indicators = await getIndicators();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 pb-10">
      {/* Header */}
      <header className="bg-white dark:bg-slate-950 border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-green-600 text-white p-2 rounded-lg">
              <TrendingUp size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">AduboEmDia</h1>
              <p className="text-xs text-slate-500">Inteligência para compra de fertilizantes</p>
            </div>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <Link href="/" className="text-green-600">Dashboard</Link>
            <Link href="/historico" className="hover:text-green-600">Histórico</Link>
            <Link href="/previsoes" className="hover:text-green-600">Previsões</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">

        {/* Market Summary */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Resumo de Mercado</h2>
            <div className="flex items-center gap-2">
              <UpdateDataButton />
              <Badge variant="outline" className="bg-white">Atualizado: {new Date().toLocaleDateString()}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {indicators.map((indicator) => (
              <Card key={indicator.id} className="border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <CardDescription>{indicator.name}</CardDescription>
                  <div className="flex justify-between items-baseline">
                    <CardTitle className="text-2xl">{indicator.unit === 'R$' ? 'R$ ' : ''}{indicator.value}</CardTitle>
                    <div className={cn("flex items-center text-xs font-medium px-2 py-1 rounded-full",
                      indicator.trend === 'up' ? "bg-red-100 text-red-700" :
                        indicator.trend === 'down' ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-700"
                    )}>
                      {indicator.trend === 'up' ? <ArrowUp size={12} className="mr-1" /> :
                        indicator.trend === 'down' ? <ArrowDown size={12} className="mr-1" /> : <Minus size={12} className="mr-1" />}
                      {Math.abs(indicator.change)}%
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground">Última atualização: {new Date(indicator.lastUpdate).toLocaleTimeString().slice(0, 5)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Fertilizer Predictions */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-800 dark:text-slate-100">Previsões por Fertilizante</h2>
              <p className="text-slate-500">Estimativas para a região da Zona da Mata - MG</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {fertilizers.map((fert) => (
              <Card key={fert.id} className="overflow-hidden border-t-4 border-t-green-600 shadow-md">
                <CardHeader className="bg-slate-50 dark:bg-slate-900/50 pb-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl text-green-700">{fert.name}</CardTitle>
                      <CardDescription>{fert.formulation}</CardDescription>
                    </div>
                    <Badge variant={
                      fert.trend === 'up' ? 'destructive' :
                        fert.trend === 'down' ? 'success' : 'secondary'
                    }>
                      {fert.trend === 'up' ? 'Tendência de Alta' :
                        fert.trend === 'down' ? 'Tendência de Queda' : 'Estável'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-end mb-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Preço Atual Estimado</p>
                      <div className="text-3xl font-bold text-slate-800">
                        R$ {fert.currentPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        <span className="text-sm font-normal text-muted-foreground ml-1">/{fert.unit}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium">Justificativa:</span>
                        <div className="h-px bg-slate-200 flex-1"></div>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-300 italic">
                        "{fert.justification}"
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Confiança da previsão:</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div
                            className={cn("h-full rounded-full", fert.confidence > 70 ? "bg-green-500" : "bg-yellow-500")}
                            style={{ width: `${fert.confidence}%` }}
                          />
                        </div>
                        <span className="font-medium">{fert.confidence}%</span>
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs text-slate-400 block mb-1">Indicado para:</span>
                      <div className="flex flex-wrap gap-1">
                        {fert.usage.split(',').map(tag => (
                          <span key={tag} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded border border-green-100">
                            {tag.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}
