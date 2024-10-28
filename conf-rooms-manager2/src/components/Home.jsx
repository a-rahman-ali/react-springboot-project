import { useState, useEffect } from 'react';
import RoomCard from './RoomCard';
import BookingModal from './BookingModal';
import LoadingEffect from './LoadingEffect'; 

function Home() {
    const [rooms, setRooms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedRoomId, setSelectedRoomId] = useState(0);
    const [pendingBookings, setPendingBookings] = useState([]);
    const [isLoading, setIsLoading] = useState(true); 
    const token = localStorage.getItem('token');

    // Fetch meeting rooms from the backend
    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/rooms`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setRooms(data);
                setTimeout(() => {
                    setIsLoading(false); 
                }, 1000);
            } catch (error) {
                console.error('Error fetching rooms:', error);
                setIsLoading(false); 
            }
        };

        fetchRooms();
    }, [token]);

    const handleBookRoom = (roomId) => {
        setSelectedRoomId(roomId);
        setIsModalOpen(true);
    };

    const handleSaveBooking = async (bookingData) => {
        const userRole = localStorage.getItem('role');
        const endpoint = userRole === 'manager' ? 'bookings' : 'pending-bookings';

        try {
            const response = await fetch(`http://localhost:8080/api/${endpoint}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    startTime: bookingData.startTime,
                    endTime: bookingData.endTime,
                    numPeople: bookingData.numPeople,
                    userId: bookingData.userId,
                    roomId: bookingData.roomId,
                }),
            });

            if (response.ok) {
                if (userRole === 'manager') {
                    console.log('Booking saved directly');
                } else {
                    setPendingBookings([...pendingBookings, { roomId: bookingData.roomId }]);
                }
                setIsModalOpen(false);
            } else {
                console.error('Failed to save booking');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="flex flex-col mx-3 my-3">
            {isLoading ? ( 
                <LoadingEffect />
            ) : (
                rooms.map((room) => (
                    <RoomCard
                        key={room.id}
                        roomName={room.name}
                        url={room.url}
                        capacity={room.capacity}
                        availability={room.availability}
                        roomId={room.id}
                        isPending={pendingBookings.some((booking) => booking.roomId === room.id)}
                        bookRoom={() => handleBookRoom(room.id)}
                    />
                ))
            )}

            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSaveBooking}
                roomId={selectedRoomId}
                roomCapacity={rooms.find((room) => room.id === selectedRoomId)?.capacity}
            />
        </div>
    );
}

export default Home;
