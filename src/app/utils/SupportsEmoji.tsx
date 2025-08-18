import { useEffect, useState } from "react";

export default function EmojiChecker({ emoji }: { emoji: string }) {
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 20;
    canvas.height = 20;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.font = "18px sans-serif";
    ctx.fillText(emoji, 0, 0);

    const imageData = ctx.getImageData(0, 0, 20, 20).data;
    const supported = Array.from(imageData).some(channel => channel !== 0);
    setIsSupported(supported);
  }, [emoji]);

  return <div>{isSupported ? "✅ Supported" : "❌ Not Supported"}</div>;
}
