import { AuthSaga } from "@/modules/auth/saga";
import { call, all } from "redux-saga/effects";
import { ServicesGroupSaga } from "@/modules/services.group/saga";
import { MealSaga } from "@/modules/meal/saga";
import { IngredientGroupSaga } from "@/modules/ingredient.group/saga";
import { IngredientTagSaga } from "@/modules/ingredient.tag/saga";
import { ServicesPackageSaga } from "@/modules/services.package/saga";
import { ServicesOrderSaga } from "@/modules/services.order/saga";
import { PaymentSaga } from "@/modules/payment/saga";
import CurrencySaga from "@/modules/currency/saga";
import { SettingSaga } from "@/modules/setting/saga";
import { KeyWordSaga } from "@/modules/keyword/saga";
import TopicSaga from "@/modules/topic/saga";
import { ServicesPlatformSaga } from "@/modules/services.public/saga";
import UserSaga from "@/modules/user/saga";

function* rootSaga() {
  yield all([
    call(AuthSaga),
    call(ServicesGroupSaga),
    call(IngredientGroupSaga),
    call(IngredientTagSaga),
    call(ServicesPackageSaga),
    call(ServicesOrderSaga),
    call(PaymentSaga),
    call(CurrencySaga),
    call(SettingSaga),
    call(KeyWordSaga),
    call(TopicSaga),
    call(ServicesPlatformSaga),
    call(MealSaga),
    call(UserSaga),
  ]);
}
export default rootSaga;
