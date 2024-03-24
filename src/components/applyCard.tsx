'use client';
import { withdrawApply } from "@/api/fetch/apply";
import { ShowApply } from "@/api/model/apply";
import { getRole } from "@/utils/getCookies";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ApplyCard({apply, onWithdraw} : {apply: ShowApply; onWithdraw: (id: number) => void;}) {
    const [userRole, setUserRole] = useState<string | undefined>(undefined);

    useEffect(() => {
        getRole().then((role) => setUserRole(role));
    }, []);

    const withdraw = async () => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, withdraw it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await withdrawApply(apply.id);
                    Swal.fire(
                        'Withdraw!',
                        'Your application has been withdrawn.',
                        'success'
                    )
                    onWithdraw(apply.id);
                }
            })
       } catch (error : any) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error,
            });
        }
    }

    
    return (
        <div className="card p-4 m-2 rounded-md">
            <p>{apply.date}</p>
        <div className="flex justify-between items-center border-b-2">
            <h2 className="text-l font-semibold">{apply.job.title}</h2>
            <div className="flex flex-col items-end">
                <p className="text-gray-800">{apply.job.company}</p>
                <p className="text-gray-800">{apply.job.location}</p>
            </div>
        </div>
        <div className="flex justify-between items-center">
        <div>
            <p className="text-gray-800">{apply.job.description}</p>
            <p className="text-gray-800">{apply.job.requirement}</p>
        </div>
        {userRole === "applicant" && 
            <button className="bg-red-500 text-white p-2 h-10 rounded-md" onClick={withdraw}>Withdraw</button>}
        {userRole === "recruiter" && 
            <button className="bg-red-500 text-white p-2 h-10 rounded-md">Reject</button>}
        </div>
        
    </div>
    );
}