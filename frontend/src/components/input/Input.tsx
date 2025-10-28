import { useId } from "react";
import style from "./input.module.scss";

type InputProps = {
    value: string;
    setValue: (value: string) => void;
    labelName: string;
};

const Input = ({ value, setValue, labelName }: InputProps) => {
    const id = useId();

    return (
        <div className={style.inputContainer}>
            <label htmlFor={id}>{labelName}</label>
            <input id={id} value={value} onChange={(e) => setValue(e.target.value)} type="text" />
        </div>
    );
};

export default Input;