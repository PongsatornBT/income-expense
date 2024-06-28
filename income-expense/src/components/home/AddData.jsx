import { useState, useRef } from "react";
import Dropdown from "./Dropdown";
import axios from "axios";
import CheckBox from "./CheckBox";
import PropTypes from 'prop-types';
import { notifySuccess, warning } from "../notify/Notify";
import { ToastContainer } from 'react-toastify';

function AddData({ setData }) {
  const BASE_URL = "http://localhost:3000/api";
  const formRef = useRef(null);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState('');
  const [cat_id, setCatId] = useState(0);
  const [type_id, setTypeId] = useState(0);

  const [dropdownKey, setDropdownKey] = useState(Date.now()); // Key for resetting Dropdown component
  const [checkBoxKey, setCheckBoxKey] = useState(Date.now()); // Key for resetting CheckBox component

  async function addStatistic() {
    try {
      const res = await axios.post(`${BASE_URL}/add`, { name, amount, description, cat_id, type_id });
      console.log(res.data, res.status);
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === 'name') setName(value);
    else if (name === 'amount') setAmount(value);
    else if (name === 'description') setDescription(value);
    // Handle other inputs similarly
  }

  function handleSelected(event) {
    setCatId(event.target.value);
  }

  function handleChecked(event) {
    setTypeId(event.target.value);
  }

  function handleDropdownReset() {
    setDropdownKey(Date.now()); // Update key to reset Dropdown component
  }

  function handleCheckBoxReset() {
    setCheckBoxKey(Date.now()); // Update key to reset CheckBox component
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (cat_id === 0) {
      warning('category');
    } else if (type_id === 0) {
      warning('type');
    } else if (name === '') {
      warning('name');
    } else {
      addStatistic();
      notifySuccess();
      setData({
        name: name,
        amount: amount,
        description: description,
        cat_id: cat_id,
        type_id: type_id
      })
      // Reset local state
      setName('');
      setAmount(0);
      setDescription('');
      setCatId(0);
      setTypeId(0);
      // Reset custom components
      handleDropdownReset();
      handleCheckBoxReset();
      // Reset form using ref
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }

  return (
    <div>
      <ToastContainer />
      <h1 className="pb-2 font-bold text-3xl lg:text-6xl md:text-5xl sm:text-4xl">Today</h1><br />
      <form ref={formRef} onSubmit={handleSubmit} className="grid grid-rows-6 grid-flow-col gap-4">
        <div>
          <label>Category <span className="text-red-500">*</span></label><br />
          <Dropdown key={dropdownKey} callback={handleSelected} />
        </div>
        <div>
          <label>Name <span className="text-red-500">*</span></label><br />
          <input type="text" name="name" value={name} onChange={handleChange} placeholder="Type here" className="input input-bordered w-full max-w-md min-w-48" required />
        </div>
        <div>
          <label>Amount <span className="text-red-500">*</span></label><br />
          <input type="number" name="amount" value={amount} onChange={handleChange} placeholder="Type here" className="input input-bordered w-full max-w-md min-w-48" required />
        </div>
        <div>
          <label>Description</label><br />
          <input type="text" name="description" value={description} onChange={handleChange} placeholder="Type here" className="input input-bordered w-full max-w-md min-w-48" />
        </div>
        <CheckBox key={checkBoxKey} callback={handleChecked} />
        <button type="submit" className="btn btn-neutral btn-md max-w-56">Submit</button>
      </form>
    </div>
  )
}

AddData.propTypes = {
  setData: PropTypes.func,
};

export default AddData;
