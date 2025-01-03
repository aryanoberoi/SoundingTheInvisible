import React, { useState, useEffect } from "react";
import "./InfiniteScrollPage.css";

const InfiniteScrollPage = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  useEffect(() => {
    // Load initial items
    fetchMoreData();
  }, []);

  const fetchMoreData = () => {
    if (items.length >= 100) {
      setHasMore(false); // No more items to load
      return;
    }

    // Simulate fetching data
    setTimeout(() => {
      setItems((prevItems) => [
        ...prevItems,
        ...Array.from({ length: 10 }, (_, i) => prevItems.length + i + 1),
      ]);
    }, 1500);
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10 &&
      hasMore
    ) {
      fetchMoreData();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [items, hasMore]);

  return (
    <div className="page-container">
      {/* Hamburger Menu Icon */}
      <button
        className="hamburger-icon"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        aria-label="Toggle Menu"
      >
        ☰
      </button>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="sidebar">
          <button
            className="close-btn"
            onClick={() => setIsSidebarOpen(false)}
            aria-label="Close Menu"
          >
            ✕
          </button>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>
      )}

      {/* Main Content */}
      <div className="content">
        <h1>Infinite Scrolling Page</h1>
        <ul>
          {items.map((item, index) => (
            <li key={index} className="list-item">
              Item {item}
            </li>
          ))}
        </ul>
        {!hasMore && <p className="no-more-items">No more items to load</p>}
      </div>
    </div>
  );
};

export default InfiniteScrollPage;
