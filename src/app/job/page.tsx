'use client'
import { deleteJob, getJobsByRecId } from "@/api/fetch/job";
import { Job } from "@/api/model/job";
import Navbar from "@/components/navbar"
import Sidebar from "@/components/sidebar"
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function JobPage() {
    const [jobs, setJobs] = useState<Job[]>([] as Job[]);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const fetchedJobs: Job[] = await getJobsByRecId();
                setJobs(fetchedJobs);
            } catch (error) {
                console.error("Error fetching jobs:", error);
            }
        };
        fetchJobs();
    }, []);

    const del = async (id: number) => {
        try {
            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await deleteJob(id);
                    const fetchedJobs: Job[] = await getJobsByRecId();
                    setJobs(fetchedJobs);
                    Swal.fire(
                        'Deleted!',
                        'Your job has been deleted.',
                        'success'
                    )
                }
            })
        } catch (error) {
            console.error("Error deleting job:", error);
        }
    }

    return (
        <>
            <Sidebar />
            <main className="ml-60">
                <Navbar />
                <div className="p-4">
                    <button className="bg-blue-500 p-2 m-2 w-30 h-10 text-white rounded-md">Create Job</button>
                    {jobs.map((job) => (
                        <div className="card p-4 m-2 rounded-md">
                        <div className="flex justify-between items-center border-b-2">
                            <h2 className="text-l font-semibold">{job.title}</h2>
                            <div className="flex flex-col items-end">
                                <p className="text-gray-800">{job.company}</p>
                                <p className="text-gray-800">{job.location}</p>
                            </div>
                        </div>
                        <div className="flex justify-between items-center">
                            <div>
                                <p className="text-gray-800">{job.description}</p>
                                <p className="text-gray-800">{job.requirement}</p>
                            </div>
                            <div>
                                <button className="bg-yellow-500 p-2 w-30 h-10 mx-2 text-white rounded-md">Edit</button>
                                <button className="bg-red-500 p-2 w-30 h-10 text-white rounded-md" onClick={() => del(job.id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                    ))    
                    }
                </div>
            </main>
        </>
    )
}