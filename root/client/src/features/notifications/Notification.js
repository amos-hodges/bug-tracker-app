import { useEffect } from "react"
import { useGetNotificationsQuery, useDeleteNotificationMutation } from "./notificationApiSlice"

const Notification = ({ notificationId }) => {
    const { notification } = useGetNotificationsQuery('notificationsList', {
        selectFromResult: ({ data }) => ({
            notification: data?.entities[notificationId]
        })
    })

    const [deleteNotification, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useDeleteNotificationMutation()

    // useEffect(() => {
    //     if (isSuccess) {
    //         console.log('deleted notification')
    //     }
    // }, [isSuccess, notificationId])

    const handleDelete = async () => {
        console.log(notification.id)
        await deleteNotification({ id: notification.id })
    }
    //console.log(notificationId)
    if (notification) {

        const created = new Date(notification.createdAt).toLocaleString('en-US', {
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric',
        })

        return (
            <div className="notification-content">
                <div>{created}</div>
                <div>{notification.message}</div>
                <button
                    className="close-button"
                    onClick={handleDelete}
                >x</button>
            </div>
        )
    }
}

export default Notification