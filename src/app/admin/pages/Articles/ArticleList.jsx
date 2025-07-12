"use client";

import { useState, useEffect } from "react";
import { Pencil } from "lucide-react";
import { blogService } from "@/app/services/blog.service";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios("/api/blogs");
        if (response?.data?.data) {
          setArticles(response.data.data);
        } else {
          setArticles([]);
        }
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Article List</h1>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Image</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Title</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Author</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Featured</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Active</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Created At</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500 text-lg">
                    Loading...
                  </td>
                </tr>
              ) : articles.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500 text-lg">
                    No articles found.
                  </td>
                </tr>
              ) : (
                articles.map((article) => {
                  const imageUrl =
                    article.image?.startsWith("/uploads")
                      ? `http://localhost:5000${article.image}`
                      : article.image || "/assets/placeholder.svg";

                  return (
                    <tr key={article.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4">
                        <img
                          src={imageUrl}
                          alt={article.title}
                          className="w-16 h-16 object-cover rounded"
                        />
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800">{article.title}</td>
                      <td className="py-3 px-4 text-gray-600">{article.user?.email || "-"}</td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={
                            article.is_featured ? "text-green-600 font-semibold" : "text-gray-400"
                          }
                        >
                          {article.is_featured ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={
                            article.is_active
                              ? "text-green-600 font-semibold"
                              : "text-red-600 font-semibold"
                          }
                        >
                          {article.is_active ? "Yes" : "No"}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-600">
                        {article.createdAt
                          ? new Date(article.createdAt).toLocaleString()
                          : "-"}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button className="p-2 rounded-full hover:bg-gray-100">
                          <Pencil className="w-5 h-5 text-blue-600" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ArticleList;
