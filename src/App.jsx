import Search from "./search.jsx";
import {FiPlus} from "react-icons/fi"

import { useState } from "react";
import './App.scss'
function App() {
  const [todos, setTodos] = useState([
    { id: 0, name: "learn react" ,deleted:false},
    { id: 1, name: "spend quality time with my girlfriend",deleted:false },
  ]);
  const [completed,setCompleted] = useState([])
  const [isSearch,setIsSearch] = useState(false)
  const [add,setAdd] = useState(false)
  const [searchText,setSearchText] = useState("")
  const [selected,setSelected] = useState("all")
  function List({ id, name,deleted }) {
    
    const handleCheckboxChange = (e) => {
      const deletedTodo = todos.find((todo) => todo.id === id);
      if(deletedTodo!==undefined){
        deletedTodo.deleted = true
        setCompleted((com)=>[...com,deletedTodo])
      }
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      
      
    };
  
    return (
      <div style={{paddingBottom:"3px",fontWeight:"400"}}>
        <li style = {{borderBottom:"1px solid grey",paddingBottom:"5px"}} key={id}>
        <input type="checkbox" checked ={deleted} onChange={handleCheckboxChange} />
        {name}
      </li>
      </div>
    );
  }
  function handleSearch(){
    setIsSearch(!isSearch)
    setAdd(false)
    setSearchText("")
  }
  function handleAdd(){
    
      setAdd(!add)
      if (isSearch!== add){
        setIsSearch(false)
      }
  
  }
  function AddElement(element){
    setTodos([...todos,{id:todos.length+1,name:element,deleted:false}])
    
  }
  
  function handleList(active){
    setSelected(active)
  }
  let ourList;
  if (selected==="all"){
      ourList = [...todos,...completed]
  }
  else if (selected === "active"){
    ourList = [...todos]
  }
  else{
    ourList = [...completed]
  }
  const filteredTodos = ourList.filter((todo) =>
    todo.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className="App">
      <p style={{height:"5%",fontSize:"35px",color:"#264FAD"}}>My To Do List</p>
      <div className="container">
        <div>{isSearch && <Search  value={searchText} onChange={e=>setSearchText(e.target.value)} />}
        {add && <Add handleAdd={AddElement} />}
        <ul style={{maxHeight:"65vh",overflowY:"auto",listStyle:"none"}}>{filteredTodos.map((todo) => <List key={todo.id} {...todo} />)}</ul>
        </div>
        <div className="footer">
          <Footer handleList={handleList} handleAdd ={handleAdd} handle = {handleSearch} length = {todos.length}/>
        </div>
      </div>
      
    </div>
  );
}

export default App;
function Footer({handleList,handleAdd,handle,length}){
  const [style,setStyle] = useState("all")
return (
  <div className="container1">
    <div className="c2">
       <div>
          <button style = {{paddingRight:"0px"}} onClick={handleAdd}>
            <FiPlus style={{fontSize:"26px"}}/>
          </button>
       </div>
       <div>
          <button style = {{borderRight:"1px solid black", marginRight:"10px"}} onClick={handle}>
          <span class="material-symbols-outlined">search</span>
          </button>
       </div>
       <div>
          <p>{length} items left</p>
       </div>
    </div>
    <div className="buttons">
      <button style={{border:style==="all" ? "1px black solid" : "none"} } onClick={()=>{
        handleList("all")
        setStyle("all")
        }}>All</button>
      <button style={{border:style==="active" ? "1px black solid" : "none"} } onClick={()=>{
        handleList("active")
        setStyle("active")
        }}>Active</button>
      <button style={{border:style==="complete" ? "1px black solid" : "none"} }  onClick={()=>{
        handleList("complete");
        setStyle("complete")
        }}>Completed</button>
    </div>
  </div>
)
}
function Add({handleAdd}){
  const [text,setText] = useState("")
  function handleText(e){
    setText(e.target.value)
  }
  return (
    <div className="add">
    <input type="text" value ={text} onChange={handleText} />
    <button onClick={()=>
      {handleAdd(text);
      setText('')
      }
      }>Add</button>
    </div>
  )
}
