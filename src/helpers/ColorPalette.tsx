import "./colorPalette.scss";

const ColorPalette = () => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row flex-wrap">
        <div className="testDiv bg-primary">primary</div>
        <div className="testDiv bg-secondary">secondary</div>
        <div className="testDiv bg-danger">danger</div>
        <div className="testDiv bg-light">light</div>
        <div className="testDiv bg-dark text-textLight">dark</div>
        <div className="testDiv bg-bgDark text-textLight">bgDark</div>
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
      <div>
        <h1>titre H1</h1>
        <h2>titre H2</h2>
        <h3>titre H3</h3>
        <h4>titre H4</h4>
        <p className="font-poppins">font poppins</p>
        <p className="font-bungee">font bungee</p>
        <div className="btn btn-primary">btn-primary</div>
        <div className="btn btn-secondary">btn-secondary</div>
        <div className="btn btn-danger">btn-danger</div>
        <div className="btn btn-primary btn-outline">btn-primary outline</div>
        <div className="btn btn-secondary btn-outline">
          btn-secondary outline
        </div>
        <div className="btn btn-danger btn-outline">btn-danger outline</div>
        <div className="btn btn-primary btn-cta">btn-primary cta</div>
        <div className="btn btn-secondary btn-cta">btn-secondary cta</div>
      </div>
      <form action="">
        <label htmlFor="monChamp">label du champ</label>
        <input type="text" name="monChamp" id="monChamp"/>
        <button type="submit" className="btn btn-primary">
          submit
        </button>
      </form>
      <div className="flex flex-row" style={{justifyContent:"center"}}>
        <div className="card" style={{width: "300px"}}>
        Ipsum animi ipsum esse corrupti voluptas? Voluptate a ossimus sint nemo rerum
        </div>
        <div className="card" style={{width: "300px"}}>
        Ipsum animi ipsum esse corrupti voluptas? Voluptate a ossimus sint nemo rerum
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>#id</th>
            <th>titrre</th>
            <th>nomtitrree</th>
            <th>nomtitrre</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>tatat</td>
            <td>naursituiui</td>
            <td>ndtluirst</td>
          </tr>
          <tr>
            <td>2</td>
            <td>tatat</td>
            <td>naursituiui</td>
            <td>ndtluirst</td>
          </tr>
          <tr>
            <td>3</td>
            <td>tatat</td>
            <td>naursituiui</td>
            <td>ndtluirst</td>
          </tr>
          <tr>
            <td>3</td>
            <td>tatat</td>
            <td>naursituiui</td>
            <td>ndtluirst</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
export default ColorPalette;
