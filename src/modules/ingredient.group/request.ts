import MSTFetch from "@/core/services/fetch";

export const IngredientGroupRequest = {
  getIngredientGroup() {
    return MSTFetch.get(`/ingredient-groups/customers`);
  },
};
