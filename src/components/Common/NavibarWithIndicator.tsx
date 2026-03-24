import HomeIndicator from "@/components/Common/HomeIndicator";
import Navibar from "@/components/Common/Navibar";

const NavibarWithIndicator = () => {
  return (
    <div className="flex w-full flex-col gap-2">
      <Navibar />
      <div className="pt-5.25 pb-2">
        <HomeIndicator />
      </div>
    </div>
  );
};

export default NavibarWithIndicator;
