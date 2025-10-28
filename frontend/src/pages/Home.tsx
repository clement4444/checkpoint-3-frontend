import { useState } from "react";
import Input from "../components/input/Input";
import PaysCard from "../components/paysCard/PaysCard";
import { useAddCountryMutation, useCountriesQuery } from "../graphql/generated/graphql-types";
import style from "./home.module.scss";

export function HomePage() {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [code, setCode] = useState("");
  const [addCountry, { error: errorAdd }] = useAddCountryMutation();
  const { data, loading, error } = useCountriesQuery();

  const [eurreurMessage, setEurreurMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // appel mutation
    try {
      if (name.length === 0) {
        setEurreurMessage("Le nom du pays peut pas être vide.");
        return;
      }
      if (emoji.length === 0) {
        setEurreurMessage("L'emoji du pays peut pas être vide.");
        return;
      }
      if (code.length !== 3) {
        setEurreurMessage("Le code du pays doit contenir exactement 3 caractères.");
        return;
      }

      await addCountry({
        variables: {
          data: {
            name,
            emoji,
            code,
          }
        },
        refetchQueries: ["Countries"],
        errorPolicy: "none",
      });
      setEurreurMessage(null);
      setName("");
      setEmoji("");
      setCode("");

    } catch (error: any) {
      console.log(error.graphQLErrors);
      if (error.graphQLErrors[0].extensions.code === "BAD_USER_INPUT") {
        setEurreurMessage(`Verifier le champs ${error.graphQLErrors[0].extensions.validationErrors[0].property} qui est invalide.`);
        return;
      }
      setEurreurMessage("Une erreur est survenue lors de l'ajout du pays.");
    }
  }

  return (
    <div className={style.homePage}>

      {eurreurMessage && <p className={style.messageEurreur}>{eurreurMessage}</p>}

      <form className={style.fromAddPays} onSubmit={handleSubmit}>
        <Input value={name} setValue={setName} labelName="Nom" />
        <Input value={emoji} setValue={setEmoji} labelName="Emoji" />
        <Input value={code} setValue={setCode} labelName="Code" />
        <button className={style.bntAjouter} type="submit">Ajoutée</button>
      </form>


      {loading && <p className="eurreurMessage">Loading...</p>}
      {error && <p className="eurreurMessage">Eurreur: {error.message}</p>}

      <div className={style.contenaireAllPays}>
        {data?.countries.map((country) => (
          <PaysCard pays={country} key={country.id} />
        ))}
      </div>

    </div>
  );
}
