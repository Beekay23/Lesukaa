import { food } from "@/data/food";
import { drinks } from "@/data/drinks";
import { Category } from "./products";

export interface SearchResult {
  title: string;
  subcategories: Array<{
    title: string;
    items: Array<{
      id: string;
      name: string;
      price: number;
    }>;
  }>;
}

export const searchItems = (query: string): SearchResult[] => {
  if (!query.trim()) {
    return [];
  }

  const searchQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  // Search through food items
  const foodCategory: SearchResult = {
    title: "Food",
    subcategories: []
  };

  food.forEach((category: Category) => {
    const matchingItems = category.items
      .filter((item: { name: string; price: number }) =>
        item.name.toLowerCase().includes(searchQuery)
      )
      .map((item, index) => ({
        ...item,
        id: `food-${category.title}-${item.name}-${index}`
      }));

    if (matchingItems.length > 0) {
      foodCategory.subcategories.push({
        title: category.title,
        items: matchingItems
      });
    }
  });

  if (foodCategory.subcategories.length > 0) {
    results.push(foodCategory);
  }

  // Search through drink items
  const drinkCategory: SearchResult = {
    title: "Drinks",
    subcategories: []
  };

  drinks.forEach((category: Category) => {
    const matchingItems = category.items
      .filter((item: { name: string; price: number }) =>
        item.name.toLowerCase().includes(searchQuery)
      )
      .map((item, index) => ({
        ...item,
        id: `drink-${category.title}-${item.name}-${index}`
      }));

    if (matchingItems.length > 0) {
      drinkCategory.subcategories.push({
        title: category.title,
        items: matchingItems
      });
    }
  });

  if (drinkCategory.subcategories.length > 0) {
    results.push(drinkCategory);
  }

  return results;
};
