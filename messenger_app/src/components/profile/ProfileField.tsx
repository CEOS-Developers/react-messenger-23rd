
import arrow_left from '@/icons/icon_arrow_left.svg';

interface ProfileFieldProps {
  label?: string;
  value: string;
  isAction?: boolean;
}

export const ProfileField = ({ label, value, isAction }: ProfileFieldProps) => {
  return (
    <div className="flex flex-col px-4 mt-6">
      {label && (
        <label className="text-body-04 text-Gray600 ml-4 mb-1.5">{label}</label>
      )}

      <div className="self-stretch pl-4 py-2 bg-white rounded-lg inline-flex justify-between items-center cursor-pointer active:bg-gray-50">
        <div className="flex justify-start items-center gap-4">
          <div
            className={`justify-center text-body-02 ${isAction ? 'text-Purple' : ''}`}
          >
            {value}
          </div>
        </div>
        <img src={arrow_left} alt="이동" className="mx-3 w-4 h-4" />
      </div>
    </div>
  );
};