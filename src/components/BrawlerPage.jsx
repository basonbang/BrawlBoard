import styles from "../styles/BrawlerPage.module.css"

const BrawlerPage = ({brawler, brawlerStats, closeModal}) => {

  const filteredBrawlerStats = brawlerStats[brawler.name]
  const winAndUseRates = Object.entries(filteredBrawlerStats)

  return ( 
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
      <button className={styles.closeButton} onClick={closeModal}>X</button>
        <div className={styles.brawlerIconCell}>
          <img src={brawler.icon} alt={brawler.name} />
          <p>{brawler.name}</p>
          <p>{brawler.rarity}</p>
        </div>

        <div className={styles.abilitiesContainer}>
          {brawler.starPowers.map((starPower) => (
            <div className={styles.ability} key={starPower.name}>
              <img src={starPower.imageUrl} height={25} />
              <p>{starPower.name}</p>
              <p>{starPower.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.abilitiesContainer}>
          {brawler.gadgets.map((gadget) => (
            <div className={styles.ability} key={gadget.name}>
              <img src={gadget.imageUrl}  height={25} />
              <p>{gadget.name}</p>
              <p>{gadget.description}</p>
            </div>
          ))}
        </div>

        <div className={styles.gamemodeStats}>
          {
            winAndUseRates.map((event) => (
              <div key={event[0]}>
                <p>Event: {event[0]}</p>
                <p>Win Rate: {event[1].winRate} %</p>
                <p>Use Rate: {event[1].useRate} %</p>
              </div>
            ))
          }
        </div>
      </div>
    </div>
   );
}
 
export default BrawlerPage;