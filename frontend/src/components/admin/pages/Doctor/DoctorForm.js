import { useForm } from "react-hook-form";

const DoctorForm = () => {
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
              <h4 className="card-title">Thêm Mới Bác Sĩ</h4>
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
                <label className="form-label" htmlFor="doctor_name">Doctor Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("doctor_name", { required: "Vui lòng nhập tên bác sĩ" })}
                />
                {errors.doctor_name && <span className="text-danger">{errors.doctor_name.message}</span>}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="doctor_bio">Doctor Bio</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("doctor_bio", { required: "Vui lòng nhập thông tin bác sĩ" })}
                />
                {errors.doctor_bio && <span className="text-danger">{errors.doctor_bio.message}</span>}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="specialty_id">Chuyên Khoa</label>
                <select className="form-select" {...register("specialty_id", { required: "Vui lòng chọn chuyên khoa" })}>
                  <option value="">Select Specialty</option>
                  <option value="1">Chuyên khoa 1</option>
                  <option value="2">Chuyên khoa 2</option>
                </select>
                {errors.specialty_id && <span className="text-danger">{errors.specialty_id.message}</span>}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="exp">EXP</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("exp", { required: "Vui lòng nhập kinh nghiệm" })}
                />
                {errors.exp && <span className="text-danger">{errors.exp.message}</span>}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="file">File Tải Lên</label>
                <input type="file" className="form-control" {...register("file", { required: "Vui lòng chọn file" })} />
                {errors.file && <span className="text-danger">{errors.file.message}</span>}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="avatar">Ảnh Đại Diện</label>
                <input type="file" className="form-control" {...register("avatar", { required: "Vui lòng chọn ảnh đại diện" })} />
                {errors.avatar && <span className="text-danger">{errors.avatar.message}</span>}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="approve">Approve</label>
                <select className="form-select" {...register("approve", { required: "Vui lòng chọn trạng thái" })}>
                  <option value="">Approve</option>
                  <option value="1">Dis 1</option>
                  <option value="2">End 2</option>
                </select>
                {errors.approve && <span className="text-danger">{errors.approve.message}</span>}
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

export default DoctorForm;
