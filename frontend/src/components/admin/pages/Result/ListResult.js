import React from "react";
import { Link } from "react-router-dom";

const ListResult = () => {
  return (
    <div className="content-inner container-fluid pb-0" id="page_layout">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Danh Sách Kết Quả</h4>
              </div>
            </div>
            <div className="card-body">
              <div id="edit-table" className="table-editable">
                <span className="table-add float-end mb-3 me-2">
                  <Link
                    to="/admin/result/create"
                    className="btn btn-sm btn-primary-subtle"
                  >
                    <i className="ri-add-fill">
                      <span className="ps-1">Thêm Mới Kết Quả</span>
                    </i>
                  </Link>
                </span>
                <div className="table-responsive w-100">
                  <table className="table table-bordered table-striped text-center">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Company Name</th>
                        <th>Country</th>
                        <th>City</th>
                        <th>Sort</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td contenteditable="true">Gio Metric</td>
                        <td contenteditable="true">25</td>
                        <td contenteditable="true">Deepends</td>
                        <td contenteditable="true">Spain</td>
                        <td contenteditable="true">Madrid</td>
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
                      <tr>
                        <td contenteditable="true">Manny Petty</td>
                        <td contenteditable="true">45</td>
                        <td contenteditable="true">Insectus</td>
                        <td contenteditable="true">France</td>
                        <td contenteditable="true">San Francisco</td>
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
                      <tr>
                        <td contenteditable="true">Lucy Tania</td>
                        <td contenteditable="true">26</td>
                        <td contenteditable="true">Isotronic</td>
                        <td contenteditable="true">Germany</td>
                        <td contenteditable="true">Frankfurt am Main</td>
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
                      <tr className="hide">
                        <td contenteditable="true">Anna Mull</td>
                        <td contenteditable="true">35</td>
                        <td contenteditable="true">Portica</td>
                        <td contenteditable="true">USA</td>
                        <td contenteditable="true">Oregon</td>
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

export default ListResult;
