import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:1000/api/v1/all-users");
      setUsers(res.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to fetch users.");
    }
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:1000/api/v1/delete-user/${id}`);
          Swal.fire("Deleted!", "User has been deleted.", "success");
          fetchUsers();
        } catch (error) {
          console.error("Error deleting user:", error);
          Swal.fire("Error!", "Failed to delete user.", "error");
        }
      }
    });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:1000/api/v1/update-user/${editUser._id}`, {
        username: editUser.username,
        email: editUser.email,
        address: editUser.address,
      });
      toast.success("User updated successfully!");
      setEditUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Failed to update user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Manage Users</h2>

      {editUser && (
        <div className="bg-white border shadow-md p-6 rounded-lg mb-6 max-w-xl mx-auto animate-fade-in">
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Edit User</h3>
          <form onSubmit={handleEdit} className="space-y-4">
            <input
              type="text"
              value={editUser.username}
              onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
              placeholder="Username"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="email"
              value={editUser.email}
              onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
              placeholder="Email"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              value={editUser.address}
              onChange={(e) => setEditUser({ ...editUser, address: e.target.value })}
              placeholder="Address"
              className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setEditUser(null)}
                className="bg-gray-400 text-white px-5 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead>
            <tr className="bg-blue-100 text-gray-700">
              <th className="px-6 py-3 text-left">Username</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Address</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => (
              <tr
                key={user._id}
                className={`border-t hover:bg-blue-50 transition ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
              >
                <td className="px-6 py-4">{user.username}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.address}</td>
                <td className="px-6 py-4 text-center">
                  <div className="flex justify-center gap-4">
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      onClick={() => setEditUser(user)}
                    >
                      <MdEdit size={22} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDelete(user._id)}
                    >
                      <MdDelete size={22} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-6 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
