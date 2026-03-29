import userIcon from "@/assets/icons/user-chat.svg";

interface AvatarProps {
  src?: string;
  name: string;
  size?: "sm" | "md";
}

export default function Avatar({ src, name, size = "md" }: AvatarProps) {
  const sizeClass = size === "sm" ? "w-8 h-8" : "w-11 h-11";

  return (
    <img
      src={src || userIcon}
      alt={name}
      className={`${sizeClass} rounded-full object-cover shrink-0`}
    />
  );
}
