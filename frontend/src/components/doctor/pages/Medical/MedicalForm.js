import { useForm } from "react-hook-form";

const MedicalForm = () => {
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
              <h4 className="card-title">Thêm Mới Hồ Sơ Bệnh</h4>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="guest_id">Guest</label>
                <select className="form-select" {...register("guest_id", { required: "Vui lòng chọn bệnh nhân" })}>
                  <option value="">Select Specialty</option>
                  <option value="1">Chuyên khoa 1</option>
                  <option value="2">Chuyên khoa 2</option>
                </select>
                {errors.guest_id && <span className="text-danger">{errors.guest_id.message}</span>}
              </div>

             

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="bhyt">BHYT</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("bhyt", { required: "Vui lòng nhập tên dịch vụ", minLength: { value: 3, message: "Tên ít nhất 3 ký tự" } })}
                />
                {errors.bhyt && <span className="text-danger">{errors.bhyt.message}</span>}
              </div>
              
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="medical_condition">Medical condition</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("medical_condition", { required: "Vui lòng nhập tình trạng bệnh lí", minLength: { value: 3, message: "Tình trạng ít nhất 3 ký tự" } })}
                />
                {errors.medical_condition && <span className="text-danger">{errors.medical_condition.message}</span>}
              </div>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="medications">Medications</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("medications", { required: "Vui lòng nhập tên thuốc", minLength: { value: 3, message: "Tên ít nhất 3 ký tự" } })}
                />
                {errors.medications && <span className="text-danger">{errors.medications.message}</span>}
              </div>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="allergies">Allergies</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("allergies", { required: "Vui lòng nhập dị ứng", minLength: { value: 3, message: "Dị ứng ít nhất 3 ký tự" } })}
                />
                {errors.allergies && <span className="text-danger">{errors.allergies.message}</span>}
              </div>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="family_history">Family History</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("family_history", { required: "Vui lòng nhập lịch sử gia đình", minLength: { value: 3, message: "LS ít nhất 3 ký tự" } })}
                />
                {errors.family_history && <span className="text-danger">{errors.family_history.message}</span>}
              </div>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="treatment">Treatment</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("treatment", { required: "Vui lòng nhập Treatment", minLength: { value: 3, message: "Treatment ít nhất 3 ký tự" } })}
                />
                {errors.treatment && <span className="text-danger">{errors.treatment.message}</span>}
              </div>
              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="note">note</label>
                <textarea
                  className="form-control"
                  {...register("note", { required: "Vui lòng nhập mô tả" })}
                />
                {errors.note && <span className="text-danger">{errors.note.message}</span>}
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

export default MedicalForm;
