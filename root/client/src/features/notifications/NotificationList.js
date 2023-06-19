import Notification from "./Notification"
import { useGetNotificationsQuery } from "./notificationApiSlice"
import PulseLoader from 'react-spinners/PulseLoader'
const NotificationList = () => {

    const {
        data: notifications,
        isLoading,
        isSuccess,
        isError,
        error
    } = useGetNotificationsQuery('notificationList', {
        pollingInterval: 15000,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })

    let content


    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        content = <p className="errmsg">{error?.data?.message}</p>
    }

    if (isSuccess) {
        const { ids, entities } = notifications

        // const unreadNotifications = ids.filter(
        //     (id) => !entities[id].status
        // )
        //updateUnreadCount(unreadNotifications)

        const notificationContent = ids?.length ? (
            ids.map(notificationId => (
                <Notification
                    key={notificationId}
                    notificationId={notificationId}
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

}

export default NotificationList