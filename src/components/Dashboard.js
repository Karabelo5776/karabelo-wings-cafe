// src/components/Dashboard.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProductBarChart from './ProductBarChart';
import './Dashboard.css';

const Dashboard = ({ products }) => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const images = [
    { src: "/apple.jpeg", alt: "Apple", title: "Fresh Apples" },
    { src: "/OIP.jpeg", alt: "Product 2", title: "Special Product" },
    { src: "/strawberries.jpeg", alt: "Strawberries", title: "Sweet Strawberries" },
    { src: "/grapes.jpeg", alt: "Grapes", title: "Juicy Grapes" },
    { src: "/pears.jpeg", alt: "Pears", title: "Ripe Pears" },
    { src: "/coke.jpeg", alt: "Coke", title: "Refreshing Coke" },
    { src: "/cake.jpeg", alt: "Cake", title: "Delicious Cake" },
    { src: "/sandwitch.jpeg", alt: "Sandwich", title: "Fresh Sandwich" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(timer);
  }, [images.length]);

  const formatPrice = (price) => {
    const numericPrice = parseFloat(price);
    return isNaN(numericPrice) ? 'N/A' : numericPrice.toFixed(2);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        <header className="dashboard-header">
          <h2>Dashboard</h2>
          <nav className="dashboard-nav">
            <Link to="/products" className="nav-link">Product Management</Link>
            <Link to="/users" className="nav-link">User Management</Link>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </nav>
        </header>

        <section className="dashboard-main">
          <h3>Products Overview</h3>

          {products.length === 0 ? (
            <p>No products have been added yet.</p>
          ) : (
            <div className="dashboard-data">
              <div className="chart-container">
                <ProductBarChart products={products} />
              </div>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.name}</td>
                        <td>{product.description}</td>
                        <td>{formatPrice(product.price)}</td>
                        <td>{product.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="featured-products">
            <h3>Featured Products</h3>
            <div className="carousel-container">
              <button className="carousel-button prev" onClick={goToPrevImage}>
                &#8249;
              </button>
              <div className="carousel-content">
                <img 
                  src={images[currentImageIndex].src}
                  alt={images[currentImageIndex].alt}
                  className="featured-image fade-in"
                />
                <h4 className="featured-title">{images[currentImageIndex].title}</h4>
              </div>
              <button className="carousel-button next" onClick={goToNextImage}>
                &#8250;
              </button>
              <div className="carousel-dots">
                {images.map((_, index) => (
                  <span 
                    key={index}
                    className={`dot ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-links">
            <Link to="#" className="footer-link">About</Link>
            <Link to="#" className="footer-link">Privacy Policy</Link>
            <Link to="#" className="footer-link">Terms of Service</Link>
            <Link to="#" className="footer-link">Contact</Link>
          </div>
          <div className="footer-copyright">
            © {new Date().getFullYear()} Your Company Name. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;