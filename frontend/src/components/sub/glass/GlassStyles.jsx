import styled from "styled-components";

export const GlassStyles = styled.div`
    background: rgba(255, 255, 255, 0.3);
    ${(props) => props.muted && `box-shadow: 0 2px 8px 0 rgba(31, 38, 135, 0.37);`}
    ${(props) => !props.muted && `box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);`}
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.18);
`;
