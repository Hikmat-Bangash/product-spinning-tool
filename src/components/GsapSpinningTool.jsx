import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../style/gsap.css";

const GsapComponent = () => {
    const carouselRef = useRef(null);
    const slides = [1, 2, 3, 4, 5]; // Add more slides as needed

    useEffect(() => {
        const totalSlides = slides.length;
        const angle = 360 / totalSlides; // Divide 360 degrees by the number of slides

        // Position each slide in a circle
        gsap.utils.toArray(".carousel-slide").forEach((slide, index) => {
            const rotateY = index * angle;
            const z = 300; // Adjust the z-axis for the distance from the center
            gsap.set(slide, {
                rotateY: rotateY,
                transformOrigin: `50% 50% ${-z}px`,
            });
        });

        let currentRotation = 0;

        const rotateCarousel = (direction) => {
            const rotationAmount = direction === "next" ? -angle : angle;
            currentRotation += rotationAmount;

            // Animate the rotation of the carousel
            gsap.to(carouselRef.current, {
                rotateY: currentRotation,
                duration: 1,
                ease: "power2.inOut",
            });
        };

        // Add event listeners for buttons
        document.querySelector(".prev").addEventListener("click", () => {
            rotateCarousel("prev");
        });
        document.querySelector(".next").addEventListener("click", () => {
            rotateCarousel("next");
        });

        return () => {
            // Clean up event listeners
            document.querySelector(".prev").removeEventListener("click", () => { });
            document.querySelector(".next").removeEventListener("click", () => { });
        };
    }, [slides]);

    return (
        <div className="carousel-container">
            <div className="carousel" ref={carouselRef}>
                {slides.map((slide, index) => (
                    <div key={index} className="carousel-slide">
                        <h2>Slide {slide}</h2>
                    </div>
                ))}
            </div>
            <div className="carousel-buttons">
                <button className="prev">Prev</button>
                <button className="next">Next</button>
            </div>
        </div>
    );
};

export default GsapComponent;
