"use client";
import { isEmpty } from "lodash";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import CONST from "../services/const";
import { setConfigAxios } from "../services/fetch";
import { useAppDispatch } from "../services/hook";
import { AppAction } from "./AppSlice";
import { SettingActions } from "@/modules/setting/slice";

function Auth(props: any) {
  const [initial, setInitial] = useState(false);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    getSetting();
  }, [pathname]);

  const getSetting = () => {
    dispatch(SettingActions.getTranslateDate({}))
  }

  const checkAuth = () => {
    try {
      console.log('-pathname', pathname)
      const accessToken = localStorage.getItem(CONST.STORAGE.ACCESS_TOKEN);
      dispatch(AppAction.showLoading());
      if (isEmpty(accessToken) && pathname !== '/register' && !pathname.includes('/orderFood')) {
        router.replace("/login");
        // router.replace("/");
      } else {
        setConfigAxios(accessToken);
        if (pathname === "/login") {
          router.push("/");
        }
      }
      dispatch(AppAction.hideLoading());
      setInitial(true);
    } catch (error) {
      dispatch(AppAction.hideLoading());
      setInitial(true);
    }
  };

  return <div>{initial ? props?.children : <></>}</div>;
}

export default Auth;
