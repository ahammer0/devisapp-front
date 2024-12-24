import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import EmptyTemplate from "./EmptyTemplate";
import "./Template.scss";

const CenterCardTemplate = ({ children }: { children: React.ReactNode }) => {
  return (
    <EmptyTemplate>
      <Header />
      <main className="centerCardTemplate__main">{children}</main>
      <Footer />
    </EmptyTemplate>
  );
};
export default CenterCardTemplate;
