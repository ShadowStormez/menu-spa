import styled from "@emotion/styled"
export const MenuHeroStyle=styled.div`
.header{
  direction: ltr;
  position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    background:transparent;
    
    .MuiBadge-badge{
      background-color:var(--secondary-color);
    }
    .user{
      display:flex;
      flex-direction:row;
      justify-content:center;
      align-items:center;
      gap:5px;
      direction:rtl;
      border-radius:50px;
      color:white;
      padding:10px;
    }
}
.hero-container {
  position: relative;
  height: 50vh;
  width: 100%;
  overflow: hidden;
}
.background-layer {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-size: cover;
  background-repeat:no-repeat;
  background-position: center;
  filter: blur(2px);
  z-index: 1; 
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.hero-title {
  font-size: 4rem;
  font-weight: 600;
  margin: 0;

  span{
    color:var(--primary-color);
  }
}

.animated-text {
  position: absolute;
  bottom: 20px;
  left: 20px;
  font-size: 1.2rem;
  color: white;
  opacity: 0;
  animation: fadeIn 3s forwards;

  span{
    color:var(--secondary-color);
  }
}

/* Fade-in animation */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

`