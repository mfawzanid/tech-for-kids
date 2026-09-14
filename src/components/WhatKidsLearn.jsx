const skills = [
  { icon: '🎮', title: 'Game Logic', desc: 'How games decide who wins' },
  { icon: '📦', title: 'Variables', desc: 'Storing scores and choices' },
  { icon: '🔀', title: 'Conditions', desc: 'Making decisions with if/else' },
  { icon: '🔁', title: 'Loops', desc: 'Repeating actions automatically' },
  { icon: '👆', title: 'Events', desc: 'Responding to button clicks' },
  { icon: '🎨', title: 'HTML & CSS', desc: 'Making games look awesome' },
];

export default function WhatKidsLearn() {
  return (
    <section id="learn" className="section">
      <div className="section-header">
        <h2>💡 What Will You Learn?</h2>
        <p>Real programming concepts, explained simply.</p>
      </div>

      <div className="skills-grid">
        {skills.map((skill) => (
          <div className="skill-badge" key={skill.title}>
            <div className="skill-icon">{skill.icon}</div>
            <h4>{skill.title}</h4>
            <p>{skill.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
