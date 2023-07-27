import Table from "./Table"
import { GoChevronDown, GoChevronUp } from 'react-icons/go'
import useSort from '../hooks/useSort'
import useSearch from '../hooks/useSearch'


const SortableTable = ({ header, button, config, data, ...props }) => {

    const { searchBar, filteredData } = useSearch({ data, config })
    const {
        sortOrder,
        sortBy,
        sortedData,
        handleClick
    } = useSort({ data: filteredData, config })


    const updatedConfig = config.map((col) => {
        if (!col.sortValue) {
            return col
        }

        return {
            ...col,
            header: () => (
                <th
                    onClick={() => handleClick(col.label)}>
                    <div className="header">

                        {getIcons(col.label, sortBy, sortOrder)}
                        {col.label}

                    </div>
                </th>
            )
        }
    })

    return (
        <>
            <div className="page-header">
                {header}
                {searchBar}
                {button}
            </div>
            {/* <div className="table__body"> */}
            <Table data={sortedData} config={updatedConfig} {...props} />
            {/* </div> */}
        </>
    )
}
//convert to arrow
function getIcons(label, sortBy, sortOrder) {

    if (sortOrder === null || label !== sortBy) {
        return <div className="sort__icons">
            <GoChevronUp />
            <GoChevronDown />
        </div>
    } else if (sortOrder === 'asc') {
        return <div className="sort__icons">
            <GoChevronUp />
        </div>
    } else if (sortOrder === 'desc') {
        return <div className="sort__icons">
            <GoChevronDown />
        </div>
    }
}

export default SortableTable