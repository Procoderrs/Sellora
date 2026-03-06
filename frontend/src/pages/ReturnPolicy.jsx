import React from "react";
import { FiRefreshCcw, FiShield, FiMail, FiPhone } from "react-icons/fi";

export default function ReturnPolicy() {
  return (
    <div className="min-h-screen bg-background font-body text-text-main px-4 md:px-16 py-12">

      {/* Hero Section */}
      <section className="relative mb-16">
        <div className="h-64 md:h-90 rounded-3xl overflow-hidden shadow-lg">
          <img
            src="/return.jpg"
            alt="Return Policy Banner"
            loading="lazy"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h1 className="text-4xl md:text-5xl font-heading text-hero-text text-center">
              Return & Refund Policy
            </h1>
          </div>
        </div>
      </section>

      {/* Policy Sections */}
      <div className="max-w-4xl mx-auto grid gap-6">

        <div className="bg-card p-6 rounded-2xl shadow-md border border-muted">
          <h2 className="font-heading text-xl text-primary mb-2">
            Perishable Items Policy
          </h2>
          <p>
            Because our cakes and cupcakes are freshly baked, items cannot be returned once delivered.
            However, if there’s any issue, we’ll make it right.
          </p>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-md border border-muted">
          <h2 className="font-heading text-xl text-primary mb-2">
            Eligible for Refund or Replacement
          </h2>
          <ul className="list-disc list-inside">
            <li>Damaged product upon arrival</li>
            <li>Wrong item delivered</li>
            <li>Missing items</li>
            <li>Serious quality concerns</li>
          </ul>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-md border border-muted">
          <h2 className="font-heading text-xl text-primary mb-2">
            How to Request a Refund
          </h2>
          <ol className="list-decimal list-inside">
            <li>Email us with your order number</li>
            <li>Attach clear photos of the issue</li>
            <li>Wait 24–48 hours for review</li>
          </ol>
        </div>

        <div className="bg-card p-6 rounded-2xl shadow-md border border-muted">
          <h2 className="font-heading text-xl text-primary mb-2">
            Refund Processing
          </h2>
          <p>
            Approved refunds are issued to your original payment method within
            3–7 business days.
          </p>
        </div>

      </div>

      {/* Contact Section */}
      <section className="max-w-4xl mx-auto mt-12 text-center bg-card p-6 rounded-2xl shadow-md border border-muted">
        <h2 className="font-heading text-2xl text-primary mb-4">
          Need Assistance?
        </h2>
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <span className="flex items-center justify-center gap-2">
            <FiPhone className="text-accent" /> +92 300 1234567
          </span>
          <span className="flex items-center justify-center gap-2">
            <FiMail className="text-accent" /> support@cakelet.com
          </span>
        </div>
      </section>

    </div>
  );
}