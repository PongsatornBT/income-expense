import { useState } from "react"
import NavBar from "../home/NavBar"
import Chart from "./Chart"
import FormDate from "./FormDate"
  

function Statistic() {
  const now = new Date()
  const yearNow = now.getFullYear()
  const [date, setDate] = useState(
    {
      dateStart:`${yearNow}-01`,
      dateEnd:`${yearNow}-12`
    }
  )
  
  return (
    <>
        <NavBar />
        <div className="px-20 lg:pt-20 md:pt-10 grid gap-10 lg:grid-cols-3 md:lg:grid-cols-1">
          <FormDate setDate={setDate} />
          <div className="col-span-2">
            <Chart date={date} />
          </div>
        </div>
    </>
  )
}

export default Statistic

