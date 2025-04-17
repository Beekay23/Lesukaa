"use client"

import { PageHeading } from "@/components";
import { SidebarLayout, Header } from "@/components";
import { getProducts, getCategories } from "@/lib/products";
import { searchItems, SearchResult } from "@/lib/search";
import { useState, useMemo } from "react";

export default function Home() {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

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
          price: item.price
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
          price: item.price
        }))
      }))
    }
  ], [products.food, products.drinks]);

  const sidebarItems = useMemo(() => [foodCategories, drinkCategories], [foodCategories, drinkCategories]);

  const handleSearch = (query: string) => {
    if (!query || typeof query !== 'string') {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      setIsSearching(true);
      const results = searchItems(trimmedQuery);
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  };

  return (
    <div>
      <Header navItems={sidebarItems} />
      <PageHeading />
      <div>
        <div>
          <SidebarLayout
            navItems={sidebarItems}
            productCategories={isSearching ? searchResults : productCategories}
            onSearch={handleSearch}
          />
        </div>
      </div>
    </div>
  );
}
