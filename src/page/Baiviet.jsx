import React from "react";
import "./Baiviet.css";

import vivu from "../icon/vivu.png";
import frame from "../icon/frame.png";
import anhbenxe from "../icon/anhbenxe.png";
import anhbenxe1 from "../icon/anhbenxe1.png";
import anhbenxe2 from "../icon/anhbenxe2.png";
import anhbenxe3 from "../icon/anhbenxe3.png";
import dmca from "../icon/dmca.png";
import nccs from "../icon/nccs.png";
import vantai from "../icon/vantai.png";

export default function Baiviet() {
  return (
    <div className="baiviet-container">
      <div className="banner">
        <img src={frame} alt="Bến xe Gia Lâm" className="banner-img" />
        <h2>Bến xe Gia Lâm – Thông tin, địa điểm, giá vé và hãng xe</h2>
      </div>

      <div className="content">
        <p><strong>Địa chỉ:</strong> Số 9 Đ. Ngô Gia Khảm, Q. Long Biên, Hà Nội</p>
        <p><strong>Điện thoại:</strong> 02438 271 529</p>
        <p>
          Bến xe Gia Lâm thuộc quận Long Biên, nằm về phía đông bắc và cách trung tâm thành phố hà Nội
          khoảng 1km, đây cũng là bến lâu đời cùng trải qua năm tháng với thành phố. Tuy khuôn viên chỉ 
          1,45ha so với các bến khác thì không quá rộng nhưng nơi đây vẫn tập trung rất nhiều các hãng xe 
          khách uy tín và chất lượng. Mỗi ngày đều có hàng trăm lượt xe ra vào để vận chuyển khách đi các tỉnh, 
          chủ yếu là di chuyển về các tỉnh phía Bắc.
        </p>

        <img src={anhbenxe} alt="Bến xe" className="img-block" />

        <p>
          Hệ thống giao thông xung quanh có đầy đủ cả đường bộ, đường sắt và đường thủy, trong đó đường 
          bộ có tuyến quốc lộ 1A, quốc lộ 5 và cao tốc đi Hải Phòng, Lạng Sơn cũng khá tiện cho các phương 
          tiện di chuyển theo hướng quốc lộ đến các tỉnh thành lân cận. Trong bến xe Gia Lâm có nhiều dịch vụ 
          hạ tầng như sảnh chờ rộng, sang trọng với các quầy bán vé khang trang có bảng chỉ dẫn màu sắc nổi 
          bật dễ nhận biết.

          Khu vực các hàng quán phục vụ ăn uống, giải khát, được sắp xếp riêng biệt tiện lợi và bảo đảm vệ sinh 
          sạch sẽ. Bên cạnh đó là các lối ra nơi đỗ xe dành cho hành khách được trang bị mái che và phân luồng 
          khoa học tránh được tình trạng lộn xộn. Ngoài ra, với sự kiểm soát và công tác chặt chẽ của đội ngũ 
          quản lý và an ninh mà dù lượt xe di chuyển tại bến vô cùng đông đúc nhưng vẫn không có việc mất 
          trật tự xảy ra.
        </p>

        <img src={anhbenxe1} alt="Khu vực bến xe" className="img-block" />

        <h3>*Các tuyến đường và nhà xe hoạt động tại bến</h3>
        <h4>+Bến xe Gia Lâm – Hà Nội đi Hải Phòng</h4>
        <p>1. Nhà xe Ô Hô </p>
        <p>
          Hoạt động chuyên chở từ Xe Hà Nội đi Hải Phòng bằng xe ghế ngồi 29 chỗ đời mới được nhiều khách 
          hàng cho đánh giá tốt là hãng xe Ô Hô.

          Tại bến xe Gia Lâm – Hà Nội xe đi liên tục cách 20 phút đến 40 phút sẽ chạy một chuyến từ 06:00 cho 
          đến 18:30. Từ bến xe Tiên Lãng – Hải Phòng chuyến đầu đi lúc 05:25 và cách 30 phút sẽ chạy một 
          chuyến cho đến chuyến cuối là 18:15, giá vé tham khảo cho cả hai đầu văn phòng là 90.000 đồng/vé.

          Tiêu chí phục vụ được chú trọng vào sự chuyên nghiệp trong cả phương tiện và thái độ của nhân viên 
          cùng sự di chuyển an toàn nên luôn được nhiều quý khách lựa chọn đồng hành trong nhiều năm qua.

          Trụ sở chính: số 602 Trường Chinh, Q. Kiến An, Hải Phòng.
        </p>

        <img src={anhbenxe2} alt="Xe Ô Hô" className="img-block" />

        <h4>+Bến xe Gia Lâm Hà Nội đi Lào Cai</h4>
        <p>2. Nhà xe Nam Thắng </p>
        <p>
          Hãng xe Nam Thắng Limousine chỉ mới được thành lập vài năm gần đây trên tuyến từ Xe Hà Nội đi 
          Lào Cai nhưng khá được khách yêu thích.

          Đưa vào phục vụ khách bằng xe ghế ngồi Limousine 9 chỗ, hàng ngày sẽ có chuyến xuất phát tại bến 
          xe Gia Lâm Hà Nội vào 06:30 – 07:00, chiều đi từ bến xe Lào Cai về xe khởi hành vào 14:30 – 15:00. Giá 
          vé cho khách tham khảo với ghế đầu+ghế cuối là 320.000 đồng/vé, ghế giữa là 370.000 đồng/vé.

          Trên xe được trang bị nhiều tiện nghi hiện đại như: tivi, wifi, cổng sạc USB, khăn lạnh, nước khoáng và 
          đồ ăn nhẹ miễn phí cho hành khách.

          Hiện tại  xe có hỗ trợ trung chuyển khách tận nơi miễn phí tại một số khu vực trong Hà Nội như quận 
          Long Biên, Phố cổ, Nhà hát Lớn, Tòa nhà Lotte,… và các khách sạn trong trung tâm thị trấn Sapa – Lào 
          Cai.
        </p>

        <img src={anhbenxe3} alt="Xe Nam Thắng" className="img-block" />
      </div>
    </div>
  );
}
