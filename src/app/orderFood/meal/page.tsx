"use client"
import React, { useEffect, useState } from 'react';
import MealCard from '../components/MealCard';
import { ShoppingCartIcon, CheckIcon, CalendarIcon, TruckIcon, DocumentTextIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import Order from '../components/Order';
import CardDetail from '../components/CardDetail';
import { MealActions, MealSelectors } from "@/modules/meal/slice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from 'react-toastify';
import { usePathname, useSearchParams } from 'next/navigation';
import {
    ServicePackageActions,
    ServicePackageSelectors,
} from "@/modules/services.package/slice";
import { ServiceOrderActions } from '@/modules/services.order/slice';

const Page = ({ params }: { params: { orderFoodId: string } }) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);
    const [listMeal, setListMeal] = useState([]);
    const dispatch = useDispatch();

    const pathname = usePathname();
    const searchParams = useSearchParams();
    const orderID = searchParams.get('orderID');

    const [orderDetail, setOrderDetail] = useState<any>([]);
    const [summary, setSummary] = useState<any>({});
    const serviceDetail: any = useSelector(ServicePackageSelectors.serviceDetail) || [];
    const [activeTab, setActiveTab] = useState('upcoming');

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
        );

        dispatch(
            ServiceOrderActions.getOrderById(
                {
                    id: orderID,
                    onSuccess: (rs: any) => {
                        setOrderDetail(rs.data.order.servicePackage);
                    },
                    onFail: (rs: any) => {
                        toast.error(rs);
                    }
                })
        );

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

    }, [dispatch, orderID, serviceDetail?._id]);

    const formatCurrency = (amount: number | undefined): string => {
        if (amount === undefined) {
            return '0';
        }
        return amount.toLocaleString('vi-VN');
    };

    // Lọc các bữa ăn theo trạng thái
    const upcomingMeals = listMeal.filter((meal: any) => meal.status === 'pending' || meal.status === 'inprogress');
    const completedMeals = listMeal.filter((meal: any) => meal.status === 'done');
    const cancelledMeals = listMeal.filter((meal: any) => meal.status === 'cancelled');

    return (
        <div className="max-w-[1200px] mx-auto pb-12">
            {/* Hero section */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-6 mb-8 shadow-lg relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern-dot.svg')] opacity-10"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold text-white mb-2">Chi tiết gói ăn của bạn</h1>
                    <p className="text-white/80 max-w-2xl mb-4">
                        Theo dõi lịch giao hàng, thay đổi thời gian và xem chi tiết bữa ăn dễ dàng
                    </p>
                    
                    <div className="flex items-center space-x-4 mt-4">
                        <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <CalendarIcon className="h-5 w-5 text-white mr-2" />
                            <span className="text-white font-medium">{orderDetail?.subscriptionID?.totalDate} ngày</span>
                        </div>
                        <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <TruckIcon className="h-5 w-5 text-white mr-2" />
                            <span className="text-white font-medium">{orderDetail?.subscriptionID?.mealsPerDay} bữa/ngày</span>
                        </div>
                        <div className="flex items-center bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                            <CreditCardIcon className="h-5 w-5 text-white mr-2" />
                            <span className="text-white font-medium">{formatCurrency(summary?.grandTotal)} đ</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Sidebar with package details */}
                <div className="md:col-span-1">
                    <div className="sticky top-24">
                        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                            <CardDetail
                                name={orderDetail?.name}
                                description={orderDetail?.description}
                                price={orderDetail?.price}
                                totalSub={orderDetail?.subscriptionID?.totalSub}
                                image={orderDetail?.mainImage}
                            />
                            
                            <div className="p-5 border-t border-gray-100">
                                <h3 className="text-lg font-semibold mb-3 flex items-center">
                                    <DocumentTextIcon className="w-5 h-5 mr-2 text-emerald-600" />
                                    Tổng quan thanh toán
                                </h3>
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Tổng tiền:</span>
                                        <span className="font-medium">{formatCurrency(summary?.subtotal)} đ</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Voucher giảm giá:</span>
                                        <span className="font-medium text-red-500">-{formatCurrency(summary?.discount)} đ</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600">Phí vận chuyển:</span>
                                        <span className="font-medium">{formatCurrency(summary?.shippingAmount)} đ</span>
                                    </div>
                                    <div className="h-px bg-gray-100 my-2"></div>
                                    <div className="flex justify-between items-center">
                                        <span className="font-medium">Tổng thanh toán:</span>
                                        <span className="text-lg font-bold text-emerald-600">{formatCurrency(summary?.grandTotal)} đ</span>
                                    </div>
                                </div>
                                
                                <div className="mt-4">
                                    <button className="bg-emerald-600 text-white w-full py-3 px-4 rounded-lg flex justify-center items-center shadow-md transition-colors hover:bg-emerald-700">
                                        <CheckIcon className="w-5 h-5 mr-2" />
                                        <span className="font-medium">Đã thanh toán</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="md:col-span-3">
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {/* Tabs */}
                        <div className="flex border-b">
                            <button
                                className={`flex-1 py-4 px-4 font-medium text-center transition-colors ${activeTab === 'upcoming' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('upcoming')}
                            >
                                Sắp tới ({upcomingMeals.length})
                            </button>
                            <button
                                className={`flex-1 py-4 px-4 font-medium text-center transition-colors ${activeTab === 'completed' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('completed')}
                            >
                                Đã giao ({completedMeals.length})
                            </button>
                            <button
                                className={`flex-1 py-4 px-4 font-medium text-center transition-colors ${activeTab === 'cancelled' ? 'text-emerald-600 border-b-2 border-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
                                onClick={() => setActiveTab('cancelled')}
                            >
                                Đã hủy ({cancelledMeals.length})
                            </button>
                        </div>

                        {/* Meals list */}
                        <div className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {activeTab === 'upcoming' && upcomingMeals.map((order: any, index: number) => (
                                    <Order
                                        key={index}
                                        order={order}
                                        index={index}
                                        openIndex={openIndex}
                                        setOpenIndex={setOpenIndex}
                                    />
                                ))}
                                
                                {activeTab === 'completed' && completedMeals.map((order: any, index: number) => (
                                    <Order
                                        key={index}
                                        order={order}
                                        index={index}
                                        openIndex={openIndex}
                                        setOpenIndex={setOpenIndex}
                                    />
                                ))}
                                
                                {activeTab === 'cancelled' && cancelledMeals.map((order: any, index: number) => (
                                    <Order
                                        key={index}
                                        order={order}
                                        index={index}
                                        openIndex={openIndex}
                                        setOpenIndex={setOpenIndex}
                                    />
                                ))}
                                
                                {((activeTab === 'upcoming' && upcomingMeals.length === 0) || 
                                  (activeTab === 'completed' && completedMeals.length === 0) || 
                                  (activeTab === 'cancelled' && cancelledMeals.length === 0)) && (
                                    <div className="col-span-2 py-12 flex flex-col items-center justify-center text-gray-500">
                                        <div className="bg-gray-100 rounded-full p-4 mb-4">
                                            <CalendarIcon className="h-10 w-10 text-gray-400" />
                                        </div>
                                        <h3 className="text-lg font-medium mb-1">Không có bữa ăn nào</h3>
                                        <p className="text-sm text-gray-500">
                                            {activeTab === 'upcoming' && 'Bạn không có bữa ăn sắp tới nào.'}
                                            {activeTab === 'completed' && 'Bạn chưa có bữa ăn nào đã giao.'}
                                            {activeTab === 'cancelled' && 'Bạn chưa hủy bữa ăn nào.'}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
