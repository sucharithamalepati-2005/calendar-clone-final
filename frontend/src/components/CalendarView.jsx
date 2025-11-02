import React, { useState, useEffect, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../api';
import EventModal from './EventModal';

/*
 This component loads events from backend and renders FullCalendar.
 It supports:
  - clicking to create an event (select)
  - clicking an event to edit/delete
  - drag/drop and resize to update event times
*/

export default function CalendarView() {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const calendarRef = useRef(null);

  async function load() {
    const data = await fetchEvents();
    // convert to fullcalendar event format
    setEvents(data.map(e => ({
      id: e.id,
      title: e.title,
      start: e.start,
      end: e.end,
      allDay: e.allDay,
      extendedProps: { description: e.description, color: e.color, recurrence: e.recurrence },
      backgroundColor: e.color
    })));
  }

  useEffect(() => { load(); }, []);

  const handleSelect = (selectInfo) => {
    setSelectedRange({ start: selectInfo.startStr, end: selectInfo.endStr, allDay: selectInfo.allDay });
    setSelectedEvent(null);
    setModalOpen(true);
  };

  const handleEventClick = (clickInfo) => {
    const ev = clickInfo.event;
    setSelectedEvent({
      id: ev.id,
      title: ev.title,
      start: ev.startStr,
      end: ev.endStr,
      allDay: ev.allDay,
      description: ev.extendedProps.description || '',
      color: ev.extendedProps.color || '#3788d8'
    });
    setModalOpen(true);
  };

  const handleEventDrop = async (changeInfo) => {
    const ev = changeInfo.event;
    try {
      await updateEvent(ev.id, { title: ev.title, start: ev.start, end: ev.end, allDay: ev.allDay });
      load();
    } catch (err) {
      console.error(err);
      load();
    }
  };

  const handleEventResize = async (resizeInfo) => {
    const ev = resizeInfo.event;
    try {
      await updateEvent(ev.id, { title: ev.title, start: ev.start, end: ev.end, allDay: ev.allDay });
      load();
    } catch (err) {
      console.error(err);
      load();
    }
  };

  const handleSave = async (payload) => {
    if (payload.id) {
      await updateEvent(payload.id, payload);
    } else {
      await createEvent(payload);
    }
    setModalOpen(false);
    load();
  };

  const handleDelete = async (id) => {
    await deleteEvent(id);
    setModalOpen(false);
    load();
  };

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        selectable={true}
        editable={true}
        select={handleSelect}
        eventClick={handleEventClick}
        events={events}
        ref={calendarRef}
        eventDrop={handleEventDrop}
        eventResize={handleEventResize}
        height="auto"
      />

      {modalOpen && (
        <EventModal
          initialRange={selectedRange}
          eventData={selectedEvent}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
