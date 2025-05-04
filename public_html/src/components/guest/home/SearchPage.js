// import { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import api from "../../../ultils/api/axios";

// export default function SearchPage() {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const query = queryParams.get("query");

//   const [results, setResults] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!query) return;

//     setLoading(true);
//     api
//       .get(`/api/client/search?query=${encodeURIComponent(query)}`)
//       .then((response) => {
//         setResults(response.data);
//       })
//       .catch((error) => {
//         console.error("Lỗi khi tìm kiếm:", error);
//       })
//       .finally(() => setLoading(false));
//   }, [query]);

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">
//         Kết quả tìm kiếm cho:{" "}
//         <span className="text-blue-600">"{query}"</span>
//       </h1>

//       {loading && <p>Đang tải dữ liệu...</p>}

//       {!loading && results && (
//         <div className="space-y-12">
//           {/* Chuyên khoa */}
//           {results.specialties?.length > 0 && (
//             <div>
//               <h2 className="text-xl font-semibold mb-4 text-gray-800">🔬 Chuyên khoa</h2>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {results.specialties.map((item) => (
//                   <div key={item.id} className="bg-white p-4 rounded-xl shadow-md border">
//                     <img
//                       src={item.image}
//                       alt={item.name}
//                       className="w-full h-40 object-cover rounded-lg mb-3"
//                     />
//                     <h3 className="text-lg font-bold text-blue-700">{item.name}</h3>
//                     <p className="text-sm text-gray-600">{item.description}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Dịch vụ */}
//           {results.services?.length > 0 && (
//             <div>
//               <h2 className="text-xl font-semibold mb-4 text-gray-800">💼 Dịch vụ</h2>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {results.services.map((item) => (
//                   <div key={item.id} className="bg-white p-4 rounded-xl shadow-md border">
//                     <h3 className="text-lg font-semibold text-blue-700">{item.services_name}</h3>
//                     <p className="text-sm text-gray-600 mb-2">{item.description}</p>
//                     <p className="text-sm">
//                       <strong>Chuyên khoa:</strong> {item.specialty?.name}
//                     </p>
//                     <p className="text-sm">
//                       <strong>Giá:</strong> {Number(item.price).toLocaleString()}đ
//                     </p>
//                     <p className="text-sm">
//                       <strong>Thời gian:</strong> {item.duration} phút
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {!loading && results && Object.values(results).every(arr => arr.length === 0) && (
//         <p className="text-gray-500">Không tìm thấy kết quả phù hợp.</p>
//       )}
//     </div>
//   );
// }
