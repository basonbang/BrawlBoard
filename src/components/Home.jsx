import Cards from "./Cards";
import Table from "./Table";

const Home = ({brawlers, events, brawlerStats, gameMode, handleGameModeChange}) => {

  return ( 
    <>
      <Cards brawlers={brawlers} events={events} gameMode={gameMode} />
      <Table
        brawlers={brawlers}
        events={events}
        brawlerStats={brawlerStats}
        gameMode={gameMode}
        handleGameModeChange={handleGameModeChange}
      />
    </>
   );
}
 
export default Home;