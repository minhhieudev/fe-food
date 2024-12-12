import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileData {
  contact: {
    phoneNumber: string;
    address: string;
    email: string;
  };
  info: {
    firstName: string;
    lastName: string;
    gender: string;
  };
  onSuccess?: () => void;
}

const initialState = {
  profile: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateProfile: (state, action: PayloadAction<ProfileData>) => {
      // Saga sẽ xử lý action này
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const UserActions = userSlice.actions;
export default userSlice.reducer; 