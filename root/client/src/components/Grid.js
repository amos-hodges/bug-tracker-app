import { useState } from "react"
const Grid = ({ data }) => {

    const [expanded, setExpanded] = useState(null)

    const handleExpand = (cardId) => {
        setExpanded(cardId === expanded ? null : cardId)
    }
    const currentProject = data.filter(row => row.id === expanded)[0]

    const renderedCards = data.map((rowData) => {

        return (
            <>
                <div className="card">
                    <div className="card-header" onClick={() => handleExpand(rowData.id)}>
                        <div className="card-title">
                            <h3>{rowData.title}</h3>
                        </div>
                    </div>
                </div>

            </>
        )
    })

    return (
        <div>

            <div className="card-grid">
                {renderedCards}
            </div>
            {expanded &&
                <div className="card-content">
                    <h4>{currentProject.description}</h4>
                    <div className="card-options">
                        <div>List of users assinged...</div>
                        <div>Visual percentage of closed tickets...</div>
                        <div>'Open' button</div>
                    </div>
                </div>}
        </div>
    )
}

export default Grid

