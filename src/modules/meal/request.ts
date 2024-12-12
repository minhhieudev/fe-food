import MSTFetch from "@/core/services/fetch";

export const MealRequest = {
  getMeals(id:any) {
    return MSTFetch.get(`/meal/${id}`);
  },
  createMeal(body:any) {
    return MSTFetch.post("/meal", body);
  },
  createMany(body:any) {
    return MSTFetch.post("/meal/create-many", body);
  },
  getDetail({ id }: any) {
    return MSTFetch.get(`/meal/customers/${id}`);
  },
  updateFavoriteIngredients(body:any) {
    return MSTFetch.post("/meal/update-favorite-ingredients", body);
  },
  updateDeliveryTime(body:any) {
    return MSTFetch.post("/meal/update-delivery-time", body);
  },
  addReview(body:any) {
    return MSTFetch.post("/meal/review", body);
  },
  cancelMeal(id: any) {
    const body = {mealID:id};
    return MSTFetch.post("/meal/cancel", body);
  },
};
