import React from "react";

interface SectionProps {
  title: string;
  icon: string;
  items: string[];
}

const Section: React.FC<SectionProps> = ({ title, icon, items }) => {
  return (
    <div>
      <div className="flex items-center mb-4">
        <i className={`${icon} text-xl mr-2`}></i>
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div className="bg-gray-100 p-4 rounded shadow" key={index}>
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
