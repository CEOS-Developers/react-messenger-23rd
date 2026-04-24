import { memo } from "react";

import { cn } from "@/utils/cn";

export type ToggleTapType = "posts" | "saved";

interface ToggleTapProps {
  active: ToggleTapType;
  onToggle: (value: ToggleTapType) => void;
}

const TABS: { value: ToggleTapType; label: string }[] = [
  { value: "posts", label: "게시물" },
  { value: "saved", label: "보관된 게시글" },
];

const ToggleTap = ({ active, onToggle }: ToggleTapProps) => (
  <div className="rounded-60 shadow-toggle inline-flex gap-1 bg-white p-1">
    {TABS.map(({ value, label }) => (
      <button
        key={value}
        onClick={() => onToggle(value)}
        className={cn(
          "rounded-60 font-body-5 cursor-pointer px-2.5 py-1 transition-colors duration-400 ease-in-out",
          active === value ? "bg-primary-100 text-primary-400" : "text-gray-500",
        )}
      >
        {label}
      </button>
    ))}
  </div>
);

export default memo(ToggleTap);
