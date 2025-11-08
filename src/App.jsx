import { useState } from "react";

export default function CalendarApp() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [events, setEvents] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [eventText, setEventText] = useState("");

  const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const addEvent = () => {
    if (!eventText.trim() || !selectedDate) return;

    setEvents(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), eventText],
    }));
    setEventText("");
  };

  const handlePrevMonth = () => {
    if (month === 0) {
      setYear(year - 1);
      setMonth(11);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 11) {
      setYear(year + 1);
      setMonth(0);
    } else {
      setMonth(month + 1);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold text-center mb-3">Calendar</h1>

      {/* Month Navigation */}
      <div className="flex justify-between items-center mb-3">
        <button onClick={handlePrevMonth} className="bg-gray-300 rounded px-3 py-1">Prev</button>
        <h2 className="text-xl font-semibold">{months[month]} {year}</h2>
        <button onClick={handleNextMonth} className="bg-gray-300 rounded px-3 py-1">Next</button>
      </div>

      {/* Days Row */}
      <div className="grid grid-cols-7 text-center font-medium">
        {days.map(d => <div key={d}>{d}</div>)}
      </div>

      {/* Dates */}
      <div className="grid grid-cols-7 gap-1 text-center mt-2 text-sm">
        {Array(firstDay).fill(null).map((_, i) => <div key={i}></div>)}

        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
          const key = `${year}-${month + 1}-${day}`;
          return (
            <button
              key={day}
              onClick={() => setSelectedDate(key)}
              className={`p-2 border rounded hover:bg-gray-200 ${selectedDate === key ? "bg-blue-200" : ""}`}
            >
              {day}
              {events[key] && <div className="text-green-600 text-[10px]">•</div>}
            </button>
          );
        })}
      </div>

      {/* Event Box */}
      {selectedDate && (
        <div className="mt-4 p-4 border rounded shadow">
          <h2 className="font-semibold mb-2">Events on {selectedDate}</h2>
          <input
            className="w-full p-2 border rounded mb-2"
            placeholder="Add event"
            value={eventText}
            onChange={(e) => setEventText(e.target.value)}
          />
          <button onClick={addEvent} className="w-full bg-blue-500 text-white p-2 rounded">Add Event</button>

          <ul className="mt-3 text-sm">
            {events[selectedDate]?.map((ev, i) => (
              <li key={i} className="bg-gray-100 p-1 rounded mt-1">{ev}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
