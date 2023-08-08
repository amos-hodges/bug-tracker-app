import { useState } from "react"
import { ProgressBar } from './ProgressBar'
const Grid = ({ data, keyFn, navFn }) => {

    const [expanded, setExpanded] = useState(null)

    const handleExpand = (cardId) => {
        setExpanded(cardId === expanded ? null : cardId)
    }
    const currentProject = data.filter(row => row.id === expanded)[0]
    const percentageComplete = (currentProject?.completeTicketCount / currentProject?.ticketCount * 100).toFixed(2)

    const renderedCards = data.map((rowData) => {

        return (

            <div key={keyFn(rowData)} className="card">
                <div className="card-header" onClick={() => handleExpand(rowData.id)}>
                    <div className="card-title">
                        <h3>{rowData.title}</h3>
                    </div>
                </div>
            </div>


        )
    })


    return (
        <div>

            <div className="card-grid">
                {renderedCards}
            </div>
            {expanded &&
                <div className="card-content">
                    <h2>{currentProject.title}</h2>
                    <h4>{currentProject.description}</h4>
                    <div className="card-options">
                        <div>List of users assinged...</div>
                        <ProgressBar percentage={percentageComplete} />
                        <div>{`${currentProject?.completeTicketCount || 0}/${currentProject?.ticketCount || 0} tickets completed.`}</div>
                        <div className="button-18" onClick={() => navFn(currentProject.id)}>Open Project</div>
                    </div>
                </div>}
        </div>
    )
}

export default Grid

