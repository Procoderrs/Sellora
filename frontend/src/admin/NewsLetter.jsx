import { useState, useEffect } from "react";
import api from "../api/api";

export default function Newsletter() {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [subscribersCount, setSubscribersCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const res = await api.get("/newsletter/count");
        setSubscribersCount(res.data.count);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubscribers();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!subject || !content) {
      setMessage("Please fill both fields");
      return;
    }
    try {
      setLoading(true);
      const res = await api.post("/newsletter/send", { subject, content });
      setMessage(res.data.message);
      setSubject("");
      setContent("");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Send Newsletter</h1>
      <p className="mb-4">Total Subscribers: {subscribersCount}</p>

      <form onSubmit={handleSend} className="space-y-4 max-w-lg">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-3 border rounded"
        />
        <textarea
          placeholder="Content (HTML supported)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-[#FFD966] text-[#4A2C20] font-semibold rounded hover:bg-[#E6B65A]"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
