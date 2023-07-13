import { Fragment } from "react"

const Table = ({ data, config, keyFn, classes }) => {

    const {
        tableClass,
        tableHeadClass,
        cellClass,
        rowClass
    } = classes

    const renderedHeaders = config.map((col) => {
        if (col.header) {
            return <Fragment key={col.label}>{col.header()}</Fragment>
        }
        return <th key={col.label}>{col.label}</th>
    })
    const renderedRows = data.map((rowData) => {

        const renderedCells = config.map((col) => {
            return (
                <td className={cellClass} key={col.label}>
                    {col.render(rowData)}
                </td>
            )
        })

        return (
            <tr className={rowClass} key={keyFn(rowData)}>
                {renderedCells}
            </tr>
        )
    })

    return (
        <table className={tableClass}>
            <thead className={tableHeadClass}>
                <tr>
                    {renderedHeaders}
                </tr>
            </thead>
            <tbody>{renderedRows}</tbody>
        </table>
    )
}

export default Table