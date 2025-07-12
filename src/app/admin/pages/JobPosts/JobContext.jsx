'use client';

import React, { createContext, useState, useContext, useEffect } from "react";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/jobs");
      const data = await res.json();
      const jobsWithSkills = data.map(job => ({
        ...job,
        skills: job.skills ? job.skills.split(",").map(s => s.trim()).filter(Boolean) : [],
        active: job.post_status === "active",
      }));
      setJobs(jobsWithSkills);
    } catch (error) {
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const addJob = async (job) => {
    try {
      await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...job, skills: JSON.stringify(job.skills) }),
      });
      await fetchJobs();
    } catch (error) {
      console.error("Error adding job:", error);
    }
  };

  const deleteJob = async (id) => {
    try {
      await fetch(`/api/jobs/${id}`, { method: "DELETE" });
      await fetchJobs();
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const toggleJobStatus = async (id) => {
    try {
      const job = jobs.find(j => j.id === id);
      const newStatus = job?.active ? "closed" : "active";
      await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ post_status: newStatus }),
      });
      await fetchJobs();
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, deleteJob, toggleJobStatus, loading }}>
      {children}
    </JobContext.Provider>
  );
};

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) throw new Error("useJobs must be used within a JobProvider");
  return context;
};
