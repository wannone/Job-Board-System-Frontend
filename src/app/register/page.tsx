"use client";
import { useState } from "react";
import Link from "next/link";
import RegForm from "@/components/registForm";

export default function Register() {
  const [mode, setMode] = useState("Applicant");

  const handleModeChange = () => {
    setMode(mode === "Applicant" ? "Recruiter" : "Applicant");
  };

  return (
    <>
      <div className="flex w-screen h-screen align items-center justify-center">
        <div className="card flex w-96 py-8 rounded-md bg-white items-center justify-center flex-col gap-4">
          <h1 className="text-2xl font-bold text-gray-500">
            Register as {mode}
          </h1>
          <button onClick={handleModeChange} className="bg-blue-500 w-24 h-8 rounded-lg text-white hover:bg-blue-600">
            {mode === "Applicant" ? "Applicant" : "Recruiter"}
          </button>
          <RegForm mode={mode} />
          <Link href="/login">
          <p className="font-light text-gray-500 hover:text-black text-sm">login here</p>
        </Link>
        </div>
      </div>
    </>
  );
}
