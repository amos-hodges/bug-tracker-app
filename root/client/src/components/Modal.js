import { useEffect } from "react"

const Modal = ({ className, timeOut, onClose, children }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, timeOut)

        return () => {
            clearTimeout(timer)
        }
    }, [timeOut, onClose])

    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Modal