// SideBar.style.ts
import styled from "@emotion/styled";

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
    right: -300px; /* Hide off-screen */
    width: 300px;
    height: 100%;
    background-color: #fff; /* Background color */
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
    transition: right 0.3s ease; /* Smooth transition */
    z-index: 1001; /* Ensure it's above other content */

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
        background: radial-gradient(circle at -1% 57.5%, #001A6E 0%, #074799 90%) no-repeat center center fixed; 
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

        .loader {
            width: 60px;
            aspect-ratio: 2; /* Maintain aspect ratio */
            --_g: no-repeat radial-gradient(circle closest-side,var(--lightblue-color) 90%,#0000);
            background:
                var(--_g) 0%   50%,
                var(--_g) 50%  50%,
                var(--_g) 100% 50%;
            background-size: calc(100%/3) 50%;
            animation: l3 1s infinite linear;
        }

        @keyframes l3 {
            20% { background-position:0%   0%, 50%   50%,100%   50%; }
            40% { background-position:0%   100%,50%   0%,100%   50%; }
            60% { background-position:0%   50%,50%   100%,100%   0%; }
            80% { background-position:0%   50%,50%   50%,100%   100%; }
        }
    }
}

.sidebar.open {
    right: 0; /* Show sidebar */
}
`;
