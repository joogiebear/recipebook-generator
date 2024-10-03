import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism"; // You can choose a different theme
import { Collapse } from "react-collapse"; // For smooth collapse/expand animation

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState(null); // State to track the expanded FAQ

  const faqs = [
    {
      id: "multiple-categories",
      question: "How do I add multiple categories?",
      answer: "You can add multiple categories by clicking the 'Add Category' button on the main page...",
    },
    {
      id: "item-format",
      question: "What format should items be in?",
      answer: "Each item should be entered in the format 'ecoitems:item_name' on a new line in the text area...",
    },
    {
      id: "yaml-example",
      question: "Example of YAML Configuration",
      answer: "Here is an example YAML configuration you can use:",
      yamlExample: `default-category: "main"
categories:
  - id: "main"
    type: "categories"
    categories:
      - "Farming Recipes"
    gui:
      title: "&8RecipeBook | Page &6%page%"
      mask:
        items:
          - black_stained_glass_pane
        pattern:
          - "111111111"
          - "1iiiiiii1"
          - "1iiiiiii1"
          - "1iiiiiii1"
          - "111010111"
      buttons:
        next-page:
          item:
            active: orange_stained_glass_pane name:"&aNext page"
            inactive: gray_stained_glass_pane name:"&7Next page"
          lore:
            active: []
            inactive: []
          row: 5
          column: 6
        prev-page:
          item:
            active: orange_stained_glass_pane name:"&aPrevious page"
            inactive: gray_stained_glass_pane name:"&7Previous page"
          lore:
            active: []
            inactive: []
          row: 5
          column: 4`,
    },
  ];

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <h1 className="text-3xl font-bold mb-6 text-center">Knowledge Base</h1>

      {/* Back to Generator Button */}
      <div className="mb-4 text-center">
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded-md hover:bg-blue-600 dark:hover:bg-blue-800 transition"
        >
          ← Back to Generator
        </Link>
      </div>

      {/* Search Bar */}
      <div className="max-w-4xl mx-auto mb-6">
        <input
          type="text"
          placeholder="Search FAQs..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border rounded-md bg-gray-50 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
        />
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFaqs.map((faq, index) => (
          <div key={index} id={faq.id} className="bg-white dark:bg-gray-800 shadow-md rounded p-4 transition-colors duration-300">
            <h2 className="text-xl font-semibold mb-2 dark:text-gray-200">{faq.question}</h2>

            {/* Collapsible content with max height and scrolling */}
            <Collapse isOpened={expandedFaq === faq.id}>
              <div
                className="text-gray-700 dark:text-gray-300 mb-4 max-h-40 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-700 rounded-md"
                style={{ maxHeight: "300px" }} // Adjust max height as needed
              >
                <p>{faq.answer}</p>

                {faq.yamlExample && (
                  <SyntaxHighlighter language="yaml" style={coy}>
                    {faq.yamlExample}
                  </SyntaxHighlighter>
                )}
              </div>
            </Collapse>

            {/* Toggle Button */}
            <button
              onClick={() => toggleFaq(faq.id)}
              className="text-blue-500 dark:text-blue-300 hover:underline"
            >
              {expandedFaq === faq.id ? "Show Less" : "Read More"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeBase;
