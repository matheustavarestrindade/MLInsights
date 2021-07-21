import { useUser } from "../provider/UserProvider";
import SideBar from "./sub/SideBar";
import styled from "styled-components";
const PageLayout = ({ children }) => {
    const user = useUser();

    return (
        <PageLayoutStyles className="bg-secondary">
            <SideBar />
            <MainPageLayoutStyle>
                <div className="container">{children}</div>
            </MainPageLayoutStyle>
        </PageLayoutStyles>
    );
};

const MainPageLayoutStyle = styled.div`
    min-width: 100%;
`;

const PageLayoutStyles = styled.div`
    width: 100vw;
    height: 100vh;
    max-width: 100vw;
    max-height: 100vh;
    overflow: hidden;
    display: flex;
`;

export default PageLayout;
