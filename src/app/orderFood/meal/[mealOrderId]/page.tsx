'use client'
import React, { useMemo, useState, useEffect } from 'react';
import Tab from '@/app/components/tab/Tab';
import EditIngredient from '../../components/TabDetail/EditIngredient';
import EvaluateMeal from '../../components/TabDetail/EvaluateMeal';
import ChangeDate from '../../components/TabDetail/ChangeDate';
import { MealActions } from "@/modules/meal/slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
interface PageProps {
    params: {
        mealOrderId: string;
        orderFoodId: string;
    };
}

const Page: React.FC<PageProps> = ({ params }) => {
    const [selectedTab, setSelectedTab] = useState("Điều chỉnh thành phần");
    const dispatch = useDispatch();
    const [mealDetail, setMealDetail] = useState<any>([])

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

    return (
        <div className="p-4">
            <div className="flex justify-between">
                <h3 className="text-2xl leading-6 text-gray-900 font-bold">Chi tiết bữa ăn {new Date(mealDetail?.estimatedDate).toLocaleDateString('vi-VN')}</h3>
            </div>
            <div className="flex mb-4 font-semibold mt-2 text-md max-md:text-sm">
                <Tab list={tabList} onTabSelect={setSelectedTab} />
            </div>
            <div className="mt-2">
                {selectedTab === "Điều chỉnh thành phần" && <EditIngredient params={params} favoriteIngredientsProp={mealDetail?.favoriteIngredients}/>}
                {selectedTab === "Đánh giá bữa ăn" && <EvaluateMeal params={params} />}
                {selectedTab === "Đổi ngày giao" && <ChangeDate params={params} estimatedDate={mealDetail?.estimatedDate}  estimatedTime={mealDetail?.estimatedTime}/>}
            </div>
        </div>
    );
};

export default Page;
