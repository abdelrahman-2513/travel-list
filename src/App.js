import { useState } from "react";


export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(item) {
    setItems((items) => [...items, item])
  }
  function handleDleteItems(id) {
    setItems((items) => items.filter(item => item.id !== id))
  }
  function handleDlete() {
    setItems([])

  }
  function handleUpdateItems(id) {
    setItems((items) => items.map(item => item.id === id ? { ...item, packed: !item.packed } : item))
  }
  return <div className="app">
    <Logo />
    <Form onAddItem={handleAddItems} />
    <PakingList items={items} onDeleteItem={handleDleteItems} onUpdateItem={handleUpdateItems} handleDlete={handleDlete} />
    <Stats items={items} />
  </div>
}

function Logo() {
  return <h1>👜Far 😍Away</h1>
}
function Form({ onAddItem }) {
  const [desc, setDesc] = useState("");
  const [quantity, setQuantity] = useState(1);



  function handlerAdd(e) {
    e.preventDefault();
    if (!desc) return
    const NewItem = { description: desc, quantity, id: Date.now(), packed: false }
    console.log(NewItem)
    onAddItem(NewItem)
    setDesc("");
    setQuantity(1)
  }


  return <form className="add-form" onSubmit={handlerAdd}>
    <h3>What do you need for 😍your trip?</h3>
    <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
      {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (<option value={num} key={num}>
        {num}
      </option>))}
    </select>
    <input type="text" placeholder="item..." value={desc} onChange={(e) => setDesc(e.target.value)}></input>
    <button>Add</button>
  </form>
}
function PakingList({ items, onDeleteItem, onUpdateItem, handleDlete }) {
  const [sortby, setSortby] = useState("input")
  let sortedItems;
  if (sortby === "input") sortedItems = items;
  if (sortby === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description));
  if (sortby === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed));
  // function deleteItems() {
  //   sortedItems = []
  //   console.log(sortedItems)
  // }
  return <div className="list">
    <ul >
      {sortedItems.map((item) => <Item item={item} onDeleteItem={onDeleteItem} handleUpdateItems={onUpdateItem} key={item.id} />)}
    </ul>
    <div className="actions">
      <select value={sortby} onChange={(e) => setSortby(e.target.value)}>
        <option value="input">Order by input</option>
        <option value="description">Order by description</option>
        <option value="packed">Order by packed</option>
      </select>
      <button onClick={handleDlete}>Clear List</button>
    </div>
  </div>
}
function Item({ item, onDeleteItem, handleUpdateItems }) {



  return <li >
    <input type="checkbox" value={item.packed} onChange={() => handleUpdateItems(item.id)} />
    <span style={item.packed ? { textDecoration: "line-through" } : {}} >
      {item.quantity} {item.description}
    </span>
    <button onClick={() => onDeleteItem(item.id)}>❌</button>
  </li>
}
function Stats({ items }) {
  if (!items.length)
    return <p className="stats">start adding new items to be packed 😊</p>

  const numOfItems = items.length;
  const packedItems = items.filter(item => item.packed).length;
  const percentage = Math.round(packedItems / numOfItems * 100);
  return <footer className="stats">
    {percentage === 100 ? <em>you are ready to go now✈️</em> : <em>
      `👜 You have {numOfItems} items on your list and packs {packedItems} ({percentage} %)`
    </em>}

  </footer>
}