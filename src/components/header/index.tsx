"use client";

import React, { useState, useCallback } from "react";
import Link from "next/link";
import { Logo } from "../logo";
import { MenuIcon, CloseIcon } from "../icons";
import { SidebarNavigation, NavItemProps } from "../sidebar-navigation";

interface HeaderProps {
  navItems: NavItemProps[];
  phoneNumbers?: string[];
  companyName?: string;
}

const PHONE_NUMBERS = ["+234 9016109171", "+234 7057554472"];
const COMPANY_NAME = "Your Company Name";

export const Header: React.FC<HeaderProps> = ({
  navItems,
  phoneNumbers = PHONE_NUMBERS,
  companyName = COMPANY_NAME,
}) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  return (
    <header className="bg-white shadow-sm" role="banner">
      <div className="mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <MobileMenuButton
            isOpen={isMobileMenuOpen}
            onClick={toggleMobileMenu}
          />

          <PhoneNumbers phoneNumbers={phoneNumbers} />

          <LogoLink companyName={companyName} />

          <div className="w-full flex justify-end gap-4">
            <OrderButton />
          </div>
        </div>

        <MobileMenu
          isOpen={isMobileMenuOpen}
          onClose={closeMobileMenu}
          phoneNumbers={phoneNumbers}
          navItems={navItems}
        />

        <MobileMenuOverlay
          isOpen={isMobileMenuOpen}
          onClick={closeMobileMenu}
        />
      </div>
    </header>
  );
};

// Sub-components

interface MobileMenuButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({
  isOpen,
  onClick,
}) => (
  <div className="lg:hidden flex items-center gap-4">
    <button
      className="text-gray-700 cursor-pointer"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
    >
      {isOpen ? (
        <CloseIcon className="text-gray-700" />
      ) : (
        <MenuIcon className="text-gray-700" />
      )}
    </button>
  </div>
);

interface PhoneNumbersProps {
  phoneNumbers: string[];
}

const PhoneNumbers: React.FC<PhoneNumbersProps> = ({ phoneNumbers }) => (
  <address className="hidden lg:flex lg:flex-col items-start not-italic w-full">
    {phoneNumbers.map((number, index) => (
      <a
        key={index}
        href={`tel:${number.replace(/\s+/g, "")}`}
        className="flex items-center gap-2 text-[#858585] font-medium text-base hover:text-primary transition-colors"
        aria-label={`Call us at ${number}`}
      >
        <span className="font-medium tracking-wide">{number}</span>
      </a>
    ))}
  </address>
);

interface LogoLinkProps {
  companyName: string;
}

const LogoLink: React.FC<LogoLinkProps> = ({ companyName }) => (
  <div className="mx-auto md:mx-0">
    <Link className="flex items-center justify-center" href="/" passHref>
      <h1 className="sr-only">{companyName}</h1>
      <Logo className="h-8" aria-hidden="true" />
    </Link>
  </div>
);

const OrderButton: React.FC = () => (
  <Link
    href="#"
    className="bg-[#029E1F] text-white rounded-lg px-4 py-2 font-medium hover:bg-[#029E1F]/80 text-base transition-colors duration-200"
  >
    Order Now
  </Link>
);

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  phoneNumbers: string[];
  navItems: HeaderProps["navItems"];
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  phoneNumbers,
  navItems,
}) => (
  <div
    id="mobile-menu"
    className={`lg:hidden fixed top-0 left-0 h-full w-[70%] bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${
      isOpen ? "translate-x-0" : "-translate-x-full"
    }`}
    aria-label="Mobile navigation"
  >
    <div className="p-6 pt-6">
      <button
        className="absolute top-4 right-4 text-gray-700 cursor-pointer"
        onClick={onClose}
        aria-label="Close menu"
      >
        <CloseIcon className="text-gray-700" />
      </button>

      <nav className="mt-8 space-y-2">
        {phoneNumbers.map((number, index) => (
          <a
            key={index}
            href={`tel:${number.replace(/\s+/g, "")}`}
            className="flex items-center gap-2 font-medium text-base py-2"
          >
            <span className="text-[#a2a2a2]">{number}</span>
          </a>
        ))}
        <SidebarNavigation navItems={navItems} onClose={onClose} />
      </nav>
    </div>
  </div>
);

interface MobileMenuOverlayProps {
  isOpen: boolean;
  onClick: () => void;
}

const MobileMenuOverlay: React.FC<MobileMenuOverlayProps> = ({
  isOpen,
  onClick,
}) =>
  isOpen && (
    <div
      className="fixed inset-0 bg-black/80 z-40 md:hidden"
      onClick={onClick}
      aria-hidden="true"
    />
  );
