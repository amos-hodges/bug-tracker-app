import { useState } from "react"
const Grid = ({ data }) => {

    const [expanded, setExpanded] = useState([])

    const handleExpand = (cardId) => {
        if (expanded.includes(cardId)) {
            setExpanded(expanded.filter((id) => id !== cardId))
        } else {
            setExpanded([...expanded, cardId])
        }
        console.log(expanded)
    }

    const renderedCards = data.map((rowData) => {
        const isExpanded = expanded.includes(rowData.id)
        return (
            <>
                {/* {isExpanded &&
                    <div className="card-content">
                        <h4>{rowData.description}</h4>
                        <div className="card-options">
                            <div>List of users assinged...</div>
                            <div>Visual percentage of closed tickets...</div>
                            <div>'Open' button</div>
                        </div>
                    </div>} */}

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
        <div className="card-grid">
            {renderedCards}
        </div>
    )
}

export default Grid