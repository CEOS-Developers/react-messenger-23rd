import AirplaneIcon from "@/assets/icons/icon_airplane_fill.svg?react";

const SplashPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <main className="bg-splash relative flex h-203 w-93.75 flex-col items-center justify-center overflow-hidden shadow-md">
        <AirplaneIcon className="h-50 w-37" />
        <p className="text-5xl font-bold text-white">Telegram</p>
      </main>
    </div>
  );
};

export default SplashPage;
