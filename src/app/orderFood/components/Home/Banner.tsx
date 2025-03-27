import Image from "next/image";
import { MagnifyingGlassIcon, ArrowRightIcon, UserGroupIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import bannerImage from "../../../asset/images/image2.jpg";

interface BannerProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Banner = ({ searchTerm, onSearchChange }: BannerProps) => {
  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Ảnh nền - đã điều chỉnh độ sáng và contrast */}
      <div className="absolute inset-0 z-0">
        <Image 
          src={bannerImage} 
          alt="Healthy Food Banner" 
          className="w-full h-full object-cover brightness-75 contrast-105"
          priority
        />
      </div>

      {/* Gradient overlay - đã điều chỉnh độ trong suốt */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent">
        <div className="absolute inset-0 bg-black/5"></div>
      </div>

      {/* Floating food icons - đã điều chỉnh độ trong suốt */}
      <div className="absolute top-20 right-20 w-20 h-20 animate-float-slow opacity-30">
        <Image 
          src="https://www.svgrepo.com/show/396581/green-salad.svg" 
          alt="Salad" 
          width={80} 
          height={80} 
        />
      </div>
      <div className="absolute bottom-40 right-40 w-16 h-16 animate-float-medium opacity-20">
        <Image 
          src="https://www.svgrepo.com/show/395799/avocado.svg" 
          alt="Avocado" 
          width={64} 
          height={64} 
        />
      </div>
      <div className="absolute top-40 left-[80%] w-12 h-12 animate-float-fast opacity-15">
        <Image 
          src="https://www.svgrepo.com/show/980/broccoli.svg" 
          alt="Broccoli" 
          width={48} 
          height={48} 
        />
      </div>

      {/* Content - đã điều chỉnh lại text */}
      <div className="absolute inset-0 flex flex-col justify-center px-10 lg:px-20 z-10">
        <div className="animate-fade-in-up">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 max-w-2xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
              Khám phá ẩm thực lành mạnh
            </span>
            <span className="block mt-2 text-white/90">
              cho cuộc sống trọn vẹn
            </span>
          </h1>
          <p className="text-xl text-white/90 font-medium mb-8">
            Thực đơn đa dạng, chất lượng cao và được chế biến bởi các đầu bếp hàng đầu
          </p>
        </div>
        
        {/* Search bar - đã điều chỉnh độ trong suốt */}
        <div className="relative max-w-md">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-emerald-600" />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm món ăn yêu thích..."
            className="w-full pl-12 pr-12 py-4 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            value={searchTerm}
            onChange={onSearchChange}
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-emerald-500 hover:bg-emerald-600 text-white p-2 rounded-full transition-all duration-300">
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
        
        {/* Quick stats - đã điều chỉnh background */}
        <div className="flex gap-5 mt-8">
          <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center space-x-2">
            <UserGroupIcon className="w-5 h-5 text-white" />
            <div>
              <p className="text-white/90 text-sm">Khách hàng hài lòng</p>
              <p className="text-white font-bold text-xl">5,000+</p>
            </div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center space-x-2">
            <CheckBadgeIcon className="w-5 h-5 text-white" />
            <div>
              <p className="text-white/90 text-sm">Đánh giá 5 sao</p>
              <p className="text-white font-bold text-xl">98%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
