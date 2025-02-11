import "./MenuBurgerIcon.scss";

const MenuBurgerIcon = ({
  isActive,
  toggle,
}: {
  isActive: boolean;
  toggle: () => void;
}) => {
  function handleToggle(e: React.BaseSyntheticEvent) {
    e.stopPropagation();
    toggle();
  }
  return (
    <div
      onClick={handleToggle}
      className={`menuBurgerButton container ${isActive ? "menuBurgerButton-active" : ""}`}
    >
      <div className="menuBurgerButton menuBurgerButton-item"></div>
      <div className="menuBurgerButton menuBurgerButton-item"></div>
      <div className="menuBurgerButton menuBurgerButton-item"></div>
    </div>
  );
};
export default MenuBurgerIcon;
