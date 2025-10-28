import { Link } from "react-router-dom";
import style from "./header.module.scss"

export function Header() {
  return (
    <header className={style.header}>
      <h1>Checkpoint : frontend (clément)</h1>
      <nav className={style.nav}>
        <Link to="/">Pays</Link>
      </nav>
    </header>
  );
}
