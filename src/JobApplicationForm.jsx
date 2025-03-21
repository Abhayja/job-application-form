import React, { useState } from "react";

export default function JobApplicationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    coverLetter: "",
    resume: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("coverLetter", formData.coverLetter);
    form.append("resume", formData.resume);

    try {
      const res = await fetch("http://localhost:3001/api/apply", {
        method: "POST",
        body: form,
      });

      if (res.ok) {
        alert("Application submitted!");
        setFormData({
          name: "",
          email: "",
          coverLetter: "",
          resume: null,
        });
      } else {
        alert("Failed to submit application.");
      }
    } catch (err) {
      console.error("Error submitting application:", err);
      alert("Error submitting application.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl mt-10 space-y-4">
      <h2 className="text-2xl font-bold text-gray-700">Job Application</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Full Name"
        className="w-full px-4 py-2 border rounded-md"
        required
      />

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        className="w-full px-4 py-2 border rounded-md"
        required
      />

      <textarea
        name="coverLetter"
        value={formData.coverLetter}
        onChange={handleChange}
        placeholder="Cover Letter"
        rows={4}
        className="w-full px-4 py-2 border rounded-md"
        required
      />

      <input
        type="file"
        name="resume"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
        className="w-full"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Submit Application
      </button>
    </form>
  );
}
