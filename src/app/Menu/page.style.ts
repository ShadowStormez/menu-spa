"use client"
import styled from '@emotion/styled';

const MenuStyle = styled.div`
  background: linear-gradient(to bottom, #0284C7 60%, #FACC15 100%);
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