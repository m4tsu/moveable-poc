export const generateDummyImageUrl = (
  size: { width: number; height: number },
  option?: {
    bgColor?: string;
    textColor?: string;
  },
) => {
  const { width, height } = size;
  const { bgColor = "gray", textColor = "white" } = option ?? {};

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (context === null) throw new Error("Failed to get 2d context");
  context.fillStyle = bgColor;
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.fillStyle = textColor;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = `${width / 6}px sans-serif`;
  context.fillText(`${width}x${height}`, width / 2, height / 2);
  return canvas.toDataURL("image/jpeg", 0.75);
};
