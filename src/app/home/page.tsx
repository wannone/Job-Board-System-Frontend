"use client";
import React, { useEffect, useState } from "react";
import JobCard from "@/components/jobCard";
import { Job } from "../../api/model/job";
import Navbar from "@/components/navbar";
import { getJobs } from "@/api/fetch/job";
import Sidebar from "@/components/sidebar";
import { checkExp } from "@/utils/tokenSetting";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkExp();
    }, 1000);

    const fetchJobs = async () => {
      try {
        const fetchedJobs: Job[] = await getJobs();
        setJobs(fetchedJobs);
      } catch (error: unknown) {
        if (error instanceof Error) {
          if (error.message === "Unauthorized") {
            router.push("/login");
          }
        }
      }
    };
    fetchJobs();

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Sidebar />
      <main className="ml-60">
        <Navbar />
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </main>
    </>
  );
}
