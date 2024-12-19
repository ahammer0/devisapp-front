import "./atoms.scss";
const MenuBurgerIcon = ({
  isActive,
  toggle,
}: {
  isActive: boolean;
  toggle: () => void;
}) => {
  return (
    <div
      onClick={toggle}
      className={`menuBurgerButton container ${isActive ? "menuBurgerButton-active" : ""}`}
    >
      <div className="menuBurgerButton menuBurgerButton-item"></div>
      <div className="menuBurgerButton menuBurgerButton-item"></div>
      <div className="menuBurgerButton menuBurgerButton-item"></div>
    </div>
  );
};
export default MenuBurgerIcon;
