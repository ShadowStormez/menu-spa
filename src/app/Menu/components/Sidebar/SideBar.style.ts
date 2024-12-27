import styled from '@emotion/styled';

export const SideBarStyle = styled.div`
  .sidebar {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    direction: rtl;
    gap: 15px;
    position: fixed;
    padding: 10px 0;
    top: 0;
    right: -300px;
    width: 300px;
    height: 100%;
    background-color: #fff;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
    transition: right 0.3s ease;
    z-index: 1001;

    .close-button-container {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      direction: ltr;
      width: 100%;
      padding: 10px;
    }

    .user {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      direction: rtl;
      background: radial-gradient(circle at -1% 57.5%, #001a6e 0%, #074799 90%);
      width: 90%;
      padding: 10px;
      color: white;
      border-radius: 20px 0 0 20px;
    }

    .logout {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      direction: rtl;
      gap: 10px;
    }
  }

  .sidebar.open {
    right: 0;
  }

  /* Fullscreen on mobile */
  @media (max-width: 768px) {
    .sidebar {
      width: 100%;
    }
  }

  /* Overlay for dimming the rest of the screen */
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
  }

  /* Prevent scrolling when sidebar is open */
  body.sidebar-open {
    overflow: hidden;
  }
`;
