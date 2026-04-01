import { memo } from "react";

import { formatDisplayDate } from "@/utils/formatDate";

interface MessageDateProps {
  date: string | Date;
  format?: "short" | "long";
}

const MessageDate = ({ date, format = "short" }: MessageDateProps) => (
  <div className="rounded-100 inline-flex items-center justify-center bg-gray-200 px-2 py-0.5">
    <span className="font-caption-2 w-12 text-center text-gray-500">
      {formatDisplayDate(date, format)}
    </span>
  </div>
);

export default memo(MessageDate);
