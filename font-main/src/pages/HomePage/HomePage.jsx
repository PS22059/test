import React, { useEffect, useState } from "react";
import * as ProductService from "../../services/ProductService";
import { useSelector } from "react-redux";
import Loading from "../../components/LoadingComponent/Loading";
import { useDebounce } from "../../hooks/useDebounce";
import Footer from "../../components/FooterComponent/FooterComponent";
import Navbar from "../../components/Navbar/Navbar";
import AboutHomeComponent from "../../components/AboutHomeComponent/AboutHomeComponent";
import SubBanner from "../../components/SubBanner/SubBanner";
import ListDanhmuc from "../../components/ListDanhMuc/ListDanhMuc";
import ListProducthatitbeo from "../../components/ListProducthatitbeo/ListProducthatitbeo";
import ListProducthattuoi from "../../components/ListProducthattuoi/ListProducthattuoi";
import ListProducthatnhieubeo from "../../components/ListProducthatnhieubeo/ListProducthatnhieubeo";
import ListProducthatxaykho from "../../components/ListProducthatxaykho/ListProducthatxaykho";
import { Link } from "react-router-dom";
const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search);
  const searchDebounce = useDebounce(searchProduct, 500);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(20);
  const [typeProducts, setTypeProducts] = useState([]);

  const [productList, setProductList] = useState([]);
  const [hotProductList, setHotProductList] = useState([]);
  const fetchProductAll = (context) => {
    setLoading(true);
    const limit = context?.queryKey && context?.queryKey[1];
    const search = context?.queryKey && context?.queryKey[2];
    ProductService.getAllProduct(search, limit).then((res) => {
      setProductList(res?.data);
      setLoading(false);
    });
  };
  function convertToSlug(text) {
    return text
    .toLowerCase() // Chuyển đổi thành chữ thường
    .normalize("NFD") // Chuẩn hóa chuỗi Unicode về dạng NFC hoặc NFD
    .replace(/[\u0300-\u036f]/g, "") // Loại bỏ các dấu thanh
    .replace(/[^\w\s]/gi, "") // Loại bỏ các ký tự đặc biệt
    .replace(/\s+/g, "-") // Thay thế dấu cách bằng dấu gạch ngang
    .trim(); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
  }
  const fetchAllProductHome = () => {
    setLoading(true);
    ProductService.getHomeProduct().then((res) => {
      console.log(res?.data);
      setHotProductList(res?.data);
      setLoading(false);
    });
  };
  const fetchAllTypeProduct = async () => {
    const res = await ProductService.getAllTypeProduct();
    if (res?.status === "OK") {
      setTypeProducts(res?.data);
    }
  };
  useEffect(() => {
    fetchAllTypeProduct();
    fetchAllProductHome();
    // fetchProductAll({ queryKey: ["products", limit, searchDebounce] });
  }, []);

  return (
    <>
      <Loading isLoading={loading}>
        <div className="body">
          <div id="container">
            <Navbar />
            <AboutHomeComponent />
            {hotProductList &&
              hotProductList.map((item) => {
                return (
                  <div
                    style={{ marginBottom: "80px" }}
                    className="list_product"
                  >
                    <div className="d-flex justify-content-between">
                      <h1>{item?.type?.name}</h1>
                      <Link to={convertToSlug(item?.type?.name)}>Xem thêm</Link>
                    </div>
                    <div className="list_items">
                      {item?.products?.map((product) => {
                        return (
                          <ListProducthatitbeo
                            key={product._id}
                            countInStock={product.countInStock}
                            description={product.description}
                            image={product.image}
                            name={product.name}
                            price={product.price}
                            rating={product.rating}
                            type={product.type}
                            selled={product.selled}
                            discount={product.discount}
                            id={product._id}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            <ListDanhmuc />
          </div>
        </div>
        <Footer />
      </Loading>
    </>
  );
};

export default HomePage;
