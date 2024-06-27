// import { useState } from "react"
import Dropdown from "./Dropdown"
import axios from "axios"
import CheckBox from "./CheckBox"  
import PropTypes from 'prop-types';

import { notifySuccess,warning } from "../notify/Notify"
import { ToastContainer } from 'react-toastify';

function AddData({ data, setData }) {
  const BASE_URL = "http://localhost:3000/api"
  // const [data, setData] = useState({
  //   name: '',
  //   amount: 0,
  //   description: '',
  //   cat_id: 0,
  //   type_id: 0
  // })

  async function addStatistic() {
    try{
      const res = await axios.post(`${BASE_URL}/add`, data)
      console.log(res.data, res.status);
    }catch(err){
      console.log(err);
    }
  }
  function handleChange(event) {
    const { name, value } = event.target;
    setData(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function handleSelected(event) {
    setData((perviousState) => ({
      ...perviousState,
      cat_id: event.target.value
    }))
  }

  function handleChecked(event) {
    setData((perviousState) => ({
      ...perviousState,
      type_id: event.target.value
    }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if(data.cat_id === 0){
      warning('category')
    }else if(data.type_id === 0){
      warning('type')
    }else if(data.name === ''){
      warning('name')
    }else{
      addStatistic()
      notifySuccess()
      const form = e.target.closest('form');
      if (form) {
        form.reset();
      }
      setData({
        name: '',
        amount: 0,
        description: '',
        cat_id: 0,
        type_id: 0
      })
    }
  }

  return (
    <div>
      <ToastContainer/>
      <h1 className="pb-2 font-bold text-3xl lg:text-6xl md:text-5xl sm:text-4xl">Today</h1><br/>
      <form onSubmit={handleSubmit} className="grid grid-rows-6 grid-flow-col gap-4">
        <div>
          <label>Category <span className="text-red-500">*</span></label><br />
          <Dropdown callback={handleSelected} />
        </div>
        <div>
          <label>Name <span className="text-red-500">*</span></label><br />
          <input type="text" name="name" onChange={handleChange} placeholder="Type here" className="input input-bordered w-full max-w-md min-w-48" required />
        </div>
        <div>
          <label>Amount <span className="text-red-500">*</span></label><br />
          <input type="number" name="amount" onChange={handleChange} placeholder="Type here" className="input input-bordered w-full max-w-md min-w-48" required />
        </div>
        <div>
          <label>Description</label><br />
          <input type="text" name="description" onChange={handleChange} placeholder="Type here" className="input input-bordered w-full max-w-md min-w-48" />
        </div>
        <CheckBox callback={handleChecked}/>
        <button className="btn btn-neutral btn-md max-w-56">Submit</button>
      </form> 
    </div>
  )
}

AddData.propTypes = {
  setData: PropTypes.func,
  data: PropTypes.object
};
export default AddData