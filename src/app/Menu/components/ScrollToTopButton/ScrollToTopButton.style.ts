import styled from "@emotion/styled"
export const ScrollToTopButtonStyle=styled.div`

.scroll-to-top-button {
    position: fixed; /* Fixed positioning */
    bottom: 24px; /* 1.5rem or 24px from the bottom */
    left: 24px; /* 1.5rem or 24px from the right */
    padding: 12px; /* Padding of 0.75rem or 12px */
    background-color:#fff; /* Blue color (equivalent to bg-blue-500) */
    color: white; /* White text color */
    border-radius: 9999px; /* Fully rounded corners (equivalent to rounded-full) */
    transition: opacity 0.3s ease; /* Smooth transition for opacity changes */
    opacity: 0; /* Initially hidden */
    display: none; /* Initially not displayed */
    z-index:1000;
}

.scroll-to-top-button.visible {
    opacity: 1; /* Fully visible when the class 'visible' is added */
    display: block; /* Display the button when visible */
}
`