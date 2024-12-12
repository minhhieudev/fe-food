import React, { useEffect, useState } from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import { MealActions } from "@/modules/meal/slice";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

interface PageProps {
    params: {
        mealOrderId: string;
        orderFoodId: string;
    };
    estimatedDate: string;
    estimatedTime: string;
}

const ChangeDate: React.FC<PageProps> = ({ params, estimatedTime, estimatedDate }) => {
    const [selectedDate, setSelectedDate] = useState<any>(null);
    const [selectedTime, setSelectedTime] = useState('');

    const dispatch = useDispatch();

    const updateDeliveryTime = () => {
        dispatch(
            MealActions.updateDeliveryTime({
                body: {
                    estimatedDate: selectedDate.startDate,
                    estimatedTime: selectedTime,
                    mealID: params.mealOrderId
                },
                onSuccess: (rs: any) => {
                    toast.success('Cập nhật ngày giao thành công');
                },
                onFail: (rs: any) => {
                    toast.error(rs);
                }
            })
        );
    }

    const handleValueChange = (newValue: any) => {
        setSelectedDate(newValue);
    };

    const deliveryTimes = [
        "7:00 - 8:00",
        "8:00 - 9:00",
        "9:00 - 10:00",
        "10:00 - 11:00",
        "11:00 - 12:00",
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

    useEffect(() => {
        const index = deliveryTimes.findIndex(time => time === estimatedTime);
        if (index !== -1) {
            setSelectedTime(deliveryTimes[index]);
        } else {
            setSelectedTime(deliveryTimes[0]);
        }
        
        if (estimatedDate) {
            setSelectedDate({
                startDate: new Date(estimatedDate),
                endDate: new Date(estimatedDate),
            });
        }
    }, [estimatedTime, estimatedDate]);


    return (
        <div className="container p-4 max-w-4xl">
            <div className="flex flex-col space-y-4">
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                    <div className="flex-1">
                        <label htmlFor="delivery-date" className="block text-sm font-semibold text-gray-700 mb-2">Ngày giao</label>
                        <div className="border-2 rounded-md">
                            <Datepicker
                                value={selectedDate}
                                onChange={handleValueChange}
                                useRange={false}
                                asSingle={true}
                            />
                        </div>
                    </div>
                    <div className="flex-1">
                        <label htmlFor="delivery-time" className="block text-sm font-semibold text-gray-700 mb-2">Khung giờ giao</label>
                        <select
                            id="delivery-time"
                            className="mt-1 border-2 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                            value={selectedTime}
                            onChange={(e) => setSelectedTime(e.target.value)}
                        >
                            {deliveryTimes.map((time, index) => (
                                <option key={index} value={time}>{time}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button
                    onClick={updateDeliveryTime}
                    className="bg-red-800 text-white py-2 px-4 rounded-md self-start mt-3"
                >
                    Xác nhận
                </button>
            </div>
        </div>
    );
};

export default ChangeDate;
