import { RootState } from "@/core/services/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type IngredientTagState = {
  tags: any;
};

const initialState: IngredientTagState = {
  tags: undefined,
};

const IngredientTagSlice = createSlice({
  name: "ingredienttag",
  initialState,
  reducers: {
    getIngredientTag: (
      state: IngredientTagState,
      { payload }: PayloadAction<any>
    ) => {},
    setIngredientTag: (
      state: IngredientTagState,
      { payload }: PayloadAction<any>
    ) => {
      state.tags = payload.data.ingredientListTag;
    },
  },
});

const IngredientTagReducer = IngredientTagSlice.reducer;
export default IngredientTagReducer;

export const IngredientTagActions = IngredientTagSlice.actions;

export const IngredientTagSelectors = {
  ingredientTag: (state: RootState) => state.ingredientTag.tags,
};
