import React, { useState } from "react";

interface TabItem {
    name: string;
    onClick?: () => void;
}

interface TabProps {
    list: TabItem[];
    onTabSelect: (tabName: string) => void;
}

const Tab: React.FC<TabProps> = ({ list, onTabSelect }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleTabClick = (item: TabItem, index: number) => {
        setCurrentIndex(index);
        onTabSelect(item.name);
    };

    return (
        <div className="overflow-x-auto whitespace-nowrap">
            <div className="flex">
                {list.map((item, index) => (
                    <OneItem
                        key={index}
                        item={item}
                        currentIndex={currentIndex}
                        onTabClick={() => handleTabClick(item, index)}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}

const OneItem: React.FC<{ item: TabItem; currentIndex: number; onTabClick: () => void; index: number }> = ({ item, currentIndex, onTabClick, index }) => {
    return (
        <div onClick={onTabClick} className="cursor-pointer">
            <div className="flex flex-col items-center p-4">
                <div className={`text-lg ${currentIndex === index ? "font-bold text-green-600" : "text-gray-600"}`}>
                    {item.name}
                </div>
                <div className={`h-1 ${currentIndex === index ? "bg-green-600" : "bg-transparent"} transition-all duration-300`} />
            </div>
        </div>
    );
};

export default Tab;
