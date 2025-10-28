import { useState } from "react";
import Input from "../components/input/Input";
import { useAddCountryMutation } from "../graphql/generated/graphql-types";
import style from "./home.module.scss";

export function HomePage() {
  const [name, setName] = useState("");
  const [emoji, setEmoji] = useState("");
  const [code, setCode] = useState("");
  const [addCountry] = useAddCountryMutation();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // appel mutation
    addCountry({
      variables: {
        data: {
          name,
          emoji,
          code,
        }
      },
    });
  }

  return (
    <div className={style.homePage}>
      <form className={style.fromAddPays} onSubmit={handleSubmit}>
        <Input value={name} setValue={setName} labelName="Nom" />
        <Input value={emoji} setValue={setEmoji} labelName="Emoji" />
        <Input value={code} setValue={setCode} labelName="Code" />
        <button className={style.bntAjouter} type="submit">Ajoutée</button>
      </form>
      <div>

      </div>
    </div>
  );
}
