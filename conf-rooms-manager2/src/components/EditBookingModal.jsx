import { useState, useEffect } from 'react';

const EditBookingModal = ({ isOpen, onClose, onSave, booking }) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [numPeople, setNumPeople] = useState('');
    const [userId, setUserId] = useState('');

    useEffect(() => {
        if (booking) {
            setStartTime(booking.startTime);
            setEndTime(booking.endTime);
            setNumPeople(booking.numPeople);
            setUserId(booking.userId);
        }
    }, [booking]);

    if (!isOpen) return null;

    const handleSave = () => {
        onSave({ ...booking, startTime, endTime, numPeople, userId });
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-3xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                >
                    &times;
                </button>
                <h2 className="text-xl mb-4">Edit Booking</h2>
                <div className="mb-2">
                    <label className="block">Start Time</label>
                    <input
                        type="datetime-local"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block">End Time</label>
                    <input
                        type="datetime-local"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block">Number of People</label>
                    <input
                        type="number"
                        value={numPeople}
                        onChange={(e) => setNumPeople(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="mb-2">
                    <label className="block">User ID</label>
                    <input
                        type="text"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        className="border p-2 w-full"
                    />
                </div>
                <div className="flex justify-end mt-4">
                    <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">Cancel</button>
                    <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
                </div>
            </div>
        </div>
    );
};

export default EditBookingModal;
