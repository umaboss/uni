'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([
    { id: 1, name: 'Ali Khan', email: 'ali.khan@example.com', phone: '+923001234567', lastEducation: 'Bachelors', applyFor: 'MS Computer Science', createdAt: '2024-01-15' },
    { id: 2, name: 'Sara Ahmed', email: 'sara.ahmed@example.com', phone: '+923004567890', lastEducation: 'Intermediate', applyFor: 'BS Business', createdAt: '2024-01-16' },
    { id: 3, name: 'Usman Tariq', email: 'usman.tariq@example.com', phone: '+923008765432', lastEducation: 'Matric', applyFor: 'Diploma in IT', createdAt: '2024-01-17' },
  ]);
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();

  const handleDelete = (id) => {
    const confirmed = confirm('Are you sure you want to delete this student?');
    if (!confirmed) return;

    setStudents(students.filter(student => student.id !== id));
    alert('Student deleted successfully.');
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Student List</h1>
          <p className="text-gray-500 mt-1">Manage all students in the system</p>
        </div>
        <button
          onClick={() => router.push('/students/add')}
          className="bg-[#0B6D76] text-white px-6 py-3 rounded-xl shadow hover:bg-[#095c64]"
        >
          ➕ Add Student
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search students by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-purple-50 to-pink-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700 rounded-l-xl">Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Phone Number</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Last Education</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Apply For</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Created At</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map(student => (
                <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-800">{student.name}</td>
                  <td className="px-6 py-4 text-gray-600">{student.email}</td>
                  <td className="px-6 py-4 text-gray-600">{student.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{student.lastEducation}</td>
                  <td className="px-6 py-4 text-gray-600">{student.applyFor}</td>
                  <td className="px-6 py-4 text-gray-500">{student.createdAt}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      className="text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 p-2 rounded-lg"
                      onClick={() => handleDelete(student.id)}
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredStudents.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">No students found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentList;
