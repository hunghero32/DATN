import React from "react";
import { Link } from "react-router-dom";

const ListBooking = () => {
  return (
    <div className="content-inner container-fluid pb-0" id="page_layout">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Danh Sách Booking</h4>
              </div>
            </div>
            <div className="card-body">
              <div id="edit-table" className="table-editable">
                <span className="table-add float-end mb-3 me-2">
                  <Link
                    to="/admin/booking/create"
                    className="btn btn-sm btn-primary-subtle"
                  >
                    <i className="ri-add-fill">
                      <span className="ps-1">Thêm Mới Booking</span>
                    </i>
                  </Link>
                </span>
                <div className="table-responsive w-100">
                  <table className="table table-bordered table-striped text-center">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Doctor</th>
                        <th>Service</th>
                        <th>Guest</th>
                        <th>Booking Date</th>
                        <th>Booking Time</th>
                        <th>Note</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td contenteditable="true">Gio Metric</td>
                        <td contenteditable="true">25</td>
                        <td contenteditable="true">Deepends</td>
                        <td contenteditable="true">Spain</td>
                        <td contenteditable="true">Madrid</td>
                        <td contenteditable="true">Time</td>
                        <td contenteditable="true">Time</td>
                        <td>
                          <span className="table-up">
                            <a href="#!" className="indigo-text">
                              <i
                                className="fa fa-long-arrow-up"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </span>
                          <span className="table-down">
                            <a href="#!" className="indigo-text">
                              <i
                                className="fa fa-long-arrow-down"
                                aria-hidden="true"
                              ></i>
                            </a>
                          </span>
                        </td>
                        <td>
                          <span className="table-remove">
                            <button
                              type="button"
                              className="btn btn-danger-subtle btn-rounded btn-sm my-0"
                            >
                              Remove
                            </button>
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListBooking;
