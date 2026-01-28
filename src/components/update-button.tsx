"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

export function UpdateDataButton() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleUpdate() {
        setLoading(true);
        try {
            const res = await fetch('/api/update-indicators');
            if (res.ok) {
                // Refresh the current route to fetch new data from server components
                router.refresh();
            } else {
                console.error("Failed to update");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setTimeout(() => setLoading(false), 1000); // Small delay for visual feedback
        }
    }

    return (
        <button
            onClick={handleUpdate}
            disabled={loading}
            className={cn(
                "flex items-center gap-2 text-xs font-medium px-3 py-1.5 rounded-md transition-colors border",
                loading
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-white hover:bg-slate-50 text-slate-600 hover:text-green-600 border-slate-200"
            )}
            title="Atualizar cotações agora"
        >
            <RefreshCw size={14} className={cn(loading && "animate-spin")} />
            {loading ? "Atualizando..." : "Atualizar Dados"}
        </button>
    );
}
