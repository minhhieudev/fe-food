import React, { useState } from "react";
import "./style.css";

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
        <div>
            <div className="tab-container">
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
        <div onClick={onTabClick}>
            <div className={"tab-one-item"}>
                <div
                    className={currentIndex === index ? "tab-one-item-label-active" : "tab-one-item-label-unactive"}
                >
                    {item.name}
                </div>
                <div
                    className={currentIndex === index ? "tab-one-item-line-active" : "tab-one-item-line-unactive"}
                />
            </div>
        </div>
    );
};

export default Tab;
