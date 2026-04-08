import AddChatIcon from "@/assets/icons/add_chat.svg?react";

const CreateChatButton = () => {
  return (
    <div className="bg-gradation flex size-12.5 cursor-pointer items-center justify-center rounded-full">
      <AddChatIcon className="h-7.25 w-6.75" />
    </div>
  );
};

export default CreateChatButton;
