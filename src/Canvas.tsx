import React, { useEffect, useRef } from "react";

interface ICanvasProps {}

const Canvas: React.FunctionComponent<ICanvasProps> = (props) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    context.fillStyle = "red";
    context.fillRect(0, 0, 100, 100);
    context.strokeRect(20, 20, 50, 50);
  }, []);

  return <canvas ref={canvasRef} className="w-full" />;
};

export default Canvas;
