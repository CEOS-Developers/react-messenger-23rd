import { memo } from "react";

import Profile from "@/components/Common/Profile";
import { cn } from "@/utils/cn";
import { getSurname } from "@/utils/getName";

interface ContactListItemProps {
  name: string;
  profileColor: string;
  lastSeen: string;
  surnameDisplay?: "show" | "hidden" | "none";
  onClick?: () => void;
}

const ContactListItem = ({
  name,
  profileColor,
  lastSeen,
  surnameDisplay = "show",
  onClick,
}: ContactListItemProps) => {
  return (
    <div className="flex cursor-pointer items-center gap-3 p-4" onClick={onClick}>
      {surnameDisplay !== "none" && (
        <span
          className={cn(
            "font-body-5 rounded-4 bg-gray-100 px-1.5 py-0.5 text-gray-400",
            surnameDisplay === "hidden" && "invisible",
          )}
        >
          {getSurname(name)}
        </span>
      )}
      <Profile name={name} profileColor={profileColor} type="chatlist_1" />
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="font-body-1 text-black">{name}</span>
        <span className="font-body-6 text-gray-500">{lastSeen}</span>
      </div>
    </div>
  );
};

export default memo(ContactListItem);
