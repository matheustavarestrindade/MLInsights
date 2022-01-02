import styled from "styled-components";

const EmployeeStyles = styled.div``;
const EmployeeCardStyles = styled.div`
    .collapse-button {
        cursor: pointer;
    }
    &:hover {
        .client-icon {
            background-color: var(--bs-secondary);
            color: var(--bs-primary);
        }
    }
    .client-icon {
        transition: 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        background-color: var(--bs-secondary);
        border-radius: 100%;
        color: var(--bs-secondary-dark);
        font-size: 0.8rem;
    }
`;

export { EmployeeCardStyles as ClientCardStyles };

export default EmployeeStyles;
