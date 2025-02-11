import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import EmptyTemplate from "./EmptyTemplate";
import Nav from "../organisms/Nav";
import "./MainTemplate.scss";

const MainTemplate = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <EmptyTemplate>
      <Header />
      <div className="mainTemplate__container">
        <div className="navContainer">
          <Nav isActive={false} setIsActive={() => null} />
        </div>
        <main className={"mainTemplate__main" + " " + (className ?? "")}>
          {children}
        </main>
      </div>
      <Footer />
    </EmptyTemplate>
  );
};
export default MainTemplate;
