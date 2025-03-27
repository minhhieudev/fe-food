"use client"
import { useEffect, useState } from "react";
import TextInputRepair from "@/app/components/TextInputRepair";
import { Button, Tabs, Tab, Card, Avatar } from "@nextui-org/react";
import { Select, SelectItem } from "@nextui-org/react";
import { UserActions } from "@/modules/user/slice";
import { AuthActions } from "@/modules/auth/slice";
import { toast } from "react-toastify";
import SysStorage from "@/core/services/storage";
import { useDispatch } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateFormChangePassWord } from "../utils/units";
import Image from "next/image";

export default function Profile() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState<any>("info");
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(false);
  const [isLoadingPassword, setIsLoadingPassword] = useState<boolean>(false);

  // Contact info states
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  // Personal info states
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [gender, setGender] = useState<string>("male");

  // Password change form
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<any>({
    resolver: yupResolver(validateFormChangePassWord),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      checkNewPass: ""
    }
  });

  useEffect(() => {
    const UserInfo = SysStorage("USER_INFO");
    const userInfoStr = UserInfo.get();
    if (userInfoStr) {
      userInfoStr.then((data: any) => {
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
    setIsLoadingProfile(true);
    const profileData: any = {
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
          setIsLoadingProfile(false);
        },
        onFail: (error: any) => {
          toast.error(error || "Cập nhật thất bại");
          setIsLoadingProfile(false);
        }
      })
    );
  };

  const handleChangePassword = (data: any) => {
    setIsLoadingPassword(true);
    dispatch(
      AuthActions.changePassWord({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
        onSuccess: () => {
          toast.success("Đổi mật khẩu thành công");
          reset();
          setIsLoadingPassword(false);
        },
        onFail: (error: any) => {
          toast.error(error || "Đổi mật khẩu thất bại");
          setIsLoadingPassword(false);
        },
      })
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <div className="bg-emerald-600 rounded-xl shadow-lg p-6 mb-6 flex flex-col sm:flex-row items-center gap-4">
          <Avatar
            className="w-24 h-24 text-large border-4 border-white"
            src="https://cdn-media.sforum.vn/storage/app/media/THANHAN/2/2a/avatar-dep-92.jpg"
            isBordered
            color="success"
          />

          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-white">{firstName} {lastName}</h1>
            <p className="text-emerald-100">{email}</p>
            <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                {gender === 'male' ? 'Nam' : gender === 'female' ? 'Nữ' : 'Khác'}
              </span>
              <span className="bg-white/20 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
                Thành viên
              </span>
            </div>
          </div>
        </div>

        {/* Profile Tabs */}
        <Card className="shadow-lg">
          <Tabs
            fullWidth
            size="lg"
            selectedKey={activeTab}
            onSelectionChange={(key: any) => setActiveTab(key)}
            classNames={{
              tabList: "gap-0 w-full bg-emerald-600 p-0",
              cursor: "w-full bg-white",
              tab: "max-w-fit px-8 h-12",
              tabContent: "!text-white data-[selected=true]:!text-emerald-600 font-medium"
            }}
          >
            <Tab
              key="info"
              title={<span className="group-data-[selected=true]:text-emerald-600">Thông tin cá nhân</span>}
            >
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4 text-emerald-700">Thông tin cá nhân</h2>
                    <div className="space-y-4">
                      <TextInputRepair
                        label="Họ"
                        placeholder="Nhập họ"
                        value={firstName}
                        onChange={(e: any) => setFirstName(e.target.value)}
                        className="w-full"
                      />
                      <TextInputRepair
                        label="Tên"
                        placeholder="Nhập tên"
                        value={lastName}
                        onChange={(e: any) => setLastName(e.target.value)}
                        className="w-full"
                      />
                      <Select
                        label="Giới tính"
                        selectedKeys={[gender]}
                        onSelectionChange={(keys: any) => setGender(Array.from(keys)[0] as string)}
                        className="w-full"
                      >
                        <SelectItem key="male" value="male">Nam</SelectItem>
                        <SelectItem key="female" value="female">Nữ</SelectItem>
                        <SelectItem key="other" value="other">Khác</SelectItem>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-xl font-bold mb-4 text-emerald-700">Thông tin liên hệ</h2>
                    <div className="space-y-4">
                      <TextInputRepair
                        label="Số điện thoại"
                        placeholder="Nhập số điện thoại"
                        value={phoneNumber}
                        onChange={(e: any) => setPhoneNumber(e.target.value)}
                        className="w-full"
                      />
                      <TextInputRepair
                        label="Địa chỉ"
                        placeholder="Nhập địa chỉ"
                        value={address}
                        onChange={(e: any) => setAddress(e.target.value)}
                        className="w-full"
                      />
                      <TextInputRepair
                        label="Email"
                        placeholder="Nhập email"
                        value={email}
                        onChange={(e: any) => setEmail(e.target.value)}
                        className="w-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    className="bg-emerald-600 text-white font-medium"
                    onClick={handleUpdateProfile}
                    isLoading={isLoadingProfile}
                    spinner={
                      <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    }
                  >
                    {isLoadingProfile ? "Đang cập nhật..." : "Cập nhật thông tin"}
                  </Button>
                </div>
              </div>
            </Tab>

            <Tab
              key="security"
              title={<span className="group-data-[selected=true]:text-emerald-600">Bảo mật</span>}
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6 text-emerald-700">Thay đổi mật khẩu</h2>
                <form onSubmit={handleSubmit(handleChangePassword)} className="max-w-md mx-auto">
                  <div className="space-y-6">
                    <Controller
                      name="oldPassword"
                      control={control}
                      render={({ field }: any) => (
                        <TextInputRepair
                          {...field}
                          label="Mật khẩu hiện tại"
                          type="password"
                          placeholder="Nhập mật khẩu hiện tại"
                          errorMessage={errors?.oldPassword?.message}
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="newPassword"
                      control={control}
                      render={({ field }: any) => (
                        <TextInputRepair
                          {...field}
                          label="Mật khẩu mới"
                          type="password"
                          placeholder="Nhập mật khẩu mới"
                          errorMessage={errors?.newPassword?.message}
                          className="w-full"
                        />
                      )}
                    />

                    <Controller
                      name="checkNewPass"
                      control={control}
                      render={({ field }: any) => (
                        <TextInputRepair
                          {...field}
                          label="Xác nhận mật khẩu mới"
                          type="password"
                          placeholder="Nhập lại mật khẩu mới"
                          errorMessage={errors?.checkNewPass?.message}
                          className="w-full"
                        />
                      )}
                    />
                  </div>

                  <div className="mt-8 flex justify-center">
                    <Button
                      type="submit"
                      className="bg-emerald-600 text-white px-8 font-medium"
                      isLoading={isLoadingPassword}
                      spinner={
                        <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                      }
                    >
                      {isLoadingPassword ? "Đang xử lý..." : "Thay đổi mật khẩu"}
                    </Button>
                  </div>
                </form>

                <div className="mt-10 bg-emerald-50 p-4 rounded-lg border-l-4 border-emerald-500">
                  <h3 className="text-lg font-medium text-emerald-700 mb-2">Lưu ý bảo mật</h3>
                  <ul className="list-disc pl-5 text-emerald-600 space-y-1">
                    <li>Sử dụng mật khẩu mạnh với ít nhất 8 ký tự</li>
                    <li>Nên kết hợp chữ hoa, chữ thường, số và ký tự đặc biệt</li>
                    <li>Không sử dụng thông tin cá nhân trong mật khẩu</li>
                    <li>Không dùng lại mật khẩu từ các tài khoản khác</li>
                  </ul>
                </div>
              </div>
            </Tab>

            <Tab
              key="preferences"
              title={<span className="group-data-[selected=true]:text-emerald-600">Tùy chọn</span>}
            >
              <div className="p-6">
                <h2 className="text-xl font-bold mb-6 text-emerald-700">Tùy chọn cá nhân</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold mb-4 text-emerald-700">Nhận thông báo</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Thông báo qua email</span>
                        <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                          <input type="checkbox" id="email-notif" className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 border-emerald-500 rounded-full appearance-none cursor-pointer peer checked:translate-x-full checked:bg-emerald-500" defaultChecked />
                          <label htmlFor="email-notif" className="block w-full h-full bg-gray-200 peer-checked:bg-emerald-200 rounded-full"></label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Thông báo đơn hàng</span>
                        <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                          <input type="checkbox" id="order-notif" className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 border-emerald-500 rounded-full appearance-none cursor-pointer peer checked:translate-x-full checked:bg-emerald-500" defaultChecked />
                          <label htmlFor="order-notif" className="block w-full h-full bg-gray-200 peer-checked:bg-emerald-200 rounded-full"></label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Thông báo khuyến mãi</span>
                        <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                          <input type="checkbox" id="promo-notif" className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 border-emerald-500 rounded-full appearance-none cursor-pointer peer checked:translate-x-full checked:bg-emerald-500" defaultChecked />
                          <label htmlFor="promo-notif" className="block w-full h-full bg-gray-200 peer-checked:bg-emerald-200 rounded-full"></label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <h3 className="text-lg font-bold mb-4 text-emerald-700">Chia sẻ dữ liệu</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Chia sẻ dữ liệu dinh dưỡng</span>
                        <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                          <input type="checkbox" id="share-data" className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 border-emerald-500 rounded-full appearance-none cursor-pointer peer checked:translate-x-full checked:bg-emerald-500" />
                          <label htmlFor="share-data" className="block w-full h-full bg-gray-200 peer-checked:bg-emerald-200 rounded-full"></label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Nhận tư vấn dinh dưỡng</span>
                        <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                          <input type="checkbox" id="nutrition-advice" className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 border-emerald-500 rounded-full appearance-none cursor-pointer peer checked:translate-x-full checked:bg-emerald-500" defaultChecked />
                          <label htmlFor="nutrition-advice" className="block w-full h-full bg-gray-200 peer-checked:bg-emerald-200 rounded-full"></label>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="font-medium">Lưu lịch sử đặt hàng</span>
                        <div className="relative inline-block w-10 h-6 transition duration-200 ease-in-out rounded-full cursor-pointer">
                          <input type="checkbox" id="order-history" className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 border-emerald-500 rounded-full appearance-none cursor-pointer peer checked:translate-x-full checked:bg-emerald-500" defaultChecked />
                          <label htmlFor="order-history" className="block w-full h-full bg-gray-200 peer-checked:bg-emerald-200 rounded-full"></label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button
                    className="bg-emerald-600 text-white font-medium"
                  >
                    Lưu tùy chọn
                  </Button>
                </div>
              </div>
            </Tab>
          </Tabs>
        </Card>
      </div>
    </div>
  );
} 