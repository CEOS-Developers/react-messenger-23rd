import { cn } from "@/utils/cn";

export type ToggleTapType = "posts" | "saved";

interface ToggleTapProps {
  active: ToggleTapType;
  onToggle: (value: ToggleTapType) => void;
}

const ToggleTap = ({ active, onToggle }: ToggleTapProps) => {
  return (
    <div className="rounded-60 shadow-toggle inline-flex gap-1 bg-white p-1">
      <button
        onClick={() => onToggle("posts")}
        className={cn(
          "rounded-60 font-body-5 cursor-pointer px-2.5 py-1 transition-colors duration-400 ease-in-out",
          active === "posts" ? "bg-primary-100 text-primary-400" : "text-gray-500",
        )}
      >
        게시물
      </button>
      <button
        onClick={() => onToggle("saved")}
        className={cn(
          "rounded-60 font-body-5 cursor-pointer px-2.5 py-1 transition-colors duration-400 ease-in-out",
          active === "saved" ? "bg-primary-100 text-primary-400" : "text-gray-500",
        )}
      >
        보관된 게시글
      </button>
    </div>
  );
};

export default ToggleTap;
