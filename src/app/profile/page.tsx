"use client"
import { useEffect, useState } from "react";
import TextInputRepair from "@/app/components/TextInputRepair";
import { Button } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { UserActions } from "@/modules/user/slice";
import { toast } from "react-toastify";
import SysStorage from "@/core/services/storage";
import { useDispatch } from "react-redux";

export default function Profile() {
  const dispatch = useDispatch();

  // Contact info states
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");

  // Personal info states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");

  useEffect(() => {
    const UserInfo = SysStorage("USER_INFO");
    const userInfoStr = UserInfo.get();
    if (userInfoStr) {
      userInfoStr.then((data) => {
        if (data) {
          const userData = JSON.parse(data);
          setPhoneNumber(userData.contact?.phoneNumber || "");
          setAddress(userData.contact?.address || "");
          setEmail(userData.contact?.email || "");
          setFirstName(userData.info?.firstName || "");
          setLastName(userData.info?.lastName || "");
          setGender(userData.info?.gender || "male");
        }
      });
    }
  }, []);

  const handleUpdateProfile = () => {
    const profileData = {
      contact: {
        phoneNumber,
        address,
        email,
      },
      info: {
        firstName,
        lastName,
        gender,
      },
    };

    dispatch(
      UserActions.updateProfile({
        ...profileData,
        onSuccess: () => {
          toast.success("Cập nhật thông tin thành công");
        },
      })
    );
  };

  return (
    <div className="p-[20px]">
      <div className="flex flex-col lg:flex-row gap-[20px]">
        <div className="border-1 border-gray-300 rounded-[12px] p-[20px] flex-1">
          <h2 className="text-xl font-bold mb-4">Thông tin cá nhân</h2>
          <div className="flex flex-col gap-[20px] max-w-[500px]">
            <TextInputRepair
              label="Họ"
              placeholder="Nhập họ"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextInputRepair
              label="Tên"
              placeholder="Nhập tên"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <Select
              label="Giới tính"
              selectedKeys={[gender]}
              onSelectionChange={(keys) => setGender(Array.from(keys)[0] as string)}
            >
              <SelectItem key="male" value="male">Nam</SelectItem>
              <SelectItem key="female" value="female">Nữ</SelectItem>
              <SelectItem key="other" value="other">Khác</SelectItem>
            </Select>
          </div>
        </div>
        <div className="border-1 border-gray-300 rounded-[12px] p-[20px] flex-1">
          <h2 className="text-xl font-bold mb-4">Thông tin liên hệ</h2>
          <div className="flex flex-col gap-[20px] max-w-[500px]">
            <TextInputRepair
              label="Số điện thoại"
              placeholder="Nhập số điện thoại"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <TextInputRepair
              label="Địa chỉ"
              placeholder="Nhập địa chỉ"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <TextInputRepair
              label="Email"
              placeholder="Nhập email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>


      </div>

      <Button
        className="bg-[#FF8900] text-white mt-[20px]"
        onClick={handleUpdateProfile}
      >
        Cập nhật thông tin
      </Button>
    </div>
  );
} 