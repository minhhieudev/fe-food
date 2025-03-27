"use client"

import React, { useEffect, useState } from 'react';
import Image from "next/image";
import MealCard from "./components/MealCard";
import {
  ServicePackageActions,
  ServicePackageSelectors,
} from "@/modules/services.package/slice";

import { useDispatch, useSelector } from 'react-redux';

import {
  IngredientGroupActions,
  IngredientGroupSelectors,
} from "@/modules/ingredient.group/slice";
import {
  IngredientTagActions,
  IngredientTagSelectors,
} from "@/modules/ingredient.tag/slice";
import { 
  MagnifyingGlassIcon, 
  ArrowRightIcon, 
  UserGroupIcon, 
  CheckBadgeIcon, 
  ScaleIcon, 
  BoltIcon, 
  BeakerIcon, 
  TruckIcon, 
  MapPinIcon, 
  ClockIcon, 
  CheckIcon,
  SparklesIcon,
  Square3Stack3DIcon,
  FaceSmileIcon,
  FireIcon 
} from "@heroicons/react/24/outline";
import Footer from './components/Home/Footer';
import Banner from '@/app/orderFood/components/Home/Banner';



const MealList: React.FC = () => {
  const [servicePackageToday, setServicePackageToday] = useState<any[]>([]);
  const [servicePackageWeeklyMonthly, setServicePackageWeeklyMonthly] = useState<any[]>([]);
  const dataServices: any = useSelector(ServicePackageSelectors.servicePackage);
  const [searchTerm, setSearchTerm] = useState("");
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      ServicePackageActions.getServicePackage({
        onSuccess: (rs: any) => {
          const servicePackages = rs.data?.servicePackages || [];
          const weeklyMonthlyMeals = servicePackages.filter((pkg: any) => pkg.subscriptionID);
          const todayMeals = servicePackages.filter((pkg: any) => !pkg.subscriptionID);
          setServicePackageToday(todayMeals);
          setServicePackageWeeklyMonthly(weeklyMonthlyMeals);
        },
      })
    );
  }, [dispatch]);

  useEffect(() => {
    dispatch(
      IngredientGroupActions.getIngredientGroup({
        onSuccess: (rs: any) => {
        },
        onFail: (rs: any) => {
        }
      })
    );
    dispatch(
      IngredientTagActions.getIngredientTag({
        onSuccess: (rs: any) => {
        },
        onFail: (rs: any) => {
        }
      })
    );
  }, []);
 
  return (
    <div className="min-h-screen">
      <Banner 
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        {/* Featured Categories */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="w-2 h-12 bg-gradient-to-b from-emerald-400 to-emerald-600 rounded-full mr-4"></div>
              <h2 className="text-2xl font-bold text-gray-800">Danh mục đặc sắc</h2>
            </div>
            <a href="#" className="text-emerald-600 font-medium hover:text-emerald-700 flex items-center group">
              Xem tất cả
              <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { 
                name: 'Món chay', 
                icon: <ScaleIcon className="w-6 h-6" />,
                description: 'Thanh nhẹ và tốt cho sức khỏe',
                color: 'from-green-400 to-emerald-500',
                url: 'https://chaysach.com/wp-content/uploads/2018/10/m%C3%B3n-x%C3%A0o-chay-1.jpg.webp'
              },
              { 
                name: 'Ít carb', 
                icon: <ScaleIcon className="w-6 h-6" />,
                description: 'Giảm cân hiệu quả',
                color: 'from-blue-400 to-cyan-500',
                url: 'https://bazaarvietnam.vn/wp-content/uploads/2021/02/mon-an-low-carb-giam-can_1046974864.jpg'
              },
              { 
                name: 'Giàu protein', 
                icon: <BoltIcon className="w-6 h-6" />,
                description: 'Tăng cường cơ bắp',
                color: 'from-amber-400 to-orange-500',
                url: 'https://api.genetica.asia/storage/9-1648191935tDAu6.jpg?width=1220'
              },
              { 
                name: 'Không đường', 
                icon: <BeakerIcon className="w-6 h-6" />,
                description: 'Phù hợp cho người tiểu đường',
                color: 'from-purple-400 to-indigo-500',
                url: 'https://images2.thanhnien.vn/Uploaded/trangdt/2023_01_28/vegan-1-1887.jpeg'
              }
            ].map((category, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl h-48 cursor-pointer shadow-md hover:shadow-xl transition-all duration-500">
                {/* Background image with parallax effect */}
                <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
                  <img 
                    src={category.url}
                    alt={category.name}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                
                {/* Colored overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
                
                {/* Icon with animation */}
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm p-2 rounded-full transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                  {category.icon}
                </div>
                
                {/* Content with slide-up animation */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white font-bold text-lg mb-1">{category.name}</h3>
                  <p className="text-white/80 text-sm transform opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-100">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Meals available now */}
        {Boolean((servicePackageToday || []).length) && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-2 h-12 bg-emerald-500 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-gray-800">Món ăn giao ngay</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {servicePackageToday.map((meal: any) => (
                <MealCard key={meal._id} {...meal} type={false} />
              ))}
            </div>
          </div>
        )}

        {/* Weekly/Monthly Packages */}
        {Boolean((servicePackageWeeklyMonthly || []).length) && (
          <div className="mb-16">
            <div className="flex items-center mb-8">
              <div className="w-2 h-12 bg-orange-500 rounded-full mr-4"></div>
              <h2 className="text-3xl font-bold text-gray-800">Gói ăn theo tuần / tháng</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {servicePackageWeeklyMonthly.map((meal: any) => (
                <MealCard key={meal._id} {...meal} type={true} />
              ))}
            </div>
          </div>
        )}
        
        {/* Why Choose Us Section */}
        <div className="py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-2xl shadow-lg mb-16 relative overflow-hidden">
          {/* Background pattern */}
          <div className="absolute inset-0 bg-[url('https://img.freepik.com/free-vector/black-wave-halftone-background_1199-279.jpg')] opacity-5"></div>
          
          {/* Shaped divider */}
          <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-br from-green-100 via-emerald-50 to-teal-100"></div>
          <div className="absolute top-6 left-0 right-0 h-1 bg-emerald-500 opacity-20"></div>
          
          <div className="text-center mb-12 relative">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 inline-block">
              <span className="relative">
                Tại sao chọn Healthy Food?
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Chúng tôi cam kết mang đến những bữa ăn lành mạnh, đa dạng và tiện lợi nhất cho cuộc sống bận rộn của bạn.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Nguyên liệu tươi sạch',
                description: 'Sử dụng 100% nguyên liệu tươi, được chọn lọc kỹ lưỡng từ các nhà cung cấp uy tín.',
                icon: <SparklesIcon className="w-8 h-8 text-white" />,
                color: 'from-green-400 to-emerald-500'
              },
              {
                title: 'Đội ngũ đầu bếp chuyên nghiệp',
                description: 'Các món ăn được chế biến bởi đội ngũ đầu bếp giàu kinh nghiệm, đam mê với ẩm thực lành mạnh.',
                icon: <UserGroupIcon className="w-8 h-8 text-white" />,
                color: 'from-blue-400 to-cyan-500'
              },
              {
                title: 'Giao hàng nhanh chóng',
                description: 'Cam kết giao hàng đúng giờ, giữ nguyên hương vị và chất lượng của món ăn.',
                icon: <TruckIcon className="w-8 h-8 text-white" />,
                color: 'from-amber-400 to-orange-500'
              },
            ].map((feature, index) => (
              <div 
                key={index} 
                className="text-center p-6 rounded-xl hover:bg-emerald-50 transition-all duration-500 group relative overflow-hidden"
                onMouseEnter={() => {
                  // Add animation for entrance
                }}
              >
                {/* Icon with gradient background */}
                <div className="relative mb-6 mx-auto transform group-hover:scale-110 transition-transform duration-500">
                  <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${feature.color} flex items-center justify-center shadow-lg`}>
                    {feature.icon}
                    
                    {/* Animated ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-300 opacity-0 group-hover:opacity-100 animate-spin-slow"></div>
                  </div>
                  
                  {/* Number badge */}
                  <div className="absolute -right-2 -top-2 bg-white w-8 h-8 rounded-full shadow flex items-center justify-center font-bold text-emerald-600 border-2 border-emerald-100">
                    {index + 1}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-emerald-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 transition-all duration-500 transform group-hover:translate-y-0">{feature.description}</p>
                
                {/* Learn more link */}
                <div className="mt-4 flex justify-center">
                  <a href="#" className="text-emerald-500 font-medium flex items-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <span>Tìm hiểu thêm</span>
                    <ArrowRightIcon className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Testimonials */}
        <div className="py-12 mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Khách hàng nói gì về chúng tôi</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hàng ngàn khách hàng hài lòng với dịch vụ của Healthy Food</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Võ Minh Hiếu',
                role: 'Doanh nhân',
                quote: 'Thực đơn đa dạng, phù hợp với lịch trình bận rộn của tôi. Đã đặt gói tháng và rất hài lòng!'
              },
              {
                name: 'Phạm Minh Quang',
                role: 'Huấn luyện viên thể hình',
                quote: 'Món ăn đảm bảo dinh dưỡng, nguyên liệu tươi ngon và hỗ trợ tốt cho chế độ tập luyện của tôi.'
              },
              {
                name: 'Huỳnh Tấn Phát',
                role: 'Nhân viên văn phòng',
                quote: 'Đồ ăn luôn được giao đúng giờ, đóng gói cẩn thận và hương vị tuyệt vời. Rất đáng để thử!'
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mr-4">
                    <span className="text-emerald-600 font-bold">{testimonial.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA và Statistical Achievements */}
        <div className="relative py-16 mb-16 overflow-hidden">
          {/* Background with gradient and pattern */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-600 -z-10"></div>
          <div className="absolute inset-0 bg-[url('https://static.vecteezy.com/system/resources/previews/006/998/506/non_2x/gradient-pattern-background-with-dots-vector.jpg')] opacity-10 -z-10"></div>
          
          {/* Floating food images */}
          <div className="absolute -top-10 -right-10 w-40 h-40 opacity-10 rotate-12 animate-float-slow">
            <img src="https://cdn-icons-png.flaticon.com/512/8512/8512332.png" alt="Salad" width={160} height={160} />
          </div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 opacity-10 -rotate-12 animate-float-medium">
            <img src="https://cdn-icons-png.flaticon.com/512/1625/1625048.png" alt="Fruits" width={160} height={160} />
          </div>
          
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Kết quả đáng tự hào của chúng tôi</h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Chúng tôi luôn nỗ lực không ngừng để mang đến trải nghiệm tốt nhất cho khách hàng
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
              {[
                { 
                  value: '15,000+', 
                  label: 'Bữa ăn được phục vụ', 
                  icon: <FireIcon className="w-10 h-10 text-white" />,
                  color: 'from-green-400 to-teal-300'
                },
                { 
                  value: '98%', 
                  label: 'Khách hàng hài lòng', 
                  icon: <FaceSmileIcon className="w-10 h-10 text-white" />,
                  color: 'from-cyan-400 to-blue-300'
                },
                { 
                  value: '250+', 
                  label: 'Món ăn độc đáo', 
                  icon: <Square3Stack3DIcon className="w-10 h-10 text-white" />,
                  color: 'from-amber-400 to-yellow-300'
                },
                { 
                  value: '24/7', 
                  label: 'Hỗ trợ khách hàng', 
                  icon: <ClockIcon className="w-10 h-10 text-white" />,
                  color: 'from-pink-400 to-rose-300'
                }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 transform hover:scale-105 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 mb-4 rounded-full bg-gradient-to-br ${stat.color} p-3 mx-auto shadow-lg flex items-center justify-center`}>
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
                  <p className="text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
            
            {/* CTA Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Đăng ký nhận ưu đãi hàng tuần
                </h3>
                <p className="text-white/80 max-w-xl">
                  Nhận thông tin về các món ăn mới, công thức đặc biệt và ưu đãi độc quyền dành cho thành viên.
                </p>
              </div>
              
              <div className="w-full md:w-auto">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input 
                    type="email" 
                    placeholder="Email của bạn" 
                    className="px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/20 text-white placeholder-white/60 min-w-[250px]"
                  />
                  <button className="bg-white text-emerald-600 font-medium px-6 py-3 rounded-lg hover:bg-white/90 transition-colors duration-300 flex items-center justify-center">
                    <span>Đăng ký ngay</span>
                    <ArrowRightIcon className="w-4 h-4 ml-2" />
                  </button>
                </div>
                <p className="text-white/60 text-sm mt-2">Chúng tôi tôn trọng quyền riêng tư của bạn.</p>
              </div>
            </div>
          </div>
        </div>

        {/* App Download Section */}
        <div className="mb-16 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-emerald-50 rounded-l-3xl -z-10"></div>
          
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0 md:pr-8">
                <div className="max-w-lg">
                  <p className="text-emerald-600 font-medium mb-2">Tải ứng dụng ngay</p>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                    Healthy Food ngay trong tầm tay
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Đặt món, theo dõi đơn hàng và nhận ưu đãi độc quyền với ứng dụng Healthy Food. Luôn sẵn sàng phục vụ bạn mọi lúc, mọi nơi.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a href="#" className="flex items-center justify-center sm:justify-start bg-black text-white rounded-xl px-6 py-3 hover:bg-gray-800 transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" className="mr-3">
                        <path fill="currentColor" d="M17.05,13.89l0.7-1.2c0.04-0.08,0.02-0.17-0.05-0.23l-0.7-0.65c-0.06-0.05-0.09-0.13-0.08-0.21l0.1-0.9 c0.01-0.08-0.03-0.17-0.1-0.21l-0.85-0.44c-0.07-0.04-0.12-0.12-0.11-0.2l0.07-0.95c0.01-0.08-0.05-0.16-0.13-0.18l-0.9-0.28 c-0.08-0.02-0.14-0.1-0.14-0.18l-0.02-0.96c0-0.08-0.07-0.15-0.15-0.15l-0.96-0.05c-0.08,0-0.16-0.07-0.17-0.15l-0.13-0.95 c-0.01-0.08-0.08-0.14-0.16-0.14l-0.95,0.05c-0.09,0-0.16-0.05-0.19-0.13l-0.28-0.9c-0.03-0.08-0.1-0.12-0.18-0.12l-0.93,0.15 c-0.08,0.01-0.17-0.03-0.21-0.1l-0.42-0.85c-0.04-0.07-0.12-0.11-0.2-0.1l-0.89,0.23c-0.08,0.02-0.17,0-0.22-0.07l-0.52-0.77 c-0.05-0.07-0.14-0.1-0.22-0.07l-0.84,0.33c-0.08,0.03-0.17,0.01-0.22-0.05L7.4,3.73C7.35,3.68,7.27,3.67,7.2,3.7L6.41,4.15 C6.34,4.19,6.25,4.19,6.2,4.14L5.53,3.67C5.46,3.62,5.38,3.62,5.31,3.66l-0.9,0.56C4.35,4.26,4.25,4.24,4.19,4.18L3.6,3.53 C3.55,3.47,3.46,3.46,3.39,3.5L2.31,4.08l7.04,12.19l7.7-2.38"></path>
                        <path fill="currentColor" d="M8.82,22.52c-0.06,0-0.12-0.01-0.18-0.03c-0.23-0.07-0.4-0.27-0.43-0.51l-0.4-3.86L2.27,4.08 C2.19,3.93,2.21,3.74,2.33,3.62C2.44,3.5,2.62,3.45,2.78,3.5l2.41,0.66c0.13,0.04,0.24,0.13,0.3,0.25l0.43,0.87 c0.05,0.1,0.14,0.17,0.25,0.2l0.89,0.14c0.03,0,0.06,0.01,0.09,0.01c0.11,0,0.21-0.04,0.29-0.12l0.63-0.71 c0.08-0.09,0.21-0.14,0.33-0.13c0.12,0.01,0.24,0.09,0.3,0.2l0.46,0.82c0.06,0.11,0.17,0.18,0.29,0.19c0.13,0.01,0.24-0.04,0.33-0.13 l0.6-0.65c0.11-0.12,0.27-0.16,0.43-0.12c0.15,0.04,0.27,0.14,0.32,0.29l0.3,0.91c0.03,0.09,0.09,0.17,0.17,0.22 c0.09,0.05,0.18,0.06,0.28,0.04l0.9-0.21c0.13-0.03,0.26,0,0.37,0.09c0.11,0.09,0.17,0.22,0.17,0.35l0.02,0.96 c0,0.13,0.06,0.25,0.16,0.33c0.1,0.08,0.22,0.1,0.34,0.07l0.9-0.26c0.26-0.07,0.53,0.06,0.63,0.31l0.28,0.9 c0.05,0.15,0.16,0.27,0.31,0.31c0.15,0.04,0.3,0.01,0.43-0.08l0.67-0.49c0.11-0.08,0.24-0.11,0.37-0.09c0.13,0.03,0.24,0.11,0.31,0.22 l0.42,0.65c0.07,0.11,0.18,0.18,0.3,0.2c0.12,0.02,0.24-0.01,0.34-0.09l0.91-0.77c0.16-0.13,0.39-0.15,0.57-0.07 c0.18,0.08,0.31,0.26,0.33,0.46l0.02,0.03c0.02,0.29-0.17,0.55-0.45,0.62l-7.7,2.38c-0.14,0.04-0.23,0.16-0.25,0.3l-0.36,3.47 c-0.01,0.14,0.04,0.27,0.15,0.36c0.11,0.09,0.25,0.11,0.38,0.07l6.92-2.2c0.27-0.09,0.56,0.06,0.64,0.34 c0.09,0.27-0.06,0.56-0.34,0.64l-6.92,2.2C8.91,22.51,8.87,22.52,8.82,22.52z"></path>
                      </svg>
                      <div>
                        <div className="text-xs">Tải về từ</div>
                        <div className="text-sm font-semibold">App Store</div>
                      </div>
                    </a>
                    
                    <a href="#" className="flex items-center justify-center sm:justify-start bg-black text-white rounded-xl px-6 py-3 hover:bg-gray-800 transition-colors">
                      <svg width="24" height="24" viewBox="0 0 24 24" className="mr-3">
                        <path fill="currentColor" d="M20.92,12.05c-0.08-0.72-0.36-1.39-0.8-1.95l0.07-0.12l-3.1-5.46c-0.38-0.81-1.21-1.4-2.02-1.49C14.97,3,14.87,3,14.76,3 H9.24C9.13,3,9.03,3,8.94,3.03C8.12,3.12,7.29,3.7,6.92,4.51l-3.2,5.65C3.24,10.75,3,11.44,3,12.19c0,1.89,1.2,3.5,2.86,4.1 L6,16.35l4.4,2.04c1.03,0.47,2.16,0.47,3.2,0l4.4-2.04l0.14-0.06c0.95-0.35,1.74-1.11,2.13-2.09C20.76,13.45,20.99,12.74,20.92,12.05 z M18.62,13.83c-0.23,0.58-0.7,1.04-1.27,1.25l-4.46,2.06c-0.58,0.26-1.2,0.26-1.78,0l-4.46-2.06c-0.99-0.34-1.65-1.25-1.65-2.27 c0-0.44,0.14-0.85,0.39-1.21l1.31-1.88l4.56,7.92c0.13,0.23,0.44,0.29,0.65,0.14c0.08-0.06,0.14-0.14,0.17-0.24l1.15-3.46l1.92,3.46 c0.13,0.23,0.42,0.3,0.65,0.17c0.23-0.13,0.3-0.42,0.17-0.65l-1.92-3.46h3.9C18.52,13.22,18.66,13.54,18.62,13.83z M9.94,11.89 L8.35,9.06l1.59-2.82c0.13-0.23,0.42-0.31,0.65-0.18c0.23,0.13,0.31,0.42,0.18,0.65L9.18,9.06l1.59,2.82 c0.13,0.23,0.05,0.52-0.18,0.65C10.36,12.2,10.07,12.12,9.94,11.89z"></path>
                      </svg>
                      <div>
                        <div className="text-xs">TẢI VỀ TỪ</div>
                        <div className="text-sm font-semibold">Google Play</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              
              {/* Phone mockup without the outer frame and black top */}
              <div className="md:w-1/2 relative">
                <div className="relative mx-auto w-[590px] h-[550px] perspective-1000">
                  <div className="absolute inset-0 transform rotate-y-3 rotate-x-5 translate-z-0 preserve-3d transition-transform duration-500 hover:rotate-y-8 hover:rotate-x-10">
                    <div className="relative w-full h-full rounded-[40px] bg-white overflow-hidden">
                      {/* Removed the black top bar */}
                      <img
                        src="https://media.excellentwebworld.com/wp-content/uploads/2023/08/17082155/Food-Delivery-App-Development-UI-screen.png" 
                        alt="Healthy Food App" 
                        width={290} 
                        height={550}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      
                      {/* Floating elements for interactive effect */}
                      <div className="absolute top-1/4 right-6 transform -translate-y-1/2 opacity-100 transition-opacity animate-float-slow">
                        <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">
                          30% OFF
                        </div>
                      </div>
                      
                      <div className="absolute bottom-1/4 left-6 transform -translate-y-1/2 opacity-100 transition-opacity animate-float-medium animation-delay-1000">
                        <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-lg">
                          Ưu đãi
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating food images around phone */}
                <div className="absolute -top-6 -right-6 w-24 h-24 opacity-90 animate-float-slow">
                  <img src={"https://cdn-icons-png.flaticon.com/512/4080/4080639.png"} alt="Salad" width={96} height={96} className="drop-shadow-xl" />
                </div>
                <div className="absolute -bottom-8 -left-8 w-28 h-28 opacity-90 animate-float-medium animation-delay-1000">
                  <img src={"https://cdn-icons-png.flaticon.com/512/4080/4080639.png"} alt="Smoothie" width={112} height={112} className="drop-shadow-xl" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Food Map & Delivery Section */}
        <div className="mb-16 bg-gradient-to-br from-gray-50 to-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Nguyên liệu tươi ngon từ khắp nơi
                </h2>
                <p className="text-gray-600 mb-4">
                  Chúng tôi chọn lọc những nguyên liệu tươi ngon nhất từ khắp mọi miền đất nước để đảm bảo chất lượng món ăn luôn tuyệt hảo.
                </p>
              </div>
              
              <div className="mt-6 md:mt-0">
                <button className="bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-3 rounded-full transition-colors duration-300 flex items-center">
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  <span>Xem vùng nguyên liệu</span>
                </button>
              </div>
            </div>
            
            {/* Interactive Map */}
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-xl mb-16 group">
              <div className="absolute inset-0 bg-emerald-50 flex items-center justify-center">
                <div className="w-full h-full relative">
                  {/* Map background image */}
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/8/89/Italy_Vietnam_Locator.png"
                    alt="Vietnam Map" 
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Interactive markers */}
                  {[
                    { top: '20%', left: '70%', name: 'Đà Lạt', products: ['Rau', 'Trái cây', 'Dâu tây'] },
                    { top: '45%', left: '80%', name: 'Nha Trang', products: ['Hải sản', 'Tôm', 'Cá'] },
                    { top: '70%', left: '75%', name: 'Đồng bằng sông Cửu Long', products: ['Gạo', 'Trái cây nhiệt đới'] },
                    { top: '15%', left: '30%', name: 'Tây Bắc', products: ['Rau hữu cơ', 'Thịt bò'] }
                  ].map((marker, index) => (
                    <div 
                      key={index}
                      className="absolute w-16 h-16 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group/marker"
                      style={{ top: marker.top, left: marker.left }}
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500 rounded-full opacity-20 animate-ping-slow"></div>
                        <div className="absolute inset-2 bg-emerald-500 rounded-full opacity-40"></div>
                        <div className="absolute inset-4 bg-emerald-500 rounded-full flex items-center justify-center">
                          <MapPinIcon className="w-5 h-5 text-white" />
                        </div>
                        
                        {/* Tooltip */}
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-48 bg-white rounded-lg shadow-lg p-3 opacity-0 invisible group-hover/marker:opacity-100 group-hover/marker:visible transition-all duration-300 z-10">
                          <p className="font-bold text-sm text-gray-800 mb-1">{marker.name}</p>
                          <p className="text-xs text-gray-600">{marker.products.join(', ')}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Interactive elements overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            {/* Delivery Tracking Preview */}
            <div className="flex flex-col md:flex-row items-center bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="md:w-1/2 p-10">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">
                  Theo dõi đơn hàng trực tiếp
                </h3>
                <p className="text-gray-600 mb-6">
                  Biết chính xác món ăn của bạn đang ở đâu. Từ nhà bếp đến bàn ăn, chúng tôi luôn cập nhật trạng thái đơn hàng để bạn yên tâm.
                </p>
                
                <div className="space-y-4">
                  {[
                    { step: 1, status: 'completed', label: 'Đơn hàng đã được xác nhận' },
                    { step: 2, status: 'completed', label: 'Món ăn đang được chế biến' },
                    { step: 3, status: 'active', label: 'Đang giao hàng' },
                    { step: 4, status: 'pending', label: 'Giao hàng thành công' }
                  ].map((step) => (
                    <div key={step.step} className="flex items-center">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                          step.status === 'completed' ? 'bg-emerald-500 text-white' :
                          step.status === 'active' ? 'bg-amber-500 text-white animate-pulse' :
                          'bg-gray-200 text-gray-400'
                        }`}
                      >
                        {step.status === 'completed' ? (
                          <CheckIcon className="w-5 h-5" />
                        ) : (
                          <span>{step.step}</span>
                        )}
                      </div>
                      <p className={`font-medium ${
                        step.status === 'completed' ? 'text-emerald-500' :
                        step.status === 'active' ? 'text-amber-500' :
                        'text-gray-400'
                      }`}>
                        {step.label}
                      </p>
                    </div>
                  ))}
                </div>
                
                <button className="mt-8 bg-emerald-500 hover:bg-emerald-600 text-white font-medium px-6 py-3 rounded-full transition-colors duration-300 flex items-center">
                  <ClockIcon className="w-5 h-5 mr-2" />
                  <span>Theo dõi đơn của tôi</span>
                </button>
              </div>
              
              <div className="md:w-1/2 relative h-96">
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                  {/* Delivery map illustration */}
                  <div className="relative w-full h-full transform scale-110">
                    <img 
                      src="https://img.freepik.com/premium-photo/worldwide-shipping-concept-world-globe-map-express-delivery-concept-fast-shipping-3d-illustration_250043-366.jpg" 
                      alt="Delivery Map" 
                      style={{ objectFit: 'cover' }}
                    />
                    
                    {/* Animated delivery icon */}
                    <div className="absolute left-1/3 top-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-move-path">
                      <div className="p-2 bg-emerald-500 rounded-full shadow-lg">
                        <TruckIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter & Footer */}
        <div className="bg-emerald-900 text-white pt-16 pb-8">
          <div className="max-w-7xl mx-auto px-4">
            {/* Newsletter */}
            <div className="mb-16 relative overflow-hidden">
              {/* Background decorations */}
              <div className="absolute top-0 right-0 transform rotate-180 opacity-5">
                <svg width="400" height="400" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(300,300)">
                    <path d="M125,-160.4C159.9,-146.7,184.6,-107.8,178.8,-70.9C173,-34,136.7,0.8,114.1,33.4C91.5,66,82.5,96.4,62.5,121.4C42.6,146.4,11.7,165.9,-22.2,174.5C-56.2,183.1,-93.3,180.7,-126.9,162C-160.6,143.3,-190.9,108.2,-194.4,70.5C-197.9,32.8,-174.7,-7.5,-159.5,-51.5C-144.3,-95.5,-137.2,-143.2,-112.6,-158.4C-88,-173.5,-46,-156,-5.7,-147.6C34.7,-139.3,90,-174.1,125,-160.4Z" fill="currentColor" />
                  </g>
                </svg>
              </div>
              
              <div className="absolute -bottom-20 -left-20 opacity-5">
                <svg width="300" height="300" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                  <g transform="translate(300,300)">
                    <path d="M140.4,-196.7C176.4,-168.5,196.4,-125.1,210.6,-81.8C224.8,-38.6,233.2,4.5,223.8,43.5C214.4,82.5,187.2,117.3,153.4,144.9C119.7,172.4,79.4,192.7,35.9,204.5C-7.7,216.4,-55.4,219.7,-96.9,203.8C-138.4,187.9,-173.6,152.7,-198,110.9C-222.4,69.2,-235.9,20.7,-230.6,-26.2C-225.2,-73.1,-201,-118.3,-166.6,-147.1C-132.2,-175.9,-87.7,-188.2,-42.5,-202.8C2.7,-217.4,48.6,-234.3,91.4,-228.1C134.3,-221.9,174.1,-192.5,190.2,-179.5" fill="currentColor" />
                  </g>
                </svg>
              </div>
              
              <div className="relative bg-emerald-800 rounded-2xl px-6 py-10 md:p-12 shadow-2xl overflow-hidden">
                {/* Animated particles */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(20)].map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-white/10"
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDuration: `${10 + Math.random() * 20}s`,
                        animationDelay: `${Math.random() * 5}s`,
                      }}
                    ></div>
                  ))}
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                  <div className="md:w-1/2">
                    <h3 className="text-3xl font-bold mb-4">Đăng ký nhận thông tin</h3>
                    <p className="text-emerald-100 max-w-xl mb-6">
                      Hãy đăng ký để nhận những ưu đãi đặc biệt, công thức nấu ăn lành mạnh và thông tin về các sự kiện độc quyền từ Healthy Food.
                    </p>
                    
                    <div className="flex flex-col sm:flex-row gap-3 max-w-xl">
                      <div className="relative flex-grow">
                        <input 
                          type="email" 
                          placeholder="Địa chỉ email của bạn" 
                          className="w-full px-5 py-4 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/30 text-white placeholder-white/60"
                        />
                        <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/20 to-teal-500/20 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                      </div>
                      <button className="bg-white text-emerald-800 font-medium px-8 py-4 rounded-lg hover:bg-emerald-100 transition-colors duration-300 flex items-center justify-center group whitespace-nowrap shadow-lg">
                        <span>Đăng ký</span>
                        <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                    
                    <p className="text-emerald-200/60 text-sm mt-3">
                      Chúng tôi tôn trọng quyền riêng tư và sẽ không chia sẻ thông tin của bạn.
                    </p>
                  </div>
                  
                  <div className="md:w-1/2 flex justify-center md:justify-end">
                    <div className="relative">
                      {/* Animated envelope */}
                      <div className="w-48 h-48 bg-emerald-700 rounded-xl flex items-center justify-center transform transition-transform duration-500 hover:rotate-y-180 preserve-3d">
                        <div className="absolute inset-0 backface-hidden">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-full h-full p-8 text-white/40">
                            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                            <path d="M22 7l-10 5-10-5"></path>
                            <line x1="2" y1="7" x2="22" y2="7"></line>
                          </svg>
                        </div>
                        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-bold text-center p-6">
                          Cập nhật thường xuyên về thực phẩm lành mạnh!
                        </div>
                      </div>
                      
                      {/* Flying mail decoration */}
                      <div className="absolute -top-6 -right-6 transform rotate-12 animate-float-slow">
                        <svg width="40" height="40" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-emerald-300 opacity-70">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="absolute -bottom-4 -left-4 transform -rotate-12 animate-float-medium animation-delay-1000">
                        <svg width="30" height="30" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-emerald-300 opacity-70">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealList;
