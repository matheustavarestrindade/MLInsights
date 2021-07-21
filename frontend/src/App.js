import PageLayout from "./components/PageLayout";
import UserProvider from "./provider/UserProvider";
import bootstrap from "bootstrap";
import "./styles/Styles.scss";
const App = () => {
    return (
        <UserProvider>
            <PageLayout>
                <h1>Layout</h1>
            </PageLayout>
        </UserProvider>
    );
};

export default App;
