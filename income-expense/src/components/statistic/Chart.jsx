import PropTypes from 'prop-types';
import BarChart from './BarChart';

function Chart({date}) {
  
  return (
    <>
      <div className='grid grid-cols-2'>
        <span className="font-thin text-xl lg:text-4xl md:text-2xl sm:text-xl">Start: {date.dateStart}</span>
        <span className="font-thin text-xl lg:text-4xl md:text-2xl sm:text-xl">End: {date.dateEnd}</span>
      </div>
      <BarChart date={date}/>
    </>
  )
}

Chart.propTypes = {
  date: PropTypes.object,
};
export default Chart