'use client'
import { getRole } from "@/utils/getCookies";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Sidebar() {
    const [userRole, setUserRole] = useState<string | undefined>(undefined);

    useEffect(() => {
        getRole().then((role) => setUserRole(role));
    }, []);

    return (
        <aside className="h-screen w-60 fixed z-50">
            <h1 className="text-2xl font-bold mt-4 p-4">Job Board</h1>
            <Link href="/home">
                <p className="block p-4">Home</p>
            </Link>
            <Link href="/apply">
                <p className="block p-4">Apply</p>
            </Link>
            {userRole === "recruiter" && (
                <>
                    <Link href="/job">
                        <p className="block p-4">Job</p>
                    </Link>
                </>
            )}
        </aside>
    );
}
