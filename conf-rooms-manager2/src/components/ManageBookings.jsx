import { useState, useEffect } from 'react';
import EditBookingModal from './EditBookingModal';

function ManageBookings() {
    const [pendingBookings, setPendingBookings] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const pendingResponse = await fetch('http://localhost:8080/api/pending-bookings', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    method: 'GET'
                });
                const confirmedResponse = await fetch('http://localhost:8080/api/bookings', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    method: 'GET'
                });
                if (!pendingResponse.ok || !confirmedResponse.ok) {
                    throw new Error('Network response was not ok');
                }
                const pendingData = await pendingResponse.json();
                // console.log(pendingData);

                const confirmedData = await confirmedResponse.json();
                // console.log(confirmedData);

                setPendingBookings(pendingData);
                setBookings(confirmedData);
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };
        fetchBookings();
    }, []);

    const handleApprove = async (bookingId) => {
        try {
            const bookingToApprove = pendingBookings.find(booking => booking.id === bookingId);

            // Add to confirmed bookings
            const response = await fetch('http://localhost:8080/api/bookings', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookingToApprove)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // Remove from pending bookings
            await fetch(`http://localhost:8080/api/pending-bookings/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Add to history
            await fetch('http://localhost:8080/api/history', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...bookingToApprove, status: 'approved' })
            });

            setPendingBookings(pendingBookings.filter(booking => booking.id !== bookingId));
            setBookings([...bookings, bookingToApprove]);
        } catch (error) {
            console.error('Error approving booking:', error);
        }
    };

    const handleDismiss = async (bookingId) => {
        try {
            const bookingToDismiss = pendingBookings.find(booking => booking.id === bookingId);
            console.log(bookingToDismiss.id);

            // Remove from pending bookings
            await fetch(`http://localhost:8080/api/pending-bookings/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            // Add to history
            await fetch('http://localhost:8080/api/history', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...bookingToDismiss, status: 'dismissed' })
            });

            setPendingBookings(pendingBookings.filter(booking => booking.id !== bookingId));
        } catch (error) {
            console.error('Error dismissing booking:', error);
        }
    };

    const handleEdit = (booking) => {
        setEditingBooking(booking);
        setIsEditModalOpen(true);
    };

    const handleSaveEdit = async (updatedBooking) => {
        try {
            const response = await fetch(`http://localhost:8080/api/bookings/${updatedBooking.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedBooking)
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            setBookings(bookings.map(booking => booking.id === updatedBooking.id ? updatedBooking : booking));
        } catch (error) {
            console.error('Error editing booking:', error);
        }
    };

    const handleDelete = async (bookingId) => {
        try {
            await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            setBookings(bookings.filter(booking => booking.id !== bookingId));
        } catch (error) {
            console.error('Error deleting booking:', error);
        }
    };

    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString();
        return { formattedDate, formattedTime };
    };

    return (
        <div className="flex flex-col mx-3 my-3">
            <h2 className="text-2xl font-bold mb-4">Manage Bookings</h2>

            <h3 className="text-xl font-semibold mb-2">Confirmed Bookings</h3>
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
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => {
                        const { formattedDate: startDate, formattedTime: startTime } = formatDateTime(booking.startTime);
                        const { formattedDate: endDate, formattedTime: endTime } = formatDateTime(booking.endTime);
                        return (
                            <tr key={booking.id}>
                                <td className="border p-2">{booking.roomId}</td>
                                <td className="border p-2">{booking.userId}</td>
                                <td className="border p-2">{startDate}</td>
                                <td className="border p-2">{startTime}</td>
                                <td className="border p-2">{endDate}</td>
                                <td className="border p-2">{endTime}</td>
                                <td className="border p-2">{booking.numPeople}</td>
                                <td className="border p-2">
                                    <button
                                        className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                                        onClick={() => handleEdit(booking)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleDelete(booking.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <h3 className="text-xl font-semibold mb-2">Pending Bookings</h3>
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
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pendingBookings.map(booking => {
                        const { formattedDate: startDate, formattedTime: startTime } = formatDateTime(booking.startTime);
                        // console.log(booking.roomId);

                        const { formattedDate: endDate, formattedTime: endTime } = formatDateTime(booking.endTime);
                        return (
                            <tr key={booking.id}>
                                <td className="border p-2">{booking.roomId}</td>
                                <td className="border p-2">{booking.userId}</td>
                                <td className="border p-2">{startDate}</td>
                                <td className="border p-2">{startTime}</td>
                                <td className="border p-2">{endDate}</td>
                                <td className="border p-2">{endTime}</td>
                                <td className="border p-2">{booking.numPeople}</td>
                                <td className="border p-2">
                                    <button
                                        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                                        onClick={() => handleApprove(booking.id)}
                                    >
                                        Approve
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded"
                                        onClick={() => handleDismiss(booking.id)}
                                    >
                                        Dismiss
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <EditBookingModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSave={handleSaveEdit}
                booking={editingBooking}
            />
        </div>
    );
}

export default ManageBookings;
