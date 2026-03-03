import React, { useState } from "react";
import { FiChevronDown, FiCoffee } from "react-icons/fi";

const faqs = [
  {
    question: "What is the delivery time for my order?",
    answer:
      "Typically, we deliver within 2-3 business days. For customized cakes, it may take longer based on availability and size."
  },
  {
    question: "Can I customize my cake or cupcake?",
    answer:
      "Absolutely! You can choose flavors, toppings, and even write a message on your cake. Customizations can be done during checkout or via our contact form."
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit/debit cards, PayPal, and cash on delivery in selected areas."
  },
  {
    question: "What is your return/refund policy?",
    answer:
      "Since our products are perishable, returns are generally not accepted. However, if there’s any issue with your order, contact us and we will resolve it promptly."
  },
  {
    question: "Do you offer corporate or bulk orders?",
    answer:
      "Yes! We provide bulk and corporate orders with special discounts. Please contact us for a quote."
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background font-body text-text-main px-4 md:px-16 py-12">

      {/* Hero Image */}
      <div className="relative w-full max-w-full mx-auto h-64 md:h-116 rounded-3xl overflow-hidden shadow-lg mb-8">
        <img
          src="/berry.jpg"
          alt="FAQ Banner"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
          <span className="text-white text-center font-heading font-semibold md:text-5xl px-4">
           Sprinkling Joy & Sweetness Your Way!
          </span>
        </div>
      </div>

      {/* Heading & Description */}
      <header className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-heading text-primary mb-3">
          Frequently Asked Questions
        </h1>
        <p className="text-text-main/80 text-lg md:text-xl max-w-2xl mx-auto">
          Find answers to the most common queries about our cakes, cupcakes, and services.
          Sweet solutions to your baking questions!
        </p>
      </header>

      {/* FAQ Grid */}
      <div className="max-w-5xl mx-auto grid gap-6">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="bg-card rounded-2xl shadow-md border border-muted overflow-hidden transition-all hover:shadow-lg"
          >
            {/* Question */}
            <button
              onClick={() => toggleFAQ(idx)}
              className="w-full text-left px-6 py-5 flex justify-between items-center font-semibold text-primary text-lg md:text-xl hover:bg-muted transition-colors gap-3"
            >
              <span className="flex items-center gap-2">
                <FiCoffee className="text-accent" />
                {faq.question}
              </span>
              <FiChevronDown
                className={`text-accent transition-transform duration-300 ${openIndex === idx ? "rotate-180" : "rotate-0"}`}
                size={20}
              />
            </button>

            {/* Answer */}
            {openIndex === idx && (
              <div className="px-6 py-4 border-t border-border text-text-main text-base md:text-lg bg-background/70">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}