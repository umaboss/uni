"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import SummernoteEditor from "@/src/app/components/organisms/SummernoteEditor";

const AddGuide = () => {
  const router = useRouter();

  const [form, setForm] = useState({
    type: "University",
    university_id: "",
    subject_id: "",
    title: "",
    slug: "",
    subTitle: "",
    sortOrder: "",
    description: "",
    schema: [{ question: "", answer: "" }],
    reviews: [{ rating: "", date: "", authorName: "", publisherName: "", reviewName: "", reviewDescription: "" }],
    featuredImage: null,
    metaTags: false,
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    active: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSchemaChange = (index, key, value) => {
    const updated = [...form.schema];
    updated[index][key] = value;
    setForm({ ...form, schema: updated });
  };

  const handleReviewChange = (index, key, value) => {
    const updated = [...form.reviews];
    updated[index][key] = value;
    setForm({ ...form, reviews: updated });
  };

  const addSchema = () => setForm((prev) => ({
    ...prev,
    schema: [...prev.schema, { question: "", answer: "" }]
  }));

  const removeSchema = (index) => {
    const updated = [...form.schema];
    updated.splice(index, 1);
    setForm({ ...form, schema: updated });
  };

  const addReview = () => setForm((prev) => ({
    ...prev,
    reviews: [...prev.reviews, {
      rating: "", date: "", authorName: "", publisherName: "",
      reviewName: "", reviewDescription: ""
    }]
  }));

  const removeReview = (index) => {
    const updated = [...form.reviews];
    updated.splice(index, 1);
    setForm({ ...form, reviews: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // append scalar fields
    formData.append("user_id", 1); // static for now, can be dynamic
    formData.append("type", form.type);
    formData.append("university_id", form.university_id || "");
    formData.append("subject_id", form.subject_id || "");
    formData.append("title", form.title);
    formData.append("slug", form.slug);
    formData.append("subTitle", form.subTitle);
    formData.append("sortOrder", form.sortOrder);
    formData.append("description", form.description);
    formData.append("active", form.active);
    formData.append("metaTags", form.metaTags);

    if (form.metaTags) {
      formData.append("metaTitle", form.metaTitle);
      formData.append("metaDescription", form.metaDescription);
      formData.append("metaKeywords", form.metaKeywords);
    }

    // JSON fields
    formData.append("schema", JSON.stringify(form.schema));
    formData.append("reviews", JSON.stringify(form.reviews));

    // file
    if (form.featuredImage) {
      formData.append("featuredImage", form.featuredImage);
    }

    const res = await fetch("/api/guides", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      router.push("/guide");
    } else {
      alert("Failed to add guide");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Guide</h1>
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow">

        {/* Guide Type */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Guide Type</label>
            <select name="type" value={form.type} onChange={handleChange} className="w-full border px-3 py-2 rounded">
              <option value="University">University</option>
              <option value="Visa">Visa</option>
              <option value="Course">Course</option>
            </select>
          </div>
          <div>
            <label>University</label>
            <select name="university_id" value={form.university_id} onChange={handleChange} className="w-full border px-3 py-2 rounded">
              <option value="">Select University</option>
              <option value="1">Harvard</option>
              <option value="2">Oxford</option>
            </select>
          </div>
        </div>

        {/* Title / Slug */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label>Slug</label>
            <input type="text" name="slug" value={form.slug} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
        </div>

        {/* SubTitle / Sort Order */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>Sub Title</label>
            <input type="text" name="subTitle" value={form.subTitle} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
          <div>
            <label>Sort Order</label>
            <input type="number" name="sortOrder" value={form.sortOrder} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          </div>
        </div>

        {/* Summernote Description */}
        <div>
          <label>Description</label>
          <SummernoteEditor value={form.description} onChange={(val) => setForm({ ...form, description: val })} />
        </div>

        {/* Schema */}
        {form.schema.map((item, index) => (
          <div key={index} className="border p-4 rounded space-y-2 bg-gray-50">
            <input
              placeholder="Schema Question"
              value={item.question}
              onChange={(e) => handleSchemaChange(index, "question", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            <textarea
              placeholder="Schema Answer"
              value={item.answer}
              onChange={(e) => handleSchemaChange(index, "answer", e.target.value)}
              className="w-full border px-3 py-2 rounded"
            />
            {index > 0 && (
              <button type="button" onClick={() => removeSchema(index)} className="text-red-600 text-sm">Remove Schema</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addSchema} className="text-blue-600 text-sm">+ Add Schema</button>

        {/* Reviews */}
        {form.reviews.map((item, index) => (
          <div key={index} className="border p-4 rounded bg-gray-50 space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <input type="number" placeholder="Rating" value={item.rating} onChange={(e) => handleReviewChange(index, "rating", e.target.value)} className="border px-3 py-2 rounded" />
              <input type="date" placeholder="Date" value={item.date} onChange={(e) => handleReviewChange(index, "date", e.target.value)} className="border px-3 py-2 rounded" />
            </div>
            <input placeholder="Author Name" value={item.authorName} onChange={(e) => handleReviewChange(index, "authorName", e.target.value)} className="border px-3 py-2 rounded w-full" />
            <input placeholder="Publisher Name" value={item.publisherName} onChange={(e) => handleReviewChange(index, "publisherName", e.target.value)} className="border px-3 py-2 rounded w-full" />
            <input placeholder="Review Name" value={item.reviewName} onChange={(e) => handleReviewChange(index, "reviewName", e.target.value)} className="border px-3 py-2 rounded w-full" />
            <textarea placeholder="Review Description" value={item.reviewDescription} onChange={(e) => handleReviewChange(index, "reviewDescription", e.target.value)} className="border px-3 py-2 rounded w-full" />
            {index > 0 && (
              <button type="button" onClick={() => removeReview(index)} className="text-red-600 text-sm">Remove Review</button>
            )}
          </div>
        ))}
        <button type="button" onClick={addReview} className="text-green-600 text-sm">+ Add Review</button>

        {/* File Upload */}
        <div>
          <label>Featured Image</label>
          <input type="file" accept="image/*" onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              setForm((prev) => ({
                ...prev,
                featuredImage: file,
              }));
            }
          }} className="w-full border px-3 py-2 rounded" />
          {form.featuredImage && (
            <img src={URL.createObjectURL(form.featuredImage)} alt="Preview" className="mt-2 w-40 h-24 object-cover rounded border" />
          )}
        </div>

        {/* Meta Tags */}
        <div>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="metaTags" checked={form.metaTags} onChange={handleChange} />
            <span>Enable Meta Tags</span>
          </label>
        </div>
        {form.metaTags && (
          <div className="space-y-2">
            <input type="text" name="metaTitle" value={form.metaTitle} onChange={handleChange} placeholder="Meta Title" className="w-full border px-3 py-2 rounded" />
            <textarea name="metaDescription" value={form.metaDescription} onChange={handleChange} placeholder="Meta Description" className="w-full border px-3 py-2 rounded" />
            <input type="text" name="metaKeywords" value={form.metaKeywords} onChange={handleChange} placeholder="Meta Keywords" className="w-full border px-3 py-2 rounded" />
          </div>
        )}

        {/* Active Checkbox */}
        <div>
          <label className="flex items-center space-x-2">
            <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
            <span>Active</span>
          </label>
        </div>

        {/* Submit */}
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddGuide;
