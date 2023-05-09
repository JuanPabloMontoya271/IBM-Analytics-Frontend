
import login from '@/styles/login.module.css'
import Link from 'next/link'

function SignIn() {
  return (
    <div className={login["App"]}>
      <div id={login.bgImage}></div>
      <div id={login["login-container"]}>
        <div id={login["login-form"]}>
        <form action="/" id={login["msform"]}>
        <fieldset>
                <h2 className={login["fs-title"]}>Sign in </h2>
                <h3 className={login["fs-subtitle"]}>Already have an account? <Link href = "/">Log in!</Link></h3>
                <input type="text" name="email" placeholder="First name"/>
                <input type="text" name="email" placeholder="Last Name"/>
                <input type="text" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <input type="button" className={login["action-button"]} value = "Sign in"/>
            </fieldset>
            
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignIn;