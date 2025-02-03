import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import EmptyTemplate from "./EmptyTemplate";
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
      <main className={"mainTemplate__main" + " " + className}>{children}</main>
      <Footer />
    </EmptyTemplate>
  );
};
export default MainTemplate;
