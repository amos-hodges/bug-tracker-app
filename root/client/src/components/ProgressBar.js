export const ProgressBar = ({ percentage }) => {
    return (
        <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${percentage}%` }} />
        </div>
    )
}