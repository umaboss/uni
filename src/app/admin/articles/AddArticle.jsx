"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useArticleContext } from "../ArticleContext";

const initialForm = {
  title: "",
  slug: "",
  category: "",
  shortDescription: "",
  views: 0,
  sortOrder: 1,
  description: "",
  schemaQuestion: "",
  schemaAnswer: "",
  rating: 0,
  date: "",
  authorName: "",
  publisherName: "",
  reviewName: "",
  reviewDescription: "",
  featuredImage: "",
  popular: false,
  active: true,
};

const AddArticle = () => {
  const { addArticle, categories, addCategory } = useArticleContext();
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [newCategory, setNewCategory] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCategoryChange = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  const handleAddCategory = () => {
    if (newCategory && !categories.find((cat) => cat.name === newCategory)) {
      addCategory(newCategory);
      setForm({ ...form, category: newCategory });
      setNewCategory("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.category) return;
    addArticle(form);
    router.push("/articles");
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Add Article</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <inputField name="title" label="Post Title" value={form.title} onChange={handleChange} />
          <inputField name="slug" label="Slug" value={form.slug} onChange={handleChange} />
          <div>
            <label className="block mb-1 font-medium">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleCategoryChange}
              className="w-full border px-3 py-2 rounded mb-2"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                placeholder="Add new category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="flex-1 border px-3 py-2 rounded"
              />
              <button type="button" onClick={handleAddCategory} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                Add
              </button>
            </div>
          </div>
          <inputField name="shortDescription" label="Short Description" value={form.shortDescription} onChange={handleChange} />
          <inputField name="views" label="Views" type="number" value={form.views} onChange={handleChange} />
          <inputField name="sortOrder" label="Sort Order" type="number" value={form.sortOrder} onChange={handleChange} />
          <inputField name="rating" label="Rating" type="number" value={form.rating} onChange={handleChange} min="0" max="5" step="0.1" />
          <inputField name="date" label="Date" type="date" value={form.date} onChange={handleChange} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" rows={3} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <inputField name="schemaQuestion" label="Schema Markup Question" value={form.schemaQuestion} onChange={handleChange} />
          <inputField name="schemaAnswer" label="Schema Markup Answer" value={form.schemaAnswer} onChange={handleChange} />
          <inputField name="authorName" label="Author's Name" value={form.authorName} onChange={handleChange} />
          <inputField name="publisherName" label="Publisher's Name" value={form.publisherName} onChange={handleChange} />
          <inputField name="reviewName" label="Review's Name" value={form.reviewName} onChange={handleChange} />
          <inputField name="reviewDescription" label="Review Description" value={form.reviewDescription} onChange={handleChange} />
          <inputField name="featuredImage" label="Featured Image URL" value={form.featuredImage} onChange={handleChange} />
        </div>

        <div className="flex gap-6 items-center">
          <label className="flex items-center">
            <input type="checkbox" name="popular" checked={form.popular} onChange={handleChange} className="mr-2" />
            Popular
          </label>
          <label className="flex items-center">
            <input type="checkbox" name="active" checked={form.active} onChange={handleChange} className="mr-2" />
            Active
          </label>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Add Article</button>
      </form>
    </div>
  );
};

const inputField = ({ name, label, value, onChange, type = "text", ...rest }) => (
  <div>
    <label className="block mb-1 font-medium">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full border px-3 py-2 rounded"
      {...rest}
    />
  </div>
);

export default AddArticle;
