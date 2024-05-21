// import { Button, Form, Space } from 'antd'
// import React from 'react'
// import { WrapperHeader, WrapperUploadFile } from './style'
// import TableComponent from '../TableComponent/TableComponent'
// import InputComponent from '../InputComponent/InputComponent'
// import DrawerComponent from '../DrawerComponent/DrawerComponent'
// import Loading from '../LoadingComponent/Loading'
// import ModalComponent from '../ModalComponent/ModalComponent'
// import { convertPrice, getBase64 } from '../../utils'
// import { useEffect } from 'react'
// import * as message from '../Message/Message'

// import * as OrderService from '../../services/OrderService'
// import { useQuery } from '@tanstack/react-query'
// import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
// import { useSelector } from 'react-redux'
// import { orderContant } from '../../contant'
// import PieChartComponent from './PieChart'

// const OrderAdmin = () => {
//   const user = useSelector((state) => state?.user)

//   const getAllOrder = async () => {
//     const res = await OrderService.getAllOrder(user?.access_token)
//     return res
//   }

//   const queryOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrder })
//   const { isLoading: isLoadingOrders, data: orders } = queryOrder

//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
//       <div
//         style={{
//           padding: 8,
//         }}
//         onKeyDown={(e) => e.stopPropagation()}
//       >
//         <InputComponent
//           // ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{
//             marginBottom: 8,
//             display: 'block',
//           }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Search
//           </Button>
//           <Button
//             // onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Reset
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined
//         style={{
//           color: filtered ? '#1890ff' : undefined,
//         }}
//       />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         // setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     // render: (text) =>
//     //   searchedColumn === dataIndex ? (
//     //     // <Highlighter
//     //     //   highlightStyle={{
//     //     //     backgroundColor: '#ffc069',
//     //     //     padding: 0,
//     //     //   }}
//     //     //   searchWords={[searchText]}
//     //     //   autoEscape
//     //     //   textToHighlight={text ? text.toString() : ''}
//     //     // />
//     //   ) : (
//     //     text
//     //   ),
//   });

//   const columns = [
//     {
//       title: 'Họ tên KH',
//       dataIndex: 'hoTenKH',
//       sorter: (a, b) => a.hoTenKH.length - b.hoTenKH.length,
//       ...getColumnSearchProps('hoTenKH')
//     },
//     {
//       title: 'Số điện thoại',
//       dataIndex: 'sdt',
//       sorter: (a, b) => a.sdt.length - b.sdt.length,
//       ...getColumnSearchProps('sdt')
//     },
//     {
//       title: 'Địa chỉ',
//       dataIndex: 'diaChi',
//       sorter: (a, b) => a.diaChi.length - b.diaChi.length,
//       ...getColumnSearchProps('diaChi')
//     },
//     {
//       title: 'Paided',
//       dataIndex: 'isPaid',
//       sorter: (a, b) => a.isPaid.length - b.isPaid.length,
//       ...getColumnSearchProps('isPaid')
//     },
//     {
//       title: 'Shipped',
//       dataIndex: 'isDelivered',
//       sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
//       ...getColumnSearchProps('isDelivered')
//     },
//     {
//       title: 'Payment method',
//       dataIndex: 'paymentMethod',
//       sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
//       ...getColumnSearchProps('paymentMethod')
//     },
//     {
//       title: 'Total price',
//       dataIndex: 'totalPrice',
//       sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
//       ...getColumnSearchProps('totalPrice')
//     },
//   ];

//   const dataTable = orders?.data?.length && orders?.data?.map((order) => {
//     console.log('usewr', order)
//     return { ...order, key: order._id, hoTenKH: order?.shippingAddress?.hoTenKH, sdt: order?.shippingAddress?.sdt, diaChi: order?.shippingAddress?.diaChi, paymentMethod: orderContant.payment[order?.paymentMethod],isPaid: order?.isPaid ? 'TRUE' :'FALSE',isDelivered: order?.isDelivered ? 'TRUE' : 'FALSE', totalPrice: convertPrice(order?.totalPrice)}
//   })

