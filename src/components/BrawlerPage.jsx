import styles from "../styles/BrawlerPage.module.css"
import { Navigate, useParams, useLocation } from "react-router-dom"

const BrawlerPage = () => {

  let params = useParams();
  const brawlerId = params.id;

  const location = useLocation();
  console.log(location);
  const { brawler, brawlerStats } = location.state;

    const filteredBrawlerStats = brawlerStats[brawler.name];
    const winAndUseRates = Object.entries(filteredBrawlerStats);

    console.log(winAndUseRates);

    return (
        <div className={styles.modalContent}>
          <div className={styles.brawlerIconCell}>
            <img src={brawler.icon} alt={brawler.name} />
            <h2>{brawler.name}</h2>
            <p>Rarity: {brawler.rarity}</p>
          </div>

          <h2>Abilities</h2>

          <div className={styles.abilitiesContainer}>
            {brawler.starPowers.map((starPower) => (
              <div className={styles.ability} key={starPower.name}>
                <img src={starPower.imageUrl} height={25} />
                <h3>{starPower.name}</h3>
                <p>{starPower.description}</p>
              </div>
            ))}
          </div>

          <div className={styles.abilitiesContainer}>
            {brawler.gadgets.map((gadget) => (
              <div className={styles.ability} key={gadget.name}>
                <img src={gadget.imageUrl} height={25} />
                <h3>{gadget.name}</h3>
                <p>{gadget.description}</p>
              </div>
            ))}
          </div>

          <h2>Events</h2>

          <div className={styles.gamemodeStats}>
            {winAndUseRates.map((event) => (
              <div key={event[0]}>
                <img src={event[1].icon} alt={event[0]} />
                <p>Event: {event[0]}</p>
                <p>Win Rate: {event[1].winRate} %</p>
                <p>Use Rate: {event[1].useRate} %</p>
              </div>
            ))}
          </div>
        </div>
    );

  
}
 
export default BrawlerPage;