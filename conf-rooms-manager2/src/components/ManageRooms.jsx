import { useState, useEffect } from 'react';

function ManageRooms() {
    const [rooms, setRooms] = useState([]);
    const [newRoom, setNewRoom] = useState({
        name: '',
        capacity: '',
        availability: true,
        url: ''
    });
    const [editingRoomId, setEditingRoomId] = useState(null);
    const [showAddEditCard, setShowAddEditCard] = useState(false);

    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/rooms', {
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
                setRooms(data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };
        fetchRooms();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;
        setNewRoom(prevRoom => ({
            ...prevRoom,
            [name]: inputValue
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingRoomId) {
                const response = await fetch(`http://localhost:8080/api/rooms/${editingRoomId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newRoom)
                });
                if (!response.ok) {
                    throw new Error('Failed to update room');
                }
                const updatedRoom = await response.json();
                setRooms(prevRooms => prevRooms.map(room => room.id === editingRoomId ? updatedRoom : room));
            } else {
                const response = await fetch('http://localhost:8080/api/rooms', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newRoom)
                });
                if (!response.ok) {
                    throw new Error('Failed to add new room');
                }
                const addedRoom = await response.json();
                setRooms(prevRooms => [...prevRooms, addedRoom]);
            }
            setNewRoom({
                name: '',
                capacity: '',
                availability: true,
                url: ''
            });
            setEditingRoomId(null);
            setShowAddEditCard(false);
        } catch (error) {
            console.error('Error adding/updating room:', error);
        }
    };

    const handleEditRoom = (room) => {
        setNewRoom({
            ...room,
            availability: room.availability || false
        });
        setEditingRoomId(room.id);
        setShowAddEditCard(true);
    };

    const handleDeleteRoom = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/rooms/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to delete room');
            }
            setRooms(prevRooms => prevRooms.filter(room => room.id !== id));
            if (editingRoomId === id) {
                setEditingRoomId(null);
                setNewRoom({
                    name: '',
                    capacity: '',
                    availability: true,
                    url: ''
                });
                setShowAddEditCard(false);
            }
        } catch (error) {
            console.error('Error deleting room:', error);
        }
    };

    return (
        <div className="max-w-screen-lg mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-4">Manage Rooms</h2>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Availability</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {rooms.map(room => (
                        <tr key={room.id}>
                            <td className="px-6 py-4 whitespace-nowrap">{room.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{room.capacity}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{room.availability ? 'true' : 'false'}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button className="text-red-600 hover:text-red-400 mr-2 p-2 border border-2" onClick={() => handleDeleteRoom(room.id)}>Delete</button>
                                <button className="text-indigo-600 hover:text-indigo-400 p-2 border border-2" onClick={() => handleEditRoom(room)}>Edit</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="flex justify-center mt-4 mb-4">
                <button
                    onClick={() => setShowAddEditCard(!showAddEditCard)}
                    className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
                >
                    {showAddEditCard ? 'Close Form' : 'Add Room'}
                </button>
            </div>

            {showAddEditCard && (
                <div className="max-w-lg bg-white shadow-md rounded-lg overflow-hidden mx-auto mb-4">
                    <div className="px-6 py-4">
                        <h3 className="text-lg font-semibold mb-4">Add/Edit Room</h3>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name:</label>
                                <input type="text" id="name" name="name" value={newRoom.name} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="capacity">Capacity:</label>
                                <input type="number" id="capacity" name="capacity" min={1} value={newRoom.capacity} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                            </div>
                            <div className="flex items-center mb-4">
                                <input type="checkbox" id="availability" name="availability" checked={newRoom.availability} onChange={handleInputChange} className="mr-2 focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                                <label htmlFor="availability" className="text-sm text-gray-700">Available</label>
                            </div>
                            <div className="flex flex-col mb-4">
                                <label className="text-sm font-medium text-gray-700 mb-1" htmlFor="url">Image URL:</label>
                                <input type="text" id="url" name="url" value={newRoom.url} onChange={handleInputChange} className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" required />
                            </div>
                            <div className="flex flex-col justify-center items">
                                <button type="submit" className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
                                    {editingRoomId ? 'Update Room' : 'Add Room'}
                                </button>
                                {editingRoomId && (
                                    <button type="button" onClick={() => setEditingRoomId(null)} className="ml-2 text-gray-600 hover:text-gray-900 focus:outline-none">
                                        Cancel
                                    </button>
                                )}
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ManageRooms;
