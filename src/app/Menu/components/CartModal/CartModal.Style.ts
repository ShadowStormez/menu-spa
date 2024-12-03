import styled from "@emotion/styled"
export const CartModalStyle=styled.div`
.buttons-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

  .cart-image-container {
    border-radius: 20px;
    height: 100px; /* Adjust as needed */
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;

    /* Additional styles if needed */
  }

  .MuiListItem-root {
    -webkit-box-shadow: 9px 9px 25px -3px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 9px 9px 25px -3px rgba(0, 0, 0, 0.75);
    box-shadow: 9px 9px 25px -3px rgba(0, 0, 0, 0.75);
  }
 

  @media (max-width: 550px) {
    .cart-image-container {
      flex-direction: column;
      align-items: flex-start;
    }
  }
`