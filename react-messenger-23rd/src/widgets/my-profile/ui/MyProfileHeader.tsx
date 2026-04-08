import qrCodeIcon from '@/shared/assets/icons/my-profile/qr-code(28_28).svg';

const MyProfileHeader = () => {
  return (
    <header className="flex items-center justify-between px-4 py-5">
      <h1 className="Heading01SB text-gray-90">내 프로필</h1>

      <button type="button" className="flex items-center justify-center">
        <img src={qrCodeIcon} alt="내 프로필 큐알" className="h-7 w-7" />
      </button>
    </header>
  );
};

export default MyProfileHeader;
