"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const SubjectList = () => {
  const [subjects, setSubjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("subjects");
    if (stored) {
      setSubjects(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this subject?")) {
      const updated = subjects.filter((s) => s.id !== id);
      setSubjects(updated);
      localStorage.setItem("subjects", JSON.stringify(updated));
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-indigo-50 to-purple-100 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Subject List</h1>
          <p className="text-gray-600 mt-2">Manage all subjects in the system</p>
        </div>
        <button
          onClick={() => router.push("/course/subjects/add")}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Subject</span>
        </button>
      </div>
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-indigo-50 to-purple-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 rounded-l-xl">Subject Name</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {subjects.map((subject) => (
                <tr key={subject.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-900">{subject.name}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors mr-2">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(subject.id)}
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
        {subjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No subjects found</div>
            <p className="text-gray-400 mt-2">Try adding a new subject</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectList;
