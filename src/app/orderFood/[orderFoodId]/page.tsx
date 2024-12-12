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

  const ListGroup: any = useSelector(IngredientGroupSelectors.ingredientGroup) || [];
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
    <div className="mx-auto overflow-y-hidden p-0">
      <h1 className="text-xl font-bold mb-0 ml-4">Chi tiết gói ăn</h1>
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 p-3">
          <div className='rounded-lg border-1'>
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
          <h2 className="text-xl font-bold mt-4">Mục tiêu cho bữa ăn</h2>
          <div className="flex gap-2 justify-between flex-wrap mt-3 max-h-60 overflow-y-auto">
            {ListTag?.map((tag: any, index: number) => (
              <div key={index} className={`flex items-center border-b-4`} style={{ borderColor: tag.color }}>
                <div className="w-4 h-4" style={{ backgroundColor: tag.color, borderRadius: '50%' }}></div>
                <p className="ml-2">{tag.iTagName}</p>
              </div>
            ))}
          </div>
          <button
            className="bg-red-800 text-white mt-4 py-2 px-4 rounded-full w-full flex justify-center items-center"
            onClick={toggleModal}
          >
            <ShoppingCartIcon width={16} />
            <p className='text-sm ml-2'>Tùy chỉnh thành phần và đặt hàng</p>
          </button>
        </div>

        <div className="md:w-3/4 px-4 py-0">
          <div>
            <h2 className="text-xl font-bold mb-4">Ảnh các bữa ăn gần đây</h2>
            <div className="grid grid-cols-4 gap-4 mb-4 max-md:grid-cols-2">
              {serviceDetail?.images?.map((img: any, index: any) => (
                <div key={index} className="bg-gray-300 h-32 rounded-lg">
                  <img src={Config.CDN_URL + img} className="w-full h-full object-cover" alt="images" />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold mb-4">Thành phần dự kiến có trong các bữa ăn</h2>
            <div className="flex mb-4 font-semibold">
              <Tab list={[{ name: 'Tất cả' }, ...ListGroup]} onTabSelect={setSelectedTab} />
            </div>
            <div className=''>
              <ListIngredient IngredientList={filteredIngredients} CheckBox={false} showTags={true} onFavoriteChange={() => { }} />
            </div>
          </div>
        </div>
      </div>
      <ModalIngredient
        isVisible={isModalVisible}
        onClose={toggleModal}
        tabList={[{ name: 'Tất cả' }, ...ListGroup]}
        IngredientList={serviceDetail?.ingredientList}
        subscriptionID={serviceDetail?.subscriptionID}
        servicePackageID={params.orderFoodId}
        serviceTags={serviceDetail?.serviceTags}
      />
    </div>
  );
};

export default Page;
