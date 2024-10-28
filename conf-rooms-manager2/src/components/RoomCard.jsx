/* eslint-disable no-unused-vars */
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function RoomCard({ roomName, url, capacity, availability, roomId, isPending, bookRoom }) {
    const [loggedInAdmin, setLoggedInAdmin] = useState(localStorage.getItem('user') === 'admin');

    return (
        <div className="flex flex-row w-full my-2 p-3 border rounded items-center">
            <div className="w-1/3">
                <img src={url} alt={roomName} className="w-full h-auto rounded" />
            </div>
            <div className="w-1/3 ml-4 font-medium">
                <h2 className="text-xl font-bold">{roomName}</h2>
                <p>Capacity: {capacity}</p>
                <p>Availability: {availability ? 'Available' : 'Under Maintenance'}</p>
            </div>
            {!loggedInAdmin && (
                <div className="w-1/3 ml-4 flex justify-end">
                    <button
                        className={`p-2 rounded ${availability ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black cursor-not-allowed'}`}
                        onClick={bookRoom}
                        disabled={!availability || isPending}
                    >
                        {isPending ? 'Requested' : 'Book Room'}
                    </button>
                </div>
            )}
        </div>
    );
}

export default RoomCard;
