import SideBar from "./sub/sidebar/SideBar";
import styled from "styled-components";
import TopBar from "./sub/topbar/TopBar";
import { useEffect, useState } from "react";
import { Popover } from "bootstrap";
import Loader from "./sub/Loader";
const PageLayout = ({ children, pageTitle = "title", pageSubTitle = "", loaded }) => {
    const [sidebarActive, setSidebarActive] = useState(true);
    useEffect(() => {
        var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
        popoverTriggerList.map(function (popoverTriggerEl) {
            return new Popover(popoverTriggerEl);
        });
    }, []);

    return (
        <PageLayoutStyles className="bg-secondary">
            <SideBar onActive={setSidebarActive} />
            <MainPageLayoutStyle sidebarActive={sidebarActive}>
                <TopBar />
                <div className="scrollable">
                    <div className="container">
                        <div className="w-100 mb-2 d-flex align-items-start justify-content-center flex-column">
                            <h1 className="m-0">{pageTitle}</h1>
                            <h6 className="text-muted mt-auto mb-0">{pageSubTitle}</h6>
                            <hr className="w-100 mt-0" />
                        </div>
                        {loaded && children}
                        {!loaded && (
                            <div className="row">
                                <Loader />
                            </div>
                        )}
                    </div>
                </div>
            </MainPageLayoutStyle>
        </PageLayoutStyles>
    );
};

const MainPageLayoutStyle = styled.div`
    max-width: calc(100vw - ${(props) => (props.sidebarActive ? "300px" : "50px")});
    width: 100%;
    height: 100%;
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    .scrollable {
        max-width: 100%;
        padding-top: 3rem;
        padding-bottom: 6rem;
        /* width */
        ::-webkit-scrollbar {
            width: 10px;
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
        overflow-y: auto;
        max-heigth: 100%;
        .container {
            max-heigth: 100%;
            max-heigth: 100%;
            overflow-x: hidden;
        }
    }
`;

const PageLayoutStyles = styled.div`
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    display: flex;
    .title {
        display: flex;
        flex-direction: column;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid var(--bs-secondary-light);
    }
`;

export default PageLayout;
