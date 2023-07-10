import { Outlet, Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useRefreshMutation } from './authApiSlice'
import usePersist from '../../hooks/usePersist'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from './authSlice'
import PulseLoader from 'react-spinners/PulseLoader'

const PersistLogin = () => {
    const [persist] = usePersist()
    const token = useSelector(selectCurrentToken)
    //strict mode handle
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {

        if (effectRan.current === true || process.env.NODE_ENV !== 'development') { //React 18 strict mode

            const verifyRefreshToken = async () => {
                try {
                    await refresh()
                    setTrueSuccess(true)
                } catch (err) {
                    console.log(err)
                }
            }

            if (!token && persist) {
                verifyRefreshToken()
            }

        }
        return () => effectRan.current = true

        //disable warnings
        //eslint-disable-next-line
    }, [])

    let content

    if (!persist) {
        console.log('no persist')
        content = <Outlet />
    } else if (isLoading) { // persist: yes, token: no
        content = <PulseLoader color={"#FFF"} />
    } else if (isError) { // persist: yes, token: no
        console.log('error')
        content = (
            <p className='errmsg'>
                {`${error?.data?.message} - `}
                <Link to="/login">Please login again</Link>.
            </p>
        )
    } else if (isSuccess && trueSuccess) { // persist: yes, token: yes
        content = <Outlet />
    } else if (token && isUninitialized) {
        content = <Outlet />
    }


    return content
}

export default PersistLogin