import React from "react";
import Hero from "../components/Home/Hero";
import RecentlyAdded from "../components/Home/RecentlyAdded";
import Chatbot from "../components/Chatbot/Chatbot";
import HomePageNav from "../components/HomePageNav/HomePageNav";

const Home = () => {
  return (
    <>
      <HomePageNav/>
      <div className="text-white px-10 py-8">
        <Hero />
        <RecentlyAdded />
        <Chatbot />
      </div>
    </>
  );
};

export default Home;
