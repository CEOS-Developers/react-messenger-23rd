import add_circle from '../../icons/icon_add_circle.svg';
import setting from '../../icons/icon_setting.svg';

export const MainChatHeader = ({ chatTitle }: { chatTitle: string }) => {
  return (
    <div className="flex w-full justify-between items-center h-11 px-4">
      <p className="text-title">{chatTitle}</p>
      <div className="flex flex-row gap-3">
        <img src={add_circle} alt="" className="w-6 h-6" />
        <img src={setting} className="w-6 h-6" />
      </div>
    </div>
  );
};
