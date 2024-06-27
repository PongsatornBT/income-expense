import { Link } from "react-router-dom";

function NavBar() {
  return (
    <>
    <div className="navbar bg-base-100 flex flex-wrap justify-between">
    <div>
        <div className="btn btn-ghost text-xl">
          <Link to="/home">Income & Expense</Link>
        </div>
      </div>
      <div className="items-end">
        <ul className="menu menu-horizontal px-1 text-lg ">
          <li>
            <Link to="/Statistic">Statistic</Link>
            </li>
          <li>
            <Link to="/home">Home</Link>
          </li>
        </ul>
      </div>
    </div>
    </>
  )
}

export default NavBar