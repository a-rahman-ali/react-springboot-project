import { useState } from 'react';

const Login = () => {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    const [adminLoginForm, setAdminLoginForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username: usernameInput, password: passwordInput }),
            });

            if (response.status === 401) {
                throw new Error('Invalid login credentials');
                // console.warn("Invalid login credentials");

            }
            if (!response.ok) {
                throw new Error('Network response was not ok');
                // console.warn("Invalid login credentials");
            }

            const data = await response.json();
            console.log(loggedIn);
            // console.log(data);
            const jwtToken = data.jwt; // Extract the JWT token from the response
            const username = data.username;
            const role = data.role;

            if (!jwtToken) {
                throw new Error('JWT token not found in the response');
            }

            // Store JWT token and user details in local storage
            localStorage.setItem('token', jwtToken);
            localStorage.setItem('user', username);
            localStorage.setItem('role', role);

            setLoggedIn(true);

            // Redirect based on user role
            if (role === 'admin') {
                location.href = '/admin-home';
            } else if (role === 'user' || role === 'manager') {
                location.href = '/home';
            }
        } catch (error) {
            console.error('Login error:', error);
            setError('Invalid username or password. Please try again.');
        }
    };


    return (
        <div className="min-h-screen bg-gray-100 flex justify-center items-center">
            <div className="max-w-md w-full px-6 py-8 bg-white shadow-md rounded-md">
                {adminLoginForm && <h2 className='text-2xl font-italic text-center mb-6'>Admin Login</h2>}
                {!adminLoginForm && <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>}
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label htmlFor="usernameInput" className="block text-sm font-medium text-gray-700">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="usernameInput"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={usernameInput}
                            onChange={(e) => setUsernameInput(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6 relative">
                        <label htmlFor="passwordInput" className="block text-sm font-medium text-gray-700">
                            Password:
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="passwordInput"
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            value={passwordInput}
                            onChange={(e) => setPasswordInput(e.target.value)}
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 mt-4"
                        >
                            {showPassword ? 'hide' : 'show'}
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-black-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        Login
                    </button>
                    <p className='mt-4 text-center text-lg cursor-pointer underline'>
                        {
                            adminLoginForm ? (
                                <span
                                    onClick={() => setAdminLoginForm(false)}
                                    className="text-gray-600 hover:text-gray-400"
                                >
                                    Login as a User
                                </span>
                            ) : (
                                <span
                                    onClick={() => setAdminLoginForm(true)}
                                    className="text-red-600 hover:text-red-400"
                                >
                                    Login as an Admin
                                </span>
                            )
                        }
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
