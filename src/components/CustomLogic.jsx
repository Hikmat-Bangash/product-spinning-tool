import React, { useState, useEffect, useRef } from "react";
import "../style/custom.css";

// Sample product data with variants (nested arrays)
export const products = [
    ["Product 1 - Variant 1", "Product 1 - Variant 2", "Product 1 - Variant 3"],
    ["Product 2 - Variant 1", "Product 2 - Variant 2", "Product 2 - Variant 3"],
    ["Product 3 - Variant 1", "Product 3 - Variant 2", "Product 3 - Variant 3"],
    ["Product 4 - Variant 1", "Product 4 - Variant 2", "Product 4 - Variant 3"],
    ["Product 5 - Variant 1", "Product 5 - Variant 2", "Product 5 - Variant 3"],
];


const Carousel = () => {
    const [activeIndexX, setActiveIndexX] = useState(0); // X-axis (main products)
    const [activeIndexY, setActiveIndexY] = useState(0); // Y-axis (product variants)
    const panelCount = products.length;
    const variantCount = products[0].length;
    const rotationPerPanelX = 360 / panelCount; // Rotation angle for X-axis
    const carouselRef = useRef(null);

    // Variables to track touch position
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [touchEndY, setTouchEndY] = useState(0);

 

    // Handle X-axis swipe (left/right)
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
        setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
        setTouchEndY(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
        // Handle X-axis swipe (left/right)
        if (touchStartX - touchEndX > 50) {
            // Swipe Left - Next Product
            setActiveIndexX((prevIndex) => (prevIndex + 1) % panelCount);
            setActiveIndexY(0); // Reset Y-axis to the first variant when switching products
        }
        if (touchEndX - touchStartX > 50) {
            // Swipe Right - Previous Product
            setActiveIndexX((prevIndex) =>
                prevIndex === 0 ? panelCount - 1 : prevIndex - 1
            );
            setActiveIndexY(0); // Reset Y-axis to the first variant when switching products
        }

        // Handle Y-axis swipe (up/down) for variants
        if (touchStartY - touchEndY > 50) {
            // Swipe Up - Next Variant
            setActiveIndexY((prevIndex) => (prevIndex + 1) % variantCount);
        }
        if (touchEndY - touchStartY > 50) {
            // Swipe Down - Previous Variant
            setActiveIndexY((prevIndex) =>
                prevIndex === 0 ? variantCount - 1 : prevIndex - 1
            );
        }
    };

    const handleClick = (index) => {
        setActiveIndexX(index);
        setActiveIndexY(0); // Reset Y-axis to the first variant when clicking on X-axis indicator
    };

    return (
        <div
            className="carousel-container"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="carousel"
                style={{
                    transform: `rotateY(${activeIndexX * -rotationPerPanelX}deg)`,
                    transition: "transform 1s ease-in-out",
                }}
            >
                {products.map((product, index) => {
                    const rotateAngle = index * rotationPerPanelX;

                    return (
                        <div
                            className="carousel-panel"
                            key={index}
                            style={{
                                transform: `rotateY(${rotateAngle}deg) translateZ(153px)`,
                            }}
                        >
                            <div className="panel-content">
                                {product[activeIndexY]}   {/* Display active variant */}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Carousel;
