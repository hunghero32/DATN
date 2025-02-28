
import { useEffect, useState } from "react";
import moment from "moment";
import { useSelector, useDispatch } from "react-redux";
import { fetchGuests, deleteGuest } from "../../../../features/slices/guestSlice";
import { Link } from "react-router-dom";


const ListGuest = () => {
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const { guests } = useSelector((state) => state.guest);
  console.log(guests);

  useEffect(() => {
    dispatch(fetchGuests());
  }, [dispatch]);


  const handleDeleteGuest = (g) => {
    if (window.confirm("Bạn muốn xoá ?")) {
      dispatch(deleteGuest(g));
    }
  }
  const handleGenderChange = (e, id) => {
    console.log(`Gender changed for ID: ${id}, Value: ${e.target.value}`);
  };
  return (
    <div className="content-inner container-fluid pb-0" id="page_layout">
      <div className="row">
        <div className="col-sm-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between">
              <div className="header-title">
                <h4 className="card-title">Danh Sách Khách Hàng</h4>
              </div>
            </div>
            <div className="card-body">
              <div id="edit-table" className="table-editable">
                <span className="table-add float-end mb-3 me-2">
                  <Link
                    to="/admin/guest/create"
                    className="btn btn-sm btn-primary-subtle"
                  >
                    <i className="ri-add-fill">
                      <span className="ps-1">Thêm Mới Khách Hàng</span>
                    </i>
                  </Link>
                </span>
                <div className="table-responsive w-100">
                  <table className="table table-bordered table-striped text-center">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name guest</th>
                        <th>Gender</th>
                        <th>Birthday</th>
                        <th>Phone guest</th>
                        <th>Email guest</th>
                        <th>Address</th>
                        <th>File</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {guests?.map((g) => (
                        <tr key={g?.id}>
                          <td>{g?.id}</td>
                          <td>{g?.guest_name}</td>
                          <td>
                            <select value={g?.gender} onChange={(e) => handleGenderChange(e, g?.id)}>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                              <option value="other">Other</option>
                            </select>
                          </td>
                          <td>{moment(g?.birthday).format("YYYY-MM-DD")}</td>
                          <td>{g?.guest_phone || "Chưa có số điện thoại"}</td>
                          <td>{g?.guest_email}</td>
                          <td>
                            {g?.address}
                            {errors?.[g?.id]?.address && (
                              <div className="text-danger">{errors[g?.id]?.address[0]}</div>
                            )}
                          </td>
                          <td>
                            {g?.file}
                            {errors?.[g?.id]?.file && (
                              <div className="text-danger">{errors[g?.id]?.file[0]}</div>
                            )}
                          </td>
                          <td>
                            <span className="table-remove">
                              <button
                                type="button"
                                className="btn btn-danger btn-sm my-0"
                                onClick={() => handleDeleteGuest(g)}
                              >
                                <i className="ri-delete-bin-line"></i>
                              </button>
                              <Link
                                to={`/admin/guest/edit/${g?.id}`}
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

export default ListGuest;
