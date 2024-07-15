"use client";

import { RootState } from "@/store";
import { useSelector } from "react-redux";

export default function Page() {
  const activity = useSelector((state: RootState) => state.activity);
  console.log(activity);
  return (
    <ul>
      {activity.activities.length > 0 &&
        activity.activities.map((act, index) => <li key={index}>{act}</li>)}
    </ul>
  );
}
