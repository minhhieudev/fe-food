"use client";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAppDispatch } from "../services/hook";
import { AuthActions } from "@/modules/auth/slice";
import { useSelector } from "react-redux";
import { AuthSelectors } from "@/modules/auth/slice";

function Client(props: any) {
  const [isLoadedClient, setIsLoadedClient] = useState(false);
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const client = useSelector(AuthSelectors.client);

  useEffect(() => {
    dispatch(AuthActions.getClient({
      clientCode: pathname.split('/')[1],
    }))
  }, [pathname]);

  useEffect(() => {
    setIsLoadedClient(true)
  }, [client]);

  return <div>{isLoadedClient ? props?.children : <></>}</div>;
}

export default Client;
