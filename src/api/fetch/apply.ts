'use server'
import { cookies } from "next/headers";
import { ShowApply } from "../model/apply";
import Swal from "sweetalert2";

     export const applyJob = async (jobId: number) : Promise<string> => {
        const response = await fetch(`http://localhost:5001/api/apply/${jobId}`, {
            method: "POST",
            headers: {
                "Authorization" : "Bearer " + cookies().get("token")?.value,
                "Content-Type" : "application/json",
            },
        })

        if (response.ok) {
            return "Success apply job";
        } else {
            if (response.status === 401) {
                throw new Error("Unauthorized");
            }
            throw new Error("Failed to apply job");
        }
    }
    
    export const showApply = async () : Promise<ShowApply[]> => {
        const response = await fetch(`http://localhost:5001/api/apply/`, { 
            method: "GET",
            headers: {
                "Authorization" : "Bearer " + cookies().get("token")?.value,
                "Content-Type" : "application/json",
            },
        })

        if(response.ok) {
            const data : ShowApply[] = await response.json();
            return data;
        } else {
            if (response.status === 401) {
                throw new Error("Unauthorized");
            }
            throw new Error("Failed to show apply");
        }
    }

    export const withdrawApply = async (applyId: number) : Promise<string> => {
        const response = await fetch(`http://localhost:5001/api/apply/${applyId}`, {
            method: "DELETE",
            headers: {
                "Authorization" : "Bearer " + cookies().get("token")?.value,
                "Content-Type" : "application/json",
            },
        })

        if (response.ok) {
            return "Success withdraw apply";
        } else {
            if (response.status === 401) {
                throw new Error("Unauthorized");
            }
            throw new Error("Failed to withdraw apply");
        }
    }

