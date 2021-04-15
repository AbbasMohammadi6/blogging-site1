import React, { FC, useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import { loginUser } from "slices/loginSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import styles from "styles/Form.module.scss";
import Header from "components/Header";

interface Props {}

const Login: FC<Props> = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const dispatch = useAppDispatch();

  const userLogin = useAppSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const { isDark } = useAppSelector((state) => state.theme);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (userInfo.user.name) {
      console.log("USER IS AUTHENTICATED");
      Router.push("/");
    }
  }, [userInfo]);

  return (
    <>
      <Header />

      {loading ? <h1>Loading....</h1> : error ? <h2>Error: {error}</h2> : ""}

      <form
        onSubmit={handleSubmit}
        className={`${styles.form} ${isDark && styles.darkTheme}`}
      >
        <h1>ورود به حساب کاربری</h1>
        <input
          type="email"
          placeholder="ایمیل"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="رمز"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">ورود</button>

        <small>
          حساب کاربری ندارید؟{" "}
          <Link href="/register">
            <a>عضویت</a>
          </Link>
        </small>
      </form>
    </>
  );
};

export default Login;
