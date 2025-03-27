import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Config } from "@/core/constants/configs";
import { useSelector } from "react-redux";
import { AuthSelectors } from "@/modules/auth/slice";
import { TagIcon, ClockIcon, FireIcon, HeartIcon, ShoppingCartIcon, SparklesIcon, ShieldCheckIcon, CheckIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon, FireIcon as FireSolidIcon } from "@heroicons/react/24/solid";

interface Meal {
  _id: string;
  name: string;
  mainImage: string;
  description: string;
  price: string;
  subscriptionID?: any;
  type?: boolean;
  images: any,
  serviceTags: any
}

const MealCard: React.FC<Meal> = ({ _id, name, images, mainImage, description, price, subscriptionID, type, serviceTags }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const truncatedDescription = description.split(" ").slice(0, 12).join(" ") + (description.split(" ").length > 12 ? "..." : "");
  const client = useSelector(AuthSelectors.client);
  
  const formatCurrency = (amount: number | undefined): string => {
    if (amount === undefined) return '0';
    return amount.toLocaleString('vi-VN');
  };

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div 
      className="group flex flex-col h-full overflow-hidden rounded-xl bg-white shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/orderFood/${_id}`} className="flex-grow relative">
        <div className="relative overflow-hidden">
          {(subscriptionID?.totalSub > 10 || Math.random() > 0.7) && (
            <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-amber-500 to-orange-500 py-1 px-3 rounded-full shadow-md flex items-center animate-pulse">
              <SparklesIcon className="w-4 h-4 text-white mr-1" />
              <p className="text-sm font-bold text-white">Phổ biến</p>
            </div>
          )}
          
          <div className="absolute bottom-3 left-3 z-20 bg-white/80 backdrop-blur-sm py-1 px-2 rounded-full shadow-sm flex items-center">
            <ShieldCheckIcon className="w-3 h-3 text-emerald-600 mr-1" />
            <p className="text-xs font-medium text-emerald-700">Chất lượng cao</p>
          </div>
          
          <div className="h-52 w-full overflow-hidden">
            {mainImage && (
              <Image 
                src={Config.CDN_URL + mainImage} 
                alt={name} 
                className={`w-full h-full object-cover transition-all duration-700 ${isHovered ? 'scale-110 brightness-105' : 'scale-100'}`}
                width={400} 
                height={300}
              />
            )}
          </div>
          
          <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
          
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm py-1 px-3 rounded-full shadow-md transform transition-all duration-300 group-hover:scale-110">
            <p className="font-bold text-emerald-600">{formatCurrency(Number(price))}đ</p>
          </div>
        </div>
        
        <div className="p-5 relative">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-bold text-gray-800 group-hover:text-emerald-600 transition-colors">
              {name}
              {Math.random() > 0.7 && (
                <span className="ml-2 inline-flex items-center bg-red-100 text-red-600 text-xs px-1.5 py-0.5 rounded-full">
                  <FireSolidIcon className="w-3 h-3 mr-0.5" />
                  Hot
                </span>
              )}
            </h3>
            <button 
              className={`transition-colors p-1.5 rounded-full ${isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'}`}
              onClick={toggleLike}
            >
              {isLiked ? <HeartSolidIcon className="w-5 h-5" /> : <HeartIcon className="w-5 h-5" />}
            </button>
          </div>
          
          <p className="text-sm text-gray-600 mb-4" dangerouslySetInnerHTML={{ __html: truncatedDescription }}></p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {(serviceTags || []).slice(0, 3).map((tag: string, index: number) => (
              <span key={index} className="text-xs font-medium bg-emerald-50 text-emerald-600 px-2 py-1 rounded-full flex items-center group-hover:bg-emerald-100 transition-colors">
                <TagIcon className="w-3 h-3 mr-1" />
                {tag}
              </span>
            ))}
            {(serviceTags || []).length > 3 && (
              <span className="text-xs font-medium bg-gray-100 text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200 transition-colors">
                +{serviceTags.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center text-gray-500 text-sm">
              <ClockIcon className="w-4 h-4 mr-1" />
              <span>30 phút</span>
              <FireIcon className="w-4 h-4 ml-3 mr-1" />
              <span>425 Kcal</span>
            </div>
            
            <button className={`p-2 rounded-full bg-emerald-500 text-white shadow-md transform transition-all duration-300 ${isHovered ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}>
              <ShoppingCartIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      </Link>
      
      {type && (
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-3 px-4 text-center font-medium relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXnM80CtU_U3leYR-PP_r6BQC2aJnL8x6kaQ&s')] opacity-10"></div>
          <div className="relative z-10 flex items-center justify-center">
            <CheckIcon className="w-4 h-4 mr-2" />
            <span>{`${subscriptionID.mealsPerDay} phần / ${subscriptionID.totalDate} ngày`}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealCard;
