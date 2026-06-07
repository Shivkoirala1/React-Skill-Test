import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  // DELETE
  const deleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  // START EDIT
  const startEdit = (user) => {
    setEditId(user.id);
    setEditName(user.name.firstname + " " + user.name.lastname);
    setEditEmail(user.email);
  };

  // SAVE EDIT
  const saveEdit = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id
          ? { ...u, name: { firstname: editName.split(" ")[0], lastname: editName.split(" ")[1] || "" }, email: editEmail }
          : u
      )
    );
    setEditId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Link to="/">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
            ← Back
          </button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-500 text-white rounded-2xl p-6 shadow">
          <p className="text-sm opacity-80">Total Users</p>
          <p className="text-4xl font-bold mt-1">{users.length}</p>
        </div>
        <div className="bg-green-500 text-white rounded-2xl p-6 shadow">
          <p className="text-sm opacity-80">Active</p>
          <p className="text-4xl font-bold mt-1">{users.length}</p>
        </div>
        <div className="bg-purple-500 text-white rounded-2xl p-6 shadow">
          <p className="text-sm opacity-80">Deleted</p>
          <p className="text-4xl font-bold mt-1">0</p>
        </div>
      </div>

      {/* User Management Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-xl font-bold mb-4">User Management</h2>

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-400 animate-pulse py-10">Fetching users...</p>
        )}

        {/* Table */}
        {!loading && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 text-left">
                  <th className="px-4 py-3 rounded-l-lg">ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Phone</th>
                  <th className="px-4 py-3 rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3">{user.id}</td>

                    {/* Edit mode */}
                    {editId === user.id ? (
                      <>
                        <td className="px-4 py-3">
                          <input
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <input
                            value={editEmail}
                            onChange={(e) => setEditEmail(e.target.value)}
                            className="border rounded px-2 py-1 w-full"
                          />
                        </td>
                        <td className="px-4 py-3">{user.username}</td>
                        <td className="px-4 py-3">{user.phone}</td>
                        <td className="px-4 py-3">
                          <button
                            onClick={() => saveEdit(user.id)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-blue-600"
                          >
                            Save
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-4 py-3 capitalize">
                          {user.name.firstname} {user.name.lastname}
                        </td>
                        <td className="px-4 py-3">{user.email}</td>
                        <td className="px-4 py-3">{user.username}</td>
                        <td className="px-4 py-3">{user.phone}</td>
                        <td className="px-4 py-3 flex gap-2">
                          <button
                            onClick={() => startEdit(user)}
                            className="bg-yellow-400 text-white px-3 py-1 rounded-lg text-xs hover:bg-yellow-500"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg text-xs hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}