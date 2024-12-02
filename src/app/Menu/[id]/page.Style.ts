import styled from "@emotion/styled"
export const MenuItemIdStyle=styled.div`
.Item-Container{
  position:relative;
  .image-container {
  position: relative;
  width: 100%;
  height: 600px;
}

@media (max-width: 550px) {
  .image-container {
    height: 400px;
  }
}
  .cartFixed{
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: 50px;
    height: 50px;
    background-color:#15803d; 
    border-radius: 50%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    .MuiBadge-badge{
      background-color:#22c55e;
    }
  }
}
    .menu-item-details-container {
    direction:rtl;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    width:100%;
    padding: 10px;
    background-color:#fff;

    .menu-item-details{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: baseline;
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
        font-size: 18px;
      }

      .description {
        font-size: 14px;
        color: gray;
        text-align:right;
      }
    }
    .price-container {
      background-color: #22c55e;
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
      margin-bottom:20px;
    }

    .image-container{
      @media(max-width:550px){
      height:300px;
    }
  }
    .MuiBadge-root {
    border-radius: 50%;
    padding: 8px;
    color: #fff; /* Default text color */
  }
  .MuiButtonGroup-root{
    width: 50%;
    margin: 0 auto;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    gap: 20px;

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