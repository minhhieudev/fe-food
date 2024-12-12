'use client'
import React, { useMemo, useState, useEffect, useRef, KeyboardEvent } from 'react';
import { ShoppingCartIcon, XCircleIcon } from "@heroicons/react/24/outline";
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
                return IngredientList.filter((item: { iGroupID: { name: string; }; }) => item.iGroupID.name === selectedTab);
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

    return (
        <div className="fixed inset-0 z-50 bg-gray-600 bg-opacity-50 flex justify-center items-center" id="my-modal">
            <div ref={modalRef} className="relative max-md:h-[92%] max-md:overflow-auto p-5 border w-3/5 max-md:w-[80%] shadow-lg rounded-md bg-white">
                <div className="mt-1">
                    <div className="flex justify-between">
                        <h3 className="text-xl leading-6 text-gray-900 font-bold">Tùy chỉnh thành phần và đặt hàng</h3>
                        <button onClick={onClose} className="text-gray-700 font-bold"><XCircleIcon className='h-7 w-7' /></button>
                    </div>
                    <div className="flex mb-4 font-semibold">
                        <Tab list={tabList} onTabSelect={setSelectedTab} />
                    </div>
                    <div className="mt-2">
                        <div className="mt-4 flex flex-col gap-4">
                            <ListIngredient
                                IngredientList={filteredIngredients}
                                CheckBox={true}
                                showTags={false}
                                onFavoriteChange={handleFavoriteIngredientsChange}
                            />
                            <div>
                                <div className="text-lg leading-6 text-black font-bold mb-2">Mục tiêu cho bữa ăn</div>
                                <div className="grid gap-4 flex-wrap max-md:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 max-h-[180px] overflow-y-auto">
                                    {serviceTags?.map((tag: string, index: number) => (
                                        <div
                                            key={index}
                                            className={`flex items-center border-b-4`}
                                            style={{ borderColor: tagColors[tag] }}
                                        >
                                            <input
                                                type="checkbox"
                                                className="mr-2"
                                                style={{ backgroundColor: tagColors[tag] }}
                                                onChange={() => handleGoalSelect(tag)}
                                                checked={iTags.includes(tag)}
                                            />
                                            <p className="ml-2">{tag}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-1 justify-between max-md:flex-col max-md:space-y-2 ">
                                <div>
                                    {(subscriptionID && subscriptionID.mealsPerDay !== 1) ?
                                        <div>
                                            <div className="mt-3">
                                                <label htmlFor="delivery-time-morning" className="block text-sm font-semibold text-gray-700">Khung giờ giao buổi sáng</label>
                                                <select
                                                    id="delivery-time-morning"
                                                    className="mt-1 border-2 block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    value={selectedTimeMorning}
                                                    onChange={(e) => setSelectedTimeMorning(e.target.value)}
                                                >
                                                    {deliveryTimesMorning.map((time, index) => (
                                                        <option key={index} value={time}>{time}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mt-3">
                                                <label htmlFor="delivery-time-afternoon" className="block text-sm font-semibold text-gray-700">Khung giờ giao buổi chiều</label>
                                                <select
                                                    id="delivery-time-afternoon"
                                                    className="mt-1 border-2 block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                    value={selectedTimeAfternoon}
                                                    onChange={(e) => setSelectedTimeAfternoon(e.target.value)}
                                                >
                                                    {deliveryTimesAfter.map((time, index) => (
                                                        <option key={index} value={time}>{time}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        :
                                        <div className="mt-3">
                                            <label htmlFor="delivery-time-morning" className="block text-sm font-semibold text-gray-700">Khung giờ giao</label>
                                            <select
                                                id="delivery-time-morning"
                                                className="mt-1 border-2 block w-full pl-3 pr-10 py-2 text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                value={estimatedTime}
                                                onChange={(e) => setEstimatedTime(e.target.value)}
                                            >
                                                {[...deliveryTimesMorning, ...deliveryTimesAfter].map((time, index) => (
                                                    <option key={index} value={time}>{time}</option>
                                                ))}
                                            </select>
                                        </div>
                                    }

                                    <div className="mt-3">
                                        <label htmlFor="delivery-date" className="block text-sm font-semibold text-gray-700">Ngày bắt đầu giao</label>
                                        <div className="border-2 text-sm rounded-md mt-1">
                                            <Datepicker
                                                value={selectedDate}
                                                onChange={handleValueChange}
                                                useRange={false}
                                                asSingle={true}
                                                minDate={tomorrow}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="flex mt-1 gap-x-2 justify-between items-center max-md:flex-col max-md:items-start max-md:space-y-2">
                                        <label className="block text-sm font-semibold text-gray-700">Voucher</label>
                                        <input
                                            type="text"
                                            placeholder="Nhập mã voucher"
                                            className="h-6 border-1 font-medium rounded-md text-sm p-4 w-full"
                                            value={voucherCode}
                                            onChange={handleVoucherCodeChange}
                                            onKeyPress={handleVoucherCodeKeyPress}
                                        />
                                    </div>
                                    <div className="text-xl font-bold mt-2 text-right"><p>Thanh toán</p></div>
                                    <div>
                                        <div className="mt-2">
                                            <div className="flex justify-between items-center">
                                                <label className="block text-sm font-medium text-gray-700">Tổng tiền</label>
                                                <p className="text-md font-bold">{formatCurrency(summary?.subtotal)}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <label className="block text-sm font-medium text-gray-700">Voucher giảm giá</label>
                                                <p className="text-md font-bold"> {formatCurrency(summary?.discount)}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <label className="block text-sm font-medium text-gray-700">Phí vận chuyển</label>
                                                <p className="text-md font-bold"> {formatCurrency(summary?.shippingAmount)}</p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <label className="block text-sm font-medium text-gray-700">Tổng thanh toán</label>
                                                <p className="text-md font-bold text-orange-400">{formatCurrency(summary?.grandTotal)}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="bg-red-800 text-white mt-3 py-2 px-4 rounded-md w-full flex justify-center items-center" onClick={handleSubmit}>
                                        <ShoppingCartIcon width={16} />
                                        <p className="text-sm ml-2">Đặt hàng</p>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalIngredient;