import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from './AuthContext';
import { toast } from 'react-toastify';
import ChuotChay from '../../loadding/chuotchay';

const OAuthSuccess = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get("token");
        const userParam = urlParams.get("user");

        if (token && userParam) {
            try {
                const parsedUser = JSON.parse(decodeURIComponent(userParam));
                
                // Store auth data
                localStorage.setItem("authToken", token);
                localStorage.setItem("user", JSON.stringify(parsedUser));
                
                // Update context
                login(parsedUser, token);
                

                // Navigate based on role
                setTimeout(() => {
                    if (parsedUser.role === "admin") {
                        navigate("/admin");
                    } else if (parsedUser.role === "doctor") {
                        navigate("/doctor");
                    } else {
                        navigate("/");
                    }
                }, 1000);
            } catch (err) {
                console.error("Error processing login data:", err);
                toast.error("Có lỗi xảy ra khi xử lý đăng nhập!");
                navigate("/login");
            }
        } else {
            navigate("/login");
        }
    }, [navigate, login]);

    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            <div className="text-center p-4 flex flex-col items-center">
                <ChuotChay/>
                <h2 className="mt-4">Đang xử lý đăng nhập...</h2>
            </div>
        </div>
    );
};

export default OAuthSuccess;