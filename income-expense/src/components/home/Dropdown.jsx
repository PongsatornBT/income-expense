import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function Dropdown({callback}) {
  const [category,setCat] = useState([])

  const BASE_URL = "http://localhost:3000/api"

  async function fetchCat() {
    try{
      const res = await axios.get(`${BASE_URL}/category`)
      // console.log(res.data);
      setCat(res.data)
    }catch(err){
      console.log(err);
    }
  }

  useEffect(() => {
    fetchCat()
  },[])

  return (
    <>
        <select onChange={callback} className="select select-bordered w-full max-w-md min-w-48" required>
          <option name="category" selected hidden value="0">Category</option>
          {
            category.map((cat) => (
              <option value={cat.cat_id} key={cat.cat_id}>{cat.cat_name}</option>
            ))
          }
        </select>
    </>
  )
}

Dropdown.propTypes = {
  callback: PropTypes.func
};

export default Dropdown