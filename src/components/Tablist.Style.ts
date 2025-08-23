import styled from "@emotion/styled";

export const TablistStyle = styled.div`
  margin-top: 16px;

  .tablist {
    position: sticky;
    top: 0;
    z-index: 100;
    background: linear-gradient(-45deg, #FDE047, #FEED8A, #C9A800);
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    justify-content: flex-start;
    direction: rtl;
    overflow-x: auto;
    padding:10px;
    transition: all 0.3s ease-in-out;
    width: 100%; /* ✅ full width to allow scrolling */
    border-radius: 50px;
    margin: 20px auto 24px auto;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    scrollbar-width: none;
    -ms-overflow-style: none;
    -webkit-overflow-scrolling: touch;
    white-space: nowrap;
    font-family: var(--font-vazirmatn);
    padding-inline: 20px; 
    scroll-padding-inline: 20px;
    mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
  -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);

  @media (max-width: 640px) {
    margin: 100px auto 50px auto;
  }
  }

  .tablist::-webkit-scrollbar {
    display: none;
  }

  .tab {
    direction: ltr;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
    flex: 0 0 auto; /* ✅ prevents shrinking, enables horizontal scroll */
    height: 60px;
    border-radius: 30px;
    transition: all 0.3s ease;
    background-color: #EAB308;
    border: none;
    cursor: pointer;
    padding: 0 5px;
    box-shadow: inset 0 4px 10px rgba(0,0,0,0.2);

    &:hover {
      background-color: #CA8A04;
    }

    .icon-container {
      width: min(50px, 120px);
      aspect-ratio: 1 / 1;
      border-radius: 50%;
      background-color: #CA8A04;
      display: flex;
      justify-content: center;
      align-items: center;
      box-shadow: inset 0 4px 10px rgba(0,0,0,0.2);
    }

    .category-name {
      display: block;
      font-size: 16px;
      font-weight: 500;
      text-align: center;
      color: white;
      margin: 0 4px;

      &.show {
        display: flex;
      }
    }
  }


  .tab.active {
    background-color: #CA8A04;
    flex-direction: column;
    height: auto;
    padding: 8px;
   width: clamp(60px, 60px, 60px);
    text-align: center;
    
    .icon-container {
      background-color: #FDE047;
    }
    
    .category-name {
      font-weight: 700;
      display: block;
      margin-top: 5px;
      white-space: normal; /* ✅ Allow wrapping */
      overflow-wrap: break-word;
      font-size: 16px; /* Optional: scale down for vertical layout */
    }
  }
  
`;



