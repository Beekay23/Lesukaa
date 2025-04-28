"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Loader } from "../loader";

export const PageHeading: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <header className="relative h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gray-200">
        {isLoading && <Loader />}
        <Image
          src="/page-heading.png"
          alt="Page header background"
          fill
          className={`object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          priority
          quality={100}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        />
      </div>

      <div
        className={`relative z-10 text-center px-4 max-w-4xl mx-auto ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="space-y-1 text-white pb-4">
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight">
            LESUKAA
          </h1>
          <p className="text-sm md:text-base font-light max-w-2xl mx-auto">
            LOUNGE & EVENT CENTER
          </p>
        </div>

        <span
          className="block text-4xl md:text-7xl font-light text-white mb-2 tracking-tighter"
          aria-hidden="true"
        >
          OUR MENU
        </span>
      </div>
    </header>
  );
};
