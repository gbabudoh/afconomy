"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationCenter() {
  const [unseenCount] = useState(0);

  return (
    <div className="relative hover:scale-110 transition-all cursor-pointer">
      <Bell className="h-5 w-5 text-black/50" strokeWidth={1.75} />
      {unseenCount > 0 && (
        <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-white text-[9px] font-black flex items-center justify-center">
          {unseenCount > 9 ? "9+" : unseenCount}
        </span>
      )}
    </div>
  );
}
