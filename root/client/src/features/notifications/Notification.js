const Notification = ({ message, created, onDelete }) => {

    if (message) {

        const createdTime = new Date(created).toLocaleString('en-US', {
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric',
        })

        return (
            <div className="notification-content">
                <div>{createdTime}</div>
                <div>{message}</div>
                <button
                    className="close-button"
                    onClick={onDelete}
                >x</button>
            </div>
        )
    }
}

export default Notification