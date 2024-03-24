'use client';
import { applyJob } from "@/api/fetch/apply";
import { Job } from "@/api/model/job";
import { getRole } from "@/utils/getCookies";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function JobCard({ job }: { job: Job }) {
  const [userRole, setUserRole] = useState<string | undefined>(undefined);

  useEffect(() => {
    getRole().then((role) => setUserRole(role));
}, []);

  const apply = async () => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, apply it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await applyJob(job.id);
          Swal.fire(
            'Applied!',
            'Your application has been submitted.',
            'success'
          )
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
        <div className="flex justify-between items-center border-b-2">
            <h2 className="text-l font-semibold">{job.title}</h2>
            <div className="flex flex-col items-end">
                <p className="text-gray-800">{job.company}</p>
                <p className="text-gray-800">{job.location}</p>
            </div>
        </div>
        <p className="text-gray-800">{job.description}</p>
        <p className="text-gray-800">{job.requirement}</p>
        {userRole === 'applicant' &&         
        <button className="bg-blue-500 p-2 w-30 h-10 text-white rounded-md" onClick={apply}>Apply</button>
}
    </div>
  );
}
