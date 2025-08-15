import styled from "@emotion/styled";

/* 🌤️ Header container holds everything */
export const HeaderContainer = styled.header`
  position: relative;
  width: 100%;
  min-height: calc(var(--cloud-height) + var(--cloud-top-extra) + 40px); /* extra space for logo */
  overflow: visible;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 8px;
  
`;

/* ☁️ Cloud container with layout variables and animations */
export const Clouds = styled.div`
  /* Layout variables */
  --cloud-width: min(40vw, 320px);
  --overlap-ratio: 0.3333;
  --overlap: calc(var(--cloud-width) * var(--overlap-ratio));
  --meeting-left: calc(50% + (var(--overlap) / 2));
  --cloud-height: calc(var(--cloud-width) * 1.3);
  --cloud-top-extra: 24px;

  position: relative;
  width: 100%;
  height: calc(var(--cloud-height) + var(--cloud-top-extra));

  /* Animations */
  @keyframes slideInLeft {
    from {
      transform: translateX(-140%);
    }
    to {
      transform: translateX(0%);
    }
  }

  @keyframes slideInRight {
    from {
      transform: translateX(140%);
    }
    to {
      transform: translateX(0%);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

    @media (max-width: 480px) {
    --cloud-width: min(45vw, 360px); /* Bigger clouds on small screens */
    --cloud-top-extra: 32px;         /* Slightly more vertical space */
  }
`;

/* ⬅️ Left cloud */
export const CloudLeft = styled.div`
  position: absolute;
  top: var(--cloud-top-extra); /* slightly lower */
  left: calc(var(--meeting-left) - var(--cloud-width)); /* right edge meets meeting line */
  width: var(--cloud-width);
  transform: translateX(-140%);
  animation: slideInLeft 1.8s ease-out forwards;
  z-index: 0;

@media (max-width: 640px) {
  width: calc(var(--cloud-width) * 1.2);
  left: calc(var(--meeting-left) - calc(var(--cloud-width) * 1.2)); /* for CloudLeft */
}

`;

/* ➡️ Right cloud (overlaps and sits slightly higher) */
export const CloudRight = styled.div`
  position: absolute;
  top: calc(var(--cloud-top-extra) - 16px); /* slightly higher */
  left: calc(var(--meeting-left) - var(--overlap)); /* overlaps left cloud */
  width: var(--cloud-width);
  transform: translateX(140%);
  animation: slideInRight 1.8s ease-out forwards;
  z-index: 1;

@media (max-width: 640px) {
  width: calc(var(--cloud-width) * 1.2);
  left: calc(var(--meeting-left) - calc(var(--cloud-width) * 1.2 * var(--overlap-ratio))); /* updated overlap */
}

`;

/* 🎯 Logo centered above cloud overlap */
export const LogoWrap = styled.div`
  position: absolute;
  top: calc(var(--cloud-height) * 0.1); /* 10% down from cloud height */
  left: calc(var(--meeting-left) - (var(--overlap) / 2));
  transform: translateX(-50%);
  opacity: 0;
  animation: fadeIn 1.2s ease forwards;
  animation-delay: 1.9s;
  z-index: 2;

    @media (max-width: 480px) {
    transform: translateX(-50%) scale(1.2); /* Slight enlargement */
    top: calc(var(--cloud-height) * 0.2);
  }
`;
