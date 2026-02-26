import React from 'react'
import { useNavigate } from 'react-router-dom'
import 'remixicon/fonts/remixicon.css'
import { RiCake2Line,RiCake3Line } from "@remixicon/react"

export default function Info() {
  const navigate = useNavigate()

  return (
    <section className="box max-w-7xl mx-auto px-6 py-16 flex flex-col bg-background relative">

      {/* SVG BACKGROUND */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0 left-0 w-full h-full pointer-events-none z-0"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          fill="#FFFDFC"
          fillOpacity="1"
          d="M0,96L6.9,117.3C13.7,139,27,181,41,181.3C54.9,181,69,139,82,154.7C96,171,110,245,123,272C137.1,299,151,277,165,256C178.3,235,192,213,206,218.7C219.4,224,233,256,247,229.3C260.6,203,274,117,288,112C301.7,107,315,181,329,197.3C342.9,213,357,171,370,154.7C384,139,398,149,411,165.3C425.1,181,439,203,453,213.3C466.3,224,480,224,494,218.7C507.4,213,521,203,535,192C548.6,181,562,171,576,154.7C589.7,139,603,117,617,90.7C630.9,64,645,32,658,69.3C672,107,686,213,699,245.3C713.1,277,727,235,741,208C754.3,181,768,171,782,138.7C795.4,107,809,53,823,69.3C836.6,85,850,171,864,224C877.7,277,891,299,905,293.3C918.9,288,933,256,946,213.3C960,171,974,117,987,80C1001.1,43,1015,21,1029,32C1042.3,43,1056,85,1070,117.3C1083.4,149,1097,171,1111,160C1124.6,149,1138,107,1152,90.7C1165.7,75,1179,85,1193,106.7C1206.9,128,1221,160,1234,170.7C1248,181,1262,171,1275,149.3C1289.1,128,1303,96,1317,101.3C1330.3,107,1344,149,1358,181.3C1371.4,213,1385,235,1399,213.3C1412.6,192,1426,128,1433,96L1440,64L1440,320L0,320Z"
        />
      </svg>

      <div className='flex flex-col md:flex-row gap-12 relative z-10'>

        {/* LEFT: Image grid */}
        <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-4">
          <div className="relative row-span-2 w-full h-80 md:h-[400px] rounded-xl overflow-hidden shadow-lg group">
            <img
              src="/small-2.jpeg"
              alt="Big chocolate cake"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#FFF1DC]/30 to-transparent rounded-xl pointer-events-none" />
          </div>

          <div className="relative w-full h-40 md:h-48 rounded-xl overflow-hidden shadow-lg group">
            <img
              src="/cake-cup.jpg"
              alt="Cupcakes"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#FFF9D6]/30 to-transparent rounded-xl pointer-events-none" />
          </div>

          <div className="relative w-full h-40 md:h-48 rounded-xl overflow-hidden shadow-lg group">
            <img
              src="/brow.jpg"
              alt="Brownies"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#E0D1C0]/30 to-transparent rounded-xl pointer-events-none" />
          </div>
        </div>

        {/* RIGHT: Bakery Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-cookie font-bold mb-6 leading-tight text-primary drop-shadow-md">
            Welcome to <span className="text-primary">Cakelet</span>
          </h2>
          <p className="text-text-main text-base font-body mb-6 leading-relaxed">
            Founded with love and a passion for sweetness, CakeLT started as a small neighborhood bakery
            bringing freshly baked happiness to every home. From rich chocolate cakes to fluffy cupcakes
            and freshly brewed coffee, every treat is crafted with care to create moments of joy.
          </p>

          <button
            onClick={() => navigate("/category/all")}
            className="self-start px-10 py-4 bg-accent text-hero-text rounded-full font-semibold text-lg shadow-md hover:shadow-xl hover:scale-105 transition transform duration-300"
          >
            Explore Our Menu
          </button>

          {/* RiCake2Line icons with explanation - repeated 3 times */}
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <RiCake2Line className="text-2xl text-accent" />
              <p className="text-text-main font-body text-sm md:text-base">
                Crafting every cake with love and precision
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <RiCake3Line  className="text-5xl text-accent " />
              <p className="text-text-main font-body text-sm md:text-base">
                Making every dessert a memorable experience
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Founder Section */}
      <div className="flex flex-col md:flex-row items-center gap-6 md:gap-12 bg-card p-6 md:p-8 rounded-2xl shadow-md mt-12 w-full relative z-10">
        <img
          src="/founder.jpg"
          alt="Founder of CakeLT"
          className="w-32 h-32 md:w-44 md:h-44 object-cover rounded-full shadow-lg flex-shrink-0"
        />
        <div className="flex-1 text-center md:text-left">
          <p className="text-xl md:text-2xl font-logo text-accent mb-3 md:mb-4">
            "Baking happiness into every bite, one cake at a time 💛"
          </p>
          <p className="text-text-main font-body text-base md:text-lg leading-relaxed">
            — Jane Doe, Founder of Cakelet
          </p>
        </div>
      </div>
    </section>
  )
}