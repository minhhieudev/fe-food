"use client"
import React, { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import Tab from '@/app/components/tab/Tab';
import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import ListIngredient from '../ListIngredient';
import { useDispatch, useSelector } from "react-redux";
import { MealActions } from "@/modules/meal/slice";

import {
  ServicePackageActions,
  ServicePackageSelectors,
} from "@/modules/services.package/slice";
import { toast } from 'react-toastify';

interface PageProps {
  params: {
    mealOrderId: string;
    orderFoodId: string;
  };
  favoriteIngredientsProp: any
}

const EditIngredient = ({ params ,favoriteIngredientsProp}: PageProps) => {
  const [favoriteIngredients, setFavoriteIngredients] = useState<string[]>([]);
  const [IngredientList, setIngredientList] = useState([]);
  const dispatch = useDispatch();
  const serviceDetail: any = useSelector(ServicePackageSelectors.serviceDetail) || [];


  const updateFavoriteIngredients = () => {
    dispatch(
      MealActions.updateFavoriteIngredients({
        body: {
          favoriteIngredients,
          mealID: params?.mealOrderId
        },
        onSuccess: (rs: any) => {
          toast.success('Cập nhật thành phần yêu thích thành công');

        },
        onFail: (rs: any) => {
          toast.error(rs);
        }
      })
    );
  }
  const cancelMeal = () => {
    dispatch(
      MealActions.cancelMeal({
        body: {
          mealID: params?.mealOrderId
        },
        onSuccess: (rs: any) => {
          toast.success('Đã xoá bữa ăn');
          //router.push(`${pathname}/meal?orderID=${rs.data.orderId}`);
        },
        onFail: (rs: any) => {
          toast.error(rs);
        }
      })
    );
  }
  useEffect(() => {
    console.log('5555:',serviceDetail)
  }, []);

  // useEffect(() => {
  //   dispatch(
  //     ServicePackageActions.getDetail({
  //       id: serviceDetail?._id,
  //       onSuccess: (rs: any) => {
  //         console.log('4444:',rs.data.servicePackage.ingredientList)
  //         setIngredientList(rs.data.servicePackage.ingredientList);
  //       },
  //       onFail: (rs: any) => {
  //         toast.error(rs);
  //       }
  //     })
  //   );

  // }, []);
  const handleFavoriteIngredientsChange = (favorites: string[]) => {
    setFavoriteIngredients(favorites);
  };

  return (
    <div>
      <div className="">
        <ListIngredient IngredientList={serviceDetail?.ingredientList} CheckBox={true} ingredientSelects={favoriteIngredientsProp} onFavoriteChange={handleFavoriteIngredientsChange} />
      </div>
      <div className="flex gap-2 justify-end">
        <div className='flex justify-end'>
          <button className="bg-green-500 text-white mt-3 py-2 px-4 rounded-md flex justify-center items-center" onClick={updateFavoriteIngredients}>
            <PencilIcon width={16} />
            <p className="text-sm ml-2">Cập nhật</p>
          </button>
        </div>
        <div className='flex justify-end'>
          <button className="bg-red-500 text-white mt-3 py-2 px-4 rounded-md flex justify-center items-center" onClick={cancelMeal}>
            <TrashIcon width={16} />
            <p className="text-sm ml-2">Huỷ bữa ăn</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditIngredient;
