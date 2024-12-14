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
    border-radius:8px;
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
      color:var(--primary-color);
      .arrow-icon{
    filter: invert(31%) sepia(99%) saturate(474%) hue-rotate(105deg) brightness(92%) contrast(86%);
  }
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
        width: 12rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
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
    background-color:green;
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

  /* Category-specific styles */
  .menu-item-category.vegetarian {
    background-color: #81c784; /* Light green */
  }

  .menu-item-category.chilly {
    background-color: #e57373; /* Light red */
  }

  .menu-item-category.non-vegan {
    background-color: #ffb74d; /* Light orange */
  }

  .menu-item-category.vegan {
    background-color: #64b5f6; /* Light blue */
  }
`