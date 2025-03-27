const Footer = () => {
  return (
    <div className="border-t border-emerald-800 pt-8 flex flex-col md:flex-row justify-between items-center">
      <p className="text-emerald-100 text-sm mb-4 md:mb-0">
        &copy; {new Date().getFullYear()} Healthy Food. Tất cả các quyền được bảo lưu.
      </p>
      
      <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm text-emerald-100">
        <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
        <a href="#" className="hover:text-white transition-colors">Điều khoản</a>
        <a href="#" className="hover:text-white transition-colors">Cookie</a>
      </div>
    </div>
  );
};

export default Footer;
