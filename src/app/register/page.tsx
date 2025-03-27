"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FormRegister from "./components/FormRegister";
import FormCreateBio from "./components/FormCreateBio";
import FormVerifyOtp from "./components/FormVerifyOtp";
import ConfirmAlert from "./components/ConfirmAlert";

interface RegisterPageProps {
  isConfirmToken?: boolean;
  isVerify?: boolean;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ isConfirmToken = false, isVerify = false }) => {
  const [step, setStep] = useState<number>(1);
  const [tokenOtp, setTokenOtp] = useState<string>('');
  const [clientData, setClientData] = useState<object>({});

  useEffect(() => {
    if (isConfirmToken) {
      setStep(3);
    }
  }, [isConfirmToken]);

  const onToken = (token: any) => {
    setTokenOtp(token);
  };

  const onClientData = (clientData: any) => {
    setClientData(clientData);
  };

  return (
    <div style={{}} className="m-auto h-full">
      {step === 1 && <FormCreateBio setStep={setStep} />}
      {step === 2 && <FormRegister setStep={setStep} onToken={onToken} onClientData={onClientData} />}
      {step === 3 && <FormVerifyOtp tokenOtp={tokenOtp} clientData={clientData} />}
      {/* {step === 3 && <ConfirmAlert isVerify={isVerify} />} */}
    </div>
  );
};

export default RegisterPage;
