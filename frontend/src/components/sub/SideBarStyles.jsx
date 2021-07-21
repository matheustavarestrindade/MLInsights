import styled from "styled-components";

export const SideBarStyled = styled.div`
    display: flex;
    flex-direction: column;
    ${(props) => props.active && "min-width: 300px;"}
    background-color: var(--bs-white);
    box-shadow: 1px 0px 12px var(--bs-primary);
    .sidebar-toggler {
        ${(props) => (props.active && "color: var(--bs-primary);") || "color: var(--bs-secondary-dark);"}
        padding: 1rem;
        margin-left: auto;
        background-color: var(--bs-secondary);
        border-radius: 12px;
        i,
        svg {
            font-size: 30px;
        }
    }
    .sidebar-items {
        margin-bottom: 0;
        margin-top: 0;
        padding-top: 3rem;
        height: 100%;
        .sidebar-item {
            list-style: none;
            display: flex;
            .icon {
                color: var(--bs-secondary-dark);
                &.selected {
                    color: var(--bs-primary);
                }
                padding-right: 1rem;
                i,
                svg {
                    font-size: 30px;
                }
            }
        }
    }
`;
