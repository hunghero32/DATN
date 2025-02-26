import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteUser, fetchUsers } from "../../../../features/slices/userSlice";
import moment from 'moment';
const ListUser = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch])
  const handleDeleteUser = (u) => {
    if (window.confirm("Bạn muốn xoá ?")) {
      dispatch(deleteUser(u));
    }
  }
  return (
    <div className="content-inner container-fluid pb-0" id="page_layout">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Danh Sách Người Dùng</h4>
              </div>
            </div>
            <div className="card-body">
              <div id="edit-table" className="table-editable">
                <span className="table-add float-end mb-3 me-2">
                  <Link to="/admin/user/create" className="btn btn-sm btn-primary-subtle">
                    <i className="ri-add-fill">
                      <span className="ps-1">Thêm Mới Người Dùng</span>
                    </i>
                  </Link>
                </span>
                <div className="table-responsive w-100">
                  <table className="table table-bordered table-striped text-center">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>created_at</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users?.map((u) => (
                        <tr key={u?.id}>
                          <td >{u?.id}</td>
                          <td >{u?.name}</td>

                          <td >{u?.email}</td>
                          <td >{u?.phone ? u?.phone : "Chưa có số điện thoại"}</td>
                          <td >{u?.role}</td>
                          <td >{moment(u?.created_at).fromNow()}</td>
                          <td>
                            <span className="table-remove">
                              <button
                                type="button"
                                className="btn btn-danger btn-sm my-0"
                                onClick={() => handleDeleteUser(u)}
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                              <Link
                                to={`/admin/user/edit/${u?.id}`}
                                className="btn btn-warning btn-sm my-0"
                              >
                                <i className="ri-edit-line"></i>
                              </Link>
                            </span>
                          </td>
                        </tr>
                      ))}

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

export default ListUser;
