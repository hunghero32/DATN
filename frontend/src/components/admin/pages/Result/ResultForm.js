import { useForm } from "react-hook-form";

const ResultForm = () => {
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
              <h4 className="card-title">Thêm Mới Kết Quả Khám</h4>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="booking_id">
                  Booking
                </label>
                <select
                  className="form-select"
                  {...register("booking_id", {
                    required: "Vui lòng chọn lịch đã đặt",
                  })}
                >
                  <option value="">Select Bôking</option>
                  <option value="1">Booking 1</option>
                  <option value="2">Booking khoa 2</option>
                </select>
                {errors.booking_id && (
                  <span className="text-danger">
                    {errors.booking_id.message}
                  </span>
                )}
              </div>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="service_id">
                  Service
                </label>
                <select
                  className="form-select"
                  {...register("service_id", {
                    required: "Vui lòng chọn dịch vụ",
                  })}
                >
                  <option value="">Select Service</option>
                  <option value="1">Service 1</option>
                  <option value="2">Service 2</option>
                </select>
                {errors.service_id && (
                  <span className="text-danger">
                    {errors.service_id.message}
                  </span>
                )}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="guest_id">
                  Guest
                </label>
                <select
                  className="form-select"
                  {...register("guest_id", {
                    required: "Vui lòng chọn khách hàng",
                  })}
                >
                  <option value="">Select Category</option>
                  <option value="1">KH 1</option>
                  <option value="2">KH 2</option>
                </select>
                {errors.guest_id && (
                  <span className="text-danger">{errors.guest_id.message}</span>
                )}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="diagnosis">
                  Diagnosis
                </label>
                <input
                  type="text"
                  className="form-control"
                  {...register("diagnosis", {
                    required: "Vui lòng nhập Diagnosis",
                  })}
                />
                {errors.diagnosis && (
                  <span className="text-danger">
                    {errors.diagnosis.message}
                  </span>
                )}
              </div>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="note">
                  note
                </label>
                <textarea
                  className="form-control"
                  {...register("note", { required: "Vui lòng nhập mô tả" })}
                />
                {errors.note && (
                  <span className="text-danger">{errors.note.message}</span>
                )}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="file">
                  File Tải Lên
                </label>
                <input
                  type="file"
                  className="form-control"
                  {...register("file", { required: "Vui lòng chọn file" })}
                />
                {errors.file && (
                  <span className="text-danger">{errors.file.message}</span>
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

export default ResultForm;
