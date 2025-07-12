"use client";

import { useState } from "react";
import { Eye, Trash2 } from "lucide-react";

const CommentList = () => {
  const initialComments = [
    { id: 1, name: "John Doe", email: "john@example.com", phone: "+1234567890", comment: "This is a great article!", url: "https://example.com/article-1", approved: true },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "+0987654321", comment: "I have a question about this.", url: "https://example.com/article-2", approved: false },
    { id: 3, name: "Sam Wilson", email: "sam@example.com", phone: "+1122334455", comment: "Thanks for sharing!", url: "https://example.com/article-3", approved: true },
  ];

  const [comments, setComments] = useState(initialComments);
  const [selectedComment, setSelectedComment] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleDelete = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
    setDeleteId(null);
    alert("Comment deleted successfully.");
  };

  const toggleApproval = (id) => {
    setComments(comments.map(comment =>
      comment.id === id ? { ...comment, approved: !comment.approved } : comment
    ));
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Article Comments</h1>
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600 rounded-l-xl">Name</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Email</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Phone</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">Comment</th>
                <th className="py-3 px-4 text-left text-sm font-semibold text-gray-600">URL</th>
                <th className="py-3 px-4 text-center text-sm font-semibold text-gray-600 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {comments.map((comment) => (
                <tr key={comment.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-medium text-gray-800">{comment.name}</td>
                  <td className="py-3 px-4 text-gray-600">{comment.email}</td>
                  <td className="py-3 px-4 text-gray-600">{comment.phone}</td>
                  <td className="py-3 px-4 text-gray-600 max-w-xs truncate">{comment.comment}</td>
                  <td className="py-3 px-4 text-blue-500 hover:underline">
                    <a href={comment.url} target="_blank" rel="noopener noreferrer">{comment.url}</a>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <input
                        type="checkbox"
                        checked={comment.approved}
                        onChange={() => toggleApproval(comment.id)}
                        className="w-5 h-5 accent-green-600"
                      />
                      <button
                        onClick={() => setSelectedComment(comment)}
                        className="p-2 rounded hover:bg-gray-100"
                      >
                        <Eye className="w-5 h-5 text-blue-500" />
                      </button>
                      <button
                        onClick={() => setDeleteId(comment.id)}
                        className="p-2 rounded hover:bg-gray-100"
                      >
                        <Trash2 className="w-5 h-5 text-red-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {comments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No comments found.</p>
          </div>
        )}
      </div>

      {selectedComment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Comment Details</h2>
            <p><strong>Name:</strong> {selectedComment.name}</p>
            <p><strong>Email:</strong> {selectedComment.email}</p>
            <p><strong>Phone:</strong> {selectedComment.phone}</p>
            <p><strong>Comment:</strong> {selectedComment.comment}</p>
            <p>
              <strong>URL:</strong>{" "}
              <a
                href={selectedComment.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                {selectedComment.url}
              </a>
            </p>
            <p><strong>Status:</strong> {selectedComment.approved ? "Approved" : "Pending"}</p>
            <div className="mt-4 text-right">
              <button
                onClick={() => setSelectedComment(null)}
                className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {deleteId !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 shadow-xl w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Are you sure?</h2>
            <p className="text-gray-700 mb-4">
              This action cannot be undone. This will permanently delete the comment.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentList;
