import TableRow from "./TableRow";
import { useState } from "react";

const Table = ({brawlers, events, brawlerStats}) => {
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
        <tr className="brawler-info">
          <th>Brawler</th>
          <th>Rarity</th>
          <th>Abilities</th>
          <th>
            <div className="select-container">
              <span>Win Rate</span>
              <select name="gamemodes" onChange={handleGameModeChange}>
                  <option value="Default">
                    Select a Game Mode
                  </option>
                {events.map((event) => (
                  <option value={event.event} key={event.id}>
                    {event.event}
                  </option>
                ))}
              </select>
            </div>
          </th>
        </tr>
      </thead>

      <tbody>
        {rows}
      </tbody>
    </table>
  );
}
 
export default Table;