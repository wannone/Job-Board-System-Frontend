"use server";
import { cookies } from "next/headers";
import { UserData } from "../model/user";
import { Job } from "../model/job";

export const getJobs = async (): Promise<Job[]> => {
  const response = await fetch("http://localhost:5001/api/job", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + cookies().get("token")?.value,
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data: Job[] = await response.json();
    return data;
  } else {
    if (response.status === 403) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to get jobs");
  }
};

export const getJobById = async (id: number): Promise<Job> => {
  const response = await fetch(`http://localhost:5001/api/job/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + cookies().get("token")?.value,
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data: Job = await response.json();
    return data;
  } else {
    if (response.status === 401) {
      throw new Error("Unauthorized");
    }
    throw new Error("Failed to get job");
  }
};

export const getJobsByRecId = async (): Promise<Job[]> => {
  const response = await fetch("http://localhost:5001/api/job/getByRec", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + cookies().get("token")?.value,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data: Job[] = await response.json();
    return data;
  } else {
    if (response.status === 403) {
      throw new Error("Unauthorized");
    }

    console.log(response.status);
    throw new Error("Failed to get job");
  }
};

export const createJob = async (job: Job): Promise<string> => {
  const response = await fetch("http://localhost:5001/api/job/", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + cookies().get("token")?.value,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: job.title,
      description: job.description,
      requirement: job.requirement,
      company: job.company,
      location: job.location,
    }),
  });

  if (response.ok) {
    return "Job created successfully";
  } else {
    console.log(response.status);
    console.log(response.statusText);
    console.log(response);
    if (response.status === 403) {
      throw new Error("Unauthorized");
    }

    throw new Error("Failed to create job");
  }
};

export const updateJob = async (job: Job): Promise<string> => {
  const response = await fetch(`http://localhost:5001/api/job/${job.id}`, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + cookies().get("token")?.value,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: job.title,
      description: job.description,
      requirement: job.requirement,
      company: job.company,
      location: job.location,
    }),
  });

  if (response.ok) {
    return "Job updated successfully";
  } else {
    if (response.status === 403) {
      throw new Error("Unauthorized");
    }

    throw new Error("Failed to update job");
  }
};

export const deleteJob = async (id: number): Promise<string> => {
  const response = await fetch(`http://localhost:5001/api/job/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + cookies().get("token")?.value,
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    return "Job deleted successfully";
  } else {
    if (response.status === 403) {
      throw new Error("Unauthorized");
    }

    throw new Error("Failed to delete job");
  }
};
