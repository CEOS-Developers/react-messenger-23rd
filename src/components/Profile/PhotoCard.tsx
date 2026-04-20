import StarIcon from "@/assets/icons/icon_star_regular.svg?react";

interface PhotoCardProps {
  src: string;
  showStar?: boolean;
  onClick?: () => void;
}

const PhotoCard = ({ src, showStar = false, onClick }: PhotoCardProps) => {
  return (
    <div
      className="rounded-4 relative h-34.5 w-28.25 cursor-pointer overflow-hidden bg-gray-100"
      onClick={onClick}
    >
      <img src={src} alt="" className="h-full w-full object-cover" />
      {showStar && (
        <div className="absolute top-1 right-1">
          <StarIcon className="size-6 text-white" />
        </div>
      )}
    </div>
  );
};

export default PhotoCard;
