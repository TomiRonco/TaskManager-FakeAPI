import "./NavBars.css";

import { IoMdNotificationsOutline } from "react-icons/io";

const NavBars = () => {
  return (
    <div class="container-fluid">
      <div class="row align-items-center navbars">
        <div class="col-9 text-white">LOGO</div>
        <div class="col-1 text-white text-end">Francisco</div>
        <div class="col-1 text-white text-end">
          <IoMdNotificationsOutline />
        </div>
        <div class="col-1 text-end text-white">foto</div>
      </div>
    </div>
  );
};

export default NavBars;
