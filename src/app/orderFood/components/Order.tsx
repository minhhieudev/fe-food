"use client"
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { EyeIcon, StarIcon, CalendarDaysIcon, TrashIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { usePathname, useRouter } from "next/navigation";
import { Config } from '@/core/constants/configs';
import { useDispatch, useSelector } from "react-redux";
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
      return { text: 'Đang chờ xử lý', color: 'text-yellow-500' };
    case 'done':
      return { text: 'Đã giao', color: 'text-green-500' };
    case 'cancelled':
      return { text: 'Đã hủy', color: 'text-red-500' };
    case 'inprogress':
      return { text: 'Đang tiến hành', color: 'text-blue-500' };
    default:
      return { text: 'Không xác định', color: 'text-gray-500' };
  }
};

const Order: React.FC<OrderProps> = ({ order, index, openIndex, setOpenIndex }) => {
  const dropdownRef: any = useRef(null);
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
      if (!dropdownRef.current?.contains(event.target as Node)) {
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
    <div className="border rounded-lg p-4 shadow-md">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-md font-semibold">{formattedDate}</div>
          <div className="text-sm font-semibold">Khung giờ giao: <span className="text-orange-500">{order.estimatedTime}</span></div>
        </div>
        <div className={`text-sm font-medium ${statusInfo.color}`}>
          {statusInfo.text}
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        {order.description || 'Mô tả bữa ăn'}
      </div>
      {(order.image !== '') && (
        <div className="mt-2">
          <div className="text-sm font-semibold">Ảnh đã giao:</div>
          <img src={`${Config.CDN_URL}${order.image}`} alt="Ảnh đã giao" className="w-full h-32 object-cover mt-1" />
        </div>
      )}

      <div className="flex mt-4 gap-2 justify-between">
        {order.status === 'done' ? (
          <button className="bg-orange-500 text-white py-2 px-2 rounded-lg hover:opacity-70 flex items-center gap-1.5">
            <StarIcon height={15} width={15} />
            <p className='text-sm'>Đánh giá</p>
          </button>
        ) : (
          <button className="bg-blue-500 text-white py-2 px-2 rounded-lg hover:opacity-70 flex items-center gap-1.5" onClick={changeDate}>
            <CalendarDaysIcon height={15} width={15} />
            <p className='text-sm'>Đổi ngày giao</p>
          </button>
        )}

        <button className="bg-green-500 text-white py-2 px-2 rounded-lg hover:opacity-70 flex items-center gap-1" onClick={detail}>
          <EyeIcon height={15} width={15} />
          <p className='text-sm'>Xem chi tiết</p>
        </button>
        <div className="relative inline-block" ref={dropdownRef}>
          <button onClick={toggleDropdown} className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            <EllipsisVerticalIcon height={15} width={15} />
          </button>
          {isOpen && (
            <div className="origin-top-right absolute right-0 border-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1 font-semibold">

                {(order.status === 'done') ? (
                  <div className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-1 hover:cursor-pointer">
                    <StarIcon height={10} width={10} />
                    <p>Đánh giá</p>
                  </div>

                ) : (
                  <div></div>
                )}

                <div className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-1 hover:cursor-pointer" onClick={detail}>
                  <EyeIcon height={10} width={10} />
                  <p onClick={detail} >Xem chi tiết</p>
                </div>
                <div className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-1 border-b-2 hover:cursor-pointer">
                  <CalendarDaysIcon height={10} width={10} />
                  <p onClick={changeDate}>Đổi ngày giao</p>
                </div>

                {(order.status === 'pending') ? (
                  <div className="block px-2 py-2 mt-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-1 text-red-500 hover:cursor-pointer">
                    <TrashIcon height={10} width={10} />
                    <p onClick={cancelMeal}>Hủy đơn</p>
                  </div>
                ) : (
                  <div></div>
                )}


              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
