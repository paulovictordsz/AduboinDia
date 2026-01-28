-- Enable UPDATE and DELETE for public (anon) access
-- This is necessary for the API Route to update existing indicators
-- and for the Admin to edit/delete items.

create policy "Public update access indicadores" on public.indicadores for update using (true);
create policy "Public delete access indicadores" on public.indicadores for delete using (true);

-- Also fix for other tables if needed later
create policy "Public update access fertilizantes" on public.fertilizantes for update using (true);
create policy "Public update access precos" on public.precos for update using (true);
create policy "Public update access previsoes" on public.previsoes for update using (true);
