import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import KnowledgeBase from "./KnowledgeBase";
import { saveAs } from "file-saver"; // for file downloads
import YAML from "yaml"; // for YAML generation
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'; // Correct Heroicons v2 import
import "./App.css"; // Ensure Tailwind is correctly included here

function App() {
  const [defaultCategory, setDefaultCategory] = useState("main");
  const [categories, setCategories] = useState([
    { name: "", icon: "", items: "" },
  ]);

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  // Handle dark mode toggle
  const toggleDarkMode = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };

  // Handle category changes
  const handleCategoryChange = (index, field, value) => {
    const newCategories = [...categories];
    newCategories[index][field] = value;
    setCategories(newCategories);
  };

  // Add a new category
  const addCategory = () => {
    setCategories([...categories, { name: "", icon: "", items: "" }]);
  };

  // Handle downloading the config file
  const handleDownload = () => {
    const config = {
      "default-category": defaultCategory,
      categories: [
        {
          id: defaultCategory,
          type: "categories",
          categories: categories.map((cat) => cat.name),
          gui: {
            title: "&8RecipeBook | Page &6%page%",
            mask: {
              items: ["black_stained_glass_pane"],
              pattern: [
                "111111111",
                "1iiiiiii1",
                "1iiiiiii1",
                "1iiiiiii1",
                "111010111",
              ],
            },
            buttons: {
              "next-page": {
                item: {
                  active: 'orange_stained_glass_pane name:"&aNext page"',
                  inactive: 'gray_stained_glass_pane name:"&7Next page"',
                },
                lore: { active: [], inactive: [] },
                row: 5,
                column: 6,
              },
              "prev-page": {
                item: {
                  active: 'orange_stained_glass_pane name:"&aPrevious page"',
                  inactive: 'gray_stained_glass_pane name:"&7Previous page"',
                },
                lore: { active: [], inactive: [] },
                row: 5,
                column: 4,
              },
            },
          },
        },
        ...categories.map((cat) => ({
          id: cat.name,
          icon: {
            item: `${cat.icon} name:"&6${cat.name} Category"`,
            lore: [
              "",
              `&fThis is a ${cat.name} category`,
              "",
              "&bLeft Click &fto show category items",
              "",
            ],
          },
          type: "items",
          namespaces: [""],
          keys: [""],
          items: cat.items.split("\n").map((item) => item.trim()),
          gui: {
            title: `&8${cat.name} | Page &6%page%`,
            mask: {
              items: ["black_stained_glass_pane"],
              pattern: [
                "111111111",
                "1iiiiiii1",
                "1iiiiiii1",
                "1iiiiiii1",
                "111010111",
              ],
            },
            buttons: {
              back: {
                row: 5,
                column: 5,
                item: 'barrier name:"&cBack"',
                lore: [],
              },
              "next-page": {
                item: {
                  active: 'orange_stained_glass_pane name:"&aNext page"',
                  inactive: 'gray_stained_glass_pane name:"&7Next page"',
                },
                lore: { active: [], inactive: [] },
                row: 5,
                column: 6,
              },
              "prev-page": {
                item: {
                  active: 'orange_stained_glass_pane name:"&aPrevious page"',
                  inactive: 'gray_stained_glass_pane name:"&7Previous page"',
                },
                lore: { active: [], inactive: [] },
                row: 5,
                column: 4,
              },
              slot: {
                lore: ["", "&bLeft Click&f to see the recipe", ""],
              },
            },
          },
        })),
      ],
      "craft-gui": {
        title: "&8Crafting Recipe",
        mask: {
          items: ["black_stained_glass_pane"],
          pattern: [
            "111111111",
            "1iii11111",
            "1iii11o11",
            "1iii11111",
            "111010111",
          ],
        },
        buttons: {
          back: {
            row: 5,
            column: 5,
            item: 'barrier name:"&cBack"',
            lore: [],
          },
        },
      },
    };

    const yamlStr = YAML.stringify(config);
    const blob = new Blob([yamlStr], { type: "text/yaml;charset=utf-8" });
    saveAs(blob, "config.yml");
  };

  return (
    <>
      {/* Header with dark/light mode toggle */}
      <header className="p-4 flex justify-between bg-gray-200 dark:bg-gray-800 dark:text-white">
        <h1 className="text-2xl font-bold">Recipe Book Config Generator</h1>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-4 py-2 rounded flex items-center justify-center"
        >
          {darkMode ? (
            <SunIcon className="h-6 w-6 text-yellow-500" />
          ) : (
            <MoonIcon className="h-6 w-6 text-blue-500" />
          )}
        </button>
      </header>

      {/* Routes for main generator and knowledgebase */}
      <Routes>
        {/* Main generator route */}
        <Route
          path="/"
          element={
            <div className="p-8 bg-gray-100 dark:bg-gray-900 min-h-screen transition-colors duration-300">
              <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 p-6 rounded shadow-md">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Default Category:
                </label>
                <input
                  type="text"
                  value={defaultCategory}
                  onChange={(e) => setDefaultCategory(e.target.value)}
                  className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                />

                {categories.map((category, index) => (
                  <div
                    key={index}
                    className="mt-6 border p-4 rounded bg-gray-50 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
                  >
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Category Name:
                    </label>
                    <input
                      type="text"
                      value={category.name}
                      onChange={(e) =>
                        handleCategoryChange(index, "name", e.target.value)
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                    />

                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">
                      Category Icon:
                    </label>
                    <input
                      type="text"
                      value={category.icon}
                      onChange={(e) =>
                        handleCategoryChange(index, "icon", e.target.value)
                      }
                      className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                      placeholder="e.g. golden_hoe"
                    />

                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mt-4">
                      Items (one per line):
                    </label>
                    <textarea
                      value={category.items}
                      onChange={(e) =>
                        handleCategoryChange(index, "items", e.target.value)
                      }
                      rows="4"
                      className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200"
                      placeholder="e.g. ecoitems:enchanted_carrot&#10;ecoitems:enchanted_wheat"
                    ></textarea>
                  </div>
                ))}

                <button
                  onClick={addCategory}
                  className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Add Category
                </button>

                <button
                  onClick={handleDownload}
                  className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded w-full"
                >
                  Generate Config
                </button>
                <div className="mt-4 text-center">
                  <Link
                    to="/knowledgebase"
                    className="text-blue-500 dark:text-blue-300 hover:underline"
                  >
                    Visit the Knowledge Base
                  </Link>
                </div>
              </div>
            </div>
          }
        />
        {/* Knowledge base route */}
        <Route path="/knowledgebase" element={<KnowledgeBase />} />
      </Routes>
    </>
  );
}

export default App;
