import { useGetNotificationsQuery } from "./notificationApiSlice"

const Notification = ({ notificationId }) => {
    const { notification } = useGetNotificationsQuery('notificationsList', {
        selectFromResult: ({ data }) => ({
            notification: data?.entities[notificationId]
        })
    })

    if (notification) {

        //use when updating status
        // const updated = new Date(notification.updatedAt).toLocaleString('en-US', {
        //     day: 'numeric',
        //     month: 'long',
        //     hour: 'numeric',
        //     minute: 'numeric',
        // })
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
            </div>
        )
    }
}

export default Notification