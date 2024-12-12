import { RootState } from "@/core/services/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type MealState = {
  meals: any;
};

const initialState: MealState = {
  meals: undefined,
};

const MealSlice = createSlice({
  name: "meal",
  initialState,
  reducers: {
    getMeals: (state: MealState, { payload }: PayloadAction<any>) => {},
    getDetail: (state: MealState, { payload }: PayloadAction<any>) => {},
    createMeal: (state: MealState, { payload }: PayloadAction<any>) => {},
    createMany: (state: MealState, { payload }: PayloadAction<any>) => {},
    updateFavoriteIngredients: (state: MealState, { payload }: PayloadAction<any>) => {},
    updateDeliveryTime: (state: MealState, { payload }: PayloadAction<any>) => {},
    addReview: (state: MealState, { payload }: PayloadAction<any>) => {},
    cancelMeal: (state: MealState, { payload }: PayloadAction<any>) => {},
    setMeals: (state: MealState, { payload }: PayloadAction<any>) => {
      state.meals = payload.data.meals;
    },
  },
});

const MealReducer = MealSlice.reducer;
export default MealReducer;

export const MealActions = MealSlice.actions;

export const MealSelectors: any = {
  meal: (state: RootState) => state.meal.meals,
};
