"use client"
import styled from '@emotion/styled';

const MenuStyle = styled.div`
  background: #0284C7;

background: linear-gradient(
  180deg,
  #0284C7 0%,   /* dark at top */
  #38BDF8 100%  /* lighter at bottom */
);

background: -moz-linear-gradient(
  180deg,
  #0284C7 0%,
  #38BDF8 100%
);

background: -webkit-linear-gradient(
  180deg,
  #0284C7 0%,
  #38BDF8 100%
);

filter: progid:DXImageTransform.Microsoft.gradient(
  startColorstr="#0284C7",
  endColorstr="#38BDF8",
  GradientType=0
);

  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  position: relative;
  padding-bottom: 40px; /* Space for footer cloud */
  font-family: var(--font-vazirmatn);
  
  /* Ensure header at top and TabList sits below */
  & > header {
    flex: 0 0 auto;
  }
  & > *:nth-of-type(2) {
    margin-top: 12px;
  }
  
  /* Footer positioning */
  & > footer {
    margin-top: auto;
  }
`;

export default MenuStyle;