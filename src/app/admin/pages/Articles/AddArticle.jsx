'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { blogService } from '../../../services/blog.service';
import { toast } from 'sonner';
import { Plus, Trash2, Star, Loader2 } from 'lucide-react';

const SummernoteEditor = dynamic(() => import('../../../components/organisms/SummernoteEditor'), { ssr: false });

const initialForm = {
  title: '',
  slug: '',
  category_id: '',
  short_description: '',
  views: 0,
  sort_order: 1,
  description: '',
  image: '',
  image_ext: '',
  is_featured: false,
  is_active: true,
  sm_question: JSON.stringify(['']),
  sm_answer: JSON.stringify(['']),
  review_detail: JSON.stringify([{
    rating: 5,
    date: '',
    authorName: '',
    publisherName: '',
    reviewName: '',
    reviewDescription: ''
  }]),
  rating_count: 0,
  review_count: 0,
  avg_review_value: 0,
  seo: '{}',
  likes: 0,
  custom_post_type: 'blog',
  post_attributes: '{}',
};

const defaultCategories = [
  { id: 1, name: 'Technology' },
  { id: 2, name: 'Health' },
  { id: 3, name: 'Education' },
];

export default function AddArticle() {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState(defaultCategories);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await blogService.getAllCategories();
      if (response.success && response.data.length > 0) {
        setCategories(response.data);
      } else {
        setCategories(defaultCategories);
      }
    } catch {
      toast.error('Failed to load categories');
      setCategories(defaultCategories);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setForm((prev) => ({
      ...prev,
      title,
      slug: generateSlug(title),
    }));
  };

  const generateSlug = (title) => title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

  const handleDescriptionChange = (html) => setForm((prev) => ({ ...prev, description: html }));

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.split('.').pop();
    const formData = new FormData();
    formData.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        setForm((prev) => ({ ...prev, image: data.url, image_ext: ext }));
        toast.success('Image uploaded!');
      } else {
        toast.error('Image upload failed');
      }
    } catch {
      toast.error('Image upload error');
    }
  };

  const handleSchemaChange = (index, field, value) => {
    const questions = JSON.parse(form.sm_question);
    const answers = JSON.parse(form.sm_answer);
    if (field === 'question') questions[index] = value;
    else answers[index] = value;
    setForm(prev => ({
      ...prev,
      sm_question: JSON.stringify(questions),
      sm_answer: JSON.stringify(answers),
    }));
  };

  const addSchemaRow = () => {
    const questions = JSON.parse(form.sm_question);
    const answers = JSON.parse(form.sm_answer);
    questions.push('');
    answers.push('');
    setForm(prev => ({
      ...prev,
      sm_question: JSON.stringify(questions),
      sm_answer: JSON.stringify(answers),
    }));
  };

  const removeSchemaRow = (index) => {
    const questions = JSON.parse(form.sm_question);
    const answers = JSON.parse(form.sm_answer);
    if (questions.length > 1) {
      questions.splice(index, 1);
      answers.splice(index, 1);
      setForm(prev => ({
        ...prev,
        sm_question: JSON.stringify(questions),
        sm_answer: JSON.stringify(answers),
      }));
    }
  };

  const handleReviewChange = (index, field, value) => {
    const reviews = JSON.parse(form.review_detail);
    reviews[index] = { ...reviews[index], [field]: value };
    setForm(prev => ({ ...prev, review_detail: JSON.stringify(reviews) }));
  };

  const addReviewRow = () => {
    const reviews = JSON.parse(form.review_detail);
    reviews.push({ rating: 5, date: '', authorName: '', publisherName: '', reviewName: '', reviewDescription: '' });
    setForm(prev => ({ ...prev, review_detail: JSON.stringify(reviews) }));
  };

  const removeReviewRow = (index) => {
    const reviews = JSON.parse(form.review_detail);
    if (reviews.length > 1) {
      reviews.splice(index, 1);
      setForm(prev => ({ ...prev, review_detail: JSON.stringify(reviews) }));
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory) return;
    try {
      const response = await blogService.createCategory({ name: newCategory, slug: generateSlug(newCategory), is_active: true });
      if (response.success) {
        toast.success('Category added');
        setNewCategory('');
        loadCategories();
        setForm((prev) => ({ ...prev, category_id: response.data.id }));
      }
    } catch {
      toast.error('Failed to add category');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.slug || !form.category_id) return toast.error('Please fill all required fields');

    try {
      setLoading(true);
      const reviews = JSON.parse(form.review_detail);
      const avg = reviews.length ? reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length : 0;
      const updatedForm = {
        ...form,
        review_count: reviews.length,
        rating_count: reviews.reduce((sum, r) => sum + (r.rating ? 1 : 0), 0),
        avg_review_value: +avg.toFixed(1),
      };

      const response = await blogService.createBlog(updatedForm);
      if (response.success) {
        toast.success('Article created!');
        router.push('/admin/articles');
      }
    } catch {
      toast.error('Failed to create article');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New Article</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4 p-4 bg-white rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>

          <div className="space-y-2">
            <label className="block font-medium">Post Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleTitleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Slug *</label>
            <input
              type="text"
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Category *</label>
            <div className="flex gap-2">
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded-md"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category"
                className="p-2 border rounded-md"
              />
              <button
                type="button"
                onClick={handleAddCategory}
                className="px-4 py-2 bg-[#0B6D76] text-white rounded-md hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Short Description</label>
            <textarea
              name="short_description"
              value={form.short_description}
              onChange={handleChange}
              className="w-full p-2 border rounded-md min-h-[100px]"
            />
          </div>
        </div>

        {/* Summernote Editor Section */}
        <div className="space-y-4 p-4 bg-white rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Content</h2>

          <div className="space-y-2">
            <label className="block font-medium">Description</label>
            <SummernoteEditor
              value={form.description}
              onChange={handleDescriptionChange}
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Featured Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-2 w-40 h-24 object-cover rounded"
              />
            )}
          </div>
        </div>


   {/* Schema Section */}
   <div className="space-y-4 p-4 bg-white rounded-lg border">
          <h2 className="text-xl font-semibold">Schema</h2>
          <button type="button" onClick={addSchemaRow} className="bg-[#0B6D76] text-white px-4 py-2 rounded">Add Schema Row</button>
          {JSON.parse(form.sm_question).map((question, index) => (
            <div key={index} className="flex gap-4 items-start">
              <input
                type="text"
                value={question}
                onChange={(e) => handleSchemaChange(index, "question", e.target.value)}
                placeholder="Question"
                className="w-1/2 p-2 border rounded"
              />
              <textarea
                value={JSON.parse(form.sm_answer)[index]}
                onChange={(e) => handleSchemaChange(index, "answer", e.target.value)}
                placeholder="Answer"
                className="w-1/2 p-2 border rounded"
              />
              <button type="button" onClick={() => removeSchemaRow(index)} className="text-red-500"><Trash2 /></button>
            </div>
          ))}
        </div>

        {/* Review Section */}
        <div className="space-y-4 p-4 bg-white rounded-lg border">
          <h2 className="text-xl font-semibold">Reviews</h2>
          <button type="button" onClick={addReviewRow} className="bg-[#0B6D76] text-white px-4 py-2 rounded">Add Review</button>
          {JSON.parse(form.review_detail).map((review, index) => (
            <div key={index} className="space-y-2">
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => handleReviewChange(index, "rating", star)}
                    className={review.rating >= star ? "text-yellow-400" : "text-gray-300"}
                  >
                    <Star fill="currentColor" />
                  </button>
                ))}
                <button onClick={() => removeReviewRow(index)} className="text-red-500"><Trash2 /></button>
              </div>
              <input type="text" placeholder="Author" value={review.authorName} onChange={(e) => handleReviewChange(index, "authorName", e.target.value)} className="w-full p-2 border rounded" />
              <input type="text" placeholder="Publisher" value={review.publisherName} onChange={(e) => handleReviewChange(index, "publisherName", e.target.value)} className="w-full p-2 border rounded" />
              <input type="text" placeholder="Title" value={review.reviewName} onChange={(e) => handleReviewChange(index, "reviewName", e.target.value)} className="w-full p-2 border rounded" />
              <textarea placeholder="Description" value={review.reviewDescription} onChange={(e) => handleReviewChange(index, "reviewDescription", e.target.value)} className="w-full p-2 border rounded" />
            </div>
          ))}
        </div>

        <div className="space-y-4 p-4 bg-white rounded-lg border">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>

          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_featured"
                checked={form.is_featured}
                onChange={handleChange}
              />
              Featured
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="is_active"
                checked={form.is_active}
                onChange={handleChange}
              />
              Active
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-[#0B6D76] text-white rounded-md hover:bg-blue-600 flex justify-center items-center gap-2"
        >
          {loading && <Loader2 className="animate-spin" size={20} />}
          {loading ? 'Creating Article...' : 'Save Article'}
        </button>
      </form>
    </div>
  );
}
