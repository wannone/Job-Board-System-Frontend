'use server'
import { cookies } from "next/headers"
import { UserData } from "../model/user";
import { Job } from "../model/job";
import { promises } from "dns";

    export const getJobs = async() : Promise<Job[]> => {
        const response =  await fetch("http://localhost:5001/api/job", {
            method: "GET",
            headers: {
                "Authorization" : "Bearer " + cookies().get("token")?.value,
                "Content-Type" : "application/json",
            },
        })
        if (response.ok) {
            const data : Job[] = await response.json();
            return data;
        } else {
            if (response.status === 401) 
                throw new Error("Unauthorized");
            throw new Error("Failed to get jobs");
        }
    }
    export const getJobsByRecId = async () : Promise<Job[]> => {
        const response = await fetch('http://localhost:5001/api/job/getByRec', {
            method: "GET",
            headers: {
                "Authorization" : "Bearer " + cookies().get("token")?.value,
                "Content-Type" : "application/json",
            },
        })

        if (response.ok) {
            const data : Job[] = await response.json();
            return data;
        } else {
            if (response.status === 401) {
                throw new Error("Unauthorized");
            }
            console.log(response.status);
            throw new Error("Failed to get job");
        }
    }


    export const searchJobs = async (query: string) : Promise<Job> => {
        const response = await fetch(`http://localhost:5001/api/job/search?query=${query}`, {
            method: "GET",
            headers: {
                "Authorization" : "Bearer " + cookies().get("token"),
                "Content-Type" : "application/json",
            },
        })

        if (response.ok) {
            const data : Job = await response.json();
            return data;
        } else {
            if (response.status === 401) {
                throw new Error("Unauthorized");
            }
            throw new Error("Failed to search job");
        }
    }

    export const createJob = async (formData: FormData) : Promise<string> =>{
        const rawData = cookies().get("data");
        const data : UserData = rawData ? JSON.parse(rawData.value) : null;
        const response = await fetch("http://localhost:5001/api/job", {
            method: "POST",
            headers: {
            "Authorization" : "Bearer " + cookies().get("token"),
            "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                title: formData.get("title"),
                description: formData.get("description"),
                requirement: formData.get("requirement"),
                company: formData.get("company"),
                location: formData.get("location"),
                rec_id: data.id,
            }),
        });

        if(response.ok) {
            return "Job created successfully"
        } else {
            if (response.status === 401) {
                throw new Error("Unauthorized");
            }
            throw new Error("Failed to create job");
        }
    }

    export const updateJob = async (id: number, formData: FormData) : Promise<string> => {
        const response = await fetch(`http://localhost:5001/api/job/${id}`, {
            method: "PUT",
            headers: {
                "Authorization" : "Bearer " + cookies().get("token"),
                "Content-Type" : "application/json",
            },
            body: JSON.stringify({
                title: formData.get("title"),
                description: formData.get("description"),
                requirement: formData.get("requirement"),
                company: formData.get("company"),
                location: formData.get("location"),
            }),
        });

        if(response.ok) {
            return "Job updated successfully"
        } else {
            if (response.status === 401) {
                throw new Error("Unauthorized");
            }
            throw new Error("Failed to update job");
        }
    }

    export const deleteJob = async (id: number) : Promise<string> => {
        const response = await fetch(`http://localhost:5001/api/job/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization" : "Bearer " + cookies().get("token")?.value,
                "Content-Type" : "application/json",
            },
        }); 

        if(response.ok) {
            return "Job deleted successfully"
        } else {
            if (response.status === 401) {
                throw new Error("Unauthorized");
            }
            console.log(response.status);
            throw new Error("Failed to delete job");
        }
    }