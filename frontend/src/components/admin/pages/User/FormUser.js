import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createUser, updateUser } from "../../../../features/slices/userSlice";
import { useEffect } from "react";
import httpRequest from "../../../../ultils/request/httpRequest";
import { RotateCcw } from "lucide-react"; // ✅ Import đúng

const FormUser = () => {
  const dispatch = useDispatch();
  const nav = useNavigate(); // ✅ Đổi thành 'nav'
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (id) {
      (async () => {
        const res = await httpRequest.get(`/users/${id}`);
        reset(res.data);
      })();
    }
  }, [id, reset]);

  const onSubmit = (data) => {
    if (id) {
      dispatch(updateUser({ id, userData: { ...data, id } }));
    } else {
      dispatch(createUser(data));
    }
    nav("/admin/user");
  };

  return (
    <div className="content-inner container-fluid pb-0" id="page_layout">
      <div className="row">
        <div className="card">
          <div className="card-header d-flex justify-content-between">
            <div className="header-title">
              <h4 className="card-title">{id ? "Sửa Người Dùng" : "Thêm Mới Người Dùng"}</h4>
            </div>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Name */}
              <div className="form-group cust-form-elements">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" {...register("name", { required: "Vui lòng nhập tên" })} />
                {errors.name && <span className="text-danger">{errors.name.message}</span>}
              </div>

              {/* Email */}
              <div className="form-group cust-form-elements">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  {...register("email", {
                    required: "Vui lòng nhập email",
                    pattern: { value: /^\S+@\S+\.\S+$/, message: "Email không hợp lệ" },
                  })}
                />
                {errors.email && <span className="text-danger">{errors.email.message}</span>}
              </div>

              {/* Phone */}
              <div className="form-group cust-form-elements">
                <label className="form-label">Phone</label>
                <input type="tel" className="form-control" {...register("phone", { required: "Vui lòng nhập số điện thoại" })} />
                {errors.phone && <span className="text-danger">{errors.phone.message}</span>}
              </div>

              {/* Password (chỉ hiển thị khi tạo mới) */}
              {!id && (
                <div className="form-group cust-form-elements">
                  <label className="form-label">Password</label>
                  <input type="password" className="form-control" {...register("password", { required: "Vui lòng nhập mật khẩu" })} />
                  {errors.password && <span className="text-danger">{errors.password.message}</span>}
                </div>
              )}

              {/* Social Provider */}
              <div className="form-group cust-form-elements">
                <label className="form-label">Social Provider</label>
                <select className="form-select" {...register("social_provider")}>
                  <option value="">Select Social</option>
                  <option value="google">Google</option>
                  <option value="facebook">Facebook</option>
                  <option value="apple">Apple</option>
                </select>
                {errors.social_provider && <span className="text-danger">{errors.social_provider.message}</span>}
              </div>

              {/* Role */}
              <div className="form-group cust-form-elements">
                <label className="form-label">Role</label>
                <select className="form-select" {...register("role", { required: "Vui lòng chọn Role" })}>
                  <option value="guest">Guest</option>
                  <option value="admin">Admin</option>
                  <option value="doctor">Doctor</option>
                </select>
                {errors.role && <span className="text-danger">{errors.role.message}</span>}
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-6">
                {/* Nút Quay lại */}
                <div className="d-flex justify-content-between align-items-center mt-3">
                  {/* Nút Quay lại */}
                  <button onClick={() => nav(-1)} className="btn btn-secondary">
                    Back
                  </button>

                  <div className="d-flex gap-3">
                    {/* Nút Nhập lại */}
                    <button type="button" onClick={() => window.location.reload()} className="btn btn-light">
                      <RotateCcw size={18} />
                    </button>

                    {/* Nút Submit */}
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormUser;
