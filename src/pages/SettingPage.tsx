import LoadingSpinner from "@/components/Common/LoadingSpinner";

const SettingPage = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-5">
      <LoadingSpinner />
      <p className="font-body-3 text-gray-500">준비중이예요!</p>
    </div>
  );
};

export default SettingPage;
