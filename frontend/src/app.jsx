import React from 'react';
import CalendarView from './components/CalendarView';


export default function App() {
  return (
    <div className="app-root">
      <header className="header">
        <h1>Calendar Clone</h1>
      </header>
      <main>
        <CalendarView />
      </main>
    </div>
  );
}
