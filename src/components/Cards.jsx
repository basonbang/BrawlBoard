import styles from "../styles/Cards.module.css"

const Cards = ({brawlers,events,gameMode}) => {
  return ( 
    <div className={styles.cardsContainer}>
      <div className={styles.card}> 
        <h3>Total # of Brawlers:</h3>
        <p>{brawlers.length}</p>
      </div>
      <div className={styles.card}>
        <h3>Current Gamemode:</h3>
        <p>{gameMode}</p>
      </div>
      <div className={styles.card}>
        <h3>Active Game Modes:</h3>
        <p>{events.length}</p>
      </div>
    </div>
   );
}
 
export default Cards;