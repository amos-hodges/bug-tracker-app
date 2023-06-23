import Notification from "./Notification"
import { useGetNotificationsQuery } from "./notificationApiSlice"
import PulseLoader from 'react-spinners/PulseLoader'
import { useEffect } from "react"
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
        refetchOnMountOrArgChange: true,
        cacheTime: 0
    })
    //console.log(notifications)
    // useEffect(() => {
    //     if (isSuccess) {
    //         console.log(`${notifications} to render`)
    //     }
    // }, [isSuccess, notifications])

    let content

    if (isLoading) content = <PulseLoader color={"#FFF"} />

    if (isError) {
        console.log(error?.data?.message)
        content = <p className="notification-error">{error?.data?.message}</p>
    }

    if (isSuccess) {
        //console.log(`There are ${notifications?.length} notifications`)
        const { ids, entities } = notifications

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

    }
    return content

}

export default NotificationList