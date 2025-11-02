import axios from 'axios';
const API = axios.create({
  baseURL: 'http://localhost:4000/api'
});

export const fetchEvents = () => API.get('/events').then(r => r.data);
export const createEvent = (payload) => API.post('/events', payload).then(r => r.data);
export const updateEvent = (id, payload) => API.put(`/events/${id}`, payload).then(r => r.data);
export const deleteEvent = (id) => API.delete(`/events/${id}`).then(r => r.data);
