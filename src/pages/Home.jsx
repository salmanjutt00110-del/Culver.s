import { useState } from "react";
import BurgerLoader from "../components/BurgerLoader";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import InfoBar from "../components/InfoBar";
import MenuHighlights from "../components/MenuHighlights";
import About from "../components/About";
import Reviews from "../components/Reviews";
import Location from "../components/Location";
import OrderCTA from "../components/OrderCTA";
import Footer from "../components/Footer";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <BurgerLoader onComplete={() => setLoaded(true)} />}
      <div
        className={`transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
      >
        <Navbar />
        <Hero />
        <InfoBar />
        <MenuHighlights />
        <About />
        <Reviews />
        <Location />
        <OrderCTA />
        <Footer />
      </div>
    </>
  );
}