import styled from "styled-components";

export default function Overlay({ showLogout, setShowLogout }) {
    return (
        <OverlayLogout showLogout={showLogout} onClick={() => setShowLogout(false)}/>
    )
};

const OverlayLogout = styled.div`  
   background-color: rgba(0, 0, 0, 0.5);
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   z-index: 3;   
   display: ${props => props.showLogout ? "initial" : "none"};
`;