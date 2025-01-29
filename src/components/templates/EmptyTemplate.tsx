import "./EmptyTemplate.scss";
const EmptyTemplate = ({ children }: { children: React.ReactNode }) => {
  return <div className="emptyTemplate">{children}</div>;
};
export default EmptyTemplate;
