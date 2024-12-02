import styled from "@emotion/styled"
export const HomePageStyle=styled.div`
.HomeCards-Container{
  display:grid;
  grid-template-columns:1fr 1fr;
  margin:50px;
  gap:30px;
}
@media(max-width:550px){
    .HomeCards-Container{
      grid-template-columns:1fr;
    }
  }
`