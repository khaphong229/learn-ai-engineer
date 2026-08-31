"use client";

import { useState } from "react";

interface FlashCardData {
  front: string;
  back: string;
}

interface FlashCardGridProps {
  cards: FlashCardData[];
}

/** A single flip card */
function FlashCardItem({ front, back, index }: FlashCardData & { index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flashcard ${flipped ? "flipped" : ""}`}
      role="button"
      tabIndex={0}
      onClick={() => setFlipped(!flipped)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setFlipped(!flipped);
        }
      }}
      style={{ animationDelay: `${index * 0.05}s` }}
    >
      <div className="flashcard-inner">
        {/* Front */}
        <div className="flashcard-face flashcard-front">
          <span className="flashcard-label flashcard-label-front">Mặt trước</span>
          <span className="flashcard-text">{front}</span>
          <span className="flashcard-hint">Bấm để lật</span>
        </div>
        {/* Back */}
        <div className="flashcard-face flashcard-back">
          <span className="flashcard-label flashcard-label-back">Mặt sau</span>
          <span className="flashcard-text">{back}</span>
        </div>
      </div>
    </div>
  );
}

/** A responsive grid of flip cards */
export function FlashCardGrid({ cards }: FlashCardGridProps) {
  if (!cards || cards.length === 0) return null;

  return (
    <div className="flashcard-grid">
      {cards.map((card, i) => (
        <FlashCardItem
          key={i}
          front={card.front}
          back={card.back}
          index={i}
        />
      ))}
    </div>
  );
}
