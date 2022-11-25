import React, { useState } from "react";

function Login({onLogin}) {
  const initialData = {
    email: "",
    password: "",
  };

  const [personData, setPersonData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonData((personData) => ({
      ...personData,
      [name]: value,
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!personData.password || !personData.email) {
      return;
    }

    onLogin(personData);
  };


  return (
      <form className="login auth" onSubmit={handleSubmit}>
        <h1 className="login__title auth__title">Вход</h1>
        <input
          className="login__input auth__input"
          type="email"
          name="email"
          id="email-input"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={personData.email}
        />
        <input
          className="login__input auth__input"
          type="password"
          name="password"
          id="password-input"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={personData.password}
        />
        <button
          type="submit"
          aria-label="Войти"
          className="login__button auth__button"
        >Войти</button>
      </form>
  );
}

export default Login;
