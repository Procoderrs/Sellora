import React from "react";
import { FiClock, FiTruck, FiShield, FiPhone, FiMail } from "react-icons/fi";

export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-background font-body text-text-main px-4 md:px-16 py-12">

      {/* Hero Section */}
      <section className="relative text-center mb-16">
        <div className="relative h-64 md:h-96 w-full rounded-3xl overflow-hidden shadow-lg mx-auto">
          <img
            src="/ship.png"
            alt="Sweet Delivery Banner"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-black/80 flex flex-col justify-center items-center px-4">
            <h1 className="text-4xl md:text-5xl font-heading text-hero-text mb-2">
              Shipping Policy
            </h1>
            <p className="text-background text-lg md:text-xl max-w-2xl">
              Sweet deliveries, fresh from our bakery to your door!
            </p>
          </div>
        </div>
      </section>

      {/* Shipping Options */}
      <section className="max-w-4xl mx-auto mb-12 grid gap-6">
        <div className="flex items-start gap-4 bg-card rounded-2xl shadow-md p-6 border border-muted">
          <FiTruck size={28} className="text-accent mt-1" />
          <div>
            <h2 className="font-heading text-xl text-primary mb-1">Shipping Options</h2>
            <p className="text-text-main/80 text-base">
              Choose the delivery that fits your sweet schedule:
            </p>
            <ul className="mt-2 list-disc list-inside text-text-main/80">
              <li>Standard Delivery: 2–3 business days within Lahore</li>
              <li>Express Delivery: Same-day delivery for orders before 12 PM</li>
              <li>Local Pickup: Collect directly from our bakery</li>
            </ul>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-card rounded-2xl shadow-md p-6 border border-muted">
          <FiClock size={28} className="text-accent mt-1" />
          <div>
            <h2 className="font-heading text-xl text-primary mb-1">Delivery Times</h2>
            <p className="text-text-main/80 text-base">
              Estimated delivery times vary by order type:
            </p>
            <table className="mt-2 w-full text-left text-text-main/80">
              <tbody>
                <tr>
                  <td className="pr-4 font-semibold">Standard</td>
                  <td>2–3 Business Days</td>
                </tr>
                <tr>
                  <td className="pr-4 font-semibold">Express / Same-Day</td>
                  <td>Same Day (before 12 PM)</td>
                </tr>
                <tr>
                  <td className="pr-4 font-semibold">Custom Cakes</td>
                  <td>3–5 Business Days</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex items-start gap-4 bg-card rounded-2xl shadow-md p-6 border border-muted">
          <FiShield size={28} className="text-accent mt-1" />
          <div>
            <h2 className="font-heading text-xl text-primary mb-1">Lost or Damaged Packages</h2>
            <p className="text-text-main/80 text-base">
              We handle every order with care, but if something goes wrong:
            </p>
            <ul className="mt-2 list-disc list-inside text-text-main/80">
              <li>Contact us within 24 hours of delivery</li>
              <li>We’ll arrange a replacement or refund promptly</li>
              <li>Your happiness is our top priority!</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="max-w-4xl mx-auto mt-12 text-center bg-card p-6 rounded-2xl shadow-md border border-muted">
        <h2 className="font-heading text-2xl text-primary mb-4">Have Questions?</h2>
        <p className="text-text-main/80 mb-4">
          Reach out to our friendly bakery team and we’ll sweeten your day!
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-6 text-text-main/80">
          <span className="flex items-center gap-2">
            <FiPhone className="text-accent" /> +92 300 1234567
          </span>
          <span className="flex items-center gap-2">
            <FiMail className="text-accent" /> support@cakelet.com
          </span>
        </div>
      </section>

    </div>
  );
}