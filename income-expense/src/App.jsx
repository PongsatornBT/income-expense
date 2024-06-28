import AddData from "./components/home/AddData"
import DataList from "./components/home/DataList"
import NavBar from "./components/home/NavBar"
import './App.css';
import { useState } from "react";

function App() {
  const [data, setData] = useState({
    name: '',
    amount: 0,
    description: '',
    cat_id: 0,
    type_id: 0
  })
  
  return (
    <>
      <NavBar />
      <div className="px-20 lg:pt-20 md:pt-10 grid gap-10 lg:grid-cols-2 md:lg:grid-cols-1">
        <AddData setData={setData}/>
        <DataList newData={data} />
      </div>
    </>
  )
}

export default App
