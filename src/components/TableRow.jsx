import "../App.css"
import BrawlerModal from "./BrawlerPage";
import { useState } from "react";

const TableRow = ({brawler, brawlerStats, winRate, useRate}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  return (
    <>
      {isModalOpen && (
        <BrawlerModal
          brawler={brawler}
          brawlerStats={brawlerStats}
          closeModal={closeModal}
        />
      )}
      <tr className="brawler-info" onClick={openModal}>
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
      </tr>
    </>
  );
}
 
export default TableRow;