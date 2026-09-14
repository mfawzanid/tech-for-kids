export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-decor d1">⭐</div>
      <div className="hero-decor d2">🎮</div>
      <div className="hero-decor d3">💡</div>
      <div className="hero-decor d4">🚀</div>
      <div className="hero-decor d5">🧩</div>
      <div className="hero-decor d6">&lt;/&gt;</div>
      <div className="hero-decor d7">✨</div>

      <div className="hero-content">
        <div className="hero-emoji">🎮 🧩 💡</div>
        <h1>Learn to Make Your Own Games!</h1>
        <p>Fun, simple projects that help kids discover how games are made.</p>
        <div className="hero-btns">
          <a href="#games" className="btn btn-primary">🎮 Explore Games</a>
          <a href="#how-it-works" className="btn btn-secondary">📖 How It Works</a>
        </div>
      </div>
    </section>
  );
}
