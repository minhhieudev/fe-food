import React, { useEffect, useState } from 'react';
import Datepicker from "react-tailwindcss-datepicker";
import { MealActions } from "@/modules/meal/slice";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { CalendarDaysIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';

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

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

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

    const updateDeliveryTime = () => {
        if (!selectedDate || !selectedTime) {
            toast.error('Vui lòng chọn đầy đủ ngày và giờ giao hàng');
            return;
        }

        dispatch(
            MealActions.updateDeliveryTime({
                body: {
                    estimatedDate: selectedDate.startDate,
                    estimatedTime: selectedTime,
                    mealID: params.mealOrderId
                },
                onSuccess: (rs: any) => {
                    toast.success('Cập nhật thời gian giao hàng thành công!');
                },
                onFail: (rs: any) => {
                    toast.error(rs);
                }
            })
        );
    };

    const handleValueChange = (newValue: any) => {
        setSelectedDate(newValue);
    };

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
        >
            <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
                Thay đổi thời gian giao hàng
            </h2>

            <div className="space-y-4">
                {/* Date Selection */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                        <CalendarDaysIcon className="w-5 h-5 text-emerald-600 mr-2" />
                        <label className="text-base font-semibold text-gray-700">Chọn ngày giao hàng</label>
                    </div>
                    <div className="relative">
                        <div className="border border-gray-200 rounded-lg overflow-visible transition-colors focus-within:border-emerald-500" style={{ zIndex: 999 }}>
                            <Datepicker
                                value={selectedDate}
                                onChange={handleValueChange}
                                useRange={false}
                                asSingle={true}
                                minDate={tomorrow}
                                inputClassName="w-full px-3 py-2 text-gray-700 focus:outline-none"
                                toggleClassName="absolute right-2 h-full px-2 focus:outline-none"
                                containerClassName="relative"
                                popoverDirection="down"
                            />
                        </div>
                    </div>
                </div>

                {/* Time Selection */}
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                    <div className="flex items-center mb-3">
                        <ClockIcon className="w-5 h-5 text-emerald-600 mr-2" />
                        <label className="text-base font-semibold text-gray-700">Chọn khung giờ giao hàng</label>
                    </div>
                    <select
                        className="w-full px-3 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-colors"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                    >
                        {deliveryTimes.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                </div>

                {/* Current Selection Display */}
                {(selectedDate || selectedTime) && (
                    <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-100">
                        <p className="text-sm text-emerald-800 font-medium">
                            Thời gian giao hàng mới: {selectedDate?.startDate && new Date(selectedDate.startDate).toLocaleDateString('vi-VN')} - {selectedTime}
                        </p>
                    </div>
                )}

                {/* Submit Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={updateDeliveryTime}
                    className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-2.5 px-6 rounded-lg font-medium flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-200"
                >
                    <CheckCircleIcon className="w-5 h-5" />
                    <span>Xác nhận thay đổi</span>
                </motion.button>
            </div>
        </motion.div>
    );
};

export default ChangeDate;
