import Notification from './Notification'
import { socket } from '../../components/DashboardHeader'

const NotificationList = ({ notifications }) => {

    let content

    const handleDelete = (notificationId) => {
        socket.emit('delete_notification', notificationId)
    }

    const notificationContent = notifications?.length ? (
        notifications.map(notification => (
            <Notification
                key={notification._id}
                message={notification.message}
                created={notification.createdAt}
                onDelete={() => handleDelete(notification._id)}
            />
        ))
    ) : (<div>No notifications to display.</div>)

    content = (
        <div>
            {notificationContent}
        </div>
    )

    return content

}

export default NotificationList