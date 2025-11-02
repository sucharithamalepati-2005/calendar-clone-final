import React from 'react';
import './EventModal.css'; // optional if you want custom styles
import './EventModal.css';

export default function CreateEventModal({ onClose, onSave }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const payload = Object.fromEntries(formData.entries());
    onSave(payload);
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3 style={{ marginBottom: '10px' }}>Create Event</h3>
        <form onSubmit={handleSubmit}>
          <label>Title</label><br />
          <input type="text" name="title" required style={styles.input} /><br />

          <label>Description</label><br />
          <textarea name="description" style={styles.textarea} /><br />

          <label>Start Date</label><br />
          <input type="datetime-local" name="start" required style={styles.input} /><br />

          <label>End Date</label><br />
          <input type="datetime-local" name="end" style={styles.input} /><br />

          <label>Color</label><br />
          <input type="color" name="color" defaultValue="#3788d8" style={{ ...styles.input, height: '40px' }} /><br />

          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
            <button type="button" onClick={onClose} style={styles.cancel}>Cancel</button>
            <button type="submit" style={styles.create}>Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.3)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    background: 'white',
    padding: '20px 30px',
    borderRadius: '10px',
    boxShadow: '0 0 20px rgba(0,0,0,0.2)',
    width: '400px',
  },
  input: {
    width: '100%',
    padding: '8px',
    marginTop: '4px',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    height: '80px',
    padding: '8px',
    marginTop: '4px',
    marginBottom: '10px',
  },
  cancel: {
    background: '#ccc',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  create: {
    background: '#007bff',
    color: 'white',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};
