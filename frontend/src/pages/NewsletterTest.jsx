import "./styles/Home.css";
import { useState } from "react";

function Newsletter() {
  const [subject, setSubject] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/watchlist/newsletter/broadcast", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subject, text }),
    });

    if (res.ok) {
      alert("Emails sent successfully");
      setSubject("");
      setText("");
    } else {
      const data = await res.json();
      alert(`Failed to send emails: ${data.error}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <textarea
          placeholder="Newsletter message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit">Send Newsletter</button>
      </form>
    </div>
  );
}

export default Newsletter;
