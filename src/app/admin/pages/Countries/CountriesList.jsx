"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const CountriesList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const router = useRouter();

  // Fetch countries from API
  const fetchCountries = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/countries");
      if (!response.ok) throw new Error("Failed to fetch countries");
      const data = await response.json();
      setCountries(data);
    } catch (error) {
      console.error("Error fetching countries:", error);
      alert("Failed to load countries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this country?")) return;
    
    try {
      const response = await fetch(`/api/countries?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete country");

      alert("Country has been deleted successfully.");
      fetchCountries(); // Refresh the list
    } catch (error) {
      console.error("Error deleting country:", error);
      alert("Failed to delete country");
    }
  };

  const filteredCountries = countries.filter(
    (country) =>
      country.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-teal-100 min-h-screen">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600">Loading countries...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-gradient-to-br from-green-50 to-teal-100 min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Countries List</h1>
          <p className="text-gray-600 mt-2">Manage all countries in the system</p>
        </div>
        <button
          onClick={() => router.push("/admin/countries/add")}
          className="bg-[#0B6D76] text-white px-6 py-3 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all duration-200 flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Country</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="text"
            placeholder="Search countries or codes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-green-50 to-teal-50">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 rounded-l-xl">Feature Image</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Country</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Code</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Currency</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Consultation Fee</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Discount Fee</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 rounded-r-xl">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCountries.map((country) => (
                <tr key={country.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    {country.image ? (
                      <img
                        src={country.image}
                        alt={country.country}
                        className="w-12 h-12 object-cover rounded-lg border"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'inline';
                        }}
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                    <span className="text-gray-400" style={{display: 'none'}}>Image Error</span>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{country.country}</td>
                  <td className="px-6 py-4 text-gray-600">{country.code}</td>
                  <td className="px-6 py-4 text-gray-600">{country.currency}</td>
                  <td className="px-6 py-4 text-gray-600">{country.consultation_fee}</td>
                  <td className="px-6 py-4 text-gray-600">{country.consultation_fee_discount}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(country.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredCountries.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg">No countries found</div>
            <p className="text-gray-400 mt-2">Try adding a new country</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountriesList;
