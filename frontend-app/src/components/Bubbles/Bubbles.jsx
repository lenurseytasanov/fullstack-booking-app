import React, { useEffect, useState } from 'react';

const Bubbles = () => {
  const [bubbles, setBubbles] = useState([]);

  useEffect(() => {
    // Создаем новый пузырь каждые 3 секунды
    const createInterval = setInterval(() => {
      const newBubble = {
        id: Date.now(),
        size: Math.random() * 70 + 80, // Размер от 80px до 150px
        left: Math.random() * 80 + 10, // Позиция слева от 10% до 90%
        top: Math.random() * 80 + 10, // Позиция сверху от 10% до 90%
        duration: Math.random() * 10 + 15 // Длительность анимации от 15 до 25 секунд
      };
      
      setBubbles(prev => [...prev, newBubble]);

      // Удаляем пузырь через 20 секунд
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id));
      }, 20000);
    }, 3000);

    return () => clearInterval(createInterval);
  }, []);

  return (
    <div className="bubbles-container">
      {bubbles.map(bubble => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            top: `${bubble.top}%`,
            animation: `float ${bubble.duration}s infinite`
          }}
        />
      ))}
    </div>
  );
};

export default Bubbles;
