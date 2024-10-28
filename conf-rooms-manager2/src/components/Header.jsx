import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
    const redirect = (e) => {
        if (isLoggedIn) {
            e.preventDefault();
            location.href = '/home';
        } else {
            e.preventDefault();
            alert('You must be logged in');
            location.href = '/login';
        }
    };
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user'));
    const [isAdmin] = useState(localStorage.getItem('user') === 'admin');

    return (
        <>
            <header className="shadow sticky z-50 top-0">
                <nav className="bg-white border-gray-200 px-4 lg:px-6">
                    <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                        <div onClick={redirect} className="flex items-center cursor-pointer">
                            <img
                                src="https://www.ece.ufl.edu/wp-content/uploads/2023/09/non-zoom-meeting.png"
                                className="mr-3 h-16"
                                alt="Logo"
                            />
                            <h4>Conference Rooms Manager</h4>
                        </div>
                        
                        {/* Main flex container to align navigation, username, and logout button */}
                        <div className="flex items-center lg:order-2 space-x-8">
                            {
                                (!isAdmin && isLoggedIn) && (
                                    <>
                                        <NavLink
                                            to="home"
                                            className={({ isActive }) =>
                                                `block py-2 pr-4 pl-3 duration-200 font-medium no-underline ${isActive ? "text-orange-700" : "text-gray-700"} 
                                                border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                            }
                                        >
                                            Home
                                        </NavLink>
                                        <NavLink
                                            to="history"
                                            className={({ isActive }) =>
                                                `block py-2 pr-4 pl-3 duration-200 font-medium no-underline ${isActive ? "text-orange-700" : "text-gray-700"} 
                                                border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                            }
                                        >
                                            History
                                        </NavLink>
                                    </>
                                )
                            }
                            
                            {
                                isLoggedIn && (
                                    <span className="text-gray-700 font-bold border border-dotted border-gray-500 px-3 py-1 rounded">
                                        {localStorage.getItem('user')?.toLocaleUpperCase()}
                                    </span>
                                )
                            }
                            
                            {/* Logout button */}
                            <button
                                onClick={(e) => {
                                    if (localStorage.getItem('user')) {
                                        setIsLoggedIn(!isLoggedIn);
                                    }
                                    localStorage.removeItem('user');
                                    localStorage.removeItem('role');
                                    localStorage.removeItem('token');
                                    location.href = "/login";
                                    e.preventDefault();
                                }}
                                className="text-gray-800 hover:bg-gray-300 focus:ring-4 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 focus:outline-none"
                            >
                                {isLoggedIn ? "Logout" : "Login"}
                            </button>
                        </div>

                        {
                            isAdmin && (
                                <div
                                    className="flex justify-between items-center lg:w-auto lg:order-1 space-x-8"
                                    id="admin-menu"
                                >
                                    <NavLink
                                        to="/admin-home"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 no-underline ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        Home
                                    </NavLink>
                                    <NavLink
                                        to="manage-users"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 no-underline ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        Users
                                    </NavLink>
                                    <NavLink
                                        to="manage-rooms"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 no-underline ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        Rooms
                                    </NavLink>
                                    <NavLink
                                        to="manage-bookings"
                                        className={({ isActive }) =>
                                            `block py-2 pr-4 pl-3 duration-200 no-underline ${isActive ? "text-orange-700" : "text-gray-700"} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 hover:text-orange-700 lg:p-0`
                                        }
                                    >
                                        Bookings
                                    </NavLink>
                                </div>
                            )
                        }
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Header;
