export default function supportsEmoji(emoji: string): boolean {
  const canvas = document.createElement("canvas");
  canvas.width = 20;
  canvas.height = 20;

  const ctx = canvas.getContext("2d");
  if (!ctx) return false;

  ctx.font = "18px sans-serif";
  ctx.fillText(emoji, 0, 0);

  const imageData = ctx.getImageData(0, 0, 20, 20).data;
  return Array.from(imageData).some(channel => channel !== 0);
}
