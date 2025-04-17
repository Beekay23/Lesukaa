"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronRightIcon, ChevronDownIcon } from "../icons";

export interface NavItemProps {
  title: string;
  slug?: string;
  icon?: React.ReactNode;
  subItems?: NavItemProps[];
}

export interface SidebarProps {
  navItems: NavItemProps[];
  onClose?: () => void;
}

export const SidebarNavigation: React.FC<SidebarProps> = ({
  navItems,
  onClose,
}) => {
  return (
    <aside className="h-full w-full" aria-label="Sidebar navigation">
      <div className="h-full flex flex-col py-2 sm:py-4">
        <nav className="flex-1 overflow-y-auto">
          <ul className="space-y-1">
            {navItems.map((item, index) => (
              <NavItemComponent
                key={`${item.title}-${index}`}
                item={item}
                onClose={onClose}
              />
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

const NavItemComponent: React.FC<{
  item: NavItemProps;
  onClose?: () => void;
}> = ({ item, onClose }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubItems = item.subItems && item.subItems.length > 0;

  const handleClick = (e: React.MouseEvent) => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <li>
      <div className="relative text-gray-900">
        {item.slug ? (
          <Link
            href={`#${item.slug}`}
            className={`flex items-center py-2 sm:py-3 rounded-lg hover:text-[#029E1F] ${
              hasSubItems ? "justify-between" : ""
            }`}
            onClick={handleClick}
          >
            <div className="flex items-center">
              {item.icon && <span className="mr-2 sm:mr-3">{item.icon}</span>}
              <span className="text-sm sm:text-base">{item.title}</span>
            </div>
            {hasSubItems && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsExpanded(!isExpanded);
                }}
                className="ml-2 p-1 rounded-full hover:bg-gray-200"
                aria-expanded={isExpanded}
                aria-label={`Toggle ${item.title} submenu`}
              >
                {isExpanded ? (
                  <ChevronDownIcon className="h-4 w-4 text-gray-900" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </button>
            )}
          </Link>
        ) : (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`w-full flex items-center py-2 sm:py-3 rounded-lg hover:text-[#029E1F] ${
              hasSubItems ? "justify-between" : ""
            }`}
            aria-expanded={isExpanded}
            aria-label={`Toggle ${item.title} submenu`}
          >
            <div className="flex items-center">
              {item.icon && <span className="mr-2 sm:mr-3">{item.icon}</span>}
              <span className="text-sm sm:text-base font-medium">
                {item.title}
              </span>
            </div>
            {hasSubItems && (
              <span>
                {isExpanded ? (
                  <ChevronDownIcon className="h-4 w-4" />
                ) : (
                  <ChevronRightIcon className="h-4 w-4" />
                )}
              </span>
            )}
          </button>
        )}
      </div>

      {hasSubItems && (
        <div className={`pl-3 sm:pl-4 ${isExpanded ? "block" : "hidden"}`}>
          <ul className="space-y-1">
            {item.subItems?.map((subItem, index) => (
              <li key={`${subItem.title}-${index}`}>
                <Link
                  href={`#${subItem.slug}`}
                  className="flex items-center py-1.5 sm:py-2 rounded-lg hover:text-[#029E1F]"
                  onClick={onClose}
                >
                  {subItem.icon && (
                    <span className="mr-2 sm:mr-3">{subItem.icon}</span>
                  )}
                  <span className="text-sm sm:text-base">{subItem.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};
