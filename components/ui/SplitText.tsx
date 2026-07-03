"use client";

import React from "react";

interface SplitTextProps {
  text: string;
  type?: "words" | "chars" | "both";
  className?: string;
  wordClassName?: string;
  charClassName?: string;
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  type = "words",
  className = "",
  wordClassName = "",
  charClassName = "",
}) => {
  if (type === "words") {
    return (
      <span className={`inline-block ${className}`}>
        {text.split(" ").map((word, wIdx) => (
          <span
            key={wIdx}
            className="inline-block overflow-hidden mr-[0.25em] last:mr-0"
          >
            <span
              className={`split-word inline-block transform translate-y-full ${wordClassName}`}
            >
              {word}
            </span>
          </span>
        ))}
      </span>
    );
  }

  if (type === "chars") {
    return (
      <span className={`inline-block ${className}`}>
        {text.split("").map((char, cIdx) => (
          <span
            key={cIdx}
            className={`inline-block overflow-hidden ${char === " " ? "mr-[0.25em]" : ""}`}
          >
            <span
              className={`split-char inline-block transform translate-y-full ${charClassName}`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          </span>
        ))}
      </span>
    );
  }

  // "both" - wraps each word, and within each word wraps each character
  return (
    <span className={`inline-block ${className}`}>
      {text.split(" ").map((word, wIdx) => (
        <span
          key={wIdx}
          className="inline-block overflow-hidden mr-[0.25em] last:mr-0"
        >
          <span className={`split-word inline-block ${wordClassName}`}>
            {word.split("").map((char, cIdx) => (
              <span key={cIdx} className="inline-block overflow-hidden">
                <span
                  className={`split-char inline-block transform translate-y-full ${charClassName}`}
                >
                  {char}
                </span>
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
};
export default SplitText;
