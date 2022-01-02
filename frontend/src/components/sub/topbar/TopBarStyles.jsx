import styled from "styled-components";

export const TopBarStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--bs-secondary);
    border-bottom: 2px solid var(--bs-secondary-light);
    height: 60px;
    min-height: 60px;
    .top-bar-config {
        width: 60px;
        height: 100%;
        color: var(--bs-secondary-dark);
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid transparent;
        margin-left: 1rem;
        border-left: 2px solid var(--bs-secondary-light);
        border-bottom: 2px solid transparent;
        &:hover {
            border-bottom: 2px solid var(--bs-primary);
            color: var(--bs-primary);
            transition: 0.3s;
        }
        &.selected {
            border-bottom: 2px solid var(--bs-primary);
            color: var(--bs-primary);
        }
    }
    .top-bar-items-left {
        height: 100%;
        margin-right: auto;
        display: flex;
        overflow-x: auto;

        /* width */
        ::-webkit-scrollbar {
            height: 5px;
        }

        /* Track */
        ::-webkit-scrollbar-track {
            background: #f1f1f1;
        }

        /* Handle */
        ::-webkit-scrollbar-thumb {
            background: #888;
        }

        /* Handle on hover */
        ::-webkit-scrollbar-thumb:hover {
            background: #555;
        }

        .top-bar-item {
            height: 100%;
            display: flex;
            align-items: center;
            border-bottom: 2px solid transparent;
            margin-left: 1rem;
            cursor: pointer;
            &:hover {
                border-bottom: 2px solid var(--bs-primary);
            }
            &.selected {
                border-bottom: 2px solid var(--bs-primary);
                .icon {
                    color: var(--bs-primary);
                    transition: 0.3s;
                    cursor: pointer;
                }
            }
            .icon {
                width: 40px;
                height: 40px;
                background-color: var(--bs-light);
                color: var(--bs-secondary-dark);
                border-radius: 50%;
                padding: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid transparent;
                &:hover {
                    color: var(--bs-primary);
                    transition: 0.3s;
                    cursor: pointer;
                }
            }
        }
    }
    .top-bar-items {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .top-bar-item {
            cursor: pointer;
            height: 100%;
            display: flex;
            align-items: center;
            border-bottom: 2px solid transparent;
            margin-left: 1rem;
            &:hover {
                border-bottom: 2px solid var(--bs-primary);
                color: var(--bs-primary);
                .icon {
                    color: var(--bs-primary);
                    transition: 0.3s;
                    cursor: pointer;
                }
            }
            .currency-icon {
                width: 40px;
                height: 40px;
                background-color: var(--bs-light);
                color: var(--bs-secondary-dark);
                border-radius: 50%;
                padding: 0px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid transparent;
                &:hover {
                    color: var(--bs-primary);
                    transition: 0.3s;
                    cursor: pointer;
                }
            }
            .icon {
                width: 40px;
                height: 40px;
                background-color: var(--bs-light);
                color: var(--bs-secondary-dark);
                border-radius: 50%;
                padding: 10px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid transparent;
            }
        }
    }
`;
