import { useRef, useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'

const Login = () => {
    //for setting focus
    const userRef = useRef()
    const errRef = useRef()

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()

    //empty dependency- only run once when page first loads
    useEffect(() => {
        userRef.current.focus()
    }, [])

    //reset error message once username or password are re-entered
    useEffect(() => {
        setErrMsg('')
    }, [username, password])


    const handleSubmit = async (e) => {
        //do not want page to reload on submit
        e.preventDefault()
        try {
            //.unwrap() allows err to be caught in try-catch rather that rtk query states -> 'isError'
            const { accessToken } = await login({ username, password }).unwrap()
            dispatch(setCredentials({ accessToken }))
            setUsername('')
            setPassword('')
            navigate('/dashboard')
        } catch (err) {
            if (!err.status) {
                setErrMsg('No Server Response')
            } else if (err.status == 400) {
                setErrMsg('Incorrect Username or Password')
            } else if (err.status == 401) {
                setErrMsg('Unauthorized')
            } else {
                setErrMsg(err.data?.message)
            }
            errRef.current.focus()
        }
    }

    const handleUserInput = (e) => setUsername(e.target.value)
    const handlePwdInput = (e) => setPassword(e.target.value)

    const errClass = errMsg ? "errmsg" : "offscreen"

    if (isLoading) return <p>Loading...</p>

    const content = (
        <section className="public">
            <header>
                <h1>Employee Login</h1>
            </header>
            <main className="login">
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="username">Username:</label>
                    <input
                        classname="form__input"
                        type="text"
                        id="username"
                        ref={userRef}
                        value={username}
                        onChange={handleUserInput}
                        autoComplete="off"
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        classname="form__input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handlePwdInput}
                        required
                    />
                    <button className="form__submit-button">Sign In</button>
                </form>

            </main>
            <footer>
                <Link to="/">Back to Home</Link>
            </footer>
        </section>
    )
    return content
}

export default Login