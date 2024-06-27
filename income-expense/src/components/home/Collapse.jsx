import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Collapse(props) {
  const [amount,setAmount] = useState([])
  const [data,setData] = useState([])
  
  const BASE_URL = "http://localhost:3000/api"
  
  async function fetchData() {
    try{
      const res = await axios.get(`${BASE_URL}/today-list`)
      setData(res.data)
    }catch(err){
      console.log(err);
    }
  }
  
  async function fetchAmount() {
    try{
      const res = await axios.get(`${BASE_URL}/today-amount`)
      setAmount(res.data)
      // console.log(res.data);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(() => {
    fetchAmount()
    fetchData()
  },[props.newData])

  return (
    <>
        <div className="collapse bg-base-200">
            <input type="checkbox" />
            <div className="collapse-title text-2xl font-medium">{ props.cat }</div>
            <div className="collapse-content grid gap-1">
              <div>
                {
                  data.filter(dt => dt.cat_id === props.id).map((dt) => (
                    <div className='grid grid-cols-2 gap-4' key={dt.id}>
                      <span>{dt.name}</span>
                      <span>{dt.amount} Baht</span>             
                    </div>
                  ))
                }
              </div>
              {
                amount.filter(a => a.cat_id === props.id).map((a) => (
                  <span className="font-medium text-xl lg:text-xl md:text-xl sm:text-xl" key={a.cat_id}>Total: {a.total} Baht</span>
                ))
              }
            </div>
        </div>
    </>
  )
}

Collapse.propTypes = {
    cat: PropTypes.string,
    id: PropTypes.number,
    newData: PropTypes.object
};

export default Collapse