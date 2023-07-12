import { Fragment } from "react"

function Table({ data, config, keyFn }) {

    const renderedHeaders = config.map((col) => {
        if (col.header) {
            return <Fragment key={col.label}>{col.header()}</Fragment>
        }
        return <th key={col.label}>{col.label}</th>
    })
    const renderedRows = data.map((rowData) => {

        const renderedCells = config.map((col) => {
            return (
                <td className="table__cell" key={col.label}>
                    {col.render(rowData)}
                </td>
            )
        })

        return (
            <tr className="table__row" key={keyFn(rowData)}>
                {renderedCells}
            </tr>
        )
    })

    return (
        <table className="table table--tickets__all">
            <thead className="table__thead">
                <tr>
                    {renderedHeaders}
                </tr>
            </thead>
            <tbody>{renderedRows}</tbody>
        </table>
    )
}

export default Table