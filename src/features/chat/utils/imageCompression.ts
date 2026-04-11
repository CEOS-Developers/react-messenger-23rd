function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("이미지를 읽는 데 실패했습니다."));
    reader.readAsDataURL(file);
  });
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("이미지를 불러오는 데 실패했습니다."));
    image.src = src;
  });
}

async function compressImage(
  file: File,
  maxSize = 1200,
  quality = 0.82
): Promise<string> {
  const dataUrl = await fileToDataUrl(file);
  const image = await loadImage(dataUrl);

  const ratio = Math.min(1, maxSize / Math.max(image.width, image.height));
  const targetWidth = Math.max(1, Math.round(image.width * ratio));
  const targetHeight = Math.max(1, Math.round(image.height * ratio));

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const context = canvas.getContext("2d");
  if (!context) return dataUrl;

  context.drawImage(image, 0, 0, targetWidth, targetHeight);

  return canvas.toDataURL("image/jpeg", quality);
}

export function compressImageFiles(files: File[]): Promise<string[]> {
  return Promise.all(files.map((file) => compressImage(file)));
}
