import "../App.css"

const TableRow = ({brawler, winRate, useRate}) => {
  return (
    <tr className="brawler-info">

      <td className="brawler-icon-cell">
        <img src={brawler.icon} alt={brawler.name} />
        <p>{brawler.name}</p>
      </td>

      <td>
        {brawler.rarity}
      </td>

      <td>
        <div className="abilities-container">
          {brawler.starPowers.map((starPower) => (
            <div className="ability" key={starPower.name}>
              <img src={starPower.imageUrl} height={25} />
              <p>{starPower.name}</p>
            </div>
          ))}
        </div>

        <div className="abilities-container">
          {brawler.gadgets.map((gadget) => (
            <div className="ability" key={gadget.name}>
              <img src={gadget.imageUrl}  height={25} />
              <p>{gadget.name}</p>
            </div>
          ))}
        </div>
      </td>

      <td>
        {winRate} 
      </td>
    </tr>
  );
}
 
export default TableRow;