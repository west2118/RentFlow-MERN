import { useState } from "react";

export const LazyImage = ({ src, alt }: { src: string; alt: string }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="overflow-hidden relative">
      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`w-auto h-auto object-contain max-h-62 transition-opacity duration-500
          ${loaded ? "opacity-100" : "opacity-0"}
        `}
      />
    </div>
  );
};
