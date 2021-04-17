import React, { FC, useState, useEffect } from "react";
import Router from "next/router";
import Link from "next/link";
import { loginUser, reset as resetLoginError } from "slices/loginSlice";
import { useAppDispatch, useAppSelector } from "utils/hooks";
import styles from "styles/Form.module.scss";
import Header from "components/Header";
import Loader from "components/Loader";
import Modal from "components/Modal";
import Layout from "components/Layout";

interface Props {}

const Login: FC<Props> = (props: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const userLogin = useAppSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const { isDark } = useAppSelector((state) => state.theme);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(loginUser({ email, password }));
  };

  const closeModal = () => {
    // reset error to not trigger the if statement above
    dispatch(resetLoginError());
    setIsOpen(false);
  };

  useEffect(() => {
    if (error) {
      setIsOpen(true);
    }
  }, [error]);

  useEffect(() => {
    if (userInfo.user.name) {
      Router.push("/");
    }
  }, [userInfo]);

  return (
    <>
      <Header />

      <Layout>
        <Modal closeModal={closeModal} isOpen={isOpen} message={error} />

        {loading ? (
          <Loader />
        ) : (
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
              required={true}
            />

            <input
              type="password"
              placeholder="رمز"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={true}
            />

            <button type="submit">ورود</button>

            <small>
              حساب کاربری ندارید؟{" "}
              <Link href="/register">
                <a>عضویت</a>
              </Link>
            </small>
          </form>
        )}
      </Layout>
    </>
  );
};

export default Login;
