import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    type: "video",
    title: "Ordering Made Simple & Easier",
    desc: "Don't Miss Today's Featured Deals",
    src: "/video-3.mp4",
  },
];

export default function HeaderHero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <header className="relative h-screen w-full overflow-hidden flex items-center justify-center">

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
          />
        ) : (
          <img
            src={slide.src}
            alt=""
            className="w-full h-full object-cover"
          />
        )}
        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/0" />
      </div>

      {/* TEXT CONTENT */}
      <div className="relative z-10 max-w-3xl text-center px-6 flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl md:text-6xl font-lobster font-bold leading-tight text-text-main">
          {slide.title}
        </h1>

        <p className="mt-4 text-base md:text-lg text-[#FFF8ED]/90">
          {slide.desc}
        </p>

        {/* <Link
          to="/shop"
          className="inline-block mt-8 px-8 py-3 rounded-lg bg-accent hover:bg-[#8B4513] text-[#FFF8ED] transition"
        >
          Order Now
        </Link> */}
      </div>
      <div>
     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="absolute  bottom-0 left-0 w-full">
  <path fill="#FFF1DC" fillOpacity="1" d="M0,96L6.9,117.3C13.7,139,27,181,41,181.3C54.9,181,69,139,82,154.7C96,171,110,245,123,272C137.1,299,151,277,165,256C178.3,235,192,213,206,218.7C219.4,224,233,256,247,229.3C260.6,203,274,117,288,112C301.7,107,315,181,329,197.3C342.9,213,357,171,370,154.7C384,139,398,149,411,165.3C425.1,181,439,203,453,213.3C466.3,224,480,224,494,218.7C507.4,213,521,203,535,192C548.6,181,562,171,576,154.7C589.7,139,603,117,617,90.7C630.9,64,645,32,658,69.3C672,107,686,213,699,245.3C713.1,277,727,235,741,208C754.3,181,768,171,782,138.7C795.4,107,809,53,823,69.3C836.6,85,850,171,864,224C877.7,277,891,299,905,293.3C918.9,288,933,256,946,213.3C960,171,974,117,987,80C1001.1,43,1015,21,1029,32C1042.3,43,1056,85,1070,117.3C1083.4,149,1097,171,1111,160C1124.6,149,1138,107,1152,90.7C1165.7,75,1179,85,1193,106.7C1206.9,128,1221,160,1234,170.7C1248,181,1262,171,1275,149.3C1289.1,128,1303,96,1317,101.3C1330.3,107,1344,149,1358,181.3C1371.4,213,1385,235,1399,213.3C1412.6,192,1426,128,1433,96L1440,64L1440,320L1433.1,320C1426.3,320,1413,320,1399,320C1385.1,320,1371,320,1358,320C1344,320,1330,320,1317,320C1302.9,320,1289,320,1275,320C1261.7,320,1248,320,1234,320C1220.6,320,1207,320,1193,320C1179.4,320,1166,320,1152,320C1138.3,320,1125,320,1111,320C1097.1,320,1083,320,1070,320C1056,320,1042,320,1029,320C1014.9,320,1001,320,987,320C973.7,320,960,320,946,320C932.6,320,919,320,905,320C891.4,320,878,320,864,320C850.3,320,837,320,823,320C809.1,320,795,320,782,320C768,320,754,320,741,320C726.9,320,713,320,699,320C685.7,320,672,320,658,320C644.6,320,631,320,617,320C603.4,320,590,320,576,320C562.3,320,549,320,535,320C521.1,320,507,320,494,320C480,320,466,320,453,320C438.9,320,425,320,411,320C397.7,320,384,320,370,320C356.6,320,343,320,329,320C315.4,320,302,320,288,320C274.3,320,261,320,247,320C233.1,320,219,320,206,320C192,320,178,320,165,320C150.9,320,137,320,123,320C109.7,320,96,320,82,320C68.6,320,55,320,41,320C27.4,320,14,320,7,320L0,320Z"></path>
</svg>



      </div>
    </header>
  );
}
