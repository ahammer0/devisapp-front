import "./colorPalette.scss";

const ColorPalette = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-wrap">
        <div className="testDiv bg-primary">primary</div>
        <div className="testDiv bg-secondary">secondary</div>
        <div className="testDiv bg-danger">danger</div>
        <div className="testDiv bg-light">light</div>
        <div className="testDiv bg-dark">dark</div>
        <div className="testDiv bg-bgDark">bgDark</div>
        <div className="testDiv bg-bgLight">bgLight</div>
      </div>
      <div>
        <p className="text-primary bg-bgLight">primary</p>
        <p className="text-secondary">secondary</p>
        <p className="text-danger">danger</p>
        <p className="text-light">light</p>
        <p className="text-dark">dark</p>
        <p className="text-textDark">textDark</p>
        <p className="text-textLight bg-bgDark">textLight</p>
      </div>
      <h1>titre H1</h1>
      <h2>titre H2</h2>
      <h3>titre H3</h3>
      <h4>titre H4</h4>
    </div>
  );
};
export default ColorPalette;
