import style from "./detail.module.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useCountryQuery } from "../../graphql/generated/graphql-types";

const DetailPage = () => {
    const { paysCode } = useParams<{ paysCode: string }>();
    const navigate = useNavigate();

    if (!paysCode) {
        navigate("/");
        return null;
    }

    const { data, loading, error } = useCountryQuery({
        variables: { code: paysCode },
    });

    if (loading) return <p className="eurreurMessage" style={{ textAlign: "center", width: "100%", marginTop: "1em" }}>Loading...</p>;

    if (error) return <p className="eurreurMessage" style={{ textAlign: "center", width: "100%", marginTop: "1em" }}>Error: {error.message}</p>;

    if (!data) return <p className="eurreurMessage" style={{ textAlign: "center", width: "100%", marginTop: "1em" }}>No country found.</p>;

    return (
        <div className={style.contenaireDetail}>
            <p className={style.emodji}>{data.country.emoji}</p>
            <p className={style.nom}>Nom: {data.country.name}</p>
            <p className={style.contient}>
                {data.country.continent?.name ? `Continent: ${data.country.continent?.name}` : "Aucun continent"}

            </p>
        </div>
    );
};

export default DetailPage;