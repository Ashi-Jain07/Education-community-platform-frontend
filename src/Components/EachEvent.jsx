import React from "react";

function EachEvent({ event, onRSVP }) {

    const role = localStorage.getItem("role");

    //Api for Delete event from database
    async function handleDeleteEvent(id) {
        try {
            const response = await fetch(`https://education-community-platform-backend.onrender.com/deleteEvent/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message);
            }

            const data = await response.json();
            alert("Event Deleted")
            window.location.reload()

        } catch (error) {
            console.error('Error fetching Events:', error);
            alert(error)
        }
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 mb-4">
            {/* Display on the basis of role */}
            {role === "Admin" || role === "Tutor" ?
                <div className="flex justify-between">
                    <h2 className="text-xl font-bold">{event.title}</h2>
                    <button onClick={() => handleDeleteEvent(event._id)}>🗑️</button>
                </div> :
                <h2 className="text-xl font-bold">{event.title}</h2>
            }
            <p>{event.description}</p>
            <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Location:</strong> {event.location}</p>
            <p><strong>Capacity:</strong> {event.attendees.length}/{event.capacity}</p>
            {role === "Admin" || role === "Tutor" ?
                <button
                    className="mt-2 bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
                    onClick={() => onRSVP(event._id)}
                >
                    RSVP
                </button> :
                <></>
            }
        </div>
    );
};

export default EachEvent;