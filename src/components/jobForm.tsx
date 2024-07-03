"use client";
import { createJob, updateJob } from "@/api/fetch/job";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { Job } from "@/api/model/job";

export default function JobForm({ job, mode }: { job: Job | null; mode: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    id: job?.id || 0,
    title: job?.title || "",
    description: job?.description || "",
    company: job?.company || "",
    location: job?.location || "",
    requirement: job?.requirement || "",
    rec_id: job?.rec_id || 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(mode === "update") {
        await updateJob(formData);
      } else {
        await createJob(formData);
      }
      Swal.fire({
        icon: "success",
        title: `Job ${mode} successfully`,
        showConfirmButton: true,
      }).then(() => {
        router.push("/home");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <form
        action=""
        className="w-2/5 card p-4 m-2 rounded-md"
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
      >
        <h2 className="text-xl font-semibold text-center p-2">{mode} Job</h2>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={handleInputChange}
            name="title"
            id="title"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="company"
            className="block text-sm font-medium text-gray-700"
          >
            Company
          </label>
          <input
            type="text"
            value={formData.company}
            onChange={handleInputChange}
            name="company"
            id="company"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Location
          </label>
          <input
            type="text"
            value={formData.location}
            onChange={handleInputChange}
            name="location"
            id="location"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={handleInputChange}
            name="description"
            id="description"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="requirement"
            className="block text-sm font-medium text-gray-700"
          >
            Requirement
          </label>
          <textarea
            value={formData.requirement}
            onChange={handleInputChange}
            name="requirement"
            id="requirement"
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
          {mode === "update" ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
}
