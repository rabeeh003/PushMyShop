import { useState } from "react";
import { MenuItem } from "./MenuItem";
import { ChevronDown, ChevronUp } from "lucide-react";

export const MenuAccordion = ({ category, items }) => {
  const [isOpen, setIsOpen] = useState(true);


  if (!items || items.length === 0) {
    return null; // or render a message indicating no items for this category
  }

  return (
    <div className="border-gray-400 mb-4 w-full">
      <button
        // onClick={() => setIsOpen(!isOpen)}
        className="sticky top-16 z-10 w-full btn bg-main-color text-white flex justify-between items-center"
      >
        <span className="font-semibold">{category} </span>
        <span>
          {items.length}
        </span>
        {/* {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />} */}
      </button>

      {isOpen && (
        <div className=" border-gray-300">
          {items.map((item) => (
            <MenuItem key={item.id} item={item} />
            // <p>hello</p>
          ))}
        </div>
      )}
    </div>
  );
};
