import { useGetNotificationsQuery } from "./notificationApiSlice"

const Notification = ({ notificationId }) => {
    const { notification } = useGetNotificationsQuery('notificationsList', {
        selectFromResult: ({ data }) => ({
            notification: data?.entities[notificationId]
        })
    })

    if (notification) {

        const updated = new Date(notification.updatedAt).toLocaleString('en-US', {
            day: 'numeric',
            month: 'long',
            hour: 'numeric',
            minute: 'numeric',
        })


        return (
            <>
                <div>{notification.createdAt}</div>
                <div>{notification.message}</div>
            </>
        )
    }
}

export default Notification