//   return (
//     <div>
//       <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
//       <div style={{height: 200, width:200}}>
//         <PieChartComponent data={orders?.data} />
//       </div>
//       <div style={{ marginTop: '20px' }}>
//         <TableComponent  columns={columns} isLoading={isLoadingOrders} data={dataTable} />
//       </div>
//     </div>
//   )
// }

// export default OrderAdmin

// test
import { Button, Form, Space, Modal, Select, Table } from "antd";
import { IoIosEye } from "react-icons/io";
import { FaEyeDropper } from "react-icons/fa";
import React, { useState } from "react";
import { WrapperHeader, WrapperUploadFile } from "./style";
import TableComponent from "../TableComponent/TableComponent";
import InputComponent from "../InputComponent/InputComponent";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import Loading from "../LoadingComponent/Loading";
import ModalComponent from "../ModalComponent/ModalComponent";
import { convertPrice, getBase64 } from "../../utils";
import { useEffect } from "react";
import * as message from "../Message/Message";

import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { orderContant } from "../../contant";
import PieChartComponent from "./PieChart";
import { title } from "process";
import { useMutationHooks } from "../../hooks/useMutationHook";

const OrderAdmin = () => {
  const user = useSelector((state) => state?.user);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [dataModalDetail, setDataModalDetail] = useState(null);
  const [orderSelected, setOrderSelected] = useState(null);
  const [newStatusOrder, setNewStatusOrder] = useState(null);
  const mutationUpdateOrder = useMutationHooks((data) => {
    const { token, ...rests } = data;
    const res = OrderService.changeStatusOrder(token, { ...rests });
    return res;
  });
  const {
    data: dataUpdate,
    isLoading,
    isSuccess,
    isError,
  } = mutationUpdateOrder;
  const showModalEdit = (record) => {
    setOrderSelected({...record});
    setNewStatusOrder({...record});
    setOpenModalEdit(true);
  };
  const columnsModalDetail = [
    {
      title: 'Name',
      dataIndex: 'itemName',
      key: 'itemName',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text) => <img src={text} alt="item" style={{ width: '50px', height: '50px' }} />,
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    
  ];
  const showModalDetail = (record) => {
    console.log(record);
    setDataModalDetail(record?.orderItems?.map((item, index) => ({
      key: index,
      itemName: item.name,
      image: item.image,
      quantity: item.amount,
      price: item.price
    })))
    setOpenModalDetail(true);
  }
  const handleOkEditModal = (e) => {
    if (
      !(
        orderSelected?.isDelivered === "TRUE" &&
        orderSelected?.isPaid === "TRUE"
      )
    ) {
      mutationUpdateOrder.mutate({
        token: user?.access_token,
        order_id: orderSelected?._id,
        isDelivered:
          orderSelected?.isDelivered === newStatusOrder?.isDelivered
            ? null
            : newStatusOrder?.isDelivered || null,
        isPaid:
          orderSelected?.isPaid === newStatusOrder?.isPaid
            ? null
            : newStatusOrder?.isPaid || null,
      });
    }
    setOpenModalEdit(false);
  };
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const queryOrder = useQuery({ queryKey: ["orders"], queryFn: getAllOrder });
  const { isLoading: isLoadingOrders, data: orders } = queryOrder;
  useEffect(() => {
    if (dataUpdate?.status === "OK") {
      alert("Cập nhật đơn hàng thành công");
    }
    if (dataUpdate?.status === "ERR") {
      alert("Cập nhật sản phẩm thất bại");
    }
  }, [isSuccess, isError]);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          // ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          // onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            // onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            // onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1890ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        // setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    // render: (text) =>
    //   searchedColumn === dataIndex ? (
    //     // <Highlighter
    //     //   highlightStyle={{
    //     //     backgroundColor: '#ffc069',
    //     //     padding: 0,
    //     //   }}
    //     //   searchWords={[searchText]}
    //     //   autoEscape
    //     //   textToHighlight={text ? text.toString() : ''}
    //     // />
    //   ) : (
    //     text
    //   ),
  });

  const columns = [
    {
      title: "User name",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
      ...getColumnSearchProps("phone"),
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.address.length - b.address.length,
      ...getColumnSearchProps("address"),
    },
    {
      title: "Paided",
      dataIndex: "isPaid",
      sorter: (a, b) => a.isPaid.length - b.isPaid.length,
      ...getColumnSearchProps("isPaid"),
    },
    {
      title: "Shipped",
      dataIndex: "isDelivered",
      sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
      ...getColumnSearchProps("isDelivered"),
    },
    {
      title: "Payment method",
      dataIndex: "paymentMethod",
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      ...getColumnSearchProps("paymentMethod"),
    },
    {
      title: "Total price",
      dataIndex: "totalPrice",
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      ...getColumnSearchProps("totalPrice"),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            icon={<FaEyeDropper />}
            onClick={() => showModalEdit( record)}
          ></Button>
          <Button
            icon={<IoIosEye />}
            onClick={() => showModalDetail(record)}
          >
            
          </Button>
        </Space>
      ),
    },
  ];

  const dataTable =
    orders?.data?.length &&
    orders?.data?.map((order) => {
      return {
        ...order,
        key: order._id,
        userName: order?.shippingAddress?.fullName,
        phone: order?.shippingAddress?.phone,
        address: order?.shippingAddress?.address,
        paymentMethod: orderContant.payment[order?.paymentMethod],
        isPaid: order?.isPaid ? "TRUE" : "FALSE",
        isDelivered: order?.isDelivered ? "TRUE" : "FALSE",
        totalPrice: convertPrice(order?.totalPrice),
      };
    });

  return (
    <>
      <div>
        <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
        <div style={{ height: 200, width: 200 }}>
          <PieChartComponent data={orders?.data} />
        </div>
        <div style={{ marginTop: "20px" }}>
          <TableComponent
            columns={columns}
            isLoading={isLoadingOrders}
            data={dataTable}
          />
        </div>
      </div>
      <Modal
        title="Order Detail"
        open={openModalDetail}
        onOk={() => setOpenModalDetail(false)}
        onCancel={() => setOpenModalDetail(false)}
        width={1000}
      >
        <Table columns={columnsModalDetail} dataSource={dataModalDetail} pagination={false} />
      </Modal>
      <Modal
        title="Edit Order"
        open={openModalEdit}
        onOk={handleOkEditModal}
        onCancel={() => setOpenModalEdit(false)}
      >
        <div>
          {orderSelected?.isDelivered === "TRUE" &&
            orderSelected?.isPaid === "TRUE" && (
              <p className="text-dark mb-2 mt-2">Đơn hàng đã hoàn thành</p>
            )}
          {orderSelected?.isDelivered === "FALSE" && (
            <>
              <p className="text-dark mb-2 mt-4">Shipped:</p>
              <Select
                style={{
                  width: "100%",
                }}
                onChange={(value) => {
                  console.log(value === "TRUE" && orderSelected?.isPaid === "FALSE" && newStatusOrder?.isPaid === "FALSE");
                  if (value === "TRUE" && orderSelected?.isPaid === "FALSE" && newStatusOrder?.isPaid === "FALSE") {
                    newStatusOrder.isPaid = "TRUE";
                  }
                  setNewStatusOrder({ ...newStatusOrder, isDelivered: value });

                }}
                value={newStatusOrder?.isDelivered}
                options={[
                  {
                    value: "TRUE",
                    label: "TRUE",
                  },
                  {
                    value: "FALSE",
                    label: "FALSE",
                  },
                ]}
              />
            </>
          )}
          {orderSelected?.isPaid === "FALSE" && (
            <>
              <p className="text-dark mb-2 mt-4">Paid:</p>
              <Select
                style={{
                  width: "100%",
                }}
                value={newStatusOrder?.isPaid}
                onChange={(value) =>
                  setNewStatusOrder({ ...newStatusOrder, isPaid: value })
                }
                options={[
                  {
                    value: "TRUE",
                    label: "TRUE",
                  },
                  {
                    value: "FALSE",
                    label: "FALSE",
                  },
                ]}
              />
            </>
          )}
        </div>
      </Modal>
    </>
  );
};

export default OrderAdmin;
