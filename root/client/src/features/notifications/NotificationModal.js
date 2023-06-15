import { useEffect } from "react"

const NotificationModal = ({ isOpen, onClose, children }) => {
    useEffect(() => {
        let timeoutId

        if (isOpen) {
            timeoutId = setTimeout(() => {
                onClose();
            }, 80000)
        }

        return () => {
            clearTimeout(timeoutId);
        }
    }, [isOpen, onClose])

    return isOpen ? (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className="modal-content">
                {children}
            </div>
        </div>
    ) : null
}

export default NotificationModal