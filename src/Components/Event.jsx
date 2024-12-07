import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import EachEvent from "./EachEvent";
import { Link } from "react-router-dom";

function Event() {
    const [events, setEvents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [filteredEvents, setFilteredEvents] = useState([]);
    const [viewMode, setViewMode] = useState("list"); // 'list' or 'calendar'
    const role = localStorage.getItem("role");

    useEffect(() => {
        // Fetch all events from the backend
        const fetchEvents = async () => {
            const res = await fetch("https://education-community-platform-backend.onrender.com/events");
            const data = await res.json();
            setEvents(data);
        };
        fetchEvents();
    }, []);

    useEffect(() => {
        // Filter events based on the selected date
        const dateEvents = events.filter(
            (event) =>
                new Date(event.date).toDateString() === selectedDate.toDateString()
        );
        setFilteredEvents(dateEvents);
    }, [selectedDate, events]);

    async function handleRSVP(id) {
        const user = "testuser@example.com"; // Replace with dynamic user data
        await fetch(`https://education-community-platform-backend.onrender.com/events/${id}/rsvp`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user }),
        });
        alert("RSVP Successful");
    };

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold mb-4 text-center">Events</h1>
            {/* View Toggle */}
            <div className="flex items-center mb-4">
                <button
                    className={`py-2 px-4 rounded ${viewMode === "list" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setViewMode("list")}
                >
                    List View
                </button>
                <button
                    className={`py-2 px-4 ml-2 rounded ${viewMode === "calendar" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
                    onClick={() => setViewMode("calendar")}
                >
                    Calendar View
                </button>
                {/* Display on the basis of role */}
                {role === "Admin" || role === "Tutor" ?
                    <Link to="/addEvent">
                        <button className="py-2 px-4 ml-2 rounded bg-gray-200 hover:bg-blue-500 hover:text-white">Add Event</button>
                    </Link> :
                    <></>
                }
            </div>

            {/* List View */}
            {viewMode === "list" && (
                <div>
                    {events.map((event) => (
                        <EachEvent key={event._id} event={event} onRSVP={handleRSVP} />
                    ))}
                </div>
            )}

            {/* Calendar View */}
            {viewMode === "calendar" && (
                <div className="mt-4">
                    <Calendar
                        onChange={setSelectedDate}
                        value={selectedDate}
                        tileContent={({ date }) => {
                            // Highlight dates with events
                            const isEventDate = events.some(
                                (event) => new Date(event.date).toDateString() === date.toDateString()
                            );
                            return isEventDate ? <div className="bg-blue-500 text-white text-center rounded-full">•</div> : null;
                        }}
                    />
                    <h2 className="text-2xl font-bold mt-4">
                        Events on {selectedDate.toDateString()}
                    </h2>
                    <div>
                        {filteredEvents.length > 0 ? (
                            filteredEvents.map((event) => (
                                <EachEvent key={event._id} event={event} onRSVP={handleRSVP} />
                            ))
                        ) : (
                            <p className="text-gray-500">No events on this date.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Event;