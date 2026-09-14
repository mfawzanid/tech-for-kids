const steps = [
  { icon: '🎯', num: 'Step 1', title: 'Pick a Game', desc: 'Choose a fun game you want to create.' },
  { icon: '📝', num: 'Step 2', title: 'Follow the Steps', desc: 'Learn by building the game one small step at a time.' },
  { icon: '🚀', num: 'Step 3', title: 'Play Your Game', desc: 'Run your game and see what you created!' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section">
      <div className="section-header">
        <h2>📖 Learning Is Easy!</h2>
        <p>Three simple steps to make your first game.</p>
      </div>

      <div className="steps-grid">
        {steps.map((step) => (
          <div className="step-card" key={step.num}>
            <div className="step-icon">{step.icon}</div>
            <div className="step-num">{step.num}</div>
            <h3>{step.title}</h3>
            <p>{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
