import axios from 'axios';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

function CheckBox({callback}) {
  const [type,setType] = useState([])

  const BASE_URL = "http://localhost:3000/api"

  async function fetchType() {
    try{
        const res = await axios.get(`${BASE_URL}/type`)
        // console.log(res.data);
        setType(res.data)
    }catch(err){
        console.log(err);
    }
  }

  useEffect(() => {
    fetchType()
  },[])

  return (
    <div className="max-h-10">
        {
            type.map((ty) => (
                <label className="badge badge-lg cursor-pointer" key={ty.type_id}>
                    <input type="radio" name="type" onChange={callback} className="radio" value={ty.type_id} />
                    <span className="px-4">{ty.type_name}</span>
                </label>
            ))
        }
    </div>
  )
}

CheckBox.propTypes = {
    callback: PropTypes.func
};

export default CheckBox