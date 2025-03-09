import React, { useState } from 'react';

const Appointment = () => {
  const [formData, setFormData] = useState({
    guest_name: '',
    gender: '',
    birthday: '',
    guest_phone: '',
    guest_email: '',
    address: '',
    file: null,
    booking_date: '',
    booking_time: '',
    note: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dữ liệu gửi đi:", formData);
    alert("Đặt lịch thành công!");
  };

  return (
    <section className="Appointment pq-bg-grey">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 pe-lg-4">
            <div className="pq-appointment-left">
              <div className="pq-section-title">
                <span className="pq-sub-title">Đặt Lịch Hẹn</span>
                <h2 className="pq-main-title">Đăng Ký Điều Trị</h2>
                <p className="pq-section-title-description">
                  Tuyến tụy là một cơ quan quan trọng nằm sau dạ dày, đóng vai trò quan trọng trong cả chức năng nội tiết và ngoại tiết.
                </p>
              </div>
              <div className="pq-appointment-img">
                <img className="pq-img" src="img/appontment/appointment-001.webp" alt="Hình ảnh đặt lịch hẹn" />
              </div>
            </div>
          </div>

          <div className="col-lg-6 mt-4 mt-lg-0">
            <div className="pq-appointment-right">
              <form className="pq-contact-form pq-style-1" onSubmit={handleSubmit}>
                <div className="row">
                  <InputBox icon="far fa-user" name="guest_name" placeholder="Họ và Tên" col="col-md-6" value={formData.guest_name} onChange={handleChange} />
                  <SelectBox icon="fas fa-venus-mars" name="gender" placeholder="Giới tính" col="col-md-6" value={formData.gender} onChange={handleChange} options={["Nam", "Nữ", "Khác"]} />
                  <InputBox icon="far fa-calendar-alt" name="birthday" type="date" placeholder="Ngày sinh" col="col-md-6" value={formData.birthday} onChange={handleChange} />
                  <InputBox icon="fas fa-mobile-alt" name="guest_phone" placeholder="Số Điện Thoại" col="col-md-6" value={formData.guest_phone} onChange={handleChange} />
                  <InputBox icon="far fa-envelope" name="guest_email" placeholder="Địa chỉ Email" col="col-md-6" value={formData.guest_email} onChange={handleChange} />
                  <InputBox icon="fas fa-map-marker-alt" name="address" placeholder="Địa chỉ" col="col-md-6" value={formData.address} onChange={handleChange} />
                  <InputBox icon="far fa-calendar-alt" name="booking_date" type="date" placeholder="Ngày hẹn" col="col-md-6" value={formData.booking_date} onChange={handleChange} />
                  <InputBox icon="far fa-clock" name="booking_time" type="time" placeholder="Giờ hẹn" col="col-md-6" value={formData.booking_time} onChange={handleChange} />

                  {/* Upload file */}
                  <div className="col-md-12">
                    <div className="pq-input-box">
                      <div className="input-icon">
                        <i className="far fa-file-alt"></i>
                      </div>
                      <input type="file" className="form-control" name="file" onChange={handleFileChange} />
                    </div>
                  </div>

                  {/* Ghi chú */}
                  <div className="col-12">
                    <div className="pq-input-box">
                      <div className="input-icon">
                        <i className="far fa-edit"></i>
                      </div>
                      <textarea
                        className="form-control"
                        name="note"
                        rows="4"
                        placeholder="Chúng tôi có thể giúp gì cho bạn? Hãy liên hệ ngay."
                        value={formData.note}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Nút gửi */}
                <div className="pq-btn-container">
                  <button type="submit" className="pq-button">
                    <div className="pq-button-block">
                      <span className="pq-button-text">Gửi Yêu Cầu</span>
                    </div>
                  </button>
                </div>
              </form>

              <div className="pq-counter-block">
                <h2 className="pq-counter-heading-title">Chúng tôi cung cấp dịch vụ y tế chuyên biệt</h2>
                <div className="row">
                  <Counter title="Bệnh nhân" count="100" />
                  <Counter title="Kinh nghiệm" count="15" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Component InputBox
const InputBox = ({ icon, name, type = "text", placeholder, col, value, onChange }) => (
  <div className={col}>
    <div className="pq-input-box">
      <div className="input-icon">
        <i className={icon}></i>
      </div>
      <input type={type} className="form-control" name={name} placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  </div>
);

// Component SelectBox
const SelectBox = ({ icon, name, placeholder, col, value, onChange, options }) => (
  <div className={col}>
    <div className="pq-input-box">
      <div className="input-icon">
        <i className={icon}></i>
      </div>
      <select className="form-control" name={name} value={value} onChange={onChange}>
        <option value="">{placeholder}</option>
        {options.map((opt, idx) => (
          <option key={idx} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  </div>
);

// Component Counter
const Counter = ({ title, count }) => (
  <div className="col-sm-6">
    <div className="pq-counter pt-style-1">
      <div className="pq-counter-info">
        <div className="pq-counter-title">{title}</div>
        <div className="pq-count-number">
          <h2 className="pq-count">{count}</h2>
          <h3 className="pq-counter-prefix-icon">+</h3>
        </div>
        <div className="pq-counter-designation">Chúng tôi cung cấp dịch vụ tốt nhất</div>
      </div>
    </div>
  </div>
);

export default Appointment;
