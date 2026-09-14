const BASE = import.meta.env.BASE_URL;

const games = [
  {
    emoji: '⭐',
    title: 'Count the Stars',
    description: 'Count the stars and learn how buttons, variables, and game logic work.',
    difficulty: 'Beginner',
    time: '30–45 min',
    link: `${BASE}count-the-stars/tutorial.html`,
  },
  {
    emoji: '🪨 📄 ✂️',
    title: 'Rock Paper Scissors',
    description: 'Build the classic game and learn about conditions, random choices, and score tracking.',
    difficulty: 'Beginner',
    time: '30–45 min',
    link: `${BASE}rock-paper-scissors/tutorial.html`,
  },
];

export default function GameCards() {
  return (
    <section id="games" className="section">
      <div className="section-header">
        <h2>🎯 Start Making!</h2>
        <p>Pick a game and start your coding adventure.</p>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <div className="game-card" key={game.title}>
            <div className="game-card-emoji">{game.emoji}</div>
            <h3>{game.title}</h3>
            <p>{game.description}</p>
            <div className="game-card-meta">
              <span className="meta-tag beginner">{game.difficulty}</span>
              <span className="meta-tag time">⏱ {game.time}</span>
            </div>
            <a href={game.link} className="btn btn-primary">Start Tutorial ➜</a>
          </div>
        ))}
      </div>
    </section>
  );
}
