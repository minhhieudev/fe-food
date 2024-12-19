import React, { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Config } from "@/core/constants/configs";
import { useSelector } from "react-redux";
import { AuthSelectors } from "@/modules/auth/slice";
import { TagIcon } from "@heroicons/react/24/outline";

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
  const truncatedDescription = description.split(" ").slice(0, 20).join(" ") + (description.split(" ").length > 20 ? "..." : "");
  const client = useSelector(AuthSelectors.client);
  const formatCurrency = (amount: number | undefined): string => {
    if (amount === undefined) {
      return '0';
    }
    return amount.toLocaleString('vi-VN');
  };

  return (
    <div className="flex flex-col h-fit shadow-xl border-2 border-solid border-white rounded-lg">
      <Link href={`/orderFood/${_id}`} className="flex-grow">
        <div className={`bg-gradient-to-r from-blue-50 to-green-50 shadow-xl rounded-t-lg px-4 pb-2 pt-4 flex flex-col ${!type ? 'rounded-b-lg' : ''}`}>
          <div className="w-full h-32 bg-gradient-to-r from-blue-25 to-green-25 rounded-lg mb-4">
            {mainImage && <Image src={Config.CDN_URL + mainImage} alt="banner" className="w-full h-full object-cover" width={300} height={150} />}
          </div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-orange-500 font-bold">{formatCurrency(Number(price))}đ</p>
          </div>
          {type &&
            <p className="text-green-600 mb-2 font-bold">{subscriptionID?.totalSub} KH đang tham gia</p>
          }
          <p className="text-sm text-gray-500 mb-4 font-bold" dangerouslySetInnerHTML={{ __html: truncatedDescription }}></p>
          <div className="flex items-center justify-start">
            <div className='ml-0 pb-2 space-x-2 flex flex-wrap'>
              {serviceTags?.length > 2 ? [...serviceTags.slice(0, 2), '...'].map((value, index) => (
                <span key={index} className="border rounded-md font-bold px-1 py-1 text-sm text-blue-600 bg-gradient-to-r from-purple-100 to-pink-100 flex items-center"><TagIcon className="w-3 h-3 mr-1" />{value}</span>
              )) : serviceTags?.map((value: any, index: any) => (
                <span key={index} className="border rounded-md font-bold px-1 py-1 text-sm text-blue-600 bg-gradient-to-r from-purple-100 to-pink-100 flex items-center"><TagIcon className="w-3 h-3 mr-1" />{value}</span>
              ))}
            </div>
          </div>
        </div>
      </Link>
      {type && (
        <div className="text-white h-7 bg-red-800 rounded-b-lg text-md flex flex-col justify-center items-center ">
          {`${subscriptionID.mealsPerDay} phần / ${subscriptionID.totalDate} ngày`}
        </div>
      )}
    </div>
  );
};

export default MealCard;
