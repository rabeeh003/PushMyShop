import { useState } from "react";
import { MenuItem } from "./MenuItem";
import { ChevronDown, ChevronUp } from "lucide-react";

export const MenuAccordion = ({ category, items }) => {
  const [isOpen, setIsOpen] = useState(true);
  

  if (!items || items.length === 0) {
    return null; // or render a message indicating no items for this category
  }

  return (
    <div className="border-b border-gray-400 rounded-lg mb-4 w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-1 hover:bg-gray-50"
      >
        <span className="font-semibold">{category} ({items.length})</span>
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {isOpen && (
        <div className="border-t border-gray-300">
          {items.map((item) => (
            <MenuItem key={item.id} item={item} />
            // <p>hello</p>
          ))}
        </div>
      )}
    </div>
  );
};
