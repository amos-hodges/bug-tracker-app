import { useState } from "react"
const useSearch = ({ data, config }) => {

    const [searchQuery, setSearchQuery] = useState('')

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value)
    }
    const searchBar = (
        <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
        />
    )

    const filteredData = data.filter((ticket) => {
        return config.some((col) => {
            const searchValue = col.render(ticket)
            if (typeof searchValue === 'string') {
                //console.log('String: ' + searchValue)
                return searchValue.toLowerCase().includes(searchQuery.toLowerCase())
            } else {
                // console.log(`${searchValue}`)
                return searchValue.toString().includes(searchQuery)
            }
        })
    })

    return {
        searchBar,
        filteredData,
    }
}

export default useSearch