
const Header = ({ title }) => {
    return (
        // Styles can be written inline, probably easiest to keep it in CSS
        <header style={{
            backgroundColor: 'Mediumblue',
            color: '#fff'
        }}>
            <h1>{title}</h1>
        </header>
    )
}

Header.defaultProps = {
    title: "Default Title"
}

export default Header