import { useState } from "react"

function useSort(data, config) {

    const [sortOrder, setSortOrder] = useState(null)
    const [sortBy, setSortBy] = useState(null)

    //change sorting column & order
    const handleClick = (label) => {
        //reset sort order clicking between headers
        if (sortBy && label !== sortBy) {
            setSortOrder('asc')
            setSortBy(label)
            return
        }

        if (sortOrder === null) {
            setSortOrder('asc')
            setSortBy(label)
        } else if (sortOrder === 'asc') {
            setSortOrder('desc')
            setSortBy(label)
        } else if (sortOrder === 'desc') {
            setSortOrder(null)
            setSortBy(null)
        }
    }

    let sortedData = data
    //determine the correct sortValue function to use
    if (sortOrder && sortBy) {
        const { sortValue } = config.find(col => col.label === sortBy)
        sortedData = [...data].sort((a, b) => {
            const valueA = sortValue(a)
            const valueB = sortValue(b)

            const reverseOrder = sortOrder === 'asc' ? 1 : -1

            if (typeof valueA === 'string') {
                return valueA.localeCompare(valueB) * reverseOrder
            } else {
                return (valueA - valueB) * reverseOrder
            }
        })
    }

    return {
        sortOrder,
        sortBy,
        sortedData,
        handleClick
    }
}

export default useSort