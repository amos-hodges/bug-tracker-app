import { Fragment } from "react"

const Table = ({ data, config, keyFn, navFn }) => {

    const renderedHeaders = config.map((col) => {

        if (col.header) {
            return <Fragment key={col.label}>{col.header()}</Fragment>
        }
        return <th key={col.label}>{col.label}</th>
    })
    const renderedRows = data.map((rowData) => {

        const renderedCells = config.map((col) => {
            if (col.link) {
                return (
                    <td key={col.label}
                        onClick={() =>
                            navFn(col.link(rowData))
                        }>
                        {col.render(rowData)}
                    </td>
                )
            }
            return (
                <td key={col.label}>
                    {col.render(rowData)}
                </td>
            )
        })

        return (
            <tr key={keyFn(rowData)}>
                {renderedCells}
            </tr>
        )
    })

    return (
        <table>
            <thead>
                <tr>
                    {renderedHeaders}
                </tr>
            </thead>
            <tbody>
                {renderedRows}
            </tbody>
        </table>
    )
}

export default Table