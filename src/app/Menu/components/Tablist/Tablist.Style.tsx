import styled from "@emotion/styled"
export const TablistStyle=styled.div`
/* TabList */
.tablist {
    background: white;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap:5px;
    align-items: center;
    direction: rtl;
    overflow-x:auto;
    padding: 5px 10px;
    transition: all 0.3s ease-in-out;
    width: 90%;
    border-radius: 30px;
    margin: 20px auto;
    overflow-x: auto;
    scrollbar-width: none; /* For Firefox */
    -ms-overflow-style: none; /* For Internet Explorer */
    .tablist::-webkit-scrollbar {
      display: none; /* Hide scrollbar for WebKit browsers */
    }
    }

  .tab {
    direction:ltr;
    display: flex;
    flex-direction:row;
    align-items: center;
    justify-content: space-between;
    gap:5px;
    width:fit-content;
    height:60px;
    border-radius: 30px;
    transition: all 0.3s ease;
    background-color:#15803d;
    border: none;
    cursor: pointer;
    padding:0 5px;

    &.active {
    background-color:#22c55e;
      width:60px;
      height: 100px;
      border-radius: 50px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items:center;
      .icon-container{
        width:50px;
        height:50px;
        background-color:#15803d;
      }
    }
    &:hover {
      background-color:#22c55e;
    }

    .icon-container {
      width:50px;
      height:50px;
      background-color:#22c55e;
      border-radius:50%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .category-name {
      display: block;
      font-size: 14px;
      font-weight: 500;
      text-align: center;
      color: white;

      &.show {
        display: flex;
      }
    }
  }

  .tablist.fixed {
    position: fixed;
    top: 0;
    left: 0;
    border-radius:0;
    margin:0;
    width: 100%;
    z-index: 100;
  }

`