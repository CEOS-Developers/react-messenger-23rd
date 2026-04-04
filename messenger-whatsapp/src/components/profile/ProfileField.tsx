import RightArrow from "@/assets/profile_link.svg?react";

interface ProfileFieldProps {
  label?: string;
  value: string;
  isEditing?: boolean;
  onChange?: (value: string) => void;
  href?: string;
  placeholder?: string;
}

export default function ProfileField({
  label,
  value,
  isEditing,
  onChange,
  href,
  placeholder,
}: ProfileFieldProps) {
  return (
    <div className="flex flex-col gap-1.5 px-4">
      {label && <span className="text-body-03 text-gray-04">{label}</span>}
      <div className="flex items-center justify-between bg-gray-01 rounded-md px-4 py-3.5">
        {isEditing ? (
          <input
            className="flex-1 bg-transparent text-body-03 text-gray-06 outline-none"
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            placeholder={placeholder ?? `${label ?? ""}을(를) 입력해주세요`}
          />
        ) : (
          <span className="text-body-03 text-gray-06">
            {value ? value : `${label || "정보"}가 없습니다`}
          </span>
        )}
        {href && !isEditing && (
          <a href={href} target="_blank" rel="noopener noreferrer">
            <RightArrow className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
