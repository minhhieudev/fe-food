"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FormRegister from "./components/FormRegister";
import FormCreateBio from "./components/FormCreateBio";
import FormVerifyOtp from "./components/FormVerifyOtp";
import ConfirmAlert from "./components/ConfirmAlert";

export default function RegisterPage({ isConfirmToken = false, isVerify = false }) {
  const [step, setStep] = useState(1);
  const [tokenOtp, setTokenOtp] = useState('')
  const [clientData,setClientData] = useState({});

  useEffect(() => {
    if (isConfirmToken) {
      setStep(3);
    }
  }, []);

  const onToken = (token: any) => {
    setTokenOtp(token)
  }

  const onClientData = (clientData: any) => {
    setClientData(clientData)
  }

  return (
    <div style={{}} className="m-auto h-full">
      {step === 1 && <FormCreateBio setStep={setStep} />}
      {step === 2 && <FormRegister setStep={setStep} onToken={onToken} onClientData={onClientData}/>}
      {step === 3 && <FormVerifyOtp tokenOtp={tokenOtp} clientData={clientData}/>}
      {/* {step === 3 && <ConfirmAlert isVerify={isVerify} />} */}
    </div>
  );
}
