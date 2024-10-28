import { useState, useEffect } from 'react';

function History() {
    const [history, setHistory] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [userId, setUserId] = useState(null);
    const username = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/users?username=${username}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const userData = await response.json();
                // console.log(`this is userData`);
                // console.log(userData)

                const user = userData.find(user => user.username === username);
                if (user) {
                    // console.log(user);

                    setUserId(user.id);
                } else {
                    console.error('User not found');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchHistory = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/history', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // console.log(`this is inside fetch history:`)
                // console.log(data)
                setHistory(data);
            } catch (error) {
                console.error('Error fetching history:', error);
            }
        };

        const fetchBookings = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/bookings', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    method: 'GET',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        fetchUserData();
        fetchHistory();
        fetchBookings();
    }, [username]);

    const userHistory = history.filter(entry => entry.userId === userId);
    // console.log(userHistory[0]);

    const userBookings = bookings.filter(entry => entry.userId === userId);
    // console.log(userBookings);

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        return { formattedDate, formattedTime };
    };

    return (
        <div className="flex flex-col mx-3 my-3">
            <h2 className="text-2xl font-bold mb-4">Booking History</h2>

            <h3 className="text-xl font-semibold mb-2">User History</h3>
            <table className="w-full table-auto border-collapse mb-6">
                <thead>
                    <tr>
                        <th className="border p-2">Room ID</th>
                        <th className="border p-2">User ID</th>
                        <th className="border p-2">Start Date</th>
                        <th className="border p-2">Start Time</th>
                        <th className="border p-2">End Date</th>
                        <th className="border p-2">End Time</th>
                        <th className="border p-2">Number of People</th>
                        <th className="border p-2">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {userHistory.map(entry => {
                        const { formattedDate: startDate, formattedTime: startTime } = formatDateTime(entry.startTime);
                        const { formattedDate: endDate, formattedTime: endTime } = formatDateTime(entry.endTime);
                        return (
                            <tr key={`history-${entry.id}`}>
                                <td className="border p-2">{entry.roomId}</td> {/* Adjusted based on nested objects */}
                                <td className="border p-2">{entry.userId}</td> {/* Adjusted based on nested objects */}
                                <td className="border p-2">{startDate}</td>
                                <td className="border p-2">{startTime}</td>
                                <td className="border p-2">{endDate}</td>
                                <td className="border p-2">{endTime}</td>
                                <td className="border p-2">{entry.numPeople}</td>
                                <td className="border p-2">{entry.status}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <h3 className="text-xl font-semibold mb-2">User Bookings</h3>
            <table className="w-full table-auto border-collapse mb-6">
                <thead>
                    <tr>
                        <th className="border p-2">Room ID</th>
                        <th className="border p-2">User ID</th>
                        <th className="border p-2">Start Date</th>
                        <th className="border p-2">Start Time</th>
                        <th className="border p-2">End Date</th>
                        <th className="border p-2">End Time</th>
                        <th className="border p-2">Number of People</th>
                    </tr>
                </thead>
                <tbody>
                    {userBookings.map(entry => {
                        const { formattedDate: startDate, formattedTime: startTime } = formatDateTime(entry.startTime);
                        const { formattedDate: endDate, formattedTime: endTime } = formatDateTime(entry.endTime);
                        return (
                            <tr key={`booking-${entry.id}`}>
                                <td className="border p-2">{entry.roomId}</td> 
                                <td className="border p-2">{entry.userId}</td> 
                                <td className="border p-2">{startDate}</td>
                                <td className="border p-2">{startTime}</td>
                                <td className="border p-2">{endDate}</td>
                                <td className="border p-2">{endTime}</td>
                                <td className="border p-2">{entry.numPeople}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default History;
