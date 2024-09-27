import React, { useState } from "react";
import "../style/verticalCarousel.css";

export const products = [
    {
        name: "Watch",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrrvRWDpRts3ffsdJKXCCqzfSaLNGc2Bxc5g&s",
            "https://www.carlington.in/cdn/shop/files/Carlington_elite_analog_ladies_watch_CT_2007_roseblack.jpg?v=1696689556&width=2400",
            "https://currenwatches.com.pk/cdn/shop/files/S16a1d22aca9244a19944aad7e16f364fh_1445x.jpg?v=1708428048",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXLu03PFPFQhLEfU4QZualjO6dRe72PwhXOFk1lYQQxtCRS5zlxvXStz-zk2WzDCG0-2M&usqp=CAU",
        ],
    },
    {
        name: "Bracelet",
        images: [
            "https://diamondemitations.pk/cdn/shop/files/IMG-20240605-WA0093_1000x1000.jpg?v=1717672714",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8xSgWNrF32EeAqOPtf6BUn9wYZWMi1FOe7cYyPQIh0MnDThKX4J5fy7osgnZQpCqNE_Q&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR04UuoqlpCZKubmbVCvIyCtj8ktnHay-RS2Js3jszT-_XldfOJMKGnetrRCzQcClSzTtg&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAm1gnL5cNDxWPOZ9YkPDHbyhOvrbseQuXsw&s",
        ],
    },
    {
        name: "Digital Watch",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bHc_0BGcC1eugUGxkA_gF9wIG7fra0akPQ&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVvAegXrjgE3-rpYQ9szDcoJIja9PjdUElRbgpDG6Fhy9vcFWAIA3vvtbkGW-Z1dm3SnY&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLzTqmLasXgW1G_44RF5T3KxWjHKG4SefL_g&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSObsa0JVuB5WJRu-jk_kX-dAucj40tVAqls4EI9rVLT2s_40mCHJd9xiE2SJ1E1eq9M2U&usqp=CAU",
        ],
    },
    {
        name: "T-Shirt",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3JySzx0pdzRnn6rV0dkwapAJIsSeNFYouLQ&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU2XTWD-p2c6QeaaF7tqSxHfpgiOfYtBp4xw&s",
            "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/white-transparent-background-t-shirt-design-template-b57a5ce5ec3ad2f32ea38e8c5fd32827_screen.jpg?ts=1698350978",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP10zvEXDk0A7V5eSf1aVm9N9UskGrBrWB1w&s",
        ],
    },
    {
        name: "Digital Watch 2",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bHc_0BGcC1eugUGxkA_gF9wIG7fra0akPQ&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVvAegXrjgE3-rpYQ9szDcoJIja9PjdUElRbgpDG6Fhy9vcFWAIA3vvtbkGW-Z1dm3SnY&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLzTqmLasXgW1G_44RF5T3KxWjHKG4SefL_g&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSObsa0JVuB5WJRu-jk_kX-dAucj40tVAqls4EI9rVLT2s_40mCHJd9xiE2SJ1E1eq9M2U&usqp=CAU",
        ],
    },
];

const PANEL_COUNT = 5; // Fixed number of panels for the prism layout

// Function to create a non-random duplication of products, ensuring no duplicates appear consecutively
const createNonDuplicateOrder = (items) => {
    const result = [...items];
    while (result.length < PANEL_COUNT) {
        let lastItem = result[result.length - 1];
        let nextItem = items[Math.floor(Math.random() * items.length)];
        while (nextItem === lastItem) {
            nextItem = items[Math.floor(Math.random() * items.length)];
        }
        result.push(nextItem);
    }
    return result;
};

// Function to duplicate images for vertical carousel if less than 5 images in a product
const duplicateVerticalPanels = (images) => {
    const duplicatedImages = [...images];
    while (duplicatedImages.length < PANEL_COUNT) {
        duplicatedImages.push(images[Math.floor(Math.random() * images.length)]);
    }
    return duplicatedImages;
};

