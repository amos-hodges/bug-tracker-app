import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { apiSlice } from '../../app/api/apiSlice'

const ticketsAdapter = createEntityAdapter({})

const initialState = ticketsAdapter.getInitialState()

export const ticketsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTickets: builder.query({
            query: () => '/tickets',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            // this is short - change to default later
            keepUnusedDataFor: 5,
            //important for working with mongodb
            // normalized data needs id property, not _id
            transformResponse: responseData => {
                const loadedtickets = responseData.map(ticket => {
                    ticket.id = ticket._id
                    return ticket
                })
                return ticketsAdapter.setAll(initialState, loadedTickets)
            },
            providesTags: (result, error, arg) => {
                if (result?.ids) {
                    return [
                        { type: 'ticket', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'ticket', id }))
                    ]
                } else return [{ type: 'ticket', id: 'LIST' }]
            }
        })
    })
})

export const {
    useGetTicketsQuery
} = apiSlice
// returns query result object
export const selectTicketsResult = ticketsApiSlice.endpoints.getTickets.select()

// creates memoized selector
const selectTicketsData = createSelector(
    selectTicketsResult,
    ticketsResult => ticketsResult.data // normalized state object with ids & entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTickets,
    selectById: selectTicketById,
    selectIds: selectTicketIds
    //pass in selector that returns tickets slice of state
} = ticketsAdapter.getSelectors(state => selectTicketsData(state) ?? initialState)