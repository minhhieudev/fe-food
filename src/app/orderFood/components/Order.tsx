"use client"
import React, { useEffect, useRef, useState } from 'react';
import { EyeIcon, StarIcon, CalendarDaysIcon, TrashIcon, EllipsisVerticalIcon, CheckCircleIcon, ClockIcon, BoltIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from "next/navigation";
import { Config } from '@/core/constants/configs';
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import { MealActions } from "@/modules/meal/slice";

interface OrderProps {
  order: {
    _id: string;
    date: string;
    deliveryTime: string;
    status: string;
    description: string;
    estimatedTime: string;
    estimatedDate: string;
    ingredientList: any;
    image: string
  };
  index: number;
  openIndex: number | null;
  setOpenIndex: (index: number | null) => void;
}

const getStatusInVietnamese = (status: string) => {
  switch (status) {
    case 'pending':
      return { 
        text: 'Đang chờ xử lý', 
        color: 'text-amber-600', 
        bgColor: 'bg-amber-50', 
        icon: <ClockIcon className="w-4 h-4" />,
        borderColor: 'border-amber-200'
      };
    case 'done':
      return { 
        text: 'Đã giao', 
        color: 'text-emerald-600', 
        bgColor: 'bg-emerald-50',
        icon: <CheckCircleIcon className="w-4 h-4" />,
        borderColor: 'border-emerald-200'
      };
    case 'cancelled':
      return { 
        text: 'Đã hủy', 
        color: 'text-red-600', 
        bgColor: 'bg-red-50',
        icon: <XCircleIcon className="w-4 h-4" />,
        borderColor: 'border-red-200'
      };
    case 'inprogress':
      return { 
        text: 'Đang tiến hành', 
        color: 'text-blue-600', 
        bgColor: 'bg-blue-50',
        icon: <BoltIcon className="w-4 h-4" />,
        borderColor: 'border-blue-200'
      };
    default:
      return { 
        text: 'Không xác định', 
        color: 'text-gray-600', 
        bgColor: 'bg-gray-50',
        icon: <ClockIcon className="w-4 h-4" />,
        borderColor: 'border-gray-200'
      };
  }
};

const Order: React.FC<OrderProps> = ({ order, index, openIndex, setOpenIndex }) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [orderStatus, setOrderStatus] = useState(order.status);
  const dispatch = useDispatch();

  const detail = () => {
    router.push(`${pathname}/${order._id}`);
  }
  
  const changeDate = () => {
    router.push(`${pathname}/${order._id}`);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenIndex(null);
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setOpenIndex]);

  const toggleDropdown = () => {
    setOpenIndex(index === openIndex ? null : index);
    setIsOpen(!isOpen);
  };
  
  const statusInfo = getStatusInVietnamese(orderStatus);

  const cancelMeal = () => {
    dispatch(
      MealActions.cancelMeal({
        mealID: order._id,
        onSuccess: (rs: any) => {
          toast.success('Đã hủy bữa ăn')
          setOrderStatus('cancelled');
        },
        onFail: (rs: any) => {
          toast.error(rs);
        }
      })
    );
  };

  const formattedDate = new Date(order.estimatedDate).toLocaleDateString('vi-VN');

  return (
    <div className={`bg-white rounded-xl overflow-hidden border border-l-4 ${statusInfo.borderColor} shadow-sm hover:shadow-md transition-all duration-300 group`}>
      <div className="p-5">
        {/* Header with date, time and status */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full ${statusInfo.bgColor} ${statusInfo.color} flex items-center justify-center`}>
              {statusInfo.icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 leading-tight">
                {formattedDate}
              </h3>
              <div className="flex items-center text-sm text-gray-500 mt-0.5">
                <ClockIcon className="w-3.5 h-3.5 mr-1" />
                <span>{order.estimatedTime}</span>
              </div>
            </div>
          </div>
          
          <div className={`${statusInfo.bgColor} ${statusInfo.color} px-3 py-1 rounded-full text-xs font-medium flex items-center`}>
            {statusInfo.icon}
            <span className="ml-1">{statusInfo.text}</span>
          </div>
        </div>
        
        {/* Description */}
        <div className="mt-3">
          <p className="text-gray-600 text-sm line-clamp-2">
            {order.description || 'Mô tả bữa ăn'}
          </p>
        </div>
        
        {/* Image if available */}
        {order.image !== '' && (
          <div className="mt-4 relative overflow-hidden rounded-lg">
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
            <img 
              src={`${Config.CDN_URL}${order.image}`} 
              alt="Ảnh bữa ăn" 
              className="w-full h-40 object-cover transform transition-transform duration-500 group-hover:scale-105" 
            />
          </div>
        )}
        
        {/* Actions */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex space-x-2">
            {order.status === 'done' ? (
              <button 
                className="inline-flex items-center px-3 py-2 border border-amber-300 bg-amber-50 hover:bg-amber-100 text-amber-700 text-sm font-medium rounded-lg transition-colors duration-200"
              >
                <StarIcon className="w-4 h-4 mr-1.5" />
                Đánh giá
              </button>
            ) : (
              <button 
                onClick={changeDate}
                className="inline-flex items-center px-3 py-2 border border-blue-300 bg-blue-50 hover:bg-blue-100 text-blue-700 text-sm font-medium rounded-lg transition-colors duration-200"
              >
                <CalendarDaysIcon className="w-4 h-4 mr-1.5" />
                Đổi ngày
              </button>
            )}
            
            <button 
              onClick={detail}
              className="inline-flex items-center px-3 py-2 border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-sm font-medium rounded-lg transition-colors duration-200"
            >
              <EyeIcon className="w-4 h-4 mr-1.5" />
              Chi tiết
            </button>
          </div>
          
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={toggleDropdown}
              className="p-2 text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors duration-200"
            >
              <EllipsisVerticalIcon className="w-5 h-5" />
            </button>
            
            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50 divide-y divide-gray-100">
                <div className="py-1">
                  {order.status === 'done' && (
                    <button 
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <StarIcon className="w-4 h-4 mr-3 text-amber-500" />
                      Đánh giá bữa ăn
                    </button>
                  )}
                  
                  <button 
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={detail}
                  >
                    <EyeIcon className="w-4 h-4 mr-3 text-emerald-500" />
                    Xem chi tiết
                  </button>
                  
                  <button 
                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={changeDate}
                  >
                    <CalendarDaysIcon className="w-4 h-4 mr-3 text-blue-500" />
                    Đổi ngày giao
                  </button>
                </div>
                
                {order.status === 'pending' && (
                  <div className="py-1">
                    <button 
                      className="flex w-full items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50" 
                      onClick={cancelMeal}
                    >
                      <TrashIcon className="w-4 h-4 mr-3" />
                      Hủy bữa ăn
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
