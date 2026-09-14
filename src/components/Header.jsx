import { useState } from 'react';

const BASE = import.meta.env.BASE_URL;

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <a href={BASE} className="logo">
          <span>🎮</span> Game Makers
        </a>
        <button
          className="mobile-toggle"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          ☰
        </button>
        <nav className={`nav${open ? ' open' : ''}`}>
          <a href={BASE} className="active" onClick={() => setOpen(false)}>Home</a>
          <a href="#games" onClick={() => setOpen(false)}>Games</a>
          <a href="#how-it-works" onClick={() => setOpen(false)}>How It Works</a>
          <a href="#learn" onClick={() => setOpen(false)}>About</a>
        </nav>
      </div>
    </header>
  );
}
