import React from 'react';
import { useForm } from 'react-hook-form';

const AddSchedule = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log('Form Data:', data);
    alert('Lưu lịch thành công!');
  };

  const validateDate = (value) => {
    const today = new Date().toISOString().split('T')[0];
    return value >= today || 'Không được chọn ngày quá khứ';
  };

  return (
    <div>
      <div className="card shadow">
        <div className="card-header bg-primary text-white text-center">
          <h4>Quản lý lịch làm việc</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="date" className="form-label">Ngày Làm Việc</label>
              <input
                type="date"
                className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                {...register('date', { required: 'Vui lòng chọn ngày', validate: validateDate })}
              />
              {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="maxPatients" className="form-label">Số Bệnh Nhân Tối Đa</label>
              <input
                type="number"
                className={`form-control ${errors.maxPatients ? 'is-invalid' : ''}`}
                {...register('maxPatients', {
                  required: 'Vui lòng nhập số bệnh nhân',
                  min: { value: 1, message: 'Số bệnh nhân phải lớn hơn 0' },
                })}
              />
              {errors.maxPatients && <div className="invalid-feedback">{errors.maxPatients.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="startTime" className="form-label">Giờ Bắt Đầu</label>
              <input
                type="time"
                className={`form-control ${errors.startTime ? 'is-invalid' : ''}`}
                {...register('startTime', { required: 'Vui lòng nhập giờ bắt đầu' })}
              />
              {errors.startTime && <div className="invalid-feedback">{errors.startTime.message}</div>}
            </div>

            <div className="mb-3">
              <label htmlFor="endTime" className="form-label">Giờ Kết Thúc</label>
              <input
                type="time"
                className={`form-control ${errors.endTime ? 'is-invalid' : ''}`}
                {...register('endTime', { required: 'Vui lòng nhập giờ kết thúc' })}
              />
              {errors.endTime && <div className="invalid-feedback">{errors.endTime.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary w-100">Lưu Lịch Làm Việc</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddSchedule;
