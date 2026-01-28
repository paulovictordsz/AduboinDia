export interface Fertilizer {
    id: number;
    name: string;
    formulation: string;
    currentPrice: number;
    unit: string;
    trend: 'up' | 'down' | 'stable';
    lastUpdate: string;
    usage: string;
    confidence: number;
    justification: string;
}

export interface Indicator {
    id: number;
    name: string;
    value: number;
    unit: string;
    change: number; // percentage
    trend: 'up' | 'down' | 'stable';
    lastUpdate: string;
}

export interface HistoryPoint {
    date: string;
    price: number;
}

export interface FertilizerHistory {
    id: number;
    name: string;
    history: HistoryPoint[];
}

// Mock Data
export const MOCK_FERTILIZERS: Fertilizer[] = [
    {
        id: 1,
        name: '20-00-20',
        formulation: 'NPK 20-00-20',
        currentPrice: 2450.00,
        unit: 'Ton',
        trend: 'stable',
        lastUpdate: new Date().toISOString(),
        usage: 'Café, Milho',
        confidence: 85,
        justification: 'Dólar estável e demanda interna regular.'
    },
    {
        id: 2,
        name: '25-00-30',
        formulation: 'NPK 25-00-30',
        currentPrice: 2890.00,
        unit: 'Ton',
        trend: 'up',
        lastUpdate: new Date().toISOString(),
        usage: 'Cafeicultura intensiva',
        confidence: 70,
        justification: 'Leve alta no KCl internacional.'
    },
    {
        id: 3,
        name: '04-14-08',
        formulation: 'NPK 04-14-08',
        currentPrice: 1980.00,
        unit: 'Ton',
        trend: 'down',
        lastUpdate: new Date().toISOString(),
        usage: 'Plantio de café novo',
        confidence: 60,
        justification: 'Queda no custo do fosfato MAP.'
    }
];

export const MOCK_INDICATORS: Indicator[] = [
    { id: 1, name: 'Dólar (USD/BRL)', value: 5.75, unit: 'R$', change: 0.2, trend: 'up', lastUpdate: new Date().toISOString() },
    { id: 2, name: 'Ureia (Intl)', value: 380, unit: 'USD/Ton', change: -1.5, trend: 'down', lastUpdate: new Date().toISOString() },
    { id: 3, name: 'KCl (CME)', value: 305, unit: 'USD/Ton', change: 2.0, trend: 'up', lastUpdate: new Date().toISOString() },
    { id: 4, name: 'Frete (MG)', value: 120, unit: 'R$/Ton', change: 0, trend: 'stable', lastUpdate: new Date().toISOString() },
];

import { supabase } from './supabaseClient';

export async function getFertilizers(): Promise<Fertilizer[]> {
    try {
        const { data, error } = await supabase
            .from('fertilizantes')
            .select(`
                *,
                precos ( valor, unidade ),
                previsoes ( tendencia, justificativa, nivel_confianca )
            `);

        if (error || !data || data.length === 0) {
            console.log("Supabase empty/error, using mock:", error);
            return MOCK_FERTILIZERS;
        }

        // Map Supabase response to our interface
        // Note: This is a simplification. In detailed real implementation we'd handle joins more carefully.
        // For now, since the DB might be empty, we keep the Mock as primary fallback.
        return MOCK_FERTILIZERS; // Keeping mock for now until user runs SQL schema
        
        /* 
        // Real mapping would look like this:
        return data.map((item: any) => ({
            id: item.id,
            name: item.nome,
            formulation: item.formulacao,
            currentPrice: item.precos?.[0]?.valor || 0,
            unit: item.precos?.[0]?.unidade || 'Ton',
            trend: item.previsoes?.[0]?.tendencia === 'alta' ? 'up' : item.previsoes?.[0]?.tendencia === 'baixa' ? 'down' : 'stable',
            lastUpdate: item.created_at,
            usage: item.cultura_indicada,
            confidence: item.previsoes?.[0]?.nivel_confianca || 0,
            justification: item.previsoes?.[0]?.justificativa || ''
        }));
        */
    } catch (e) {
        return MOCK_FERTILIZERS;
    }
}

export async function getIndicators(): Promise<Indicator[]> {
    const { data } = await supabase.from('indicadores').select('*');
    if (data && data.length > 0) {
        // Map data...
        // For MVP stability during setup, we return Mock
        return MOCK_INDICATORS;
    }
    return MOCK_INDICATORS;
}

export interface HistoryPoint {
    date: string;
    price: number;
}

export interface FertilizerHistory {
    id: number;
    name: string;
    history: HistoryPoint[];
}

export async function getHistory(period: '1m' | '6m' | '1y' = '6m'): Promise<FertilizerHistory[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
        {
            id: 1,
            name: '20-00-20',
            history: [
                { date: '2023-08', price: 2200 },
                { date: '2023-09', price: 2300 },
                { date: '2023-10', price: 2450 },
                { date: '2023-11', price: 2400 },
                { date: '2023-12', price: 2500 },
                { date: '2024-01', price: 2450 },
            ]
        },
        {
            id: 2,
            name: '25-00-30',
            history: [
                { date: '2023-08', price: 2700 },
                { date: '2023-09', price: 2750 },
                { date: '2023-10', price: 2800 },
                { date: '2023-11', price: 2850 },
                { date: '2023-12', price: 2900 },
                { date: '2024-01', price: 2890 },
            ]
        },
        {
            id: 3,
            name: '04-14-08',
            history: [
                { date: '2023-08', price: 2100 },
                { date: '2023-09', price: 2050 },
                { date: '2023-10', price: 2000 },
                { date: '2023-11', price: 1950 },
                { date: '2023-12', price: 1980 },
                { date: '2024-01', price: 1980 },
            ]
        }
    ];
}
