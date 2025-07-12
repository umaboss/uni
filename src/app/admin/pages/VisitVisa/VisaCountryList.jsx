'use client';

import React, { useState } from "react";

const initialCountries = [
  {
    id: 1,
    name: "Pakistan",
    code: "PK",
    countryImage: "https://via.placeholder.com/40x40?text=PK",
    bannerImage: "https://via.placeholder.com/80x40?text=Banner",
    price: "100",
    discount: "10%"
  },
  {
    id: 2,
    name: "United Kingdom",
    code: "UK",
    countryImage: "https://via.placeholder.com/40x40?text=UK",
    bannerImage: "https://via.placeholder.com/80x40?text=Banner",
    price: "200",
    discount: "15%"
  },
  {
    id: 3,
    name: "Canada",
    code: "CA",
    countryImage: "https://via.placeholder.com/40x40?text=CA",
    bannerImage: "https://via.placeholder.com/80x40?text=Banner",
    price: "150",
    discount: "5%"
  },
];

const VisaCountryList = () => {
  const [countries, setCountries] = useState(initialCountries);
  const [form, setForm] = useState({
    name: "",
    code: "",
    countryImage: "",
    bannerImage: "",
    price: "",
    discount: ""
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.code) return;

    if (editId !== null) {
      setCountries((prev) =>
        prev.map((c) => (c.id === editId ? { ...c, ...form } : c))
      );
      setEditId(null);
    } else {
      setCountries((prev) => [
        ...prev,
        {
          id: prev.length ? prev[prev.length - 1].id + 1 : 1,
          ...form
        }
      ]);
    }

    setForm({
      name: "",
      code: "",
      countryImage: "",
      bannerImage: "",
      price: "",
      discount: ""
    });
  };

  const handleEdit = (country) => {
    setEditId(country.id);
    setForm({
      name: country.name,
      code: country.code,
      countryImage: country.countryImage,
      bannerImage: country.bannerImage,
      price: country.price,
      discount: country.discount
    });
  };

  const handleDelete = (id) => {
    setCountries((prev) => prev.filter((c) => c.id !== id));
    if (editId === id) {
      setEditId(null);
      setForm({
        name: "",
        code: "",
        countryImage: "",
        bannerImage: "",
        price: "",
        discount: ""
      });
    }
  };

  const handleAddDetail = (country) => {
    alert(`Add detail for ${country.name}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Visa Country List</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-wrap gap-2 mb-6 items-center"
      >
        <input
          type="text"
          name="name"
          placeholder="Country Name"
          value={form.name}
          onChange={handleChange}
          className="border px-3 py-2 rounded flex-1 min-w-[120px]"
          required
        />
        <input
          type="text"
          name="code"
          placeholder="Code"
          value={form.code}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-20"
          required
        />
        <input
          type="text"
          name="countryImage"
          placeholder="Country Image URL"
          value={form.countryImage}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-48"
        />
        <input
          type="text"
          name="bannerImage"
          placeholder="Banner Image URL"
          value={form.bannerImage}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-48"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-24"
        />
        <input
          type="text"
          name="discount"
          placeholder="Discount"
          value={form.discount}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-24"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? "Update" : "Add"}
        </button>
      </form>

      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Sr</th>
            <th className="py-2 px-4 border-b">Country Image</th>
            <th className="py-2 px-4 border-b">Banner Image</th>
            <th className="py-2 px-4 border-b">Country Name</th>
            <th className="py-2 px-4 border-b">Price</th>
            <th className="py-2 px-4 border-b">Discount</th>
            <th className="py-2 px-4 border-b">Add Detail</th>
            <th className="py-2 px-4 border-b">Edit</th>
            <th className="py-2 px-4 border-b">Delete</th>
          </tr>
        </thead>
        <tbody>
          {countries.map((country, idx) => (
            <tr key={country.id}>
              <td className="py-2 px-4 border-b text-center">{idx + 1}</td>
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={
                    country.countryImage ||
                    "https://via.placeholder.com/40x40?text=Img"
                  }
                  alt="Country"
                  className="w-10 h-10 object-cover rounded"
                />
              </td>
              <td className="py-2 px-4 border-b text-center">
                <img
                  src={
                    country.bannerImage ||
                    "https://via.placeholder.com/80x40?text=Banner"
                  }
                  alt="Banner"
                  className="w-20 h-10 object-cover rounded"
                />
              </td>
              <td className="py-2 px-4 border-b">{country.name}</td>
              <td className="py-2 px-4 border-b">{country.price}</td>
              <td className="py-2 px-4 border-b">{country.discount}</td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleAddDetail(country)}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                >
                  Add Detail
                </button>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEdit(country)}
                  className="text-blue-600 hover:underline"
                >
                  Edit
                </button>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleDelete(country.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisaCountryList;
