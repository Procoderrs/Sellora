import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const slides = [
  {
    type: "video",
    title: "Ordering Made Simple & Easier",
    desc: "Don't miss today's featured delights — fresh from our oven!",
    src: "/video-3.mp4",
    captions: "/video-3-captions.vtt",
  },
];

export default function HeaderHero() {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <header className="relative h-screen w-full overflow-hidden">

      {/* BACKGROUND MEDIA */}
      <div className="absolute inset-0">
        {slide.type === "video" ? (
          <video
            key={slide.src}
            src={slide.src}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            {slide.captions && (
              <track kind="captions" src={slide.captions} srcLang="en" label="English" />
            )}
          </video>
        ) : (
          <img src={slide.src} alt="" className="w-full h-full object-cover" />
        )}
        {/* DARK OVERLAY FOR PREMIUM FEEL */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      </div>

      {/* SCREEN READER TEXT */}
      <div className="sr-only" aria-live="polite">
        {slide.title}. {slide.desc}.
      </div>

      {/* TEXT CONTENT */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-3xl mb-40">
          <h1 className="text-4xl md:text-6xl font-lobster font-bold leading-tight text-white drop-shadow-lg">
            {slide.title}
          </h1>

          <p className="mt-6 text-base md:text-lg text-white/90 drop-shadow-md">
            {slide.desc}
          </p>

          {/* PREMIUM CTA BUTTON */}
          <button
onClick={() => navigate("/category/all")}     
       className="mt-8 inline-flex items-center gap-3 px-8 py-4 bg-accent text-text-main 
                       font-semibold rounded-full shadow-lg hover:bg-primary hover:text-white 
                       transition-all duration-300 text-lg"
          >
            Explore Products <FaArrowRight className="animate-bounce" />
          </button>
        </div>
      </div>

      {/* DECORATIVE SVG */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="absolute bottom-0 left-0 w-full"
        aria-hidden="true"
      >
        <path
          fill="#FFF1DC"
          fillOpacity="1"
          d="M0,96L6.9,117.3C13.7,139,27,181,41,181.3C54.9,181,69,139,82,154.7C96,171,110,245,123,272C137.1,299,151,277,165,256C178.3,235,192,213,206,218.7C219.4,224,233,256,247,229.3C260.6,203,274,117,288,112C301.7,107,315,181,329,197.3C342.9,213,357,171,370,154.7C384,139,398,149,411,165.3C425.1,181,439,203,453,213.3C466.3,224,480,224,494,218.7C507.4,213,521,203,535,192C548.6,181,562,171,576,154.7C589.7,139,603,117,617,90.7C630.9,64,645,32,658,69.3C672,107,686,213,699,245.3C713.1,277,727,235,741,208C754.3,181,768,171,782,138.7C795.4,107,809,53,823,69.3C836.6,85,850,171,864,224C877.7,277,891,299,905,293.3C918.9,288,933,256,946,213.3C960,171,974,117,987,80C1001.1,43,1015,21,1029,32C1042.3,43,1056,85,1070,117.3C1083.4,149,1097,171,1111,160C1124.6,149,1138,107,1152,90.7C1165.7,75,1179,85,1193,106.7C1206.9,128,1221,160,1234,170.7C1248,181,1262,171,1275,149.3C1289.1,128,1303,96,1317,101.3C1330.3,107,1344,149,1358,181.3C1371.4,213,1385,235,1399,213.3C1412.6,192,1426,128,1433,96L1440,64L1440,320L0,320Z"
        />
      </svg>
    </header>
  );
}
