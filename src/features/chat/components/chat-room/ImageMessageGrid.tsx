type ImageMessageGridProps = {
  imageUrls: string[];
};

function getChatImageAlt(index: number) {
  return `채팅 이미지 ${index + 1}`;
}

function renderSingleImage(imageUrl: string) {
  return (
    <div
      className="inline-flex max-h-[240px] max-w-[240px] items-end gap-[8px] overflow-hidden rounded-[8px]"
      style={{
        width: "240px",
        height: "240px",
      }}
    >
      <img
        src={imageUrl}
        alt={getChatImageAlt(0)}
        className="h-full w-full object-cover"
      />
    </div>
  );
}

function renderTwoGrid(imageUrls: string[]) {
  const count = imageUrls.length;
  const cellSize = 119;

  if (count === 2) {
    return (
      <div className="flex w-[240px] max-w-[240px] items-start gap-[2px]">
        {imageUrls.map((src, index) => (
          <div
            key={`two-grid-${index}`}
            className="overflow-hidden rounded-[8px]"
            style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
          >
            <img
              src={src}
              alt={getChatImageAlt(index)}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  if (count === 3) {
    return (
      <div className="flex w-[240px] max-w-[240px] items-start gap-[2px]">
        <div
          className="overflow-hidden rounded-[8px]"
          style={{ width: `${cellSize}px`, height: "240px" }}
        >
          <img
            src={imageUrls[0]}
            alt={getChatImageAlt(0)}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col gap-[2px]">
          <div
            className="overflow-hidden rounded-[8px]"
            style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
          >
            <img
              src={imageUrls[1]}
              alt={getChatImageAlt(1)}
              className="h-full w-full object-cover"
            />
          </div>
          <div
            className="overflow-hidden rounded-[8px]"
            style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
          >
            <img
              src={imageUrls[2]}
              alt={getChatImageAlt(2)}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex w-[240px] max-w-[240px] flex-wrap gap-[2px]">
      {imageUrls.slice(0, 4).map((src, index) => (
        <div
          key={`four-grid-${index}`}
          className="overflow-hidden rounded-[8px]"
          style={{ width: `${cellSize}px`, height: `${cellSize}px` }}
        >
          <img
            src={src}
            alt={getChatImageAlt(index)}
            className="h-full w-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}

function renderThreeGrid(imageUrls: string[]) {
  const count = imageUrls.length;
  const maxTiles = 9;
  const displayCount = Math.min(count, maxTiles);

  const columns = 6;
  const gap = 2;
  const containerWidth = 236;
  const colWidth = (containerWidth - gap * (columns - 1)) / columns;

  const getSpan = (index: number) => {
    const visibleCount = displayCount;
    const remainder = visibleCount % 3;

    if (visibleCount <= 6) {
      if (remainder === 2 && index >= 3) return 3;
      if (remainder === 1 && index >= 3) return 6;
    }

    if (visibleCount > 6) {
      if (remainder === 2 && index >= 6) return 3;
      if (remainder === 1 && index >= 6) return 6;
    }

    return 2;
  };

  const getTileWidth = (span: number) => colWidth * span + gap * (span - 1);

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
        className="grid"
        style={{
          width: `${containerWidth}px`,
          maxWidth: "240px",
          maxHeight: "240px",
          gridTemplateColumns: `repeat(${columns}, ${colWidth}px)`,
          gap: `${gap}px`,
        }}
      >
        {Array.from({ length: displayCount }).map((_, index) => {
          const isCountTile = count > maxTiles && index === maxTiles - 1;
          const span = isCountTile ? 2 : getSpan(index);
          const tileWidth = getTileWidth(span);

          if (isCountTile) {
            return (
              <div
                key={`count-tile-${index}`}
                className="relative overflow-hidden rounded-[8px] shadow-[0_0_4.8px_0_rgba(255,255,255,0.80)]"
                style={{
                  width: `${tileWidth}px`,
                  height: `${colWidth * 2 + gap}px`,
                  gridColumn: `span ${span}`,
                }}
              >
                <img
                  src={imageUrls[index]}
                  alt={getChatImageAlt(index)}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-[#FFFFFFBF]" />
                <div className="typo-label absolute inset-0 flex items-center justify-center text-chat-black">
                  {count}장
                </div>
              </div>
            );
          }

          return (
            <div
              key={`image-tile-${index}`}
              className="overflow-hidden rounded-[8px]"
              style={{
                width: `${tileWidth}px`,
                height: `${colWidth * 2 + gap}px`,
                gridColumn: `span ${span}`,
              }}
            >
              <img
                src={imageUrls[index]}
                alt={getChatImageAlt(index)}
                className="h-full w-full object-cover"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ImageMessageGrid({
  imageUrls,
}: ImageMessageGridProps) {
  const count = imageUrls.length;

  if (count === 0) return null;
  if (count === 1) return renderSingleImage(imageUrls[0]);
  if (count <= 4) return renderTwoGrid(imageUrls);

  return renderThreeGrid(imageUrls);
}
