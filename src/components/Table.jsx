import TableRow from "./TableRow";
import { useState } from "react";
import styles from "../styles/Table.module.css"

const List = ({brawlers, events, brawlerStats}) => {
  const [gameMode, setGameMode] = useState('');

  const handleGameModeChange = (event) => {
    setGameMode(event.target.value);
  }

  const rows = brawlers.map((brawler) => {

    const statsForGameMode = (gameMode) ? brawlerStats[brawler.name]?.[gameMode] : null;

    return (
      <TableRow 
        key={brawler.id} 
        brawler={brawler}
        winRate={statsForGameMode ? statsForGameMode.winRate + "%" : 'N/A'}
        useRate={statsForGameMode ? statsForGameMode.useRate + "%" : 'N/A'}
      />
      )
  })

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Brawler</th>
          <th>Rarity</th>
          <th>Abilities</th>
          <th>
            Win Rate
            <select name="gamemodes" id="" onChange={handleGameModeChange}>
                <option value="Default">
                  Select a Game Mode
                </option>
              {events.map((event) => (
                <option value={event.event}>
                  {event.event}
                </option>
              ))}
            </select>
          </th>
        </tr>
      </thead>

      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
 
export default List;