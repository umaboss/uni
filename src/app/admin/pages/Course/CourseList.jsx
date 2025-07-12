"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("courses");
    if (stored) {
      setCourses(JSON.parse(stored));
    }
  }, []);

  const handleDelete = (id) => {
    const updated = courses.filter((c) => c.id !== id);
    setCourses(updated);
    localStorage.setItem("courses", JSON.stringify(updated));
    alert("Course deleted successfully.");
  };

  const handleTogglePopular = (id) => {
    const updated = courses.map((course) =>
      course.id === id ? { ...course, popular: !course.popular } : course
    );
    setCourses(updated);
    localStorage.setItem("courses", JSON.stringify(updated));
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Course List</h1>
          <p className="text-gray-600 mt-2">Manage all courses in the system</p>
        </div>
        <button
          onClick={() => router.push("/course/add")}
          className="bg-[#0B6D76] text-white px-6 py-3 rounded-xl hover:bg-[#09545c] transition-all duration-200 flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Course</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-indigo-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 rounded-l-xl">Course Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">University Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Subject</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Qualification</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Popular</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Created At</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{course.name}</td>
                  <td className="px-6 py-4 text-gray-600">{course.university}</td>
                  <td className="px-6 py-4 text-gray-600">{course.subject}</td>
                  <td className="px-6 py-4 text-gray-600">{course.qualification}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleTogglePopular(course.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold focus:outline-none transition-colors duration-150 ${
                        course.popular ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {course.popular ? "On" : "Off"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-500">{course.createdAt}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors mr-2">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedCourseId(course.id);
                        handleDelete(course.id);
                      }}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {courses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No courses found</div>
            <p className="text-gray-400 mt-2">Try adding a new course</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;
