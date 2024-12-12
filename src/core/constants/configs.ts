export const Config = {
  API_SERVER: process.env.NEXT_PUBLIC_API_SERVER || "http://localhost:4000/frontend-api",
  API_KEY_SECURE: process.env.NEXT_PUBLIC_API_SERVER || "",
  CDN_URL: process.env.CDN_URL || "https://res.cloudinary.com/dvxn12n91/image/upload/v1720879125/temp/images/",
  ADMIN_URL: process.env.CDN_URL || "http://localhost:4002",
};
