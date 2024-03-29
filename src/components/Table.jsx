import TableRow from "./TableRow";
import { useEffect, useState } from "react";

const Table = ({brawlers, events, brawlerStats, gameMode, handleGameModeChange}) => {

  const [inputtedBrawler, setInputtedBrawler] = useState("");

  const handleChange = (event) => {
    setInputtedBrawler(`${event.target.value}`);
  }

  
  let rows;
  // Create the rows containing all the brawler information
  if (inputtedBrawler !== "") {
    const filteredBrawlers = brawlers.filter((brawler) => brawler.name.includes(inputtedBrawler));

    rows = filteredBrawlers.map((brawler) => {
      const statsForGameMode = (gameMode) ? brawlerStats[brawler.name]?.[gameMode] : null;

      return (
        <TableRow 
          key={brawler.id}
          brawler={brawler}
          winRate={statsForGameMode ? statsForGameMode.winRate + "&" : 'N/A'}
          useRate={statsForGameMode ? statsForGameMode.useRate + "%" : 'N/A'}
        />
      )
    })
  } else {
    rows = brawlers.map((brawler) => {
  
      // Grab the every brawler's stats for the current selected gamemode
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
  }


  return (
    <div>
      <div className="filters">
        <div className="input-container">
          <span>Pick a Brawler!</span>
          <input
            type="text"
            id="filtered-brawler"
            placeholder="Type in a Brawler!"
            name="filteredBrawler"
            value={inputtedBrawler}
            onChange={handleChange}
          />
        </div>
        <div className="input-container">
          <span>Pick a Game Mode!</span>
          <select name="gamemodes" onChange={handleGameModeChange}>
            <option value="None Selected">Select a Game Mode</option>
            {events.map((event) => (
              <option value={event.event} key={event.id}>
                {event.event}
              </option>
            ))}
          </select>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr className="brawler-info">
            <th>Brawler</th>
            <th>Rarity</th>
            <th>Abilities</th>
            <th>Win Rate</th>
          </tr>
        </thead>

        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
 
export default Table;