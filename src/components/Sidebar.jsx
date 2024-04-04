import styles from "../styles/Sidebar.module.css"
import { Outlet, Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <div className={styles.Sidebar}>
        <h2>Brawl Board ⭐</h2>
        <nav>
          <Link to="/"> Home </Link>
        </nav>
      </div>
      <Outlet />
    </>
  );
}
 
export default Sidebar;