'use client';
import { logout } from "@/api/fetch/user";
import { useRouter } from 'next/navigation'

export default function Navbar() {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error(error);
        } finally {
            router.push('/');
        }
    }

    return (
        <nav className="h-20 w-full sticky top-0">
            <div className="flex justify-end items-center gap-6 h-20 w-full px-4 ">
                <button className="w-20 h-10 rounded-lg font-medium" onClick={handleLogout}>logout</button>
            </div>
        </nav>
    )
}