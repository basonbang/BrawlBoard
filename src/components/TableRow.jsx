import "../App.css"
import { useState } from "react";
import { Link } from "react-router-dom";

const TableRow = ({brawler, brawlerStats, winRate, useRate}) => {


  return (
    <>
      <tr className="brawler-info" >
        <td className="brawler-icon-cell">
          <img src={brawler.icon} alt={brawler.name} />
          <p>{brawler.name}</p>
        </td>

        <td>{brawler.rarity}</td>

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
                <img src={gadget.imageUrl} height={25} />
                <p>{gadget.name}</p>
              </div>
            ))}
          </div>
        </td>

        <td>{winRate}</td>

        <td>
          <Link to={`/brawler/${brawler.id}`} state = {{brawler: brawler, brawlerStats: brawlerStats}}>
            <img className="search-icon" src="/magnifying-glass-hi.png" alt="" />
          </Link>
        </td>

      </tr>
    </>
  );
}
 
export default TableRow;