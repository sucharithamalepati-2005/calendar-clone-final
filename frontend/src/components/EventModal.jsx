// src/components/EventModal.jsx
import React, { useState, useEffect } from "react";
import "./EventModal.css";

export default function EventModal({ initialRange, eventData, onClose, onSave, onDelete }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    start: "",
    end: "",
    allDay: false,
    color: "#3788d8",
  });

  useEffect(() => {
    if (eventData) {
      setForm(eventData);
    } else if (initialRange) {
      setForm({
        title: "",
        description: "",
        start: initialRange.start,
        end: initialRange.end,
        allDay: initialRange.allDay,
        color: "#3788d8",
      });
    }
  }, [eventData, initialRange]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.start || !form.end) {
      alert("Please fill all required fields.");
      return;
    }
    onSave(form);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>{eventData ? "Edit Event" : "Create Event"}</h3>
        <form onSubmit={handleSubmit}>
          <label>Title</label>
          <input type="text" name="title" value={form.title} onChange={handleChange} required />

          <label>Description</label>
          <textarea name="description" value={form.description} onChange={handleChange}></textarea>

          <label>Start Date</label>
          <input type="datetime-local" name="start" value={form.start} onChange={handleChange} />

          <label>End Date</label>
          <input type="datetime-local" name="end" value={form.end} onChange={handleChange} />

          <label>
            <input type="checkbox" name="allDay" checked={form.allDay} onChange={handleChange} /> All Day
          </label>

          <label>Color</label>
          <input type="color" name="color" value={form.color} onChange={handleChange} />

          <div className="modal-actions">
            <button type="button" onClick={onClose}>Cancel</button>

            {/* ✅ Delete button only appears when editing an event */}
            {eventData?.id && (
              <button
                type="button"
                className="delete-btn"
                onClick={() => {
                  if (window.confirm("Are you sure you want to delete this event?")) {
                    onDelete(eventData.id);
                  }
                }}
              >
                Delete
              </button>
            )}

            <button type="submit">{eventData ? "Update" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
