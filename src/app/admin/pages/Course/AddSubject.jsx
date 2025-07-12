"use client";

import { useState, useEffect } from "react";
import { Save, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const AddSubject = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    course: "",
    credits: "",
    semester: "",
    professor: ""
  });

  useEffect(() => {
    const stored = localStorage.getItem("courses");
    if (stored) {
      setCourses(JSON.parse(stored));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const stored = localStorage.getItem("subjects");
    const subjects = stored ? JSON.parse(stored) : [];
    subjects.push({ id: Date.now(), ...formData });
    localStorage.setItem("subjects", JSON.stringify(subjects));
    router.push("/course/subjects/added");
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
      <div className="flex items-center space-x-4 mb-8">
        <button
          onClick={() => router.push("/course/subjects")}
          className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-150"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Subject</h1>
          <p className="text-gray-600 mt-1">Create a new subject for a course</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Subject Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter subject name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Subject Code *</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleChange}
                placeholder="e.g., CS201, MATH101"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Course *</label>
              <select
                name="course"
                value={formData.course}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Credits *</label>
              <input
                type="number"
                name="credits"
                value={formData.credits}
                onChange={handleChange}
                placeholder="Total credits"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Semester *</label>
              <input
                type="text"
                name="semester"
                value={formData.semester}
                onChange={handleChange}
                placeholder="e.g., 1st, 2nd, 3rd"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Professor *</label>
              <input
                type="text"
                name="professor"
                value={formData.professor}
                onChange={handleChange}
                placeholder="Professor name"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-4 mt-8 pt-8 border-t border-gray-200">
          <button
            type="button"
            onClick={() => router.push("/course/subjects")}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
          >
            <Save className="w-5 h-5" />
            <span>Add Subject</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSubject;
