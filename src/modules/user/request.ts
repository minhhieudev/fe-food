import MSTFetch from "@/core/services/fetch";


export const UserRequest = {
  updateProfile: (body: any) => MSTFetch.post("/customer-auth/profile", body),  
};