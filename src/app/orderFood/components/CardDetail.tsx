'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Config } from "@/core/constants/configs";
import { useSelector } from "react-redux";
import { AuthSelectors } from "@/modules/auth/slice";
import { TagIcon, ClockIcon, FireIcon, UserGroupIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";

interface Meal {
  id?: string;
  name: string;
  description: string;
  price: string;
  type?: boolean;
  image?: string;
  totalSub?: number;
  serviceTags?: [];
  subscriptionID?: {
    mealsPerDay: number,
    totalDate: number
  }
}

const CardDetail: React.FC<Meal> = ({ id, name, description, price, type, image, totalSub, serviceTags, subscriptionID }) => {
  const client = useSelector(AuthSelectors.client);
  
  const formatCurrency = (amount: number | undefined): string => {
    if (amount === undefined) return '0';
    return amount.toLocaleString('vi-VN');
  };

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-all duration-500">
      <Link href={`/orderFood/${id}`} className="flex-grow group">
        <div className="relative overflow-hidden">
          <div className="h-56 w-full">
            {image && (
              <Image 
                src={Config.CDN_URL + image} 
                width={500} 
                height={300} 
                alt={name || "Món ăn"} 
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
              />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-70 transition-opacity duration-500"></div>
            
            <div className="absolute top-4 right-4 animate-float-slow">
              <div className="bg-emerald-500/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                <p className="text-white font-bold">
                  {formatCurrency(Number(price))}đ
                </p>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
              <h3 className="text-xl font-bold text-white mb-2">{name}</h3>
              {subscriptionID && (
                <div className="flex items-center text-white/90 text-sm">
                  <ClockIcon className="w-4 h-4 mr-2" />
                  <span>{`${subscriptionID.mealsPerDay} phần / ${subscriptionID.totalDate} ngày`}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4 mb-4 font-bold text-sm">
            {totalSub && (
              <div className="bg-emerald-50 px-4 py-3 rounded-xl hover:bg-emerald-100 transition-colors duration-300">
                <div className="flex items-center text-emerald-700">
                  <UserGroupIcon className="w-5 h-5 mr-2" />
                  <p className="font-medium">{totalSub} người đặt</p>
                </div>
              </div>
            )}
            
            <div className="bg-amber-50 px-3 py-2 rounded-xl hover:bg-amber-100 transition-colors duration-300">
              <div className="flex items-center text-amber-700">
                <FireIcon className="w-5 h-5 mr-2" />
                <span>425 Kcal</span>
              </div>
            </div>
          </div>
          
          <div className="prose prose-emerald max-w-none mb-6">
            <p className="text-gray-600 line-clamp-3" dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
          
          {serviceTags && serviceTags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {serviceTags.map((value, index) => (
                <span key={index} className="bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-600 px-2 py-2 rounded-full text-xs font-medium flex items-center hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
                  <TagIcon className="w-4 h-4 mr-2" />
                  {value}
                </span>
              ))}
            </div>
          )}
        </div>
        
        {subscriptionID && (
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white py-4 px-6">
            <div className="flex justify-between items-center">
                <span className="font-bold text-base">{`${subscriptionID.mealsPerDay} phần / ${subscriptionID.totalDate} ngày`}</span>
              <div className="animate-bounce">
                <ShoppingCartIcon className="w-6 h-6" />
              </div>
            </div>
          </div>
        )}
      </Link>
    </div>
  );
};

export default CardDetail;
