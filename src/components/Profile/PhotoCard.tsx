import StarIcon from "@/assets/icons/star.svg?react";

interface PhotoCardProps {
  showStar?: boolean;
}

const PhotoCard = ({ showStar = false }: PhotoCardProps) => {
  return (
    <div className="rounded-4 relative h-34.5 w-28.25 bg-gray-100">
      {showStar && (
        <div className="absolute top-1 right-1">
          <StarIcon className="text-white" />
        </div>
      )}
    </div>
  );
};

export default PhotoCard;
