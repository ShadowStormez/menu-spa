import styled from "@emotion/styled"
export const MenuPageStyle=styled.div`

.hero-tablist-container {
  position: relative;
}
.menu-container {
  background: radial-gradient(circle at -1% 57.5%, rgb(19, 170, 82) 0%, rgb(0, 102, 43) 90%); 
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  text-align: end;
  gap: 40px;


}
.menu-item-image-wrapper{
 .FoodImage{
  position:relative;
  bottom:30px;
 }
}

.menu-category {
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 40px;
  width:100%
}

.menu-category h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
}

.menu-items {
  display: flex;
  flex-direction:row;
  justify-content:flex-start;
  direction:rtl;
  gap:20px;

  @media(max-width:870px){
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 50px;
}

@media(max-width:550px){
  grid-template-columns: 1fr;
}
}
`