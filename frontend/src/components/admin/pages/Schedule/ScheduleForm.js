import { useForm } from "react-hook-form";

const ScheduleForm = () => {
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
              <h4 className="card-title">Thêm Mới Lịch Làm Việc </h4>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="doctor_id">
                  Doctor
                </label>
                <select
                  className="form-select"
                  {...register("doctor_id", {
                    required: "Vui lòng chọn doctor",
                  })}
                >
                  <option value="">Select Doctor</option>
                  <option value="1">Chuyên khoa 1</option>
                  <option value="2">Chuyên khoa 2</option>
                </select>
                {errors.doctor_id && (
                  <span className="text-danger">
                    {errors.doctor_id.message}
                  </span>
                )}
              </div>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="time_start">
                  Time Start
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  {...register("time_start", {
                    required: "Vui lòng chọn ngày",
                  })}
                />
                {errors.time_start && (
                  <span className="text-danger">
                    {errors.time_start.message}
                  </span>
                )}
              </div>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="time_end">
                  Time End
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  {...register("time_end", { required: "Vui lòng chọn ngày" })}
                />
                {errors.time_end && (
                  <span className="text-danger">{errors.time_end.message}</span>
                )}
              </div>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="form-control"
                  {...register("description", {
                    required: "Vui lòng nhập mô tả",
                  })}
                />
                {errors.description && (
                  <span className="text-danger">
                    {errors.description.message}
                  </span>
                )}
              </div>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="working_date">
                  Working Date
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  {...register("working_date", {
                    required: "Vui lòng chọn ngày",
                  })}
                />
                {errors.working_date && (
                  <span className="text-danger">
                    {errors.working_date.message}
                  </span>
                )}
              </div>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="max_patients">
                  Max Patients
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("max_patients", {
                    required: "Vui lòng nhập giá",
                    min: { value: 0, message: "Giá phải lớn hơn 0" },
                  })}
                />
                {errors.max_patients && (
                  <span className="text-danger">
                    {errors.max_patients.message}
                  </span>
                )}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="status">
                  Status
                </label>
                <select
                  className="form-select"
                  {...register("status", {
                    required: "Vui lòng chọn trạng thái",
                  })}
                >
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </select>
                {errors.status && (
                  <span className="text-danger">{errors.status.message}</span>
                )}
              </div>

              <button type="reset" className="btn btn-danger-subtle">
                Nhập Lại
              </button>
              <button type="submit" className="btn btn-primary-subtle">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleForm;
