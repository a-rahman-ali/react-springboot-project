import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // const response = await fetch('http://localhost:3000/users?username=' + username);
            const response = await fetch(`http://localhost:8080/api/users?username=${username}`);

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const users = await response.json();

            if (users.length === 0) {
                throw new Error('User not found');
            }

            const user = users[0];
            console.log(user);
            if (user.password !== password) {
                throw new Error('Invalid password');
            }

            localStorage.setItem('user', user.username);
            if (user.role === 'admin') {
                navigate('/admin-home');
            } else {
                throw new Error('Not an admin user');
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid username or password. Please try again.');
            if (error.message === 'Not an admin user') {
                alert('You are trying to log in as a user, please use the user login page.');
            }
        }
    };

    return (
        <div className="min-h-screen bg-red-100 flex justify-center items-center">
            <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-semibold text-center mb-6">Admin Login</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                    <p className='mt-4 text-center text-lg cursor-pointer underline'>
                        <span
                            onClick={() => {
                                // alert('You are trying to log in as a user, please use the user login page.');
                                navigate('/login');
                            }}
                            className="text-gray-600 hover:text-gray-400"
                        >
                            Login as a User
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;
