
import login from '@/styles/login.module.css'
import Link from 'next/link'

function App() {
  return (
    <div className={login["App"]}>
      <div id={login.bgImage}></div>
      <div id={login["login-container"]}>
        <div id={login["login-form"]}>
        <form id={login["msform"]}>
        <fieldset>
                <h2 className={login["fs-title"]}>Log in </h2>
                <h3 className={login["fs-subtitle"]}>Don't have an account yet? <Link href = "/signin">Sign in!</Link></h3>
                <input type="text" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <input type="button" name="login" className={login["action-button"]} value="Sign in"/>
            </fieldset>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;