"use client";

import React from "react";
import Image from "next/image";
import { toSlug } from "@/lib/products";

export interface CardProps {
  imageURL?: string;
  name: string;
  price?: number;
  slug?: string;
  id?: string | number;
}

interface GridListProps {
  items: CardProps[];
}

export const GridList: React.FC<GridListProps> = ({ items = [] }) => {
 return (
    <div className="py-3 sm:py-4">
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
        {items.map((item, index) => (
          <Card
            key={item.id || `${item.name}-${index}`}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};

const Card: React.FC<{ item: CardProps }> = ({ item }) => {
  if (!item) return null;

  return (
    <div className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative h-40 sm:h-48 md:h-56 overflow-hidden bg-gray-100">
        {item.imageURL ? (
          <Image
            src={item.imageURL}
            alt={item.name}
            height={500}
            width={500}
            loading="lazy"
            className="h-full"
          />
        ) : (
          <div className="absolute h-full w-full flex items-center justify-center bg-gray-200">
            <svg
              className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="text-base sm:text-lg font-medium text-gray-900 line-clamp-2">
          {item.name || 'Untitled Item'}
        </h3>
        <p className="mt-1 text-sm sm:text-base text-gray-500 font-medium">
          {item.price ? `₦${item.price.toLocaleString()}` : 'Price not available'}
        </p>
      </div>
    </div>
  );
};
