import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import PropTypes from 'prop-types';
import { useEffect,useState } from 'react';
import axios from 'axios';

function BarChart ({date}) {
  const BASE_URL = "http://localhost:3000/api"
  const [fetch,setData] = useState([])

  async function fetchData() {
    try{
      const res = await axios.post(`${BASE_URL}/statistic`,date)
      setData(res.data)
    }catch(err){
      console.log(err);
    }
  }
  console.log(date);
  
  useEffect(()=>{
    fetchData()
  },[date])

  const data = {
    labels: fetch.map(item => item.year_month),
    datasets: [
      {
        label: 'Income',
        data: fetch.map(item => item.income),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
      },
      {
        label: 'Expense',
        data: fetch.map(item => item.expense),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
      },
    ],
  };
  
  

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}

BarChart.propTypes = {
  date: PropTypes.object,
};
export default BarChart;
