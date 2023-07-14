import { Fragment } from "react"

const ExpandableCard = ({ data, config, keyFn }) => {

    const renderedHeaders = config.map((col) => {
        if (col.header) {
            return <Fragment className="card-title" key={col.label}>{col.header()}</Fragment>
        }
        return <div className="card-title" key={col.label}>{col.label}</div>
    })

    const renderedCards = data.map((rowData) => {
        return <div className="card-content">{rowData}</div>
    })

    return

}

export default ExpandableCard