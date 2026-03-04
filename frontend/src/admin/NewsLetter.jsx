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
    <div className="max-w-5xl mx-auto p-8 bg-gray-100 mt-4 shadow-lg rounded-2xl border border-gray-200">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Send Newsletter</h1>
      <p className="mb-6 text-gray-600 font-medium">
        Total Subscribers: <span className="font-semibold">{subscribersCount}</span>
      </p>

      <form onSubmit={handleSend} className="space-y-5">
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD966] focus:border-[#FFD966] transition"
        />
        <textarea
          placeholder="Content (HTML supported)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FFD966] focus:border-[#FFD966] transition"
        />

        <button
          type="submit"
          className="w-full px-6 py-3 bg-[#FFD966] text-[#4A2C20] font-semibold rounded-xl hover:bg-[#FFE08A] transition shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-gray-700 font-medium bg-gray-100 p-3 rounded-xl">
          {message}
        </p>
      )}
    </div>
  );
}