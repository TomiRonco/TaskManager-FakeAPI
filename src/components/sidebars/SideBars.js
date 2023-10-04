import NavBars from "../navbars/NavBars";
import "./SideBars.css";
import { BsListTask } from "react-icons/bs";

const SideBars = () => {
  return (
    <>
      <NavBars />
      <div className="sideBars">
        <button type="button" class="btn btn-custom"><BsListTask/>TaskView</button>
        <button type="button" class="btn btn-custom"><BsListTask/>TaskView</button>
        <button type="button" class="btn btn-custom"><BsListTask/>TaskView</button>
        <button type="button" class="btn btn-custom"><BsListTask/>TaskView</button>
      </div>
    </>
  );
};

export default SideBars;
