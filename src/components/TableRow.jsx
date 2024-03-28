const TableRow = ({brawler, winRate, useRate}) => {
  return (
    <tr className="brawler-info">
      <td>
        <img src={brawler.icon} alt={brawler.name} height={25} />
        <p>{brawler.name}</p>
      </td>
      <td>{brawler.rarity}</td>
      <td>
        {brawler.starPowers.map((starPower) => (
          <div>
            <img src={starPower.imageUrl} alt={starPower.name} height={25} />
            <p>{starPower.name}</p>
          </div>
        ))}
        {brawler.gadgets.map((gadget) => (
          <div>
            <img src={gadget.imageUrl} alt={gadget.name} height={25} />
            <p>{gadget.name}</p>
          </div>
        ))}
      </td>
      <td>
        {winRate} 
      </td>
    </tr>
  );
}
 
export default TableRow;