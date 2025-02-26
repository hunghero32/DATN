import { useForm } from "react-hook-form";

const GuestForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <div className="content-inner container-fluid pb-0" id="page_layout">
      <div className="row">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <div className="header-title">
              <h4 className="card-title">Thêm Mới Khách Hàng</h4>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="user_id">User</label>
                <select className="form-select" {...register("user_id", { required: "Vui lòng chọn User" })}>
                  <option value="">Select User</option>
                  <option value="1">User 1</option>
                  <option value="2">User 2</option>
                </select>
                {errors.user_id && <span className="text-danger">{errors.user_id.message}</span>}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="guest_name">Guest Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("guest_name", { required: "Vui lòng nhập tên khách hàng" })}
                />
                {errors.guest_name && <span className="text-danger">{errors.guest_name.message}</span>}
              </div>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="gender">Gender</label>
                <select className="form-select" {...register("gender", { required: "Vui lòng chọn giới tính" })}>
                  <option value="">Select Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Feal Male</option>
                  <option value="3">Other</option>
                </select>
                {errors.gender && <span className="text-danger">{errors.gender.message}</span>}
              </div>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="birthday">Birthday</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  {...register("birthday", { required: "Vui lòng chọn ngày sinh" })}
                />
                {errors.birthday && <span className="text-danger">{errors.birthday.message}</span>}
              </div>

          

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="guest_phone">Guest Phone</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("guest_phone", { required: "Vui lòng nhập số điện thoại khách hàng" })}
                />
                {errors.guest_phone && <span className="text-danger">{errors.guest_phone.message}</span>}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="guest_email">Guest Email</label>
                <input
                  type="email"
                  className="form-control"
                  {...register("guest_email", { required: "Vui lòng nhập Email khách hàng" })}
                />
                {errors.guest_email && <span className="text-danger">{errors.guest_email.message}</span>}
              </div>
              
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="address">Addresss</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("address", { required: "Vui lòng nhập địa chỉ" })}
                />
                {errors.address && <span className="text-danger">{errors.address.message}</span>}
              </div>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="file">File Tải Lên</label>
                <input type="file" className="form-control" {...register("file", { required: "Vui lòng chọn file" })} />
                {errors.file && <span className="text-danger">{errors.file.message}</span>}
              </div>


              <button type="reset" className="btn btn-danger-subtle">Nhập Lại</button>
              <button type="submit" className="btn btn-primary-subtle">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestForm;
