import { useEffect } from "react"

const Modal = ({ onClose, children }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose()
        }, 3000)

        return () => {
            clearTimeout(timer)
        }
    }, [onClose])

    return (
        <div className="modal">
            {children}
        </div>
    )
}

export default Modal