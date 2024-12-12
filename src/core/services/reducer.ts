import AuthReducer from "@/modules/auth/slice";
import CurrencyReducer from "@/modules/currency/slice";
import KeywordReducer from "@/modules/keyword/slice";
import PaymentReducer from "@/modules/payment/slice";
import ServiceGroupReducer from "@/modules/services.group/slice";
import IngredientGroupReducer from "@/modules/ingredient.group/slice";
import IngredientTagReducer from "@/modules/ingredient.tag/slice";
import ServiceOrderReducer from "@/modules/services.order/slice";
import ServicePackageReducer from "@/modules/services.package/slice";
import SettingReducer from "@/modules/setting/slice";
import TopicReducer from "@/modules/topic/slice";
import AppReducer from "../components/AppSlice";
import ServicePlatformReducer from "@/modules/services.public/slice";
import MealReducer from "@/modules/meal/slice";
import UserReducer from "@/modules/user/slice";

export const reducers = {
  app: AppReducer,
  auth: AuthReducer,
  serviceGroup: ServiceGroupReducer,
  ingredientGroup: IngredientGroupReducer,
  ingredientTag: IngredientTagReducer,
  servicePackage: ServicePackageReducer,
  serviceOrder: ServiceOrderReducer,
  payment: PaymentReducer,
  currency: CurrencyReducer,
  setting: SettingReducer,
  keyword: KeywordReducer,
  topic: TopicReducer,
  servicePlatform: ServicePlatformReducer,
  meal: MealReducer,
  user: UserReducer
};
