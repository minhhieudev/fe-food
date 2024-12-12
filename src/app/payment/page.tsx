"use client";

import React, { useState } from "react";
import Infor from "./Informations";
import MethodHistory from "./Method.History";
import ShowTitle from "../components/ShowTitle";
import { Language } from "@/app/utils/language/language";
export default function Payment() {
  const lang = new Language(window);
  return (
    <>
      <ShowTitle title={lang.gen("recharge.title")}/>
      <div className="flex flex-col p-[20px] gap-[20px]">
        <Infor />
        <MethodHistory />
      </div>
    </>
  );
}
