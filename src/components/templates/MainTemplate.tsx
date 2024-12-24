import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import EmptyTemplate from "./EmptyTemplate";
import "./Template.scss";

const MainTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <EmptyTemplate>
      <Header />
      <main className="mainTemplate__main">{children}</main>
      <Footer />
    </EmptyTemplate>
  );
};
export default MainTemplate;
