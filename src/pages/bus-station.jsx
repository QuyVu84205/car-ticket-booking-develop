import React, { useState } from "react";
import "./bus-station.css";

const busStations = [
  { name: "Bến xe Gia Lâm", address: "Hà Nội có nghĩa là được bao quanh bởi các con sông, tên gọi này phản ánh vị trí địa lý của nơi này. Vì đây là vùng đất được dòng sông Hồng và các nhánh phụ lưu bồi đắp qua mấy ngàn năm tạo nên. ", hotline: "0243 877 1430", img: "/bxegialam.png" },
  { name: "Bến xe khách Quảng Bình", address: "Đây là tỉnh thuộc vùng Duyên Hải Bắc Trung Bộ, được nhiều người biết đến qua những địa điểm check in đẹp mắt và khám phá khung cảnh thiên nhiên qua từng hang động nổi tiếng như: Động Thiên Đường, Hang Én, Hang Sơn Đoòng, Sông Chày Hang Tối và không nên bỏ qua Động Phong Nha – Kẻ Bàng với vẻ đẹp được tạo nên bởi thiên nhiên, còn là một trong những di sản thiên nhiên Thế giới được UNESCO công nhận vào năm 2015.", hotline: "0232 3822 115", img: "/bxekhachquangbinh.png" },
  { name: "Bến xe Cần Thơ", address: "Cần Thơ đang ngày càng phát triển và thay đổi về mọi mặt, theo đó ngành du lịch cũng phát triển nhanh chóng và những khu di tích như: khu nhà cổ Bình Thủy, Chùa Ông hay chợ nổi Cái Răng, làng du lịch Mỹ Khánh, hoặc các khu du lịch sinh thái vườn Cò Bằng Lăng, đảo ngọt Cù Lao,… luôn là những điểm đến thu hút hàng ngàn lượt khách du lịch đến với Cần Thơ – miền đất “gạo trắng nước trong” này.", hotline: "0292 3890 444", img: "/benxecantho.png" },
  { name: "Bến xe Vũng Tàu", address: "Vũng Tàu là thành phố thuộc tỉnh Bà Rịa – Vũng Tàu, nằm ở vùng Đông Nam Bộ với khí hậu nhiệt đới gió mùa là tỉnh có tốc độ phát triển kinh tế nổi bật trong những năm gần đây, nhất là du lịch.", hotline: "0254 3854 294", img: "/benxevungtau.png" },
  { name: "Danh sách bến xe Hà Nội", address: "Hà Nội là một thành phố thủ đô sầm uất của Việt Nam, nói về Hà Nội khá nhiều du khách sẽ nghĩ đến những nét xưa cũ của các con phố cổ cùng nhiều di tích lịch sử gắn liền với triều đại phong kiến.", hotline: "1900 0152", img: "/danhsachbenxehanoi.png" },
  { name: "Bến xe Thanh Hóa", address: "Thanh Hóa là vùng đất nổi tiếng với nhiều cảnh đẹp hùng vĩ, cũng là quê hương của những vị anh hùng giữ nước như Quang Trung, Bà Triệu,… Du khách đến đây không chỉ thu hút bởi bãi biển trong xanh, cát trắng, núi đồi mà còn bởi các khu du lịch nổi tiếng như: Cầu Hàm Rồng, Làng Cổ Đông Sơn,… cùng khí hậu ôn hòa, đặc biệt vào mùa hè dịu mát.", hotline: "0237 3852 555", img: "/benxethanhhoa.png" },
  { name: "Bến xe phía Bắc miền Nam Bắc", address: "Từ lâu “bến xe khách” được biết đến là trung tâm kết nối giao thương giữa các vùng, nút giao quan trọng gắn liền với kinh tế, đời sống của người dân không chỉ trong việc đi lại hàng ngày, công tác tỉnh xa mà còn là nơi chuyên vận chuyển hàng hóa đi khắp mọi miền Tổ quốc.", hotline: "0236 3821 007", img: "/benxetieubieu.png" },
  { name: "Bến xe Quy Nhơn - Bình Định", address: "Bình Định thuộc vùng Duyên hải Nam Trung bộ có diện tích tự nhiên rộng lớn, tiếp giáp với nhiều tỉnh trọng điểm như Gia Lai, Phú Yên, Quảng Ngãi, Sài Gòn và cách Hà Nội khoảng 1.065km.", hotline: "0256 3741 888", img: "/benxequynhon.png" },
];

export default function BusStation() {
  const [page] = useState(1);

  return (
    <div className="busstation-page">
      <div className="container">
        <h1 className="page-title">BẾN XE</h1>

       <div className="busstation-grid">
  {busStations.map((station, i) => (
    <div key={i} className="busstation-card">
      <img src={station.img} alt={station.name} loading="lazy" />
      <div className="busstation-body">
        <h3 title={station.name}>{station.name}</h3>
        <p title={station.address}>{station.address}</p>
      </div>
    </div>
  ))}
</div>


        <div className="pagination">
          <button disabled={page === 1}>«</button>
          <button className="active">1</button>
          <button>2</button>
          <button>3</button>
          <span>...</span>
          <button>148</button>
          <button>»</button>
        </div>

        <p className="desc">
          Tập hợp các bến xe và thông tin chi tiết lịch trình, giờ khởi hành của
          các nhà xe có tại bến.
        </p>
      </div>
    </div>
  );
}
