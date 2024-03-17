import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'assets/vendors/feather/feather.css'
import 'assets/css/vertical-layout-light/style.css'
import 'assets/vendors/mdi/css/materialdesignicons.min.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'App.css'
// import Sidebar from 'components/Sidebar'
// import Header from 'components/Header'
// import Dashboard from "components/Dashboard"
// import Orders from 'components/Orders'
// import UpdateAndShowOrder from 'components/Orders/Information-Order'
// import Laptop from 'components/Products/Laptop'
// import LaptopGaming from 'components/Products/Laptop-Gaming'
// import PcGaming from 'components/Products/PC-Gaming'
// import PcCreator from 'components/Products/PC-Creator'
// import PcCompany from 'components/Products/PC-Company'
// import Apple from 'components/Products/Apple'
// import ThemeSetting from 'components/Theme-Setting'
// import Users from 'components/Users'
// import UsersInformation from 'components/Users/Information-User'
// import Employee from 'components/Employee'
// import CreateEmployee from 'components/Employee/Create-Employee'
// import UpdateEmployee from 'components/Employee/Update-Employee'
// import InformationEmployee from 'components/Employee/Information-Employee'
// import Discount from 'components/Discount/'
// import UpdateInformationDiscount from 'components/Discount/Update-Information-Discount'
// import InformationDiscount from 'components/Discount/Information-Discount'
// import CreateInformationDiscount from 'components/Discount/Create-Discount'
// import Website from 'components/Website/Website'
// import UpdateWebsite from 'components/Website/Update-Website'
// import Login from 'components/Login'
// import UpdateInformationLaptop from 'components/Products/Laptop/Update-Information-Product'
// import CreateInformationLaptop from 'components/Products/Laptop/Create-New-Product'
// import InformationLaptop from 'components/Products/Laptop/Information-Laptop'
// import InformationLaptopGaming from 'components/Products/Laptop-Gaming/Information-Laptop-Gaming'
// import UpdateInformationLaptopGaming from 'components/Products/Laptop-Gaming/Update-Information-Product'
// import CreateInformationLaptopGaming from 'components/Products/Laptop-Gaming/Create-New-Product'
// import InformationPCGaming from 'components/Products/PC-Gaming/Information-PCGaming'
// import UpdateInformationPCGaming from 'components/Products/PC-Gaming/Update-Information-Product'
// import CreateInformationPCGaming from 'components/Products/PC-Gaming/Create-New-Product'
// import InformationPCCreator from 'components/Products/PC-Creator/Information-PCCreator'
// import UpdateInformationPCCreator from 'components/Products/PC-Creator/Update-Information-Product'
// import CreateInformationPCCreator from 'components/Products/PC-Creator/Create-New-Product'
// import InformationPCCompany from 'components/Products/PC-Company/Information-PCCompany'
// import UpdateInformationPCCompany from 'components/Products/PC-Company/Update-Information-Product'
// import CreateInformationPCCompany from 'components/Products/PC-Company/Create-New-Product'
// import InformationApple from 'components/Products/Apple/Information-Apple'
// import CreateInformationApple from 'components/Products/Apple/Create-New-Product'
// import UpdateInformationApple from 'components/Products/Apple/Update-Information-Product'
import Login from 'components/v2/Login'
import SidebarV2 from 'components/v2/Sidebar'
import DashboardV2 from 'components/v2/Dashboard'
import OrdersV2 from 'components/v2/Order'
import DiscountV2 from 'components/v2/Discount'
import EmployeeV2 from 'components/v2/Employee'
import UserV2 from 'components/v2/User'
import ProductV2 from 'components/v2/Product'
import AdsV2 from 'components/v2/Ads'
function App() {
  const [pageV1, setPageV1] = useState([])
  const [pageV2, setPageV2] = useState([])
  const [chooseSettingThemePages, setChooseSettingThemePages] = useState(false)
  const [isChooseShowIcons, setIsChooseShowIcons] = useState(false)
  const [isShowSideBarRes, setIsShowSideBarRes] = useState(false)
  const [getChooseSettingThemePages, setGetChooseSettingThemePages] = useState("")

  const handleGetSettingChooseShowIconOnly = (data) => {
    setIsChooseShowIcons(data)
  }
  const handleGetShowSideBarRes = (data) => {
    setIsShowSideBarRes(data)
  }
  const handleGetDataChooseSettingThemePages = (data) => {
    setGetChooseSettingThemePages(data)
  }
  const handleGetIsChooseSettingThemePages = (data) => {
    setChooseSettingThemePages(data)
  }
  useEffect(() => {
    // setPageV1([
    //   { path: "/", location: Dashboard },
    //   { path: "/orders", location: Orders },
    //   { path: "/orders/:id", location: UpdateAndShowOrder },
    //   { path: "/laptop", location: Laptop },
    //   { path: "/laptop/:src", location: InformationLaptop },
    //   { path: "/laptop/update/:src", location: UpdateInformationLaptop },
    //   { path: "/laptop/create", location: CreateInformationLaptop },
    //   { path: "/laptop-gaming", location: LaptopGaming },
    //   { path: "/laptop-gaming/:src", location: InformationLaptopGaming },
    //   { path: "/laptop-gaming/update/:src", location: UpdateInformationLaptopGaming },
    //   { path: "/laptop-gaming/create", location: CreateInformationLaptopGaming },
    //   { path: "/pc-gaming", location: PcGaming },
    //   { path: "/pc-gaming/create", location: CreateInformationPCGaming },
    //   { path: "/pc-gaming/:src", location: InformationPCGaming },
    //   { path: "/pc-gaming/update/:src", location: UpdateInformationPCGaming },
    //   { path: "/pc-creator", location: PcCreator },
    //   { path: "/pc-creator/create", location: CreateInformationPCCreator },
    //   { path: "/pc-creator/:src", location: InformationPCCreator },
    //   { path: "/pc-creator/update/:src", location: UpdateInformationPCCreator },
    //   { path: "/pc-company", location: PcCompany },
    //   { path: "/pc-company/create", location: CreateInformationPCCompany },
    //   { path: "/pc-company/:src", location: InformationPCCompany },
    //   { path: "/pc-company/update/:src", location: UpdateInformationPCCompany },
    //   { path: "/apple", location: Apple },
    //   { path: "/apple/:src", location: InformationApple },
    //   { path: "/apple/create", location: CreateInformationApple },
    //   { path: "/apple/update/:src", location: UpdateInformationApple },
    //   { path: "/users", location: Users },
    //   { path: "/user/:id", location: UsersInformation },
    //   { path: "/employee", location: Employee },
    //   { path: "/employee/create", location: CreateEmployee },
    //   { path: "/employee/:id", location: InformationEmployee },
    //   { path: "/employee/update/:id", location: UpdateEmployee },
    //   { path: "/discount", location: Discount },
    //   { path: "/discount/:id", location: InformationDiscount },
    //   { path: "/discount/update/:id", location: UpdateInformationDiscount },
    //   { path: "/discount/create", location: CreateInformationDiscount },
    //   { path: "/website", location: Website },
    //   { path: "/website/update", location: UpdateWebsite },
    // ])
    setPageV2([
      { path: "/v2", location: DashboardV2 },
      { path: "/v2/order", location: OrdersV2 },
      { path: "v2/discount", location: DiscountV2 },
      { path: "v2/user", location: UserV2 },
      { path: "v2/employee", location: EmployeeV2 },
      { path: "v2/product", location: ProductV2 },
      { path: "v2/ads", location: AdsV2 },
    ])
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        {/* {pageV1.map((item, index) => {
          const TagName1 = item.location
          return <Route key={index} path={item.path} element={
            JSON.parse(localStorage.getItem('auth-token-admin')) ? <div className={isChooseShowIcons ? 'sidebar-icon-only' : null}>
              <div className="container-scroller" >
                <Header
                  getChooseSettingThemePages={getChooseSettingThemePages}
                  isChooseShowIcons={isChooseShowIcons}
                  onHandleGetSettingChooseShowIconOnly={handleGetSettingChooseShowIconOnly}
                  isShowSideBarRes={isShowSideBarRes}
                  onHandleGetShowSideBarRes={handleGetShowSideBarRes}
                />
                <div className="container-fluid page-body-wrapper">
                  <ThemeSetting
                    onHandleGetDataChooseSettingThemePages={handleGetDataChooseSettingThemePages}
                    chooseSettingThemePages={chooseSettingThemePages}
                    onHandleGetIsChooseSettingThemePages={handleGetIsChooseSettingThemePages}
                  />
                  <Sidebar
                    isChooseShowIcons={isChooseShowIcons}
                    onHandleGetSettingChooseShowIconOnly={handleGetSettingChooseShowIconOnly}
                    isShowSideBarRes={isShowSideBarRes} />
                  <TagName1 />
                </div>
              </div>
            </div>
              :
              <><Login /></>
          }>
          </Route>
        })} */}
        {pageV2.map((item, index) => {
          const TagName1 = item.location
          return <Route key={index} path={item.path} element={
            JSON.parse(localStorage.getItem('auth-token-admin')) ? <div className={isChooseShowIcons ? 'sidebar-icon-only' : null}>
              <div className="container-scroller" >
                <div className="container-content">
                  <SidebarV2
                    isChooseShowIcons={isChooseShowIcons}
                    onHandleGetSettingChooseShowIconOnly={handleGetSettingChooseShowIconOnly}
                    isShowSideBarRes={isShowSideBarRes} />
                  <TagName1 />
                </div>
              </div>
            </div>
              :
              <><Login /></>
          }>
          </Route>
        })}
        <Route path="v2/login" element={<><Login /></>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
