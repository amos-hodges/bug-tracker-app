import { useState } from "react"
import { FaTrashAlt } from "react-icons/fa"

const Content = () => {

    const [items, setItems] = useState([
        {
            id: 1,
            checked: false,
            item: "Detail user stories in markdown file"
        },
        {
            id: 2,
            checked: false,
            item: "Complete React tutorial"
        },
        {
            id: 3,
            checked: false,
            item: "Install and set up MongoDB"
        },
        {
            id: 4,
            checked: false,
            item: "Create back-end codebase (server & routes)"
        },
        {
            id: 5,
            checked: false,
            item: "Make sure all user story features are functional"
        },
        {
            id: 6,
            checked: false,
            item: "Debug & refactor. Stylize UI"
        },
        {
            id: 7,
            checked: false,
            item: "Deploy app & start server"
        }
    ])

    const handleCheck = (id) => {
        const listItems = items.map((item) => item.id === id ? { ...item, checked: !item.checked } : item)
        setItems(listItems)
        localStorage.setItem('shoppingList', JSON.stringify(listItems))
    }

    const handleDelete = (id) => {
        //filter through each item and populate array with items whos ID does not match the id passed in
        const listItems = items.filter((item) => item.id !== id)
        setItems(listItems)
        localStorage.setItem('shoppingList', JSON.stringify(listItems))
    }

    return (
        <main>
            {items.length ? (
                <ul>
                    {items.map((item) => (
                        <li className="item" key={item.id}>
                            <input
                                type="checkbox"
                                onChange={() => handleCheck(item.id)}
                                checked={item.checked}
                            />
                            <label
                                style={(item.checked) ? { textDecoration: 'line-through' } : null}
                                onDoubleClick={() => handleCheck(item.id)}
                            >{item.item}</label>
                            <FaTrashAlt
                                onClick={() => handleDelete(item.id)}
                                role="button"
                                tabIndex="0" />
                        </li>
                    ))}
                </ul>
            ) : (
                <p style={{ marginTop: '2rem' }}>Your list is empty.</p>
            )}
        </main>
    )
}

export default Content