'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Config } from "@/core/constants/configs";
import { useSelector } from "react-redux";
import { AuthSelectors } from "@/modules/auth/slice";
import { TagIcon } from "@heroicons/react/24/outline";

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
    if (amount === undefined) {
      return '0';
    }
    return amount.toLocaleString('vi-VN');
  };

  return (
    <div className="flex flex-col h-full shadow-xl">
      <Link href={`/orderFood/${id}`} className=" flex-grow">
        <div className='bg-white  px-4 pb-2 pt-4 flex flex-col '>
          <div className="w-full h-32 bg-gray-300 rounded-lg mb-4">
            {image && <Image src={Config.CDN_URL + image} width={300} height={200} alt="banner" className="w-full h-full object-cover" />}
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold">{name}</h3>
            <p className="text-orange-500 text-xl font-bold">{formatCurrency(Number(price))}đ</p>
          </div>
          {totalSub && (
          <p className="text-green-600 mb-2 font-bold">{totalSub} người đã đặt</p>
          )}
          <p className="text-sm text-black font-bold mb-4" dangerouslySetInnerHTML={{ __html: description }}></p>

        </div>
        <div className="bg-white flex items-center justify-start">
          <div className='ml-4 pb-2 space-x-2 flex flex-wrap' >
            {serviceTags?.map((value, index) => (
              <span key={index} className="border rounded-md font-bold px-2 py-1 text-sm text-blue-600 bg-gradient-to-r from-purple-200 to-pink-200 flex items-center"><TagIcon className="w-4 h-4 mr-1" />{value}</span>
            ))}
          </div>
        </div>
        {subscriptionID &&
          <div className="text-white h-7 bg-red-800 rounded-b-lg text-md flex flex-col justify-center items-center ">
            {`${subscriptionID?.mealsPerDay} phần / ${subscriptionID?.totalDate} ngày`}
          </div>
        }
      </Link>
    </div>
  );
};

export default CardDetail;
