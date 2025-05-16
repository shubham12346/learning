import { useEffect, useRef, useState } from "react";

const ResponsiveCard = () => {
  return (
    <div>
      ResponsiveCard
      <div className="min-h-screen bg-gray-100 p-5">
        <h1 className="text-2xl font-bold text-center mb-5">
          Custom React Carousel
        </h1>
        <CarouselMini />
        <div className="flex justify-center mt-5">{/* <MiniCarousel /> */}</div>
      </div>
    </div>
  );
};

export default ResponsiveCard;
// CustomCarousel.jsx

const CarouselMini = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef<any>(null);
  const [width, setWidth] = useState(1000); // default width fallback

  useEffect(() => {
    function updateWidth() {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    }
    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const slides = [
    "https://via.placeholder.com/600x300?text=Slide+1",
    "https://via.placeholder.com/600x300?text=Slide+2",
    "https://via.placeholder.com/600x300?text=Slide+3",
  ];

  const prevSlide = () => {
    setIndex(index === 0 ? slides.length - 1 : index - 1);
  };

  const nextSlide = () => {
    setIndex(index === slides.length - 1 ? 0 : index + 1);
  };

  return (
    <div
      ref={containerRef}
      style={{
        width: "600px",
        overflow: "hidden",
        margin: "20px auto",
        border: "1px solid #ccc",
      }}
    >
      <div
        style={{
          display: "flex",
          transition: "transform 0.3s ease",
          transform: `translateX(-${index * width}px)`,
        }}
      >
        {slides.map((src, i) => (
          <div key={i} style={{ width: "1000px" }}>
            <img src={src} alt={`Slide ${i + 1}`} style={{ width: "600px" }} />
          </div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button onClick={prevSlide}>Prev</button>
        <button onClick={nextSlide} style={{ marginLeft: "10px" }}>
          Next
        </button>
      </div>
    </div>
  );
};
