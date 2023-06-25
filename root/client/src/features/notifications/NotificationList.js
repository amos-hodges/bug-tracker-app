import Notification from "./Notification"
import { useGetNotificationsQuery } from "./notificationApiSlice"
import PulseLoader from 'react-spinners/PulseLoader'
import { useEffect } from "react"
import { socket } from '../../components/DashboardHeader'
const NotificationList = ({ notifications }) => {

    // const {
    //     data: notifications,
    //     isLoading,
    //     isSuccess,
    //     isError,
    //     error
    // } = useGetNotificationsQuery('notificationList', {
    //     pollingInterval: 15000,
    //     refetchOnFocus: true,
    //     refetchOnMountOrArgChange: true,
    //     cacheTime: 0
    // })

    useEffect(() => {
        console.log(notifications.length)
    }, [notifications])

    //console.log(notifications)
    let content


    const handleDelete = () => {
        console.log('delete clicked')
        socket.emit('delete_notification')
    }
    // if (isLoading) content = <PulseLoader color={"#FFF"} />

    // if (isError) {
    //     console.log(error?.data?.message)
    //     content = <p className="notification-error">{error?.data?.message}</p>
    // }
    // notifications.map((notificaiton) => {
    //     console.log(notificaiton._id)
    // })

    if (notifications) {

        const notificationContent = notifications?.length ? (
            notifications.map(notification => (
                <Notification
                    key={notification._id}
                    message={notification.message}
                    created={notification.createdAt}
                    onDelete={handleDelete}
                />
            ))
        ) : (<div>No notifications to display.</div>)
        //console.log(notificationContent)
        content = (
            <div>
                {notificationContent}
            </div>
        )

    }

    return content

}

export default NotificationList