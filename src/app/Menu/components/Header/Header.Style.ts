import styled from "@emotion/styled"
export const HeaderStyle=styled.div`
position:absolute;
top:0;
z-index:1000;
width:100%;
height:3rem;
background: radial-gradient(circle at -1% 57.5%, #001A6E 0%, #074799 90%) no-repeat center center fixed;

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