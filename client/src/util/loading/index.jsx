import React from "react";
import {
  SemipolarLoading,

} from "react-loadingg";
import './style.scss'
const ContainerLoading = () => (
  <>
    <div className="modal_overlay ">
      <div className="modal_content">
        <SemipolarLoading />
      </div>
    </div>
  </>
);
export default ContainerLoading;
