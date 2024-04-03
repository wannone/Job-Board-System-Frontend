import { registerApplicant, registerRecruiter } from "@/api/fetch/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export default function RegForm({ mode }: { mode: string }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    company: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (mode === "Applicant") {
        await registerApplicant(formData);
      } else {
        await registerRecruiter(formData);
      }
      Swal.fire({
        icon: "success",
        title: `${mode} successfully`,
        showConfirmButton: true,
      }).then(() => {
        router.push("/login");
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
    <form
      className="flex w-96 rounded-md items-center justify-center flex-col gap-4"
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
    >
      <input
        type="text"
        name="name"
        placeholder="name"
        required
        value={formData.name}
        onChange={handleInputChange}
        className="w-60 h-10 rounded-md border-2 border-gray-300 px-2"
      />
      {mode === "Recruiter" && (
        <input
          type="text"
          name="company"
          placeholder="company"
          required
          value={formData.company}
          onChange={handleInputChange}
          className="w-60 h-10 rounded-md border-2 border-gray-300 px-2"
        />
      )}
      <input
        type="text"
        name="username"
        placeholder="username"
        required
        value={formData.username}
        onChange={handleInputChange}
        className="w-60 h-10 rounded-md border-2 border-gray-300 px-2"
      />
      <input
        type="email"
        name="email"
        placeholder="email"
        required
        value={formData.email}
        onChange={handleInputChange}
        className="w-60 h-10 rounded-md border-2 border-gray-300 px-2"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={formData.password}
        onChange={handleInputChange}
        className="w-60 h-10 rounded-md border-2 border-gray-300 px-2"
      />
      <button
        type="submit"
        className="w-60 h-10 bg-blue-500 rounded-md text-white font-medium hover:bg-blue-600"
      >
        Register
      </button>
    </form>
  );
}
