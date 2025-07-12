"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  ShieldCheck
} from "lucide-react";

const AdminList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [admins, setAdmins] = useState([]);
  const [selectedAdmin, setSelectedAdmin] = useState(null);
  const [showPermissions, setShowPermissions] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("admins");
    if (stored) setAdmins(JSON.parse(stored));
  }, []);

  const permissionOptions = [
    "View Dashboard",
    "Manage Users",
    "Edit Content",
    "Delete Records",
    "Manage Settings",
    "View Reports",
    "Assign Roles",
    "Access Logs"
  ];

  const togglePermission = (perm) => {
    if (!selectedAdmin) return;
    const updatedPermissions = selectedAdmin.permissions?.includes(perm)
      ? selectedAdmin.permissions.filter((p) => p !== perm)
      : [...(selectedAdmin.permissions || []), perm];

    setSelectedAdmin({ ...selectedAdmin, permissions: updatedPermissions });
  };

  const savePermissions = () => {
    if (!selectedAdmin) return;

    const updatedAdmins = admins.map((admin) =>
      admin.id === selectedAdmin.id ? selectedAdmin : admin
    );

    setAdmins(updatedAdmins);
    localStorage.setItem("admins", JSON.stringify(updatedAdmins));
    setShowPermissions(false);
    setSelectedAdmin(null);
    alert("Permissions Updated Successfully");
  };

  const handleDelete = (id) => {
    const updated = admins.filter((admin) => admin.id !== id);
    setAdmins(updated);
    localStorage.setItem("admins", JSON.stringify(updated));
    setDeleteId(null);
    alert("Admin Deleted Successfully");
  };

  const filteredAdmins = admins.filter((admin) =>
    admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    admin.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-100 min-h-screen">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Users</h1>
            <p className="text-gray-600">Manage administrator accounts and permissions</p>
          </div>
          <Link
            href="/admin-register/create"
            className="bg-[#0B6D76] text-white px-6 py-3 rounded-xl flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" /> <span>Add Admin</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search admins..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl"
            />
          </div>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Password</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">User Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Created At</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Permissions</th>
                <th className="px-6 py-4 text-center text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{admin.firstName} {admin.lastName}</td>
                  <td className="px-6 py-4">{admin.email}</td>
                  <td className="px-6 py-4">{admin.password}</td>
                  <td className="px-6 py-4">{admin.role}</td>
                  <td className="px-6 py-4">{admin.createdAt}</td>
                  <td className="px-6 py-4">
                    {admin.permissions?.length > 0 ? (
                      <ul className="text-xs text-gray-700 list-disc list-inside">
                        {admin.permissions.map((perm, idx) => (
                          <li key={idx}>{perm}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-gray-400 italic">No permissions</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-100 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg"
                        onClick={() => setDeleteId(admin.id)}
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      {deleteId === admin.id && (
                        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                          <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
                            <h2 className="text-lg font-bold mb-2">Are you sure?</h2>
                            <p className="text-sm text-gray-600 mb-4">This will permanently delete the admin.</p>
                            <div className="flex justify-end space-x-2">
                              <button
                                onClick={() => setDeleteId(null)}
                                className="px-4 py-2 bg-gray-200 rounded-lg"
                              >Cancel</button>
                              <button
                                onClick={() => handleDelete(admin.id)}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg"
                              >Delete</button>
                            </div>
                          </div>
                        </div>
                      )}
                      <button
                        onClick={() => {
                          setSelectedAdmin(admin);
                          setShowPermissions(true);
                        }}
                        className="text-purple-600 hover:bg-purple-100 p-2 rounded-full"
                      >
                        <ShieldCheck className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showPermissions && selectedAdmin && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg">
              <h2 className="text-xl font-bold mb-4">
                Set Permissions for {selectedAdmin.firstName} {selectedAdmin.lastName}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {permissionOptions.map((perm) => (
                  <label key={perm} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedAdmin.permissions?.includes(perm) || false}
                      onChange={() => togglePermission(perm)}
                    />
                    <span>{perm}</span>
                  </label>
                ))}
              </div>
              {(!selectedAdmin.permissions || selectedAdmin.permissions.length === 0) && (
                <p className="text-red-500 mt-4 text-sm">No permissions selected</p>
              )}
              <div className="flex justify-end mt-6 space-x-3">
                <button onClick={() => setShowPermissions(false)} className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700">Cancel</button>
                <button onClick={savePermissions} className="px-4 py-2 rounded-lg bg-green-600 text-white">Save</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminList;