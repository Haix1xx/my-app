"use client";
import User from "@/types/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ActivityState {
  user: User | null;
  activities: any[];
}

const initialState: ActivityState = {
  user: null,
  activities: [],
};

const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    addActivity: (state: ActivityState, action: PayloadAction<any>) => {
      state.activities.push(action.payload);
      console.log(state);
    },
    clearActivities: (state: ActivityState) => {
      state.activities = [];
    },
  },
});

export const { addActivity, clearActivities } = activitySlice.actions;

export default activitySlice.reducer;
