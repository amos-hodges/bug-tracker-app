import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const notificationsAdapter = createEntityAdapter({})

const initialState = notificationsAdapter.getInitialState()

export const notificationsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getNotifications: builder.query({
            query: () => ({
                url: '/notifications',
                validateStatus: (response, result) => {
                    return response.status === 200 && !result.isError
                }
            }),
            transformResponse: responseData => {
                const loadedNotifications = responseData.map(notification => {
                    notification.id = notification._id
                    return notification
                })
                return notificationsAdapter.setAll(initialState, loadedNotifications)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'Notification', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'Notification', id }))
                    ]
                } else return [{ type: 'Notification', id: 'LIST' }]
            }
        }),
        // addNewNotification: builder.mutation({
        //     query: initialNotificationData => ({
        //         url: '/notifications',
        //         method: 'POST',
        //         body: {
        //             ...initialNotificationData
        //         }
        //     }),
        //     invalidatesTags: [
        //         { type: 'Notification', id: "LIST" }
        //     ]
        // }),
        updateNotification: builder.mutation({
            query: initialNotificationData => ({
                url: '/notifications',
                method: 'PATCH',
                body: {
                    ...initialNotificationData
                }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Notification', id: arg.id }
            ]
        }),
        deleteNotification: builder.mutation({
            query: ({ id }) => ({
                url: '/notifications',
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'Notification', id: arg.id }
            ]
        })
    })
})

export const {
    useGetNotificationsQuery,
    // useAddNewNotificationMutation,
    useUpdateNotificationMutation,
    useDeleteNotificationMutation
} = notificationsApiSlice

export const selectNotificationsResult = notificationsApiSlice.endpoints.getNotifications.select()

const selectNotificationsData = createSelector(
    selectNotificationsResult,
    notificationsResult => notificationsResult.data
)

export const {
    selectAll: selectAllNotifications,
    selectById: selectNotificationById,
    selectIds: selectNotificationIds
} = notificationsAdapter.getSelectors(state => selectNotificationsData(state) ?? initialState)