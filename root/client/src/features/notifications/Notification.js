import { useEffect } from "react"
import { useGetNotificationsQuery, useDeleteNotificationMutation } from "./notificationApiSlice"

const Notification = ({ message, created, onDelete }) => {


    // const { notification } = useGetNotificationsQuery('notificationsList', {
    //     selectFromResult: ({ data }) => ({
    //         notification: data?.entities[notificationId]
    //     })
    // })
    //console.log(notification)
    const [deleteNotification, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useDeleteNotificationMutation()

    // useEffect(() => {
    //     console.log(notification)
    // }, [notification])

    // useEffect(() => {
    //     if (isSuccess) {
    //         console.log('deleted notification')
    //     }
    // }, [isSuccess, notificationId])

    // const handleDelete = async () => {
    //     console.log(notification.id)
    //     await deleteNotification({ id: notification.id })
    // }
    //console.log(notificationId)
    if (message) {
        //console.log(`ready to render ${notificationId}`)
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