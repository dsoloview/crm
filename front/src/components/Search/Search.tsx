import styles from './Search.module.scss';
import Input from "../Input/Input.tsx";
import {SubmitHandler, useForm} from "react-hook-form";
import Button from "../Button/Button.tsx";

import search from '../../assets/images/icons/search.svg';

type FormData = {
    search: string
}
const Search = () => {

    const {register, handleSubmit} = useForm<FormData>();
    const onSubmit: SubmitHandler<FormData> = (FormData) => {
        console.log(FormData)
    }
    return (
        <form className={styles.search} onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="Search" className={styles.input} type="text" register={register('search')} />
            <Button className={styles.button} type='submit'><img src={search} alt="search icon"/></Button>
        </form>
    );
}

export default Search;