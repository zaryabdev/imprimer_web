import { Breadcrumb, Layout, Menu, theme } from "antd";
import "antd/dist/reset.css";

const { Header, Content, Footer } = Layout;

const App: React.FC = () => {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return <Layout className="layout"></Layout>;
};

export default App;
