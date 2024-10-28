import { useState, useEffect } from 'react';

function ManageUsers() {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        role: ''
    });
    const [editingUserId, setEditingUserId] = useState(null);
    const [showAddEditCard, setShowAddEditCard] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/users', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data.filter(user => user.role !== 'admin')); // Exclude users with role 'admin'
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        fetchUsers();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Check if username already exists
            const response = await fetch('http://localhost:8080/api/users', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const existingUsers = await response.json();
            const isUsernameTaken = existingUsers.some(user => user.username === newUser.username && user.id !== editingUserId);

            if (isUsernameTaken) {
                alert('Username already taken/user exists');
                return;
            }

            if (editingUserId) {
                const response = await fetch(`http://localhost:8080/api/users/${editingUserId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                });
                if (!response.ok) {
                    throw new Error('Failed to update user');
                }
                const updatedUser = await response.json();
                setUsers(prevUsers => prevUsers.map(user => user.id === editingUserId ? updatedUser : user));
            } else {
                const response = await fetch('http://localhost:8080/api/users', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ ...newUser })
                });
                if (!response.ok) {
                    throw new Error('Failed to add new user');
                }
                const addedUser = await response.json();
                setUsers(prevUsers => [...prevUsers, addedUser]);
            }
            resetForm();
        } catch (error) {
            console.error('Error adding/updating user:', error);
        }
    };

    const handleEditUser = (user) => {
        setNewUser(user);
        setEditingUserId(user.id);
        setShowAddEditCard(true);
    };

    const handleDeleteUser = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/users/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete user');
            }
            setUsers(prevUsers => prevUsers.filter(user => user.id !== id));
            if (editingUserId === id) {
                resetForm();
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const resetForm = () => {
        setNewUser({
            username: '',
            password: '',
            role: ''
        });
        setEditingUserId(null);
        setShowAddEditCard(false);
    };

    return (
        <div className="max-w-screen-lg mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-4">Manage Users</h2>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Id</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(user => (
                        <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{user.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.username}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{user.role}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-red-600 hover:text-red-900 mr-2 p-2 border border-2" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                                <button className="text-indigo-600 hover:text-indigo-900 mr-2 p-2 border border-2" onClick={() => handleEditUser(user)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4 mb-4">
                <button
                    onClick={() => showAddEditCard ? resetForm() : setShowAddEditCard(true)}
                    className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    {showAddEditCard ? 'Close Form' : 'Add User'}
                </button>
            </div>

            {showAddEditCard && (
                <div className="max-w-lg bg-white shadow-md rounded-lg overflow-hidden mx-auto mb-4">
                    <div className="px-6 py-4">
                        <h3 className="text-lg font-semibold mb-4">{editingUserId ? 'Edit User' : 'Add User'}</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="username">Username:</label>
                                <input type="text" id="username" name="username" value={newUser.username} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                            </div>
                            <div className="flex flex-col mb-4 relative">
                                <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password:</label>
                                <input type={showPassword ? 'text' : 'password'} id="password" name="password" value={newUser.password} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center mt-4"
                                    onClick={togglePasswordVisibility}
                                >
                                    {!showPassword ? (
                                        'show'
                                    ) : (
                                        'hide'
                                    )}
                                </button>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="role">Role:</label>
                                <select id="role" name="role" value={newUser.role} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required>
                                    <option value="">Select Role</option>
                                    <option value="user">User</option>
                                    <option value="manager">Manager</option>
                                </select>
                            </div>
                            <div className="flex justify-center">
                                <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                                    {editingUserId ? 'Update User' : 'Add User'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageUsers;
