"use client"

import { PageHeading } from "@/components";
import { SidebarLayout, Header } from "@/components";
import { getProducts, getCategories } from "@/lib/products";
import { searchItems, SearchResult } from "@/lib/search";
import { useState, useMemo } from "react";

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredItems, setFilteredItems] = useState<SearchResult[]>([]);

  const products = useMemo(() => getProducts(), []);

  const foodCategories = useMemo(() => ({
    title: "Food",
    subItems: getCategories(products.food)
  }), [products.food]);

  const drinkCategories = useMemo(() => ({
    title: "Drinks",
    subItems: getCategories(products.drinks)
  }), [products.drinks]);

  const productCategories = useMemo(() => [
    {
      title: "Food",
      subcategories: products.food.map(category => ({
        title: category.title,
        items: category.items.map((item, index) => ({
          id: `food-${category.title}-${index}`,
          name: item.name,
          price: item.price,
          imageURL: item.imageURL,
        }))
      }))
    },
    {
      title: "Drinks",
      subcategories: products.drinks.map(category => ({
        title: category.title,
        items: category.items.map((item, index) => ({
          id: `drinks-${category.title}-${index}`,
          name: item.name,
          price: item.price,
          imageURL: item.imageURL,
        }))
      }))
    }
  ], [products.food, products.drinks]);

  const sidebarItems = useMemo(() => [foodCategories, drinkCategories], [foodCategories, drinkCategories]);

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    try {
      if (!query || typeof query !== 'string') {
        setIsSearching(false);
        setSearchResults([]);
        setFilteredItems([]);
        return;
      }

      const trimmedQuery = query.trim();
      if (trimmedQuery) {
        setIsSearching(true);
        const results = searchItems(trimmedQuery);
        setSearchResults(results);
        setFilteredItems(results);
      } else {
        setIsSearching(false);
        setSearchResults([]);
        setFilteredItems([]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header
        navItems={sidebarItems}
        onSearch={handleSearch}
        isLoading={isLoading}
      />
      <PageHeading />
      <div>
        <div>
          <SidebarLayout
            navItems={sidebarItems}
            productCategories={isSearching ? searchResults : productCategories}
            onSearch={handleSearch}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
