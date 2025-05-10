"use client";
import React, { useState } from "react";
import axios from "axios";
import "../styles/Footer.css";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      setLoading(true);
      await axios.post("/api/watchlist/newsletter", { email });
      alert("Subscribed!");
      setEmail("");
    } catch (error) {
      console.error("Subscription failed:", error);
      alert("Subscription failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>Subscribe to our Newsletter</h2>
        <p>Get the latest updates and news directly in your inbox.</p>
      </div>
      <form onSubmit={handleSubscribe} className="newsletter-form">
        <label htmlFor="email-input" className="sr-only">Enter your email address</label>
        <input
          id="email-input" 
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          tabIndex="0"  
        />
        <button
          type="submit"
          disabled={loading}
          aria-label={loading ? "Subscribing..." : "Subscribe to newsletter"}  
          tabIndex="0"  
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
    </footer>
  );
}
