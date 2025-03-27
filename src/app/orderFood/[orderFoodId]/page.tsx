'use client'
import React, { useState, useMemo, useEffect } from 'react';
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import Tab from '@/app/components/tab/Tab';
import ModalIngredient from '../components/ModalIngredient';
import ListIngredient from '../components/ListIngredient';
import CardDetail from '../components/CardDetail';
import {
  ServicePackageActions,
} from "@/modules/services.package/slice";

import {
  IngredientTagSelectors,
} from "@/modules/ingredient.tag/slice";
import {
  IngredientGroupActions,
  IngredientGroupSelectors,
} from "@/modules/ingredient.group/slice";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Config } from '@/core/constants/configs';

const Page = ({ params }: { params: { orderFoodId: string } }) => {
  const [selectedTab, setSelectedTab] = useState<string>("Tất cả");
  const [isModalVisible, setModalVisible] = useState<boolean>(false);

  const [ListGroup, setListGroup] = useState<string[]>([]);

  const [serviceDetail, setServiceDetail] = useState<any>([]);
  const dispatch = useDispatch();
  //const serviceDetail: any = useSelector(ServicePackageSelectors.serviceDetail) || []; //// test selector

  // Trích xuất danh sách các iTags duy nhất
  const ListTag = useMemo(() => {
    const tags = serviceDetail?.ingredientList?.flatMap((ingredient: any) => ingredient.iTags) || [];
    const uniqueTags = Array.from(new Map(tags.map((tag: any) => [tag._id, tag])).values());
    return uniqueTags;
  }, [serviceDetail]);

  useEffect(() => {
    dispatch(
      ServicePackageActions.getDetail({
        id: params.orderFoodId,
        onSuccess: (rs: any) => {
          setServiceDetail(rs.data.servicePackage);
        },
        onFail: (rs: any) => {
          toast.error(rs);
        }
      })
    );
  }, []);

  useEffect(() => {
    dispatch(
      IngredientGroupActions.getIngredientGroup({
        onSuccess: (rs: any) => {
          const groupsWithNames = rs.data.ingredientListGroup.map((group: any) => ({ name: group.name }));
          setListGroup([{ name: "Tất cả" }, ...groupsWithNames]);
        },
        onFail: (rs: any) => {
        }
      })
    );
  }, []);

  const toggleModal = () => setModalVisible(!isModalVisible);

  const filteredIngredients = useMemo(() => {
    switch (selectedTab) {
      case "Tất cả":
        return serviceDetail?.ingredientList;
      default:
        return serviceDetail?.ingredientList.filter((item: { iGroupID: { name: string; }; }) => item?.iGroupID?.name === selectedTab);
    }
  }, [selectedTab, serviceDetail?.ingredientList]);

  return (
    <div className="mx-auto overflow-y-hidden p-0 bg-gradient-to-b from-emerald-50 to-white max-w-[1440px] lg:pt-0 pt-[80px]">
      <div className=" mx-auto px-4 sm:px-6 lg:px-16 py-0">
        {/* Hero section with animated gradient */}
        <div className="relative mb-5 rounded-2xl overflow-hidden shadow-xl bg-gradient-to-r from-emerald-500 to-teal-600">
          <div className="absolute inset-0 bg-pattern opacity-10"></div>
          <div className="relative z-10 px-6 py-3 md:px-10 md:py-4 text-white">
            <h1 className="text-xl md:text-2xl font-extrabold tracking-tight mb-3 flex items-center">
              <span className="mr-3">Chi tiết gói ăn</span>
              <svg className="w-8 h-8 animate-bounce" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z"></path>
              </svg>
            </h1>
            <p className="text-white/80  text-base">Khám phá các thành phần tự nhiên và dinh dưỡng được chọn lọc kỹ lưỡng cho bữa ăn lành mạnh của bạn</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - Card details */}
          <div className="md:w-1/3 flex-shrink-0 flex-grow h-full">
            <CardDetail
              name={serviceDetail.name}
              description={serviceDetail.description}
              price={serviceDetail.price}
              image={serviceDetail.mainImage}
              totalSub={serviceDetail.subscriptionID?.totalSub}
              serviceTags={serviceDetail?.serviceTags?.length > 2 ? [...serviceDetail.serviceTags.slice(0, 2), '...'] : serviceDetail?.serviceTags}
              subscriptionID={serviceDetail.subscriptionID}
            />
          </div>

          {/* Right column - Main content */}
          <div className="md:w-2/3 flex-grow flex flex-col h-full">
            <div className="space-y-8 flex-grow">
              {/* Food gallery section */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h2 className="text-xl font-bold mb-5 flex items-center text-emerald-700">
                  <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                  </svg>
                   Ảnh các bữa ăn gần đây
                </h2>

                <div className="overflow-x-auto" >
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {serviceDetail?.images?.slice(0, 8).map((img: any, index: any) => (
                      <div key={index} className="relative group overflow-hidden rounded-xl aspect-square bg-gray-100" style={{ maxHeight: '185px' }}>
                        <img
                          src={Config.CDN_URL + img}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700"
                          alt="Món ăn lành mạnh"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                          <p className="text-white p-3 font-medium text-sm">Bữa ăn #{index + 1}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Nutrition facts section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mb-3 mt-3">
          <h2 className="text-xl font-bold mb-5 flex items-center text-emerald-700">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Thông tin dinh dưỡng
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl">
              <svg className="w-8 h-8 text-emerald-500 mb-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd"></path>
              </svg>
              <p className="font-bold text-lg text-emerald-700">425 Kcal</p>
              <p className="text-emerald-600 text-sm">Calories</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
              <svg className="w-8 h-8 text-blue-500 mb-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
              <p className="font-bold text-lg text-blue-700">26g</p>
              <p className="text-blue-600 text-sm">Protein</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl">
              <svg className="w-8 h-8 text-amber-500 mb-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd"></path>
              </svg>
              <p className="font-bold text-lg text-amber-700">48g</p>
              <p className="text-amber-600 text-sm">Carbs</p>
            </div>

            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-rose-50 to-pink-50 rounded-xl">
              <svg className="w-8 h-8 text-rose-500 mb-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"></path>
              </svg>
              <p className="font-bold text-lg text-rose-700">15g</p>
              <p className="text-rose-600 text-sm">Fats</p>
            </div>
          </div>
        </div>

        {/* Ingredients section */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-xl font-bold mb-5 flex items-center text-emerald-700">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
            </svg>
            Thành phần bữa ăn
          </h2>

          <div className="bg-emerald-50/50 rounded-xl p-4 mb-6">
            <div className="flex overflow-x-auto custom-scrollbar-x pb-2">
              <Tab list={ListGroup as any} onTabSelect={setSelectedTab} />
            </div>
          </div>

          <div className="bg-white rounded-xl">
            <ListIngredient IngredientList={filteredIngredients} CheckBox={false} showTags={true} onFavoriteChange={() => { }} />
          </div>
        </div>
        {/* Nutritional goals */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 mt-3">
          <h2 className="text-xl font-bold mb-5 flex items-center text-emerald-700">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
            </svg>
            Mục tiêu dinh dưỡng
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
            {ListTag?.map((tag: any, index: number) => (
              <div key={index} className="flex items-center p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white shadow-sm border-l-4 hover:shadow-md transition-all duration-300" style={{ borderColor: tag.color }}>
                <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: tag.color }}></div>
                <p className="font-medium">{tag.iTagName}</p>
              </div>
            ))}
          </div>
         <div className='w-full flex justify-center'>
         <button
            className="mt-6  md:w-[40%] bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3 px-6 rounded-xl w-full flex justify-center items-center group hover:shadow-lg transition-all duration-300 hover:from-emerald-700 hover:to-teal-700"
            onClick={toggleModal}
          >
            <ShoppingCartIcon width={20} className="mr-2 group-hover:animate-bounce" />
            <p className='font-medium'>Tùy chỉnh & đặt hàng</p>
          </button>
         </div>
        </div>
      </div>

      {/* Custom scrollbar styles */}
      <style jsx global>{`
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
        
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>

      <ModalIngredient
        isVisible={isModalVisible}
        onClose={toggleModal}
        tabList={['Tất cả', ...ListGroup]}
        IngredientList={serviceDetail?.ingredientList}
        subscriptionID={serviceDetail?.subscriptionID}
        servicePackageID={params.orderFoodId}
        serviceTags={serviceDetail?.serviceTags}
      />
    </div>
  );
};

export default Page;
