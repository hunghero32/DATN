import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const SEO = () => {
  const [siteData, setSiteData] = useState(null);
  const [loading, setLoading] = useState(true); // Trạng thái loading
  const [error, setError] = useState(null); // Trạng thái lỗi

  useEffect(() => {
    // Lấy dữ liệu từ API
    fetch("http://localhost:8000/api/system")
      .then((res) => res.json())
      .then((data) => {
        setSiteData(data);
        setLoading(false); // Đã tải xong
      })
      .catch((err) => {
        setError("Không thể tải dữ liệu SEO.");
        setLoading(false);
      });
  }, []);

  // Nếu đang tải hoặc có lỗi, không hiển thị SEO
  if (loading) return <div>Đang tải...</div>;
  if (error) return <div>{error}</div>;

  if (!siteData) return null; // Trả về null nếu không có dữ liệu

  return (
    <Helmet>
      <title>{siteData.site_name || "Quick Care"}</title>
      <meta name="description" content={siteData.site_description || "Phòng khám Quick Care"} />
      <meta name="keywords" content={siteData.site_keywords || "phòng khám, chăm sóc sức khỏe, khám bệnh nhanh, dịch vụ y tế"} />
      <meta property="og:title" content={siteData.site_name || "Quick Care"} />
      <meta property="og:description" content={siteData.site_description || "Phòng khám Quick Care"} />
      <meta property="og:image" content={siteData.site_logo || "default-logo.png"} />
      <meta property="og:url" content={siteData.site_url || "https://quickcare.vn"} />
      <link rel="icon" href={siteData.site_favicon || "/favicon.ico"} type="image/x-icon" />
    </Helmet>
  );
};

export default SEO;
