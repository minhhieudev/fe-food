'use client'
import React, { useMemo, useState, useEffect } from 'react';
import Tab from '@/app/components/tab/Tab';
import EditIngredient from '../../components/TabDetail/EditIngredient';
import EvaluateMeal from '../../components/TabDetail/EvaluateMeal';
import ChangeDate from '../../components/TabDetail/ChangeDate';
import { MealActions } from "@/modules/meal/slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDaysIcon, ClockIcon, TagIcon } from '@heroicons/react/24/outline';

interface PageProps {
    params: {
        mealOrderId: string;
        orderFoodId: string;
    };
}

const Page: React.FC<PageProps> = ({ params }) => {
    const [selectedTab, setSelectedTab] = useState("Điều chỉnh thành phần");
    const dispatch = useDispatch();
    const [mealDetail, setMealDetail] = useState<any>([]);

    useEffect(() => {
        dispatch(
            MealActions.getDetail({
                id: params.mealOrderId,
                onSuccess: (rs: any) => {
                    setMealDetail(rs.data.meal);
                },
                onFail: (rs: any) => {
                    toast.error(rs);
                }
            })
        );
    }, []);

    const tabList = [
        { name: "Điều chỉnh thành phần" },
        { name: "Đánh giá bữa ăn" },
        { name: "Đổi ngày giao" },
    ];

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.div 
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="px-6 max-w-7xl mx-auto"
        >
            {/* Header Section */}
            <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg px-6 py-4 mb-4"
            >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                            Chi tiết bữa ăn
                        </h3>
                        <div className="mt-2 flex flex-wrap gap-4">
                            <div className="flex items-center text-gray-600">
                                <CalendarDaysIcon className="w-5 h-5 mr-2 text-emerald-600" />
                                <span>{new Date(mealDetail?.estimatedDate).toLocaleDateString('vi-VN')}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <ClockIcon className="w-5 h-5 mr-2 text-emerald-600" />
                                <span>{mealDetail?.estimatedTime}</span>
                            </div>
                            <div className="flex items-center text-gray-600">
                                <TagIcon className="w-5 h-5 mr-2 text-emerald-600" />
                                <span className="capitalize">{mealDetail?.status}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Tabs Section */}
            <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg px-6 py-2 mb-2"
            >
                <div className="flex overflow-x-auto custom-scrollbar-x">
                    <Tab list={tabList} onTabSelect={setSelectedTab} />
                </div>
            </motion.div>

            {/* Content Section */}
            <motion.div 
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg p-6"
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedTab}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {(selectedTab === "Điều chỉnh thành phần" && mealDetail.status != 'inprogress') && 
                            <EditIngredient params={params} favoriteIngredientsProp={mealDetail?.favoriteIngredients}/>}
                        {selectedTab === "Đánh giá bữa ăn" && 
                            <EvaluateMeal params={params} />}
                        {(selectedTab === "Đổi ngày giao" && mealDetail.status != 'inprogress') && 
                            <ChangeDate params={params} estimatedDate={mealDetail?.estimatedDate} estimatedTime={mealDetail?.estimatedTime}/>}
                    </motion.div>
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default Page;

// Add to your global CSS if not already present
/*
.custom-scrollbar-x::-webkit-scrollbar {
    height: 4px;
}
.custom-scrollbar-x::-webkit-scrollbar-track {
    background: #f3f4f6;
    border-radius: 8px;
}
.custom-scrollbar-x::-webkit-scrollbar-thumb {
    background: #10b981;
    border-radius: 8px;
}
.custom-scrollbar-x::-webkit-scrollbar-thumb:hover {
    background: #047857;
}
*/
