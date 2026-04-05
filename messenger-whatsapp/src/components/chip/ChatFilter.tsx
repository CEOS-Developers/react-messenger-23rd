interface ChatFilterProps {
  type?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export default function ChatFilter({ type, value, onChange }: ChatFilterProps) {
  return <div className="flex gap-2 px-4 py-2">{value} </div>;
}
