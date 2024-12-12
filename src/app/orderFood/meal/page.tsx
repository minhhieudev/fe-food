"use client"
import React, { useEffect, useState } from 'react';
import MealCard from '../components/MealCard';
import { ShoppingCartIcon, CheckIcon } from '@heroicons/react/24/outline';
import Order from '../components/Order';
import CardDetail from '../components/CardDetail';
import { MealActions, MealSelectors } from "@/modules/meal/slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { usePathname, useSearchParams } from 'next/navigation';
import {
    ServicePackageActions,
    ServicePackageSelectors,
} from "@/modules/services.package/slice";
import { ServiceOrderActions } from '@/modules/services.order/slice';

const Page = ({ params }: { params: { orderFoodId: string } }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [listMeal, setListMeal] = useState([])
    //const ListTag: any = useSelector(ServiceOrderSelectors.ingredientTag);
    const dispatch = useDispatch();

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const orderID = searchParams.get('orderID');

    const [orderDetail, setOrderDetail] = useState<any>([]);
    const [summary, setSummary] = useState<any>({})
    const serviceDetail: any = useSelector(ServicePackageSelectors.serviceDetail) || [];


    useEffect(() => {
        dispatch(
            MealActions.getMeals(
                {
                    id: orderID,
                    onSuccess: (rs: any) => {
                        setListMeal(rs.data.meals);
                    },
                    onFail: (rs: any) => {
                        toast.error(rs);
                    }
                })
        )

        dispatch(
            ServiceOrderActions.getOrderById(
                {
                    id: orderID,
                    onSuccess: (rs: any) => {
                        console.log('Data:', rs.data.order.servicePackage)
                        setOrderDetail(rs.data.order.servicePackage);

                       
                    },
                    onFail: (rs: any) => {
                        toast.error(rs);
                    }
                })
        )

        dispatch(
            ServiceOrderActions.getSummary({
                body: { servicePackageID: serviceDetail?._id },
                onSuccess: (rs: any) => {
                    if (rs.success) {
                        setSummary(rs.summary);
                    }
                },
            })
        );

    }, [dispatch])



    const formatCurrency = (amount: number | undefined): string => {
        if (amount === undefined) {
            return '0';
        }
        return amount.toLocaleString('vi-VN');
    };

    return (
        <div className="mx-auto bg-white rounded-lg shadow-md">
            <div className="px-2 py-0">
                <h1 className="text-2xl font-bold mb-2">Gói ăn đã đặt</h1>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/4 h-fit rounded-md border">
                        <CardDetail
                            name={orderDetail?.name}
                            description={orderDetail?.description}
                            price={orderDetail?.price}
                            totalSub={orderDetail?.subscriptionID?.totalSub}
                            image={orderDetail?.mainImage}
                        />
                    </div>

                    <div className="md:w-3/4 px-4 py-0">
                        <div className="md:max-h-[470px] overflow-y-auto">
                            <h2 className="text-xl font-bold mb-2">Ngày giao</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {listMeal.map((order, index) => (
                                    <Order
                                        key={index}
                                        order={order}
                                        index={index}
                                        openIndex={openIndex}
                                        setOpenIndex={setOpenIndex}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end mr-4 mt-4">
                    <div className="w-64">
                        <div className="text-xl font-bold mt-2 text-right">Thanh toán</div>
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
                        <button className="bg-green-600 text-white mt-3 py-2 px-4 rounded-md w-full flex justify-center items-center">
                            <CheckIcon width={16} />
                            <p className="text-sm ml-2">Đã thanh toán</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
