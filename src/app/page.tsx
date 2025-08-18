"use client";

import { useState, useEffect } from "react";
import Menu from "./Menu/page";
import { LinearProgress } from "@mui/material";


export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsReady(true);
    }, 800); // adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ position: "relative" }}>
      {/* Loading screen */}
      {!isReady && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "#0284c7", // blue background
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <LinearProgress
            sx={{
              width: "100%",
              height: "4px",
              backgroundColor: "#60a5fa", // lighter blue track
              "& .MuiLinearProgress-bar": {
                backgroundColor: "#ffffff", // white progress bar
              },
            }}
          />
        </div>
      )}

      {/* Main content */}
      <div
        style={{
          opacity: isReady ? 1 : 0,
          transition: "opacity 0.4s ease-in-out",
        }}
      >
        <Menu />
      </div>
    </div>
  );
}
