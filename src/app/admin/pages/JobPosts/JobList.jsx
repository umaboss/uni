'use client';

import React, { useState } from "react";
import { Eye, Trash2 } from "lucide-react";
import { useJobs } from "./JobContext";

const JobList = () => {
  const { jobs, deleteJob, toggleJobStatus } = useJobs();
  const [selectedJob, setSelectedJob] = useState(null);

  const handleDelete = (id) => {
    deleteJob(id);
  };

  const toggleActive = (id) => {
    toggleJobStatus(id);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Job Listings</h1>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 rounded-l-xl">Title</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Job Type</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Location</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Site Type</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Skills</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{job.title}</td>
                  <td className="py-3 px-4 text-gray-600">{job.job_type}</td>
                  <td className="py-3 px-4 text-gray-600">{[job.city, job.province, job.country].filter(Boolean).join(", ")}</td>
                  <td className="py-3 px-4 text-gray-600">{job.site_based ? 'Onsite' : 'Remote'}</td>
                  <td className="py-3 px-4 text-gray-600">
                    <div className="flex flex-wrap gap-1">
                      {(job.skills || []).slice(0, 2).map((skill) => (
                        <span key={skill} className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                          {skill}
                        </span>
                      ))}
                      {(job.skills || []).length > 2 && (
                        <span className="text-xs font-medium p-1">
                          +{job.skills.length - 2} more
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <input type="checkbox" checked={job.active} onChange={() => toggleActive(job.id)} />
                      <button
                        onClick={() => setSelectedJob(job)}
                        className="text-blue-500 hover:underline"
                      >
                        <Eye size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="text-red-500 hover:underline"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {jobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No jobs found.</p>
          </div>
        )}
      </div>

      {selectedJob && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white max-w-xl w-full rounded-xl shadow-xl p-6">
            <h2 className="text-xl font-bold mb-4">{selectedJob.title}</h2>
            <p><strong>Location:</strong> {[selectedJob.city, selectedJob.province, selectedJob.country].filter(Boolean).join(", ")}</p>
            <p><strong>Job Type:</strong> {selectedJob.job_type} ({selectedJob.site_based ? 'Onsite' : 'Remote'})</p>
            <div className="my-2">
              <strong>Skills:</strong>
              <div className="flex flex-wrap gap-2 mt-2">
                {(selectedJob.skills || []).map((skill) => (
                  <span key={skill} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <p className="mt-2"><strong>Status:</strong> <span className={selectedJob.active ? "text-green-600" : "text-red-600"}>{selectedJob.active ? "Active" : "Inactive"}</span></p>
            <div className="text-right mt-4">
              <button
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                onClick={() => setSelectedJob(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobList;
