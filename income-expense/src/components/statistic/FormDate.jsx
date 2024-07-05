import { useState } from "react"
import DropdownMonth from "./DropdownMonth"
import DropdownYear from "./DropdownYear"
import PropTypes from 'prop-types';

function FormDate({setDate}) {
  const now = new Date()
  const [year, setYear] = useState(now.getFullYear())
  const [monthStart, setMonthStart] = useState('01')
  const [monthEnd, setMonthEnd] = useState('12')
  const [dateStart, setDateStart] = useState(year+'-'+monthStart)
  const [dateEnd, setDateEnd] = useState(year+'-'+monthEnd)

  function handleYear(event) {
    setYear(event.target.value);
  }
  
  function handleMonth(event) {
    if(event.target.id === "start"){
      setMonthStart(event.target.value)
    }else if(event.target.id === "end"){
      setMonthEnd(event.target.value)
    }
  }

  function handleSubmit(event){
    event.preventDefault();
    const newDateStart = year+'-'+monthStart
    const newDateEnd = year+'-'+monthEnd
    //use variable to update new date real time
    setDateStart(newDateStart)
    setDateEnd(newDateEnd)
    setDate({
      dateStart:newDateStart,
      dateEnd:newDateEnd
    })
  }
  return (
    <div>
        <h1 className="pb-2 font-bold text-3xl lg:text-6xl md:text-5xl sm:text-4xl">Statistic</h1><br />
        <form onSubmit={handleSubmit} className="grid grid-rows-6 grid-flow-col gap-4">
          <DropdownYear handleYear={handleYear}/>
          <div>
            <label>Month start</label><br />
            <DropdownMonth handleMonth={handleMonth} id="start"/>
          </div>
          <div>
            <label>Month end</label><br />
            <DropdownMonth handleMonth={handleMonth} id="end" start={monthStart} />
          </div>
          <button type="submit" className="btn btn-neutral btn-md max-w-56">Submit</button>
      </form>
    </div>
  )
}

FormDate.propTypes = {
  setDate: PropTypes.func,
};
export default FormDate