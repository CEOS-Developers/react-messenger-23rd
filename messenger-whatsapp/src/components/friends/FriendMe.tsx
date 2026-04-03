import Me_Profile from "@/assets/profile_reverse.svg?react";

export default function FriendMe() {
  return (
    <div className="flex flex-row items-center gap-4 py-2.5 px-5.25">
      <Me_Profile className="w-12 h-12" />
      <div className="text-headline-2 text-gray-06">문수인</div>
    </div>
  );
}
