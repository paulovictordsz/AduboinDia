import { supabase } from '@/lib/supabaseClient';
import { NextResponse } from 'next/server';

export const revalidate = 0;

export async function GET() {
    try {
        const updates = [];
        const logs = [];

        // 1. Fetch Dólar (USD-BRL) - Real API
        try {
            const resp = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL');
            const data = await resp.json();
            const dollarValue = parseFloat(data.USDBRL.bid);

            updates.push({
                id: undefined, // WIll search by name
                nome: 'Dólar (USD/BRL)',
                valor: dollarValue,
                unidade: 'R$',
                fonte: 'AwesomeAPI',
                data_referencia: new Date().toISOString()
            });
            logs.push(`Dólar fetched: ${dollarValue}`);
        } catch (e) {
            logs.push('Error fetching Dollar');
        }

        // 2. Fetch Commodities (Simulated for MVP because IndexMundi/Bloomberg are paid)
        // In a real production app, we would use a paid API like Commodities-API or scrape specific pages.
        // Here we simulate a small variation to show the system "alive".
        const commodities = [
            { name: 'Ureia (Intl)', base: 380, var: 10 },
            { name: 'KCl (CME)', base: 305, var: 5 },
            { name: 'Gás Natural', base: 2.5, var: 0.2 }
        ];

        for (const comm of commodities) {
            // Random small variation to simulate market movement
            const currentVar = (Math.random() * comm.var * 2) - comm.var;
            const newValue = parseFloat((comm.base + currentVar).toFixed(2));

            updates.push({
                nome: comm.name,
                valor: newValue,
                unidade: 'USD/Ton',
                fonte: 'Simulado/Market',
                data_referencia: new Date().toISOString()
            });
            logs.push(`${comm.name} simulated: ${newValue}`);
        }

        // 3. Save to Supabase
        for (const item of updates) {
            // Find existing indicator by name
            const { data: existing } = await supabase
                .from('indicadores')
                .select('id')
                .eq('nome', item.nome)
                .single();

            if (existing) {
                await supabase
                    .from('indicadores')
                    .update({
                        valor: item.valor,
                        data_referencia: item.data_referencia
                    })
                    .eq('id', existing.id);
            } else {
                await supabase.from('indicadores').insert(item);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Indicators updated successfully',
            logs
        });

    } catch (error) {
        return NextResponse.json({ success: false, error: 'Internal Error' }, { status: 500 });
    }
}
