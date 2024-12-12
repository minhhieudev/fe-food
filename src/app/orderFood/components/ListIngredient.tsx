"use client"
import React, { useEffect, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import ModalIngredientDetail from "./ModalIngredientDetail";
import { Config } from "@/core/constants/configs";

interface IGroupID {
  name: string;
}

interface Ingredient {
  _id: string,
  name: string;
  iGroupID: IGroupID;
  image: string;
  description: string;
  iTags: [
    {
      color: string,
      iTagName: string
    }
  ]
}

interface Props {
  IngredientList: Ingredient[];
  ingredientSelects?: any;
  CheckBox: boolean;
  showTags?: boolean;
  onFavoriteChange: (favorites: string[]) => void;
}

const ListIngredient = ({ IngredientList, CheckBox, showTags, onFavoriteChange, ingredientSelects }: Props) => {



  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const [currentIngredient, setCurrentIngredient] = useState<any>(null);
  const [selectedFavorites, setSelectedFavorites] = useState<string[]>([]);

  const toggleModal = (ingredient: any) => {
    setCurrentIngredient(ingredient);
    setModalVisible(!isModalVisible);
  };

  const handleFavoriteSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const ingredientId = event.target.value;

    setSelectedFavorites(prev => {
      if (!Array.isArray(prev)) {
        prev = [];
      }

      const newFavorites = prev.includes(ingredientId)
        ? prev.filter(item => item !== ingredientId)
        : [...prev, ingredientId];

      onFavoriteChange(newFavorites);
      return newFavorites;
    });
  };

  useEffect(() => {
    const favoriteIds = ingredientSelects?.map((fav: { _id: any; }) => fav._id) || [];
    setSelectedFavorites(favoriteIds);
  }, [ingredientSelects]);

  useEffect(() => {
    // Thiết lập tất cả các checkbox được chọn mặc định
    const allIds = IngredientList?.map(item => item._id);
    setSelectedFavorites(allIds);
  }, [IngredientList]);

  return (
    <div className="max-h-[220px] overflow-y-auto">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5 border-y-1">
        {IngredientList?.map((item, index) => (
          <div key={index} className="flex gap-2 h-16 my-2">
            {CheckBox && (
              <input
                type="checkbox"
                id={item._id}
                value={item._id}
                className="mr-2 text-red-400"
                onChange={handleFavoriteSelect}
                checked={selectedFavorites.includes(item._id)}
              />
            )}
            <img src={Config.CDN_URL + item.image} alt="ingredient" className="w-1/4 h-full object-cover" />
            <div className="flex flex-col flex-1">
              <div className="flex-grow rounded-lg">
                {item.name.split(" ").slice(0, 7).join(" ") + (item.name.split(" ").length > 7 ? "..." : "")}
              </div>
              {showTags && (
                <div className="flex gap-2 items-center text-orange-400">
                  <InformationCircleIcon className="w-6 h-6 hover:cursor-pointer" onClick={() => toggleModal(item)} />
                  {item?.iTags?.map((value, colorIndex) => (
                    <div key={colorIndex} className="w-4 h-4 rounded-full" style={{ backgroundColor: value.color }}></div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ModalIngredientDetail
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        detailIngredient={currentIngredient}
      />
    </div>
  );
};

export default ListIngredient;
