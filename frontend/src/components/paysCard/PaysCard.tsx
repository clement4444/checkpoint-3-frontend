import style from "./paysCard.module.scss";
import { Link } from "react-router-dom";
import type { Country } from "../../graphql/generated/graphql-types";

type PaysCardProps = {
    pays: Country;
};

const PaysCard = ({ pays }: PaysCardProps) => {
    return (
        <Link to={`/detail/${pays.code}`}>
            <div className={style.card} key={pays.id}>
                <p className={style.cardName}>{pays.name}</p>
                <p className={style.cardEmodji}>{pays.emoji}</p>
            </div>
        </Link>
    );
};

export default PaysCard;