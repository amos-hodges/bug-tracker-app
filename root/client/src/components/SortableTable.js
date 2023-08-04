import Table from "./Table"
import { GoTriangleDown, GoTriangleUp } from 'react-icons/go'
import useSort from '../hooks/useSort'
import useSearch from '../hooks/useSearch'


const SortableTable = ({ header, button, config, data, omitColumn, ...props }) => {

    const { searchBar, filteredData } = useSearch({ data, config })
    const {
        sortOrder,
        sortBy,
        sortedData,
        handleClick
    } = useSort({ data: filteredData, config })


    const updatedConfig = config.map((col) => {

        if (!col.sortValue || col.label === omitColumn) {
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
                <div className="title_search">
                    {header}
                    {searchBar}
                </div>
                {button}
            </div>
            <Table data={sortedData} config={updatedConfig} omitColumn={omitColumn}{...props} />
        </>
    )
}
//convert to arrow
function getIcons(label, sortBy, sortOrder) {

    if (sortOrder === null || label !== sortBy) {
        return <div className="sort__icons">
            <GoTriangleUp />
            <GoTriangleDown />
        </div>
    } else if (sortOrder === 'asc') {
        return <div className="sort__icons">
            <GoTriangleUp />
            <GoTriangleDown className="invisible" />
        </div>
    } else if (sortOrder === 'desc') {
        return <div className="sort__icons">
            <GoTriangleUp className="invisible" />
            <GoTriangleDown />
        </div>
    }
}

export default SortableTable