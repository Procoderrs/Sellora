import React from "react";

export default function TeamSection() {
  const chefs = [
    { id: 1, name: "Chef Robert", role: "Brownie Chef", image: "/brownieeeeee.jpg" },
    { id: 2, name: "Chef Daniel", role: "Coffee Specialist", image: "/coffeeeeeeee.jpg" },
    { id: 3, name: "Chef Sophia", role: "Cupcake & Dessert Chef", image: "/cupcakeeeeee.jpg" },
    { id: 4, name: "Chef Jackie", role: "Cake Chef", image: "/lady-cakeeeee.jpg" },
  ];

  return (
    <section className="relative  py-20 px-6 bg-gradient-to-br from-[#FFF6EC] via-[#FDEBD3] to-[#FAE1DD] overflow-hidden">
      <div className="text-center max-w-7xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-[#3B2F2F]">Meet Our Chefs</h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Our talented team brings passion, creativity, and love into every dessert we create.
        </p>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {chefs.map((chef) => (
          <div
            key={chef.id}
            className="bg-white/70 backdrop-blur-md rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 p-8 flex flex-col items-center text-center group"
          >
            <div className="lg:w-60 w-44 lg:h-60 h-auto mb-6 relative">
              <img
                src={chef.image}
                alt={chef.name}
                className="w-full h-full object-cover rounded-full border-4 border-white shadow-lg transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h3 className="text-2xl font-semibold text-[#3B2F2F]">{chef.name}</h3>
            <p className="mt-2 text-[#A0522D] font-medium">{chef.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}