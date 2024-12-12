"use client";
import React, { useEffect, useState } from "react";
import Loading from "./Loading";

import { useAppSelector } from "../services/hook";
import { AppSelector } from "./AppSlice";
function GlobalLoading() {
  const isLoading = useAppSelector(AppSelector.isLoading);

  const [width, setWidth] = useState(window?.innerWidth);
  const [height, setHeight] = useState(window?.innerHeight);

  useEffect(() => {
    window?.addEventListener("resize", () => {
      setWidth(window?.innerWidth);
      setHeight(window?.innerHeight);
    });
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return isLoading ? (
    <div
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99,
        display: "flex",
      }}
      className=" bg-[#00000010]"
    >
      <Loading />
    </div>
  ) : (
    <></>
  );
}

export default GlobalLoading;
