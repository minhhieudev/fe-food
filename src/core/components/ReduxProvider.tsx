"use client";
import React from "react";
import { store } from "../services/store";
import Provider from "react-redux/es/components/Provider";
import InitComponent from "./InitComponent";

export default function ReduxProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <InitComponent />
      {children}
    </Provider>
  );
}
