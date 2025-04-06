import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDelete, MdEdit } from "react-icons/md";
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
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:1000/api/v1/delete-user/${id}`);
      toast.success("User deleted!");
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Failed to delete user.");
    }
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
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {editUser && (
        <form
          onSubmit={handleEdit}
          className="mb-6 bg-gray-100 p-4 rounded shadow"
        >
          <h3 className="text-lg font-semibold mb-2">Edit User</h3>
          <input
            type="text"
            value={editUser.username}
            onChange={(e) => setEditUser({ ...editUser, username: e.target.value })}
            placeholder="Username"
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="email"
            value={editUser.email}
            onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
            placeholder="Email"
            className="p-2 border rounded w-full mb-2"
          />
          <input
            type="text"
            value={editUser.address}
            onChange={(e) => setEditUser({ ...editUser, address: e.target.value })}
            placeholder="Address"
            className="p-2 border rounded w-full mb-2"
          />
          <div className="flex justify-end gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditUser(null)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Address</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.email}</td>
                <td className="border px-4 py-2">{user.address}</td>
                <td className="border px-4 py-2">
                  <div className="flex gap-2 justify-center">
                    <button
                      className="text-blue-600"
                      onClick={() => setEditUser(user)}
                    >
                      <MdEdit size={20} />
                    </button>
                    <button
                      className="text-red-600"
                      onClick={() => handleDelete(user._id)}
                    >
                      <MdDelete size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
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
