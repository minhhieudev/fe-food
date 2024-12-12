import MSTFetch from "@/core/services/fetch";

export const AuthRequest = {
  loginGoogle: (googleToken: string) => {
    return MSTFetch.post(`/customer-auth/google-login`, {
      token: googleToken,
    });
  },
  register(body: any) {
    return MSTFetch.post(`/customer-auth/register-client`, body);
  },
  checkOtp(body: any) {
    return MSTFetch.post(`/customer-auth/check-otp`, body);
  },
  checkBioLink: (body:any) => MSTFetch.post("customer-auth/check-bio-link", body),
  login(body: any) {
    return MSTFetch.post(`/customer-auth/login`, body);
  },
  update(body: any) {
    return MSTFetch.post(`/customer-auth/change-password`, body);
  },
  getMenuService() {
    return MSTFetch.get(`/customer/menu-services`);
  },
  sendMail(body: any) {
    return MSTFetch.post(`/customer-auth/send-otp-update-pass`, body);
  },
  verifyOtp(body: any) {
    return MSTFetch.post(`/customer-auth/verify-otp`, body);
  },
  updatePassword(body: any) {
    return MSTFetch.post(`/customer-auth/update-pass-by-otp`, body);
  },
  getApiKey() {
    return MSTFetch.post(`/customer-auth/refresh-api-key`);
  },
  getCurrentApiKey() {
    return MSTFetch.post(`/customer-auth/get-api-key`);
  },
  getClient(body: any) {
    return MSTFetch.post(`/customer-auth/client`, body);
  },
};
