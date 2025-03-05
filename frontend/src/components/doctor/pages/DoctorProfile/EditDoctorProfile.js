import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors, updateDoctor } from "../../../../features/slices/doctorSlice";
import { useNavigate, useParams } from "react-router-dom";

const EditDoctorProfile = ({ onClose }) => {
    const dispatch = useDispatch();
    const { doctors } = useSelector((state) => state.doctor);
    const { id } = useParams();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: "onBlur",
    });

    // Fetch doctors data when component mounts
    useEffect(() => {
        dispatch(fetchDoctors());
    }, [dispatch]);

    // Set default values when doctors data is available
    useEffect(() => {
        if (doctors?.doctors?.length > 0) {
            const doctor = doctors.doctors.find((doctor) => doctor.id == id);
            if (doctor) {
                reset({
                    doctor_name: doctor.doctor_name,
                    specialty_id: doctor.specialty_id,
                    exp: doctor.exp,
                    doctor_bio: doctor.doctor_bio,
                });
            }
        }
    }, [id, doctors, reset]);

    const onSubmit = (data) => {
        if (id) {
            dispatch(updateDoctor({ id: id, doctorData: data }));
            navigate("/doctor/doctor-profile");
            onClose();
        }
    };

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Chỉnh Sửa Hồ Sơ Bác Sĩ</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <label className="form-label">Tên:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("doctor_name", {
                                        required: "Tên bác sĩ không được để trống",
                                        minLength: {
                                            value: 3,
                                            message: "Tên phải có ít nhất 3 ký tự",
                                        },
                                    })}
                                />
                                {errors.doctor_name && <p className="text-danger">{errors.doctor_name.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Chuyên Ngành:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    {...register("specialty_id", {
                                        required: "Chuyên ngành không được để trống",
                                    })}
                                />
                                {errors.specialty_id && <p className="text-danger">{errors.specialty_id.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Kinh Nghiệm:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    {...register("exp", {
                                        required: "Kinh nghiệm không được để trống",
                                        min: {
                                            value: 1,
                                            message: "Kinh nghiệm phải lớn hơn 0",
                                        },
                                    })}
                                />
                                {errors.exp && <p className="text-danger">{errors.exp.message}</p>}
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Tiểu Sử:</label>
                                <textarea
                                    className="form-control"
                                    {...register("doctor_bio", {
                                        required: "Tiểu sử không được để trống",
                                        minLength: {
                                            value: 10,
                                            message: "Tiểu sử phải có ít nhất 10 ký tự",
                                        },
                                    })}
                                ></textarea>
                                {errors.doctor_bio && <p className="text-danger">{errors.doctor_bio.message}</p>}
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Lưu
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditDoctorProfile;
