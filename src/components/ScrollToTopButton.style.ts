import styled from "@emotion/styled";

export const ScrollButton = styled.button<{ isVisible: boolean }>`
  position: fixed;
  bottom: 30px;
  left: 15px;
  width: 68px;
  height: 68px;
  background: linear-gradient(to right, #0284C7, #38BDF8);
  color: white;
  border: none;
  border-radius: 50%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  opacity: ${({ isVisible }) => (isVisible ? 1 : 0)};
  pointer-events: ${({ isVisible }) => (isVisible ? "auto" : "none")};
  transition: opacity 0.4s ease, transform 0.3s ease;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
  }

  svg {
    font-size: 20px;
  }
`;
