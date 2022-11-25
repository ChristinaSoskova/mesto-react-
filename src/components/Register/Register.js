import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {

  
  const initialData = {
    email: "",
    password: "",
  };

  const [personData, setPersonData] = useState(initialData);

  function handleSubmit(e) {
    e.preventDefault();
    if (!personData.email || !personData.password) {
        return;
    }
    props.onRegister(personData);

}

const handleChange = (e) => {
  const { name, value } = e.target;
  setPersonData((personData) => ({
    ...personData,
    [name]: value,
  }));
};


  return (
      <form className="singup auth" onSubmit={handleSubmit}>
        <h1 className="singup__title auth__title">Регистрация</h1>
        <input
          className="singup__input auth__input"
          type="email" 
          id="email" 
          name="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={personData.email}
        />
        <input
          className="singup__input auth__input"
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={personData.password}
        />
        <button
          type="submit"
          aria-label="Зарегистрироваться"
          className="singup__button auth__button"
        >Зарегистрироваться</button>
         <Link to="/sign-in" className="singup__link">
        Уже зарегистрированы? Войти
      </Link>
      </form>
  );
}

export default Register;
