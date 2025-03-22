import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
<div className="bg-slate-50  py-20 h-[60vh] flex items-center justify-center">
  <div className="container mx-auto px-4 text-center">
    <h1 className="text-4xl md:text-5xl font-bold mb-6">
      Savor Every Bite, Anytime!
    </h1>
    <p className="text-xl mb-8 max-w-2xl mx-auto">
      Experience hassle-free food delivery from the best local restaurants, straight to your door.
    </p>
    <Link
      href="/menu"
      className="inline-block bg-black text-white font-medium py-3 px-8 rounded-md hover:bg-gray-900 transition-colors "
    >
      Explore Menu
    </Link>
  </div>
</div>

  );
};

export default Hero;
