import styled from "@emotion/styled"
export const SideBarStyle=styled.div`
.sidebar {
    display:flex;
    flex-direction:column;
    justify-content:flex-start;
    align-items:flex-start;
    position: fixed;
    top: 0;
    right: -300px; /* Hide off-screen */
    width: 300px;
    height: 100%;
    background-color: #fff; /* Background color */
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
    transition: right 0.3s ease; /* Smooth transition */
    z-index: 1001; /* Ensure it's above other content */
}

.sidebar.open {
    right: 0; /* Show sidebar */
}

.close-btn {
    position: absolute;
    top: 20px;
    left: 20px;
}
`