"use client";

import { useState } from "react";
import { Save, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const universities = [
  { id: 1, name: "Harvard University" },
  { id: 2, name: "Stanford University" },
  { id: 3, name: "MIT" },
  { id: 4, name: "University of Oxford" },
  { id: 5, name: "University of Cambridge" },
  { id: 6, name: "National University of Singapore" },
  { id: 7, name: "University of Toronto" },
];

const AddCourse = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    duration: "",
    university: "",
    subject: "",
    qualification: "",
    yearlyFee: "",
    language: "",
    schemaQuestion: "",
    schemaAnswer: "",
    rating: "",
    date: new Date().toISOString().split("T")[0],
    authorName: "",
    publisherName: "",
    reviewName: "",
    reviewDescription: "",
    about: "",
    entryRequirements: "",
    curriculum: "",
    popular: false,
    createdAt: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem("courses");
    const courses = stored ? JSON.parse(stored) : [];
    courses.push({ id: Date.now(), ...formData });
    localStorage.setItem("courses", JSON.stringify(courses));

    const subjectName = formData.subject.trim();
    if (subjectName) {
      const storedSubjects = localStorage.getItem("subjects");
      const subjects = storedSubjects ? JSON.parse(storedSubjects) : [];
      const exists = subjects.some(
        (s) => s.name.toLowerCase() === subjectName.toLowerCase()
      );
      if (!exists) {
        subjects.push({ id: Date.now(), name: subjectName });
        localStorage.setItem("subjects", JSON.stringify(subjects));
      }
    }

    alert(`${formData.name} has been successfully added.`);
    router.push("/course");
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => router.push("/course")}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-150"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Course</h1>
          <p className="text-gray-600 mt-1">Create a new course program</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {["name", "duration", "subject", "qualification", "yearlyFee", "language"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {field.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase())} *
                </label>
                <input
                  type={field === "yearlyFee" ? "number" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                University *
              </label>
              <select
                name="university"
                value={formData.university}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              >
                <option value="">Select University</option>
                {universities.map((uni) => (
                  <option key={uni.id} value={uni.name}>
                    {uni.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            {["schemaQuestion", "schemaAnswer", "rating", "date", "authorName", "publisherName", "reviewName"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {field.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase())}
                </label>
                <input
                  type={field === "rating" ? "number" : field === "date" ? "date" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
              </div>
            ))}

            {["reviewDescription", "about", "entryRequirements", "curriculum"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  {field.replace(/([A-Z])/g, ' $1').replace(/^\w/, c => c.toUpperCase())}
                </label>
                <textarea
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl"
                />
              </div>
            ))}

            <div className="flex items-center space-x-2">
              <label className="text-sm font-semibold text-gray-700">
                Popular
              </label>
              <input
                type="checkbox"
                name="popular"
                checked={formData.popular}
                onChange={handleChange}
                className="w-4 h-4"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Created At
              </label>
              <input
                type="text"
                name="createdAt"
                value={formData.createdAt}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-8 pt-8 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.push("/course")}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-[#0B6D76] text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
          >
            <Save className="w-5 h-5" />
            <span>Add Course</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
