import Collapse from "./Collapse"
import axios from 'axios';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function DataList({ newData }) {
  const [data,setData] = useState([])
  
  const BASE_URL = "http://localhost:3000/api"
  
  async function fetchData() {
    try{
      const res = await axios.get(`${BASE_URL}/today-cat`)
      // console.log(res.data);
      setData(res.data)
    }catch(err){
      console.log(err);
    }
  }

  let result = ''
  if(data.length === 0){
    result = (
      <span>Data entry</span>
    )
  }else{
    result = (
      data.map((dt, index) => (
        <Collapse key={index} newData={newData} cat={dt.cat_name} id={dt.cat_id} />
      ))
    )
  }

  useEffect(() => {
    fetchData()
    // console.log('test');
  },[newData])

  return (
    <div>
      <h1 className="font-thin text-3xl lg:text-6xl md:text-5xl sm:text-4xl">Data-List</h1><br/>
      <div className="grid max-w-3xl min-w-md gap-4">
        {
          result
        }
      </div>
    </div>
  )
}

DataList.propTypes = {
  newData: PropTypes.object,
};

export default DataList