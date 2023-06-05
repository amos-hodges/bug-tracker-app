import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons"

const SortIndicator = ({ order }) => {
    return (
        <span>
            {order === "asc"
                ? <FontAwesomeIcon icon={faSortUp} />
                : <FontAwesomeIcon icon={faSortDown} />}
        </span>
    )
}

export default SortIndicator