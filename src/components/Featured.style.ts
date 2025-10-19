import styled from "@emotion/styled";

export const FeaturedContainer = styled.section`
  width: 90%;
  background: #F2994A;  /* fallback for old browsers */
background: -webkit-linear-gradient(to right, #F2C94C, #F2994A);  /* Chrome 10-25, Safari 5.1-6 */
background: linear-gradient(to right, #F2C94C, #F2994A); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  min-height: 200px;
  margin: 0 auto 30px;
  border-radius: 50px;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.5);
  padding: 40px;

  .swiper-button-prev,
  .swiper-button-next {
    color: white;
    font-weight: bold;
    transition: 0.3s;
    &:hover {
      color: #333;
    }
  }
`;

export const FeaturedHeader = styled.h2`
direction: rtl;
  font-size: 26px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
  color: #fff;
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`;

export const ItemImageWrap = styled.div<{ isFallback: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: flex-end;
  justify-content: center;

  .card {
    position: absolute;
    bottom: 15px;
    padding: 15px;
    width: 85%;
    border-radius: 20px;
    text-align: center;
    transition: transform 0.3s;

    &:hover {
      transform: translateY(-5px);
    }

    h3 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
      color: rgb(253, 224, 71)
          }

    }

`;
