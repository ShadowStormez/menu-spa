/** @jsxImportSource @emotion/react */
"use client";

import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export default function LoadingOverlay() {
  return (
    <>
      <TopBar />
      <SpinnerWrapper>
        <Spinner />
      </SpinnerWrapper>
    </>
  );
}

// Spinner animation
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Progress bar animation
const TopBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 4px;
  width: 100%;
  background: linear-gradient(to right, #0284c7, #38bdf8);
  animation: progress 1.5s ease-in-out infinite;

  @keyframes progress {
    0% {
      transform: translateX(-100%);
    }
    50% {
      transform: translateX(0%);
    }
    100% {
      transform: translateX(100%);
    }
  }

  z-index: 9999;
`;

const SpinnerWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9998;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 5px solid #e0e0e0;
  border-top: 5px solid #0284c7;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;
