'use client'
import React, { useMemo, useState, useEffect, useRef, KeyboardEvent } from 'react';
import { ShoppingCartIcon, XMarkIcon, CheckCircleIcon, TagIcon, ClockIcon, CalendarDaysIcon, GiftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Tab from '@/app/components/tab/Tab';
import Datepicker from "react-tailwindcss-datepicker";
import ListIngredient from './ListIngredient';
import {
    IngredientTagSelectors,
} from "@/modules/ingredient.tag/slice";
import { useDispatch, useSelector } from "react-redux";

import { ServiceOrderActions } from "@/modules/services.order/slice";
import { MealActions } from "@/modules/meal/slice";
import { usePathname, useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import { AuthSelectors } from "@/modules/auth/slice";
import { motion, AnimatePresence } from "framer-motion";

interface ModalIngredientProps {
    isVisible: boolean;
    onClose: () => void;
    IngredientList: Ingredient[];
    tabList: any;
    subscriptionID: {
        _id: string,
        totalDate: number,
        mealsPerDay: number

    },
    servicePackageID: string,
    serviceTags: any
}

interface Ingredient {
    _id: string;
    name: string;
    iGroupID: {
        name: string
    }
    image: string;
    description: string;
    iTags: [
        {
            color: string,
            iTagName: string
        }
    ];

}

const deliveryTimesMorning = [
    "7:00 - 8:00",
    "8:00 - 9:00",
    "9:00 - 10:00",
    "10:00 - 11:00",
    "11:00 - 12:00"
];
const deliveryTimesAfter = [
    "12:00 - 13:00",
    "13:00 - 14:00",
    "14:00 - 15:00",
    "15:00 - 16:00",
    "16:00 - 17:00",
    "17:00 - 18:00",
    "18:00 - 19:00",
    "19:00 - 20:00",
    "20:00 - 21:00",
    "21:00 - 22:00",
];

const ModalIngredient: React.FC<ModalIngredientProps> = ({ isVisible, onClose, tabList, IngredientList, subscriptionID, servicePackageID, serviceTags }) => {
    const [selectedTab, setSelectedTab] = useState<string>("Tất cả");
    const router = useRouter();
    const [estimatedTime, setEstimatedTime] = useState('');
    const [selectedTimeAfternoon, setSelectedTimeAfternoon] = useState(deliveryTimesAfter[0]);
    const [selectedTimeMorning, setSelectedTimeMorning] = useState(deliveryTimesMorning[0]);
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [favoriteIngredients, setFavoriteIngredients] = useState<string[]>();
    const [iTags, setITags] = useState<string[]>([]);
    const [voucherCode, setVoucherCode] = useState('');
    const [orderID, setOrderID] = useState('')
    const pathname = usePathname();

    const modalRef = useRef<HTMLDivElement>(null);
    const ListTag: any = useSelector(IngredientTagSelectors.ingredientTag);
    const dispatch = useDispatch();
    const [summary, setSummary] = useState<any>({})
    const client = useSelector(AuthSelectors.client);
    const [tagColors, setTagColors] = useState<{ [key: string]: string }>({});


    useEffect(() => {
        const colors: { [key: string]: string } = {};
        serviceTags?.forEach((tag: string) => {
            colors[tag] = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        });
        setTagColors(colors);
    }, [serviceTags]);

    const filteredIngredients = useMemo(() => {
        switch (selectedTab) {
            case "Tất cả":
                return IngredientList;
            default:
                return IngredientList.filter((item: { iGroupID: { name: string; }; }) => item.iGroupID?.name === selectedTab);
        }
    }, [selectedTab, IngredientList]);

    useEffect(() => {
        const listIngre = IngredientList?.map(ingredient => ingredient._id)
        setFavoriteIngredients(listIngre)
    }, [IngredientList]);


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onClose]);

    useEffect(() => {
        if (isVisible) {
            dispatch(
                ServiceOrderActions.getSummary({
                    body: { servicePackageID },
                    onSuccess: (rs: any) => {
                        if (rs.success) {
                            setSummary(rs.summary);
                        }
                    },
                })
            );
        }
    }, [isVisible, dispatch, servicePackageID]);

    const handleGoalSelect = (ingredientName: string) => {
        setITags((prevIngredients) => {
            if (prevIngredients.includes(ingredientName)) {
                return prevIngredients.filter((item) => item !== ingredientName);
            } else {
                return [...prevIngredients, ingredientName];
            }
        });
    };

    const handleVoucherCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setVoucherCode(event.target.value);
    };

    // Xử lý mã giảm giá
    const handleVoucherCodeKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            // Call your function to handle voucher code submission
            handleVoucherSubmit();
        }
    };

    const handleVoucherSubmit = () => {
        console.log('Submitted voucher code:', voucherCode);
    };

    // TẠO ĐƠN HÀNG
    const handleSubmit = () => {
        if (!selectedDate) {
            toast.error('Vui lòng chọn ngày giao!')
            return;
        }

        const body = {
            code: 'abc',
            iTags,
            subscriptionID: subscriptionID?._id,
            favoriteIngredients,
            servicePackageID,
            estimatedTime1: selectedTimeMorning,
            estimatedTime2: selectedTimeAfternoon,
            estimatedDate: selectedDate?.startDate,

        };
        dispatch(
            ServiceOrderActions.order({
                body,
                onSuccess: (rs: any) => {
                    if (rs.success) {
                        router.push(`/orderFood/meal?orderID=${rs.orderID}`);

                    }
                },
            })
        );
    };

    if (!isVisible) return null;

    const handleValueChange = (newValue: any) => {
        setSelectedDate(newValue);

    }

    const handleFavoriteIngredientsChange = (favorites: string[]) => {
        setFavoriteIngredients(favorites);
    };

    const formatCurrency = (amount: number | undefined): string => {
        if (amount === undefined) {
            return '0';
        }
        return amount.toLocaleString('vi-VN');
    };

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Animation variants
    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.95, y: 20 },
        visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, type: "spring", stiffness: 300, damping: 30 } }
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 backdrop-blur-sm p-4 md:p-6"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={overlayVariants}
                >
                    <motion.div
                        ref={modalRef}
                        className="relative w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        variants={modalVariants}
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-3 flex justify-between items-center sticky top-0 z-10">
                            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center">
                                <ShoppingCartIcon className="w-6 h-6 mr-2" />
                                Tùy chỉnh gói ăn của bạn
                            </h3>
                            <button 
                                onClick={onClose} 
                                className="text-white hover:text-white/80 transition-colors p-1 rounded-full hover:bg-white/20"
                                aria-label="Đóng"
                            >
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>

                        {/* Content area with scroll */}
                        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                                {/* Left column - Ingredients & Goals */}
                                <div className="lg:col-span-3 space-y-3">
                                    {/* Tabs navigation */}
                                    <div className="bg-emerald-50 rounded-xl py-2 px-2">
                                        <h4 className="text-lg font-semibold text-emerald-800 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                            </svg>
                                            Phân loại thành phần
                                        </h4>
                                        <div className="flex overflow-x-auto custom-scrollbar-x ">
                                            <Tab list={tabList} onTabSelect={setSelectedTab} />
                                        </div>
                                    </div>

                                    {/* Ingredients selection */}
                                    <div className="bg-white rounded-xl border border-gray-100 shadow-md p-5">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                            <svg className="w-5 h-5 mr-2 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                            Chọn thành phần yêu thích
                                        </h4>
                                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                                            <ListIngredient
                                                IngredientList={filteredIngredients}
                                                CheckBox={true}
                                                showTags={false}
                                                onFavoriteChange={handleFavoriteIngredientsChange}
                                            />
                                        </div>
                                    </div>

                                    {/* Nutritional goals */}
                                    <div className="bg-white rounded-xl border border-gray-100 shadow-md p-5">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                            <TagIcon className="w-5 h-5 mr-2 text-emerald-600" />
                                            Mục tiêu dinh dưỡng
                                        </h4>
                                        <div className="grid gap-4 grid-cols-2 md:grid-cols-3 max-h-[200px] overflow-y-auto custom-scrollbar pr-2">
                                            {serviceTags?.map((tag: string, index: number) => (
                                                <div
                                                    key={index}
                                                    className={`flex items-center p-4 rounded-lg transition-all shadow-md cursor-pointer transform hover:scale-105 ${
                                                        iTags.includes(tag) 
                                                            ? 'bg-emerald-100 border border-emerald-300' 
                                                            : 'bg-white border border-gray-200 hover:border-emerald-300'
                                                    }`}
                                                    style={{ borderColor: tagColors[tag] }}
                                                    onMouseEnter={() => setTagColors(prev => ({ ...prev, [tag]: 'rgba(0, 255, 0, 0.2)' }))}
                                                    onMouseLeave={() => setTagColors(prev => ({ ...prev, [tag]: 'rgba(0, 0, 0, 0.1)' }))}
                                                >
                                                    <div className="flex-shrink-0">
                                                        <input
                                                            type="checkbox"
                                                            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                                            onChange={() => handleGoalSelect(tag)}
                                                            checked={iTags.includes(tag)}
                                                            id={`tag-${index}`}
                                                        />
                                                    </div>
                                                    <label htmlFor={`tag-${index}`} className="ml-3 text-sm font-medium text-gray-700 cursor-pointer">
                                                        <span className="inline-flex items-center">
                                                            <svg className="w-4 h-4 mr-1 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                                                                <path d="M10 1a9 9 0 100 18 9 9 0 000-18zm0 2a7 7 0 100 14zm-1 7h2v2h-2v-2z" />
                                                            </svg>
                                                            {tag}
                                                        </span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right column - Delivery & Payment */}
                                <div className="space-y-6">
                                    {/* Delivery options */}
                                    <div className="bg-white rounded-xl border border-gray-100 shadow-md p-5">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                            <ClockIcon className="w-5 h-5 mr-2 text-emerald-600" />
                                            Thời gian giao hàng
                                        </h4>
                                        
                                        {(subscriptionID && subscriptionID.mealsPerDay !== 1) ? (
                                            <div className="space-y-4">
                                                <div>
                                                    <label htmlFor="delivery-time-morning" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Khung giờ buổi sáng
                                                    </label>
                                                    <select
                                                        id="delivery-time-morning"
                                                        className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                                        value={selectedTimeMorning}
                                                        onChange={(e) => setSelectedTimeMorning(e.target.value)}
                                                    >
                                                        {deliveryTimesMorning.map((time, index) => (
                                                            <option key={index} value={time}>{time}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                
                                                <div>
                                                    <label htmlFor="delivery-time-afternoon" className="block text-sm font-medium text-gray-700 mb-1">
                                                        Khung giờ buổi chiều
                                                    </label>
                                                    <select
                                                        id="delivery-time-afternoon"
                                                        className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                                        value={selectedTimeAfternoon}
                                                        onChange={(e) => setSelectedTimeAfternoon(e.target.value)}
                                                    >
                                                        {deliveryTimesAfter.map((time, index) => (
                                                            <option key={index} value={time}>{time}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        ) : (
                                            <div>
                                                <label htmlFor="delivery-time" className="block text-sm font-medium text-gray-700 mb-1">
                                                    Khung giờ giao hàng
                                                </label>
                                                <select
                                                    id="delivery-time"
                                                    className="w-full px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                                    value={estimatedTime}
                                                    onChange={(e) => setEstimatedTime(e.target.value)}
                                                >
                                                    {[...deliveryTimesMorning, ...deliveryTimesAfter].map((time, index) => (
                                                        <option key={index} value={time}>{time}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        <div className="mt-4 relative">
                                            <label htmlFor="delivery-date" className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                                <CalendarDaysIcon className="w-4 h-4 mr-1 text-emerald-600" />
                                                Ngày bắt đầu giao
                                            </label>
                                            <div className="border border-gray-200 rounded-lg overflow-visible transition-colors focus-within:border-emerald-500" style={{ zIndex: 999 }}>
                                                <Datepicker
                                                    value={selectedDate}
                                                    onChange={handleValueChange}
                                                    useRange={false}
                                                    asSingle={true}
                                                    minDate={tomorrow}
                                                    inputClassName="w-full px-4 py-2.5 text-gray-700 focus:outline-none"
                                                    toggleClassName="absolute right-2 h-full px-2 focus:outline-none"
                                                    containerClassName="relative"
                                                    popoverDirection="down"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Voucher & Payment */}
                                    <div className="bg-white rounded-xl border border-gray-100 shadow-md p-5">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                                            <GiftIcon className="w-5 h-5 mr-2 text-emerald-600" />
                                            Thanh toán
                                        </h4>
                                        
                                        <div className="mb-4">
                                            <label htmlFor="voucher-code" className="block text-sm font-medium text-gray-700 mb-1">
                                                Mã giảm giá
                                            </label>
                                            <div className="flex">
                                                <input
                                                    type="text"
                                                    id="voucher-code"
                                                    placeholder="Nhập mã voucher"
                                                    className="flex-grow px-4 py-2.5 text-gray-700 bg-white border border-gray-200 rounded-l-lg focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                                                    value={voucherCode}
                                                    onChange={handleVoucherCodeChange}
                                                    onKeyPress={handleVoucherCodeKeyPress}
                                                />
                                                <button 
                                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 rounded-r-lg transition-colors"
                                                    onClick={handleVoucherSubmit}
                                                >
                                                    <ArrowRightIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                        
                                        <div className="border-t border-gray-100 pt-4 space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Tổng tiền</span>
                                                <span className="font-medium">{formatCurrency(summary?.subtotal)} đ</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Giảm giá</span>
                                                <span className="font-medium text-rose-600">-{formatCurrency(summary?.discount)} đ</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-sm text-gray-500">Phí vận chuyển</span>
                                                <span className="font-medium">{formatCurrency(summary?.shippingAmount)} đ</span>
                                            </div>
                                            <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                                                <span className="font-semibold">Tổng thanh toán</span>
                                                <span className="font-bold text-lg text-emerald-600">{formatCurrency(summary?.grandTotal)} đ</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Footer with action buttons */}
                        <div className="border-t border-gray-200 bg-gray-50 p-5 sticky bottom-0 z-10">
                            <div className="flex flex-col-reverse sm:flex-row justify-between gap-3">
                                <button
                                    onClick={onClose}
                                    className="px-6 py-3 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                                >
                                    Hủy
                                </button>
                                
                                <button
                                    onClick={handleSubmit}
                                    className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-lg text-white font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
                                >
                                    <CheckCircleIcon className="w-5 h-5" />
                                    <span>Xác nhận đặt hàng</span>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalIngredient;

// Add these styles to your global CSS
/*
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f3f4f6;
  border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #10b981;
  border-radius: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #047857;
}

.custom-scrollbar-x::-webkit-scrollbar {
  height: 4px;
}
*/