import styled from "@emotion/styled"
export const TablistStyle=styled.div`
/* TabList */
.tablist {
    background: white;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    direction: rtl;
    overflow-x: hidden;
    padding: 10px;
    transition: all 0.3s ease-in-out;
    width: 80%;
  border-radius: 30px;
  margin: 20px auto;
  }

  .tab {
    display: flex;
    align-items: center;
    justify-content: center;
    width:60px;
    height:60px;
    border-radius: 50%;
    transition: all 0.3s ease;
    background-color:#15803d;
    border: none;
    cursor: pointer;

    &.active {
    background-color:#22c55e;
      height: 105px;
      border-radius: 50px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items:center;
      padding:20px 0;
      .icon-container{
        background-color:white;
        border-radius:50%;
        min-height:50px;
      }
    }
    &:hover {
      background-color:#22c55e;
    }

    .icon-container {
      width: 50px;
      height: 50px;
      margin-bottom: 8px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .category-name {
      display: none;
      font-size: 14px;
      font-weight: bold;
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