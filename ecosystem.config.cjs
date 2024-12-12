module.exports = {
    apps: [
      {
        name: "fronend",
        script: "yarn",
        args: "run start",
        // Các tùy chọn khác của PM2, ví dụ:
        instances: 1, // Số lượng instance để chạy
        autorestart: true, // Tự động khởi động lại khi lỗi
        watch: false, // Không cần theo dõi file thay đổi
        max_memory_restart: "4G",
        env: {
          NODE_ENV: "development",
          SC_TOOL_ENV: "dev",
          PORT: 4000,
        },
        env_production: {
          NODE_ENV: "production",
          SC_TOOL_ENV: "product",
          PORT: 4000,
        },
      },
    ],
  };
  