type ImageMessageGridProps = {
  imageUrls: string[];
};

function getGridConfig(count: number) {
  if (count <= 1) {
    return {
      containerWidth: 240,
      columns: 1,
      cellSize: 240,
      gap: 0,
    };
  }

  if (count <= 4) {
    return {
      containerWidth: 240,
      columns: 2,
      cellSize: 119,
      gap: 2,
    };
  }

  return {
    containerWidth: 236,
    columns: 3,
    cellSize: 77.3333,
    gap: 2,
  };
}

export default function ImageMessageGrid({
  imageUrls,
}: ImageMessageGridProps) {
  const count = imageUrls.length;
  const { containerWidth, columns, cellSize, gap } = getGridConfig(count);

  if (count === 1) {
    return (
      <div
        className="inline-flex max-h-[240px] max-w-[240px] items-end gap-[8px] overflow-hidden rounded-[16px]"
        style={{
          width: `${containerWidth}px`,
          height: `${cellSize}px`,
        }}
      >
        <img
          src={imageUrls[0]}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  const maxTiles = columns === 2 ? 4 : 9;
  const visibleImages =
    count > maxTiles ? imageUrls.slice(0, maxTiles - 1) : imageUrls.slice(0, maxTiles);

  const totalTiles = count > maxTiles ? maxTiles : count;

  return (
    <div
      className="flex items-start gap-[8px]"
      style={{
        width: `${containerWidth}px`,
        maxWidth: "240px",
        maxHeight: "240px",
      }}
    >
      <div
        className="flex flex-wrap content-start items-start"
        style={{
          width: `${containerWidth}px`,
          maxWidth: "240px",
          maxHeight: "240px",
          gap: `${gap}px`,
        }}
      >
        {Array.from({ length: totalTiles }).map((_, index) => {
          const isCountTile = count > maxTiles && index === maxTiles - 1;

          if (isCountTile) {
            return (
              <div
                key={`count-tile-${index}`}
                className="flex items-center justify-center rounded-[16px] bg-white text-[#191919]"
                style={{
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  boxShadow: "0 0 4.8px 0 rgba(255, 255, 255, 0.80)",
                  fontFamily:
                    '"Kakao Small Sans", "Apple SD Gothic Neo", "Noto Sans KR", sans-serif',
                  fontFeatureSettings: '"liga" off, "clig" off',
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  lineHeight: "160%",
                  letterSpacing: "-0.56px",
                }}
              >
                {count}장
              </div>
            );
          }

          const imageSrc = visibleImages[index];

          return (
            <div
              key={`image-tile-${index}`}
              className="overflow-hidden rounded-[16px]"
              style={{
                width: `${cellSize}px`,
                height: `${cellSize}px`,
              }}
            >
              <img
                src={imageSrc}
                alt=""
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}