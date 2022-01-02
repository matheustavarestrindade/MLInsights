import styled from "styled-components";

const ICONS_SIZE_PX = "18px";

export const SideBarStyled = styled.div`
    display: flex;
    flex-direction: column;
    ${(props) => props.active && "min-width: 300px; max-width: 300px;"}
    ${(props) => !props.active && "min-width: 50px; max-width: 50px;"}
    transition: 0.3s;

    background-color: var(--bs-white);
    border-right: 2px solid var(--bs-secondary-light);
    .sidebar-dropdown {
        width: 100%;
        background-color: var(--bs-secondary-light);
    }
    .sidebar-toggler {
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--bs-white);
        height: 60px;
        min-height: 60px;
        .title {
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0;
            margin-left: 2rem;
            transition: 0.3s;

            ${(props) => !props.active && "width: 0px; overflow: hidden; margin: 0 !important;"}
            p {
                color: var(--bs-secondary-dark);
                margin: 0;
                font-size: 1.25rem;
            }
        }
        .icon {
            padding: 0.5rem;
            color: var(--bs-secondary-dark);
            margin-left: auto;
            ${(props) => !props.active && "margin: 0;"}

            &:hover {
                cursor: pointer;
                color: var(--bs-dark);
                transition: 0.3s;
            }
            i,
            svg {
                font-size: ${ICONS_SIZE_PX};
            }
        }
    }
    .sidebar-items {
        margin-bottom: 0;
        margin-top: 0;
        padding: 0;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;

        .sidebar-item {
            transition: 0.3s;
            width: 100%;
            border-left: 5px solid var(--bs-secondary-dark);
            list-style: none;
            display: flex;
            align-items: center;
            padding: 0.5rem 1rem;
            padding-left: 1rem;
            text-decoration: none;

            &.online {
                .icon {
                    color: var(--bs-success);
                }
            }

            &.offline {
                .icon {
                    color: var(--bs-danger);
                }
            }

            &:hover {
                border-left: 5px solid var(--bs-primary);
                transition: 0.3s;
                cursor: pointer;
                background-color: var(--bs-secondary);
                .icon,
                .description {
                    color: var(--bs-primary);
                }
            }

            &.title {
                font-size: 0.9rem;
                font-weight: bold;
                border: 0px;
                padding: 0;
                margin: 0;
                padding-top: 1rem;
                color: var(--bs-secondary-dark);
                padding-left: 1rem;
                ${(props) => !props.active && "width: 0px; height: 0; overflow: hidden; margin: 0; padding: 0px;"}
                &:hover {
                    border-right: 0;
                    transition: 0;
                    cursor: default;
                    background-color: transparent;
                }
                p {
                    margin: 0;
                    margin-bottom: 0.3rem;
                }
            }

            color: var(--bs-secondary-dark);
            .description {
                padding-left: 1rem;
                transition: 0.3s;
                ${(props) => !props.active && "width: 0px;height: 0px; overflow: hidden; margin: 0; padding: 0px;"}
            }
            ${(props) => !props.active && "border-right: 0px !important; padding: 0;"}

            &.selected {
                color: var(--bs-primary) !important;
                border-left: 5px solid var(--bs-primary);
                transition: 0.3s;
                cursor: pointer;
                background-color: var(--bs-secondary);
                .icon {
                    color: var(--bs-primary);
                }
            }

            .icon {
                color: var(--bs-secondary-dark);
                width: 30px;
                display: flex;
                align-items: center;
                justify-content: center;

                ${(props) => !props.active && "padding: 1rem; max-width: 100%;width: auto;"}

                i,
                svg {
                    font-size: ${ICONS_SIZE_PX};
                }
            }
        }
    }
`;
