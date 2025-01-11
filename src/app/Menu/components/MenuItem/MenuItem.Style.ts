import styled from "@emotion/styled"
export const MenuItemStyle=styled.div`
.menu-item {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    background-color:#fff;
    align-items: center;
    height: auto;
    border-radius:30px;
    -webkit-box-shadow: 9px 9px 25px -3px rgba(0,0,0,0.75);
-moz-box-shadow: 9px 9px 25px -3px rgba(0,0,0,0.75);
box-shadow: 9px 9px 25px -3px rgba(0,0,0,0.75);

    .menu-item-details-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width:100%;
    padding: 10px;
    margin-bottom:20px;

    .menu-item-details{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
    }
    .menu-item-links{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    a{
      display:flex;
      align-items:center;
      font-size:12px;
      color:var(--lightblue-color);
    }
    }

      .menu-item-text{
        width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 10px;
      padding: 10px;
      margin-bottom:20px;
        }

      h3 {
        font-size: 16px;
      }

      .description {
        font-size: 12px;
        color: gray;
        max-width: 200px;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
        height:35px;
        text-align:right;
      }
    }

    .price-container {
      background-color: var(--secondary-color);
      color:#fff;
      border-radius: 30px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      padding: 5px 15px;
      direction: ltr;
      width: fit-content;
      font-size: 14px;
    }
  }
  .white-space{
    background-color:#fff;
    position:absolute;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    border-radius:50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;

    .number-container{
      background: linear-gradient(360deg, rgba(13,146,244,1) 20%, rgba(7,71,153,1) 55%, rgba(0,26,110,1) 80%);
    border-radius:50%;
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;

    span{
      border-radius:50%;
      padding:2px 10px; 
      display:flex;
      align-items: center;
      color:#fff;
    }
    }
  }

  .MuiBadge-root {
    border-radius: 50%;
    padding: 8px;
    color: #fff; /* Default text color */
  }
`