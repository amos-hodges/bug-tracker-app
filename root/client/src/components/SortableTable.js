import Table from "./Table"
import { GoArrowDown, GoArrowUp } from 'react-icons/go'
import useSort from '../hooks/useSort'
import useSearch from '../hooks/useSearch'


const SortableTable = ({ config, data, ...props }) => {

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
                    scope="col" className="table__th note__title"
                    onClick={() => handleClick(col.label)}>
                    <div>
                        {getIcons(col.label, sortBy, sortOrder)}
                        {col.label}
                    </div>
                </th>
            )
        }
    })

    return (<>
        {searchBar}
        <div className="list-container">
            <Table data={sortedData} config={updatedConfig} {...props} />
        </div>
    </>
    )
}

function getIcons(label, sortBy, sortOrder) {
    if (label !== sortBy) {
        return <div>
            <GoArrowUp />
            <GoArrowDown />
        </div>
    }

    if (sortOrder === null) {
        return <div>
            <GoArrowUp />
            <GoArrowDown />
        </div>
    } else if (sortOrder === 'asc') {
        return <div>
            <GoArrowUp />
        </div>
    } else if (sortOrder === 'desc') {
        return <div>
            <GoArrowDown />
        </div>
    }
}

export default SortableTable