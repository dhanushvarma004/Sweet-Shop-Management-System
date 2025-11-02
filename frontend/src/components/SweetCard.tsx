import React from "react";

interface SweetCardProps {
  id: number;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  category?: string;
  quantity?: number;
}

const SweetCard: React.FC<SweetCardProps> = ({
  id,
  name,
  description,
  price,
  imageUrl,
  category,
  quantity,
}) => {
  // Fallback images for sweets if no imageUrl provided
  const defaultImages: { [key: string]: string } = {
    chocolate: "https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=500",
    candy: "https://images.unsplash.com/photo-1582058091505-f87a2e55a40f?w=500",
    lollipop: "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=500",
    gummy: "https://images.unsplash.com/photo-1582645891555-ddac5464e03b?w=500",
    cake: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500",
    cookie: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500",
    donut: "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=500",
    cupcake: "https://images.unsplash.com/photo-1426869981800-95ebf51ce900?w=500",
  };

  const getImageUrl = () => {
    if (imageUrl) return imageUrl;
    const lowerName = name.toLowerCase();
    for (const [key, url] of Object.entries(defaultImages)) {
      if (lowerName.includes(key)) return url;
    }
    return "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=500";
  };

  const isOutOfStock = quantity !== undefined && quantity <= 0;

  return (
    <div style={styles.card}>
      <div style={styles.imageContainer}>
        <img
          src={getImageUrl()}
          alt={name}
          style={styles.image}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "https://images.unsplash.com/photo-1514517521153-1be72277b32f?w=500";
          }}
        />
        {category && (
          <span style={styles.categoryBadge}>{category}</span>
        )}
        {isOutOfStock && (
          <div style={styles.outOfStockOverlay}>
            <span style={styles.outOfStockText}>Out of Stock</span>
          </div>
        )}
      </div>
      
      <div style={styles.content}>
        <h3 style={styles.name}>{name}</h3>
        {description && (
          <p style={styles.description}>{description}</p>
        )}
        
        <div style={styles.footer}>
          <div style={styles.priceContainer}>
            <span style={styles.priceLabel}>Price:</span>
            <span style={styles.price}>${price.toFixed(2)}</span>
          </div>
          
          {quantity !== undefined && (
            <span style={styles.stock}>
              Stock: <strong>{quantity}</strong>
            </span>
          )}
        </div>
        
        <button
          style={{
            ...styles.button,
            ...(isOutOfStock ? styles.buttonDisabled : {}),
          }}
          disabled={isOutOfStock}
        >
          {isOutOfStock ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  card: {
    backgroundColor: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "240px",
    overflow: "hidden",
    backgroundColor: "#f0f0f0",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  categoryBadge: {
    position: "absolute",
    top: "12px",
    right: "12px",
    backgroundColor: "rgba(102, 126, 234, 0.95)",
    color: "white",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "0.75rem",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  outOfStockOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  outOfStockText: {
    color: "white",
    fontSize: "1.2rem",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "1px",
  },
  content: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  name: {
    fontSize: "1.35rem",
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: "8px",
    lineHeight: "1.3",
  },
  description: {
    fontSize: "0.9rem",
    color: "#718096",
    marginBottom: "16px",
    lineHeight: "1.5",
    flexGrow: 1,
  },
  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    paddingTop: "12px",
    borderTop: "1px solid #e2e8f0",
  },
  priceContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  priceLabel: {
    fontSize: "0.75rem",
    color: "#a0aec0",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "800",
    color: "#667eea",
  },
  stock: {
    fontSize: "0.85rem",
    color: "#718096",
  },
  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#667eea",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  buttonDisabled: {
    backgroundColor: "#cbd5e0",
    cursor: "not-allowed",
  },
};

// Add hover effects via CSS-in-JS or separate stylesheet
const hoverStyles = `
  .sweet-card:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 24px rgba(0,0,0,0.15);
  }
  
  .sweet-card:hover img {
    transform: scale(1.08);
  }
  
  .sweet-card button:not(:disabled):hover {
    background-color: #5568d3;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  }
`;

export default SweetCard;