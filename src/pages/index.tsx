import login from "@/styles/login.module.css";
import Link from "next/link";
import React from "react";
import { redirect } from "next/navigation";
import Router from "next/router";

function App() {
  const [user, setUser] = React.useState("");
  const [password, setPassword] = React.useState("");
  React.useEffect(() => {
    fetch("/api/logout", { method: "GET" })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
      });
  }, []);
  return (
    <div className={login["App"]}>
      <div id={login.bgImage}></div>
      <div id={login["login-container"]}>
        <div id={login["login-form"]}>
          <form id={login["msform"]}>
            <fieldset>
              <h2 className={login["fs-title"]}>Log in </h2>
              <h3 className={login["fs-subtitle"]}>
                Don't have an account yet? <Link href="/signin">Sign in!</Link>
              </h3>
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={user}
                onChange={(evt) => {
                  setUser(evt.target.value);
                }}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(evt) => {
                  setPassword(evt.target.value);
                }}
              />
              <input
                type="button"
                name="login"
                className={login["action-button"]}
                onClick={(evt) => {
                  const body = JSON.stringify({
                    username: user,
                    password: password,
                  });
                  const headers = {
                    "Content-Type": "application/json", // Replace with the appropriate content type
                  };
                  fetch("/api/login", {
                    method: "POST",
                    headers: headers,
                    body: body,
                  })
                    .then((data) => data.json())
                    .then((data) => {
                      console.log(data);
                      if (data.success) {
                        Router.push("/dashboard");
                      }
                    });
                }}
                value="Log in"
              />
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
