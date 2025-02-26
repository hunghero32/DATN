import { useForm } from "react-hook-form";

const ServiceForm = () => {
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
              <h4 className="card-title">Thêm Mới Dịch Vụ</h4>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <label className="form-label" htmlFor="category_id">Danh Mục</label>
                <select className="form-select" {...register("category_id", { required: "Vui lòng chọn danh mục" })}>
                  <option value="">Select Category</option>
                  <option value="1">Danh mục 1</option>
                  <option value="2">Danh mục 2</option>
                </select>
                {errors.category_id && <span className="text-danger">{errors.category_id.message}</span>}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="services_name">Service Name</label>
                <input
                  type="text"
                  className="form-control"
                  {...register("services_name", { required: "Vui lòng nhập tên dịch vụ", minLength: { value: 3, message: "Tên ít nhất 3 ký tự" } })}
                />
                {errors.services_name && <span className="text-danger">{errors.services_name.message}</span>}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="description">Description</label>
                <textarea
                  className="form-control"
                  {...register("description", { required: "Vui lòng nhập mô tả" })}
                />
                {errors.description && <span className="text-danger">{errors.description.message}</span>}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="price">Price</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("price", { required: "Vui lòng nhập giá", min: { value: 0, message: "Giá phải lớn hơn 0" } })}
                />
                {errors.price && <span className="text-danger">{errors.price.message}</span>}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="duration">Duration (minutes)</label>
                <input
                  type="number"
                  className="form-control"
                  {...register("duration", { required: "Vui lòng nhập thời gian", min: { value: 1, message: "Thời gian phải lớn hơn 0" } })}
                />
                {errors.duration && <span className="text-danger">{errors.duration.message}</span>}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="status">Status</label>
                <select className="form-select" {...register("status", { required: "Vui lòng chọn trạng thái" })}>
                  <option value="">Select Status</option>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </select>
                {errors.status && <span className="text-danger">{errors.status.message}</span>}
              </div>

              <div className="form-group cust-form-elements">
                <label className="form-label" htmlFor="approve">Approve</label>
                <select className="form-select" {...register("approve", { required: "Vui lòng chọn trạng thái duyệt" })}>
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

export default ServiceForm;
