"use client";

import styled from "@emotion/styled";

/* 🌤️ Footer container holds everything */
export const FooterContainer = styled.footer`
  position: relative;
  width: 100%;
  height: auto; /* Explicit height to ensure space for the cloud */
  overflow: visible;
  margin-top: 40px; /* Space between content and footer */
  font-family: var(--font-vazirmatn);
`;

/* ☁️ Footer cloud with animation */
export const FooterCloud = styled.div<{ isVisible: boolean }>`
  /* Layout variables */
  --cloud-width: min(80vw, 500px);
  --cloud-height: calc(var(--cloud-width) * 0.5);
  
  position: fixed;
  bottom: ${({ isVisible }) => isVisible ? "100px" : "-100%"};
  left: 50%;
  width: var(--cloud-width);
  z-index: 10;
  transition: bottom 0.8s ease-out;
  transform: translateX(-50%); /* Center horizontally without flipping */
  
  /* Footer content styling */
  .footer-content {
    position: absolute;
    top: 55%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    text-align: center;
    color: #333;
    font-weight: 500;
    direction: rtl;
  }
  
  .footer-address, .footer-phone {
  margin: 5px 0;
  font-size: 16px;
  color: #6B7280;

      @media (max-width: 480px) {
    font-size: 14px; /* Adjust for smaller screens */
  }
}

.footer-address .highlight,
.footer-phone .highlight {
  font-size: 18px;
  font-weight: 700;
  background: linear-gradient(to right, #0284C7, #38BDF8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  display: inline-block;

    @media (max-width: 480px) {
    font-size: 16px; /* Adjust for smaller screens */
  }
}
 .phone-link {
  background: linear-gradient(to right, #0284C7, #38BDF8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent; /* fallback for other browsers */
  font-weight: bold;
  text-decoration: underline;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.phone-link:hover,
.phone-link:focus {
  opacity: 0.8;
  text-decoration: underline;
}

  
  
  .footer-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 10px;
  }
  
  .footer-icons a {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;