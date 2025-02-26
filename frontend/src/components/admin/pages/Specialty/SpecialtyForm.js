import { useForm } from "react-hook-form";

const SpecialtyForm = () => {
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
              <h4 className="card-title">Thêm Mới Chuyên Khoa </h4>
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
                <label className="form-label" htmlFor="specialty_id">
                  Specialty
                </label>
                <select
                  className="form-select"
                  {...register("specialty_id", {
                    required: "Vui lòng chọn Specialty",
                  })}
                >
                  <option value="">Select Specialty</option>
                  <option value="1">Chuyên khoa 1</option>
                  <option value="2">Chuyên khoa 2</option>
                </select>
                {errors.specialty_id && (
                  <span className="text-danger">
                    {errors.specialty_id.message}
                  </span>
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

export default SpecialtyForm;
