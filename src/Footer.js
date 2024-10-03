import React from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import { FaDiscord } from "react-icons/fa"; // Discord Icon from react-icons

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Automatically get the current year

  return (
    <footer className="bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 py-4">
      <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
        {/* Copyright Text */}
        <p className="text-sm">
          &copy; {currentYear} Recipe Book. All Rights Reserved.
        </p>

        {/* Icons and Links */}
        <div className="flex items-center space-x-4">
          {/* Discord Icon */}
          <a
            href="https://discord.gg/TunckUjXKj"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400"
            aria-label="Join us on Discord"
          >
            <FaDiscord className="h-6 w-6" />
          </a>

          {/* Shopping Cart Icon */}
          <a
            href="https://builtbybit.com/recipebook"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 dark:text-gray-200 hover:text-green-500 dark:hover:text-green-400"
            aria-label="Buy Recipe Book"
          >
            <ShoppingCartIcon className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
