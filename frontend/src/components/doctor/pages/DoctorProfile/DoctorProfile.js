import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDoctors } from "../../../../features/slices/doctorSlice";
import { Link, useNavigate } from "react-router-dom";

const DoctorProfile = () => {
    const dispatch = useDispatch();
    const { doctors } = useSelector((state) => state.doctor);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    useEffect(() => {
        dispatch(fetchDoctors());
    }, [dispatch]);

    useEffect(() => {
        if (doctors.doctors?.length > 0) {
            setSelectedDoctor(doctors.doctors[0]);
        }
    }, [doctors]);



    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4 text-primary">Hồ Sơ Bác Sĩ</h2>
            {selectedDoctor ? (
                <div className="card shadow">
                    <div className="card-header bg-primary text-white text-center">
                        <h3>{selectedDoctor.doctor_name}</h3>
                    </div>
                    <div className="card-body">
                        <p><strong>Chuyên Ngành:</strong> {selectedDoctor.specialty_id}</p>
                        <p><strong>Kinh Nghiệm:</strong> {selectedDoctor.exp} năm</p>
                        <p><strong>Tiểu Sử:</strong> {selectedDoctor.doctor_bio}</p>
                        <p><strong>Trạng Thái Duyệt:</strong> {selectedDoctor.approve ? "Đã Duyệt" : "Chưa Duyệt"}</p>
                        {selectedDoctor.doctor_avatar ? (
                            <img src={selectedDoctor.doctor_avatar} alt="Doctor Avatar" className="img-thumbnail w-100" />
                        ) : (
                            <p>Không có ảnh</p>
                        )}
                        <div className="text-center mt-3">
                            <Link to={`/doctor/doctor-profile/edit/${selectedDoctor.id}`} className="btn btn-primary me-3" >
                                Chỉnh Sửa
                            </Link>
                            <button className="btn btn-danger">Xóa</button>
                        </div>
                    </div>
                </div>
            ) : (
                <p className="text-center">Không có hồ sơ bác sĩ nào</p>
            )}
        </div>
    );
};

export default DoctorProfile;
