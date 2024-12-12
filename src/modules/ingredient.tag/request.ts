import MSTFetch from "@/core/services/fetch";

export const IngredientTagRequest = {
  getIngredientTag() {
    return MSTFetch.get(`/ingredient-tags/customers`);
  },
};
