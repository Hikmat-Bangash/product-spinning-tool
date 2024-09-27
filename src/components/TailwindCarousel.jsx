import { useState, useEffect } from "react";

// Sample product data
export const products = [
    {
        name: "Watch",
        cateogry: "women",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrrvRWDpRts3ffsdJKXCCqzfSaLNGc2Bxc5g&s",
            "https://www.carlington.in/cdn/shop/files/Carlington_elite_analog_ladies_watch_CT_2007_roseblack.jpg?v=1696689556&width=2400",
            "https://currenwatches.com.pk/cdn/shop/files/S16a1d22aca9244a19944aad7e16f364fh_1445x.jpg?v=1708428048",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXLu03PFPFQhLEfU4QZualjO6dRe72PwhXOFk1lYQQxtCRS5zlxvXStz-zk2WzDCG0-2M&usqp=CAU",
        ],
    },
    {
        name: "Bracelet",
        category: "women",
        images: [
            "https://diamondemitations.pk/cdn/shop/files/IMG-20240605-WA0093_1000x1000.jpg?v=1717672714",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8xSgWNrF32EeAqOPtf6BUn9wYZWMi1FOe7cYyPQIh0MnDThKX4J5fy7osgnZQpCqNE_Q&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR04UuoqlpCZKubmbVCvIyCtj8ktnHay-RS2Js3jszT-_XldfOJMKGnetrRCzQcClSzTtg&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAm1gnL5cNDxWPOZ9YkPDHbyhOvrbseQuXsw&s",
        ],
    },
    {
        name: "Digital Watch",
        category: "men",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bHc_0BGcC1eugUGxkA_gF9wIG7fra0akPQ&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVvAegXrjgE3-rpYQ9szDcoJIja9PjdUElRbgpDG6Fhy9vcFWAIA3vvtbkGW-Z1dm3SnY&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLzTqmLasXgW1G_44RF5T3KxWjHKG4SefL_g&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSObsa0JVuB5WJRu-jk_kX-dAucj40tVAqls4EI9rVLT2s_40mCHJd9xiE2SJ1E1eq9M2U&usqp=CAU",
        ],
    },
    {
        name: "T-Shirt",
        cateogry: "men",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3JySzx0pdzRnn6rV0dkwapAJIsSeNFYouLQ&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU2XTWD-p2c6QeaaF7tqSxHfpgiOfYtBp4xw&s",
            "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/white-transparent-background-t-shirt-design-template-b57a5ce5ec3ad2f32ea38e8c5fd32827_screen.jpg?ts=1698350978",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTP10zvEXDk0A7V5eSf1aVm9N9UskGrBrWB1w&s",
        ],
    },
    {
        name: "Digital Watch 2",
        category: "men",
        images: [
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bHc_0BGcC1eugUGxkA_gF9wIG7fra0akPQ&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVvAegXrjgE3-rpYQ9szDcoJIja9PjdUElRbgpDG6Fhy9vcFWAIA3vvtbkGW-Z1dm3SnY&usqp=CAU",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLzTqmLasXgW1G_44RF5T3KxWjHKG4SefL_g&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSObsa0JVuB5WJRu-jk_kX-dAucj40tVAqls4EI9rVLT2s_40mCHJd9xiE2SJ1E1eq9M2U&usqp=CAU",
        ],
    },
];


const PANEL_COUNT = 5;

// Function to create a non-random duplication of products, ensuring no duplicates appear consecutively
const createNonDuplicateOrder = (items) => {
    const result = [...items];
    const totalItems = items.length;

    // If there are fewer than 5 products, duplicate them but maintain the same sequence
    if (totalItems < PANEL_COUNT) {
        let i = 0;
        while (result.length < PANEL_COUNT) {
            result.push(items[i % totalItems]);
            i++;
        }
    }

    // Return a fixed array with at least 5 items
    return result;
};

// Function to duplicate images for vertical carousel if less than 5 images in a product
const duplicateVerticalPanels = (images) => {
    const duplicatedImages = [...images];
    const totalImages = images.length;

    // If fewer than 5 images, duplicate them in a fixed sequence
    if (totalImages < PANEL_COUNT) {
        let i = 0;
        while (duplicatedImages.length < PANEL_COUNT) {
            duplicatedImages.push(images[i % totalImages]);
            i++;
        }
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
                setHorizontalIndex((prevIndex) => (prevIndex + 1));
                setVerticalIndex(0); // Reset vertical index
            } else if (touchEndX - touchStartX > 50) {
                // Swipe right (previous panel)
                setHorizontalIndex((prevIndex) => (prevIndex - 1));
                setVerticalIndex(0); // Reset vertical index
            }
        }

        // Handle vertical swipes (up and down) for vertical carousel
        if (verticalSwipe && !horizontalSwipe) {
            setActiveCarousel("vertical"); // Set vertical carousel as active
            const productImages = products[horizontalIndex % products.length]?.images || [];
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

    // Infinite carousel behavior for horizontalIndex
    useEffect(() => {
        // Handle positive and negative indices for infinite carousel effect
        if (horizontalIndex >= products.length) {
            setHorizontalIndex(0); // Reset to first product
        } else if (horizontalIndex < 0) {
            setHorizontalIndex(products.length - 1); // Go to last product
        }
    }, [horizontalIndex]);

    // Get the duplicated panels for both carousels
    const currentProduct = products[horizontalIndex % products.length] || {};
    const currentProductImages = duplicateVerticalPanels(currentProduct.images || []);
    const duplicatedProducts = createNonDuplicateOrder(products);

    return (
        <div className="wrapper w-full h-full flex justify-center items-center">
        <div
            className="carousel-container "
            style={{
                position: "relative",
                width: "400px",
                height: "400px",
                perspective: "1000px",
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Vertical carousel (rotate around X-axis) */}
            <div
                className="carousel"
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    transformStyle: "preserve-3d",
                    transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: activeCarousel === "vertical" ? 2 : 1,
                    transform: `rotateX(${verticalIndex * -rotationPerPanel}deg)`,
                }}
            >
                {currentProductImages.map((image, index) => {
                    const rotateAngle = index * rotationPerPanel;

                    return (
                        <div
                            className="carousel-panel"
                            key={index}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backfaceVisibility: 'hidden',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                transform: `rotateX(${rotateAngle}deg) translateZ(174px)`,
                            }}
                        >
                            <div className="panel-content" style={{
                                width: "250px",
                                height: "250px",
                                border: "1px solid #ddd",
                                background: "#979494",
                                borderRadius: "5px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            }}>
                                <img src={image} alt="vertical-carousel-img" />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Horizontal carousel (rotate around Y-axis) */}
            <div
                className="carousel"
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    transformStyle: "preserve-3d",
                    transition: "transform 1s cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: activeCarousel === "horizontal" ? 2 : 1,
                    transform: `rotateY(${horizontalIndex * -rotationPerPanel}deg)`,
                }}
            >
                {duplicatedProducts.map((product, index) => {
                    const rotateAngle = index * rotationPerPanel;

                    return (
                        <div
                            className="carousel-panel"
                            key={index}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                backfaceVisibility: 'hidden',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                transform: `rotateY(${rotateAngle}deg) translateZ(174px)`,
                            }}
                        >
                            <div className="panel-content" style={{
                                width: "250px",
                                height: "250px",
                                border: "1px solid #ddd",
                                background: "#979494",
                                borderRadius: "5px",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                            }}>
                                <img src={product.images?.[0]} alt={product.name} />
                            </div>
                        </div>
                    );
                })}
            </div>
            </div>
        </div>
    );
};


export default Carousel