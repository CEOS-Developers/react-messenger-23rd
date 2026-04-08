import userData from '../../data/users.json';
import video from '../../icons/icon_video.svg';
import call from '../../icons/icon_callOff.svg';
import { imageMap } from '../../utils/imageMaps';

export const CallProfileList = () => {
  return (
    <div className="flex-1 overflow-y-auto pb-24">
      {userData.users.map((user) => {
        const actualImage = imageMap[user.profileKey] || imageMap['default'];
        return (
          <div
            key={user.id}
            className="w-full flex items-start gap-2.5 px-4 py-2.5"
          >
            <div className="w-full flex justify-between items-center self-stretch">
              <div className="flex items-center gap-3">
                <img src={actualImage} alt={user.name} className="w-16 h-16" />
                <span className="text-body-01">{user.name}</span>
              </div>
              <div className="flex flex-row gap-3">
                <img src={video} alt="Video Call" />
                <img src={call} alt="Voice Call" />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
