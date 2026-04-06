import clsx from "clsx";

export type FilterType = "all" | "unread" | "group" | "favorites";

interface Chip {
  type: FilterType;
  label: string;
  badge?: number;
}

interface ChipFilterProps {
  active: FilterType;
  onChange: (type: FilterType) => void;
  unreadMessageCount: number;
  groupCount: number;
}

function formatBadge(n: number) {
  if (n > 300) return "300+";
  return String(n);
}

export default function ChipFilter({
  active,
  onChange,
  unreadMessageCount,
  groupCount,
}: ChipFilterProps) {
  const chips: Chip[] = [
    { type: "all", label: "모두" },
    { type: "unread", label: "읽지 않음", badge: unreadMessageCount },
    { type: "group", label: "그룹", badge: groupCount },
    { type: "favorites", label: "즐겨찾기" },
  ];

  return (
    <div className="flex gap-2.5 px-4 overflow-x-auto no-scrollbar">
      {chips.map(({ type, label, badge }) => {
        const isActive = active === type;
        return (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={clsx(
              "flex items-center gap-1.5 shrink-0 rounded-full border-1 border-gray-03 px-3.5 py-1.5 text-body-03 transition-colors",
              isActive
                ? "bg-main-green text-white"
                : "bg-white text-main-green",
            )}
          >
            {label}
            {badge != null && badge > 0 && (
              <span
                className={clsx(
                  "text-body-03 font-semibold",
                  isActive ? "text-white" : "text-main-green",
                )}
              >
                {formatBadge(badge)}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
