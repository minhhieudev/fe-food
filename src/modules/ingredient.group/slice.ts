import { RootState } from "@/core/services/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type IngredientGroupState = {
  groups: any;
};

const initialState: IngredientGroupState = {
  groups: undefined,
};

const IngredientGroupSlice = createSlice({
  name: "ingredientgroup",
  initialState,
  reducers: {
    getIngredientGroup: (
      state: IngredientGroupState,
      { payload }: PayloadAction<any>
    ) => {},
    setIngredientGroup: (
      state: IngredientGroupState,
      { payload }: PayloadAction<any>
    ) => {
      state.groups = payload.data.ingredientListGroup;
    },
  },
});

const IngredientGroupReducer = IngredientGroupSlice.reducer;
export default IngredientGroupReducer;

export const IngredientGroupActions = IngredientGroupSlice.actions;

export const IngredientGroupSelectors:any = {
  ingredientGroup: (state: RootState) => state.ingredientGroup.groups,
};
