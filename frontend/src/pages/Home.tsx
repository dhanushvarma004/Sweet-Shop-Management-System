import React, { useEffect, useState } from "react";
import api from "../api";
import SweetCard from "../components/SweetCard";

interface Sweet {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category?: string;
  quantity?: number;
}

const Home: React.FC = () => {
  const [sweets, setSweets] = useState<Sweet[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    api
      .get("/sweets")
      .then((res) => {
        setSweets(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching sweets:", err);
        setLoading(false);
      });
  }, []);

  const filteredSweets = sweets.filter((sweet) =>
    sweet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={styles.pageContainer}>
      {/* Hero Section */}
      <div style={styles.heroSection}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroTitle}>🍭 Sweet Delights Shop</h1>
          <p style={styles.heroSubtitle}>
            Discover our handpicked collection of premium sweets and treats
          </p>
          <div style={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search for your favorite sweets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div style={styles.statsSection}>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>{sweets.length}+</div>
          <div style={styles.statLabel}>Sweet Varieties</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>100%</div>
          <div style={styles.statLabel}>Fresh & Quality</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statNumber}>24/7</div>
          <div style={styles.statLabel}>Available</div>
        </div>
      </div>

      {/* Products Section */}
      <div style={styles.productsSection}>
        <h2 style={styles.sectionTitle}>Our Sweet Collection</h2>
        
        {loading ? (
          <div style={styles.loadingContainer}>
            <div style={styles.loader}></div>
            <p>Loading delicious sweets...</p>
          </div>
        ) : filteredSweets.length > 0 ? (
          <div style={styles.gridContainer}>
            {filteredSweets.map((sweet) => (
              <SweetCard
                key={sweet.id}
                id={sweet.id}
                name={sweet.name}
                description={sweet.description}
                price={sweet.price}
                imageUrl={sweet.imageUrl}
                category={sweet.category}
                quantity={sweet.quantity}
              />
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🔍</div>
            <h3>SWEETS LIST</h3>

          </div>
        )}
      </div>

      {/* Footer CTA */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>What are you looking for?</h2>
        <p style={styles.ctaText}>
          Contact us and we'll help you find the perfect sweet!
        </p>
        <button style={styles.ctaButton}>Get in Touch</button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  pageContainer: {
    minHeight: "100vh",
    backgroundColor: "#f8f9fa",
  },
  heroSection: {
    position: "relative",
    height: "450px",
    background:
      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroOverlay: {
    position: "relative",
    zIndex: 1,
    textAlign: "center",
    color: "white",
    padding: "0 20px",
    maxWidth: "800px",
  },
  heroTitle: {
    fontSize: "3.5rem",
    fontWeight: "800",
    margin: "0 0 20px 0",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    animation: "fadeInDown 1s ease-out",
  },
  heroSubtitle: {
    fontSize: "1.3rem",
    fontWeight: "400",
    marginBottom: "30px",
    opacity: 0.95,
  },
  searchContainer: {
    maxWidth: "600px",
    margin: "0 auto",
  },
  searchInput: {
    width: "100%",
    padding: "15px 25px",
    fontSize: "1rem",
    border: "none",
    borderRadius: "50px",
    outline: "none",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
    transition: "transform 0.3s ease",
  },
  statsSection: {
    display: "flex",
    justifyContent: "center",
    gap: "40px",
    padding: "50px 20px",
    backgroundColor: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
    flexWrap: "wrap",
  },
  statCard: {
    textAlign: "center",
    minWidth: "150px",
  },
  statNumber: {
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#667eea",
    marginBottom: "8px",
  },
  statLabel: {
    fontSize: "1rem",
    color: "#6c757d",
    fontWeight: "500",
  },
  productsSection: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "60px 20px",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    textAlign: "center",
    marginBottom: "50px",
    color: "#2d3748",
    position: "relative",
  },
  gridContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "30px",
    padding: "0 20px",
  },
  loadingContainer: {
    textAlign: "center",
    padding: "80px 20px",
  },
  loader: {
    border: "4px solid #f3f3f3",
    borderTop: "4px solid #667eea",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    animation: "spin 1s linear infinite",
    margin: "0 auto 20px",
  },
  emptyState: {
    textAlign: "center",
    padding: "80px 20px",
    color: "#6c757d",
  },
  emptyIcon: {
    fontSize: "4rem",
    marginBottom: "20px",
  },
  ctaSection: {
    backgroundColor: "#667eea",
    color: "white",
    padding: "80px 20px",
    textAlign: "center",
  },
  ctaTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "20px",
  },
  ctaText: {
    fontSize: "1.2rem",
    marginBottom: "30px",
    opacity: 0.95,
  },
  ctaButton: {
    backgroundColor: "white",
    color: "#667eea",
    padding: "15px 40px",
    fontSize: "1.1rem",
    fontWeight: "600",
    border: "none",
    borderRadius: "50px",
    cursor: "pointer",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
};

// Add this to your global CSS or create a new CSS file
const globalStyles = `
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  @media (max-width: 768px) {
    .heroTitle {
      font-size: 2.5rem !important;
    }
    .heroSubtitle {
      font-size: 1rem !important;
    }
  }
`;

export default Home;