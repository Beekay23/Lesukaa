import { food } from "@/data/food";
import { drinks } from "@/data/drinks";

export interface Category {
  title: string;
  items: Array<{
    name: string;
    price: number;
  }>;
}

interface CategorySummary {
  title: string;
  slug: string;
}

interface Products {
  food: Category[];
  drinks: Category[];
}

export const getProducts = (): Products => {
  return { food, drinks };
}

export const getCategories = (categories: Category[]): CategorySummary[] => {
  if (!categories) return [];

  return categories.map(category => ({
    title: category.title,
    slug: toSlug(category.title)
  }));
};

export function toSlug(title: string): string {
  if (!title) return '';

  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s]+/g, '-')
    .replace(/--+/g, '-');
}
