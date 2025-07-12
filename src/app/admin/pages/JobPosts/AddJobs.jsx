'use client';

import { useState } from 'react';
import { Save, LoaderCircle, CheckCircle2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useJobs } from './JobContext';

const SummernoteEditor = dynamic(() => import('../../../components/organisms/SummernoteEditor'), { ssr: false });

const initialForm = {
  title: '',
  job_type: '',
  city: '',
  province: '',
  country: '',
  site_based: false,
  skills: [],
  experience: '',
  requirements: '',
  responsibilities: '',
  description: '',
};

const AddJob = () => {
  const { addJob } = useJobs();
  const [form, setForm] = useState(initialForm);
  const [newSkill, setNewSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    try {
      await addJob(form);
      setSuccess(true);
      setForm(initialForm);
      setNewSkill('');
    } catch (error) {
      console.error('Failed to submit job:', error);
    } finally {
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000); // Auto-hide success after 3s
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !form.skills.includes(newSkill)) {
      setForm((prev) => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
      setNewSkill('');
    }
  };

  const removeSkill = (skill) => {
    setForm((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));
  };

  return (
    <div className="px-6 py-10 bg-gray-50 relative">
      <h1 className="text-3xl font-bold text-center mb-8">Add Job</h1>

      {success && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-100 border border-green-400 text-green-700 px-6 py-2 rounded-xl flex items-center gap-2 shadow-md transition-all duration-300 z-10">
          <CheckCircle2 size={20} /> Job posted successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="title" placeholder="Title" className="input" value={form.title} onChange={handleChange} />
          <input name="job_type" placeholder="Job Type" className="input" value={form.job_type} onChange={handleChange} />
          <input name="city" placeholder="City" className="input" value={form.city} onChange={handleChange} />
          <input name="province" placeholder="Province" className="input" value={form.province} onChange={handleChange} />
          <input name="country" placeholder="Country" className="input" value={form.country} onChange={handleChange} />
          <input name="experience" placeholder="Experience" className="input" value={form.experience} onChange={handleChange} />
          <label className="flex items-center gap-2">
            <input type="checkbox" name="site_based" checked={form.site_based} onChange={handleChange} />
            Site Based
          </label>
        </div>

        <div>
          <input
            placeholder="Add skill"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
            className="input"
          />
          <div className="flex gap-2 mt-2 flex-wrap">
            {form.skills.map((skill) => (
              <span key={skill} className="bg-blue-100 px-2 py-1 rounded-full text-sm">
                {skill} <button type="button" onClick={() => removeSkill(skill)} className="ml-1">×</button>
              </span>
            ))}
          </div>
        </div>

        <SummernoteEditor value={form.requirements} onChange={(val) => setForm((p) => ({ ...p, requirements: val }))} />
        <SummernoteEditor value={form.responsibilities} onChange={(val) => setForm((p) => ({ ...p, responsibilities: val }))} />
        <SummernoteEditor value={form.description} onChange={(val) => setForm((p) => ({ ...p, description: val }))} />

        <div className="text-right">
          <button
            type="submit"
            className="btn-primary flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
            disabled={loading}
          >
            {loading ? <LoaderCircle size={18} className="animate-spin" /> : <Save size={18} />}
            {loading ? 'Posting...' : 'Register'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddJob;
