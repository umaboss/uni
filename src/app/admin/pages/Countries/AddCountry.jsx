"use client";

import { useState } from "react";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

const currencyOptions = ["USD", "PKR", "EUR", "GBP", "AUD", "CAD", "AED", "SAR"];

const AddCountry = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    amount: "",
    currency: "USD",
    consultationFee: "",
    consultationDiscountFee: "",
    featureImage: ""
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size (limit to 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB. Please choose a smaller image.");
        return;
      }

      // Check file type
      if (!file.type.startsWith('image/')) {
        alert("Please select a valid image file.");
        return;
      }

      try {
        setUploading(true);
        
        // Create FormData for upload
        const formData = new FormData();
        formData.append('image', file);

        // Upload the image
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadResult = await uploadResponse.json();

        if (!uploadResponse.ok) {
          throw new Error(uploadResult.message || 'Upload failed');
        }

        // Set the uploaded image URL
        setFormData((prev) => ({ ...prev, featureImage: uploadResult.url }));
        setImagePreview(uploadResult.url);
        
        console.log('Image uploaded successfully:', uploadResult.url);
      } catch (error) {
        console.error('Upload error:', error);
        alert(`Upload failed: ${error.message}`);
      } finally {
        setUploading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (submitting) return;
    
    try {
      setSubmitting(true);
      
      const res = await fetch("/api/countries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          code: formData.code,
          currency: formData.currency,
          consultationFee: formData.consultationFee,
          consultationDiscountFee: formData.consultationDiscountFee,
          featureImage: formData.featureImage,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to add country");
      }

      alert("✅ Country added successfully!");
      router.push("/admin/countries");
    } catch (err) {
      console.error("❌ Submit Error:", err);
      alert(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-teal-100 min-h-screen">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => router.push("/admin/countries")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Add New Country</h1>
          <p className="text-gray-600 mt-1">Add a new country to the system</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Country Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Country Code *</label>
              <input
                type="text"
                name="code"
                maxLength={3}
                value={formData.code}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Currency *</label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              >
                {currencyOptions.map((cur) => (
                  <option key={cur} value={cur}>{cur}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Consultation Fee *</label>
              <input
                type="number"
                name="consultationFee"
                value={formData.consultationFee}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Discount Fee</label>
              <input
                type="number"
                name="consultationDiscountFee"
                value={formData.consultationDiscountFee}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Feature Image</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                {uploading ? (
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#0B6D76] mx-auto mb-2"></div>
                    <p className="text-sm text-gray-600">Uploading image...</p>
                  </div>
                ) : imagePreview ? (
                  <div>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                    />
                    <p className="text-xs text-green-600 mb-2">✓ Image uploaded successfully</p>
                  </div>
                ) : (
                  <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2"
                  disabled={uploading}
                />
                {!uploading && !imagePreview && (
                  <p className="text-xs text-gray-500 mt-2">Click to select an image (max 2MB)</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8 pt-8 border-t">
          <button
            type="submit"
            disabled={submitting || uploading}
            className={`px-8 py-3 rounded-xl flex items-center gap-2 transition-all ${
              submitting || uploading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#0B6D76] text-white hover:shadow-xl'
            }`}
          >
            {submitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                <span>Adding Country...</span>
              </>
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Add Country</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCountry;
