import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import dynamic from "next/dynamic";
const DynamicGlobalLoading = dynamic(() => import("./GlobalLoading"), {
  ssr: false,
});
function InitComponent() {
  return (
    <>
      <DynamicGlobalLoading />
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default InitComponent;
