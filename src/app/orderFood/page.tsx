"use client"

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import MealCard from "./components/MealCard";
import bannerImage from "../asset/images/image1.png";
import {
  ServicePackageActions,
  ServicePackageSelectors,
} from "@/modules/services.package/slice";

import { useDispatch, useSelector } from 'react-redux';

import {
  IngredientGroupActions,
  IngredientGroupSelectors,
} from "@/modules/ingredient.group/slice";
import {
  IngredientTagActions,
  IngredientTagSelectors,
} from "@/modules/ingredient.tag/slice";



const MealList: React.FC = () => {
  const [servicePackageToday, setServicePackageToday] = useState<any[]>([]);
  const [servicePackageWeeklyMonthly, setServicePackageWeeklyMonthly] = useState<any[]>([]);
  const dataServices: any = useSelector(ServicePackageSelectors.servicePackage);
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      ServicePackageActions.getServicePackage({
        onSuccess: (rs: any) => {
          const servicePackages = rs.data?.servicePackages || [];
          const weeklyMonthlyMeals = servicePackages.filter((pkg: any) => pkg.subscriptionID);
          const todayMeals = servicePackages.filter((pkg: any) => !pkg.subscriptionID);
          setServicePackageToday(todayMeals);
          setServicePackageWeeklyMonthly(weeklyMonthlyMeals);
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      IngredientGroupActions.getIngredientGroup({
        onSuccess: (rs: any) => {
        },
        onFail: (rs: any) => {
        }
      })
    );
    dispatch(
      IngredientTagActions.getIngredientTag({
        onSuccess: (rs: any) => {
        },
        onFail: (rs: any) => {
        }
      })
    );
  }, []);
 
  return (
    <div className="py-2 px-6 h-full">
      <div className="mb-7">
        <Image src={bannerImage} alt="banner" className="w-full h-64 object-cover mb-3" />
        {
          Boolean((servicePackageToday || []).length) &&
          <div className="">
            <h2 className="text-xl font-semibold mb-4">Món ăn giao ngay</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {servicePackageToday.map((meal: any) => (
                <MealCard key={meal._id} {...meal} type={false} />
              ))}
            </div>
          </div>
        }
      </div>
      {
        Boolean((servicePackageWeeklyMonthly || []).length) &&
        <div className="mb-3">
          <h2 className="text-xl font-semibold mb-4">Danh sách được ưa chuộng</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {servicePackageWeeklyMonthly.map((meal: any) => (
              <MealCard key={meal._id} {...meal} type={true} />
            ))}
          </div>
        </div>
      }
    </div>
  );
};

export default MealList;