const Carousel = () => {
    const [horizontalIndex, setHorizontalIndex] = useState(0); // For X-axis carousel
    const [verticalIndex, setVerticalIndex] = useState(0); // For Y-axis carousel
    const [activeCarousel, setActiveCarousel] = useState("horizontal"); // Track active carousel

    const rotationPerPanel = 360 / PANEL_COUNT; // Rotation angle for each panel

    // Separate touch tracking states for horizontal and vertical carousels
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchStartY, setTouchStartY] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const [touchEndY, setTouchEndY] = useState(0);

    // Separate handlers for touch events in horizontal and vertical carousels
    const handleTouchStart = (e) => {
        setTouchStartX(e.touches[0].clientX);
        setTouchStartY(e.touches[0].clientY);
    };

    const handleTouchMove = (e) => {
        setTouchEndX(e.touches[0].clientX);
        setTouchEndY(e.touches[0].clientY);
    };

    const handleTouchEnd = () => {
        const horizontalSwipe = Math.abs(touchStartX - touchEndX) > 50;
        const verticalSwipe = Math.abs(touchStartY - touchEndY) > 50;

        // Handle horizontal swipes (left and right) for horizontal carousel
        if (horizontalSwipe && !verticalSwipe) {
            setActiveCarousel("horizontal"); // Set horizontal carousel as active
            if (touchStartX - touchEndX > 50) {
                // Swipe left (next panel)
                setHorizontalIndex((prevIndex) => (prevIndex + 1) % products.length);
            } else if (touchEndX - touchStartX > 50) {
                // Swipe right (previous panel)
                setHorizontalIndex((prevIndex) =>
                    prevIndex === 0 ? products.length - 1 : prevIndex - 1
                );
            }
        }

        // Handle vertical swipes (up and down) for vertical carousel
        if (verticalSwipe && !horizontalSwipe) {
            setActiveCarousel("vertical"); // Set vertical carousel as active
            const productImages = products[horizontalIndex % products.length].images;
            const duplicatedImages = duplicateVerticalPanels(productImages);
            if (touchStartY - touchEndY > 50) {
                // Swipe up (next panel)
                setVerticalIndex((prevIndex) => (prevIndex + 1) % duplicatedImages.length);
            } else if (touchEndY - touchStartY > 50) {
                // Swipe down (previous panel)
                setVerticalIndex((prevIndex) =>
                    prevIndex === 0 ? duplicatedImages.length - 1 : prevIndex - 1
                );
            }
        }
    };

    // Get the duplicated panels for both carousels
    const currentProductImages = duplicateVerticalPanels(products[horizontalIndex % products.length].images);
    const duplicatedProducts = createNonDuplicateOrder(products);

    return (
        <div
            className="carousel-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Vertical carousel (rotate around X-axis) */}
            <div
                className="carousel"
                style={{
                    zIndex: activeCarousel === "vertical" ? 2 : 1,
                    transform: `rotateX(${verticalIndex * -rotationPerPanel}deg)`,
                    transition: "transform 1s ease-in-out",
                }}
            >
                {currentProductImages.map((image, index) => {
                    const rotateAngle = index * rotationPerPanel;

                    return (
                        <div
                            className="carousel-panel"
                            key={index}
                            style={{
                                transform: `rotateX(${rotateAngle}deg) translateZ(174px)`,
                            }}
                        >
                            <div className="panel-content">
                                <img src={image} alt="vertical-carousel-img" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Horizontal carousel (rotate around Y-axis) */}
            <div
                className="carousel-horizontal"
                style={{
                    zIndex: activeCarousel === "horizontal" ? 2 : 1,
                    transform: `rotateY(${(horizontalIndex % duplicatedProducts.length) * -rotationPerPanel}deg)`,
                    transition: "transform 1s ease-in-out",
                }}
            >
                {duplicatedProducts.map((product, index) => {
                    const rotateAngle = index * rotationPerPanel;

                    return (
                        <div
                            className="carousel-panel"
                            key={index}
                            style={{
                                transform: `rotateY(${rotateAngle}deg) translateZ(174px)`,
                            }}
                        >
                            <div className="panel-content">
                                <img src={product.images[0]} alt={product.name} />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Carousel;
