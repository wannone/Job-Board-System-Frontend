'use client';
import { showApply } from "@/api/fetch/apply";
import { ShowApply } from "@/api/model/apply";
import ApplyCard from "@/components/applyCard";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { checkExp } from "@/utils/tokenSetting";
import { useEffect, useState } from "react";

export default function Apply() {
    
    const [apply, setApply] = useState<ShowApply[]>([]);
    const fetchApply = async () => {
        try {
            const fetch: ShowApply[] = await showApply();
            setApply(fetch);
        } catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            checkExp();
        }
        , 1000);

        fetchApply();
        return () => clearInterval(interval);
    }, []);

    const handleWithdraw = (id: number) => {
        setApply(apply.filter((apply) => apply.id !== id));
    }
    
    return (
        <>
            <Sidebar />
            <main className="ml-60">
            <Navbar />
            { apply.length === 0 && <div className="text-center p-8">No applications</div> }
            {apply.map((apply) => (
                <ApplyCard key={apply.id} apply={apply} onWithdraw={() => handleWithdraw(apply.id)} />
            ))}
            </main>
        </>
    );
}