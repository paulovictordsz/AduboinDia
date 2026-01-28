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

export async function getFertilizers(): Promise<Fertilizer[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_FERTILIZERS;
}

export async function getIndicators(): Promise<Indicator[]> {
    await new Promise(resolve => setTimeout(resolve, 500));
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
