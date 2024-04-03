'use client'
import { getJobById } from "@/api/fetch/job"
import { Job } from "@/api/model/job";
import JobForm from "@/components/jobForm";
import Form from "@/components/jobForm"
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function UpdatePage() {
    const router = useRouter();
    const param = useSearchParams();
    const id : number  = param.get("id") ? parseInt(param.get("id") as string) : 0;
    const [job, setJob] = useState<Job>();


    useEffect(() => {
        const fetchJob = async () => {
            try {
                const fetchedJob = await getJobById(id);
                setJob(fetchedJob);
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "🥲 Oops...",
                    text: "Something went wrong!",
                }).then(() => {
                    router.push("/job");
                });
            }
        };

        fetchJob();
    }, [id, router]);

    if (!job) {
        return <div>Loading...</div>; // or any loading indicator
    }

    return <JobForm job={job} mode="update" />;
}
