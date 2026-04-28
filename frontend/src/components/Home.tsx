import {useEffect, useState} from 'react'
import axios from 'axios'
import './Home.css'

const API_URL = 'http://localhost:5000/api/items'

interface Item {
    Id: number;
    Content: string;
    CreatedAt?: string;
}

const Home = () => {
    const [items, setItems] = useState<Item[]>([]);
    const [newContent, setNewContent] = useState('')
    const [editingItem, setEditingItem] = useState<number | null>(null)
    const [editContent, setEditContent] = useState('')

    // READ
    const fetchItems = async () => {
        try {
            const response = await axios.get(API_URL)
            setItems(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchItems();
    }, [])

    // CREATE
    const addItem = async (e: any) => {
        e.preventDefault()
        try {
            const response = await axios.post(API_URL, { content: newContent })
            setItems([response.data, ...items])
            setNewContent('')
            alert("Kirje edukalt lisatud!")
        } catch (error) {
            console.log(error)
            alert("Lisamine ebaõnnestus")
        }
    }

    // DELETE
    const deleteItem = async (id: number) => {
        if (!window.confirm(`Kas sa oled kindel, et soovid kirjet nr ${id} kustutada?`)) return
        try {
            await axios.delete(`${API_URL}/${id}`)
            // @ts-ignore
            setItems(prevItems => prevItems.filter(item => item.Id !== id))
        } catch (error) {
            alert("Kustutamine ebaõnnestus")
            console.log(error)
        }
    }

    // UPDATE
    const updateItem = async (id: number) => {
        try {
            const response = await axios.put(`${API_URL}/${id}`, { content: editContent })
            // @ts-ignore
            setItems(items.map(item => (item.Id === id ? response.data : item)))
            setEditingItem(null)
        } catch (error) {
            alert("Uuendamine ebaõnnestus")
            console.log(error)
        }
    }

    return (
        <div className="items-container">
            <h2 className="title">Andmebaasi haldur</h2>

            <form onSubmit={addItem} className="add-form">
                <input
                    className="input-field"
                    type="text"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                    placeholder="Lisa uus kirje..."
                    required
                />
                <button type="submit" className="btn btn-add">Lisa</button>
            </form>

            <ul className="items-list">
                {items.map(item => (
                    <li key={item.Id} className="item-row">
                        {editingItem === item.Id ? (
                            <div className="edit-container">
                                <input
                                    className="input-field"
                                    value={editContent}
                                    onChange={(e) =>
                                        setEditContent(e.target.value)}
                                />

                                <button className="btn btn-save" onClick={() => updateItem(item.Id)}>
                                    Salvesta
                                </button>

                                <button className="btn btn-cancel" onClick={() => setEditingItem(null)}>
                                    Tühista
                                </button>
                            </div>
                        ) : (
                            <>
                                <span className="item-content">{item.Content}</span>

                                <div className="button-group">
                                    <button className="btn btn-edit" onClick={() => {
                                        setEditingItem(item.Id);
                                        setEditContent(item.Content);
                                    }}>
                                        Muuda
                                    </button>

                                    <button className="btn btn-delete" onClick={() => deleteItem(item.Id)}>
                                        Kustuta
                                    </button>
                                </div>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;