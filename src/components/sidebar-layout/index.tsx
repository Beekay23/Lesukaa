"use client";

import React from "react";
import { SidebarNavigation, NavItemProps } from "../sidebar-navigation";
import { GridList, CardProps } from "../grid-list";
import { toSlug } from "@/lib/products";
import { SearchBar } from "../search-bar";

interface ProductCategory {
  title: string;
  subcategories: ProductSubcategory[];
}

interface ProductSubcategory {
  title: string;
  items: CardProps[];
}

interface SidebarLayoutProps {
  navItems: NavItemProps[];
  productCategories: ProductCategory[];
  onSearch: (query: string) => void;
}

export const SidebarLayout: React.FC<SidebarLayoutProps> = ({
  navItems,
  productCategories,
  onSearch
}) => {
  return (
    <div className="flex flex-col md:flex-row bg-gray-50 min-h-screen">
      <aside className="w-full hidden lg:block lg:w-72 bg-gray-200/30 lg:sticky lg:top-0 lg:h-screen lg:z-20">
        <div className="px-4 md:px-6 py-4 md:pt-2">
          <SidebarNavigation navItems={navItems} />
        </div>
      </aside>

      <main className="flex-1">
        <div className="sticky top-0 z-10 bg-white shadow-sm">
          <div>
            <SearchBar onSearch={onSearch} />
          </div>
        </div>
        <div className="overflow-y-auto">
          <div className="p-4 sm:p-6 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 md:space-y-16">
              {productCategories.map((category, categoryIndex) => (
                <ProductCategorySection
                  key={`${category.title}-${categoryIndex}`}
                  category={category}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

interface ProductCategorySectionProps {
  category: ProductCategory;
}

const ProductCategorySection: React.FC<ProductCategorySectionProps> = ({
  category
}) => (
  <section id={toSlug(category.title)}>
    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6 md:mb-8">
      {category.title}
    </h1>

    <div className="space-y-6 sm:space-y-8 md:space-y-10">
      {category.subcategories.map((subcategory, subcategoryIndex) => (
        <ProductSubcategorySection
          key={`${category.title}-${subcategory.title}-${subcategoryIndex}`}
          subcategory={subcategory}
        />
      ))}
    </div>
  </section>
);

interface ProductSubcategorySectionProps {
  subcategory: ProductSubcategory;
}

const ProductSubcategorySection: React.FC<ProductSubcategorySectionProps> = ({
  subcategory
}) => (
  <div id={toSlug(subcategory.title)}>
    <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-gray-700 mb-3 sm:mb-4 md:mb-6">
      {subcategory.title}
    </h2>
    <GridList items={subcategory.items} />
  </div>
);
