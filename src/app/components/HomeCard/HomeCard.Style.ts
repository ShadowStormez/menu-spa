import styled from "@emotion/styled"
export const HomeCardStyle=styled.div`
.HomeCard-Container{
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height:300px;
  padding:10px;
  background-color:#fff;
  color:#000;
  border-radius:8px;
  -webkit-box-shadow: 9px 9px 25px -3px rgba(0,0,0,0.75);
  -moz-box-shadow: 9px 9px 25px -3px rgba(0,0,0,0.75);
  box-shadow: 9px 9px 25px -3px rgba(0,0,0,0.75);
  .HomeCard-Img{
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius:8px 8px 0 0;
  }
  .HomeCard-Content{
    display: flex;
    text-align:center;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .MuiButtonBase-root{
    background-color: #000;
  color: #fff;
  border-radius: 10px;
  font-family:'VazirMatn' ;
  }
}

`