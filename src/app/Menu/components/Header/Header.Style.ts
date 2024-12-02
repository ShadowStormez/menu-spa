import styled from "@emotion/styled"
export const HeaderStyle=styled.div`
position:absolute;
top:0;
z-index:1000;
width:100%;
height:3rem;
background: radial-gradient(circle at -1% 57.5%, rgb(19, 170, 82) 0%, rgb(0, 102, 43) 90%); 

.header{
    width:100%;
    direction: rtl;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding: 10px;

    img{
        filter: brightness(1000%) saturate(1000%);
    }
}

`