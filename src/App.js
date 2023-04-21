import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'assets/vendors/feather/feather.css'
import 'assets/vendors/ti-icons/css/themify-icons.css'
// import 'assets/vendors/css/vendor.bundle.base.css'
// import 'assets/vendors/datatables.net-bs4/dataTables.bootstrap4.css'
// import 'assets/js/select.dataTables.min.css'
import 'assets/css/vertical-layout-light/style.css'
import 'assets/vendors/mdi/css/materialdesignicons.min.css'
import Sidebar from 'components/Sidebar'
import Header from 'components/Header'
import Dashboard from "components/Dashboard"
import BannerAds from 'components/Banner-Ads/Banner-Ads'
import CreateBannerAds from 'components/Banner-Ads/Banner-Ads/Create-Banner'
import UpdateBannerAds from 'components/Banner-Ads/Banner-Ads/Update-Information-Banner'
import BannerSlide from 'components/Banner-Ads/Banner-Slide'
import CreateBannerSlide from 'components/Banner-Ads/Banner-Slide/Create-Banner'
import UpdateBannerSlide from 'components/Banner-Ads/Banner-Slide/Update-Information-Banner'
import BannerContent from 'components/Banner-Ads/Banner-Content'
import CreateBannerContent from 'components/Banner-Ads/Banner-Content/Create-Banner'
import UpdateBannerContent from 'components/Banner-Ads/Banner-Content/Update-Information-Banner'
import BannerHead from 'components/Banner-Ads/Banner-Head'
import CreateBannerHead from 'components/Banner-Ads/Banner-Head/Create-Banner'
import UpdateBannerHead from 'components/Banner-Ads/Banner-Head/Update-Information-Banner'
import Orders from 'components/Orders'
import UpdateAndShowOrder from 'components/Orders/Information-Order'
import Laptop from 'components/Products/Laptop'
import LaptopGaming from 'components/Products/Laptop-Gaming'
import PcKm from 'components/Products/PC-KM'
import PcGaming from 'components/Products/PC-Gaming'
import PcCreator from 'components/Products/PC-Creator'
import PcCompany from 'components/Products/PC-Company'
import PcAccessory from 'components/Products/PC-Accessory'
import Apple from 'components/Products/Apple'
import MouseTabpad from 'components/Products/Mouse-Tabpad'
import Monitor from 'components/Products/Monitor'
import Keyboard from 'components/Products/Keyboard'
import ChairTables from 'components/Products/Chair-Table'
import Speaker from 'components/Products/Speaker'
import AppInternet from 'components/Products/App-Internet'
import Accessory from 'components/Products/Accessory'
import ThemeSetting from 'components/Theme-Setting'
import Users from 'components/Users'
import UsersInformation from 'components/Users/Information-User'
import Employers from 'components/Employers/Employers'
import Recruitment from 'components/Recruitment/Recruitment'
import RecruitmentApply from 'components/Recruitment/Recruitment-Apply'
import Discount from 'components/Discount/'
import UpdateInformationDiscount from 'components/Discount/Update-Information-Discount'
import CreateInformationDiscount from 'components/Discount/Create-Discount'
import ChartsOrders from 'components/Charts/Charts-orders'
import ChartsProducts from 'components/Charts/Charts-products'
import Website from 'components/Website/Website'
import UpdateWebsite from 'components/Website/Update-Website'
import Login from 'components/Login'
import UpdateInformationLaptop from 'components/Products/Laptop/Update-Information-Product'
import CreateInformationLaptop from 'components/Products/Laptop/Create-New-Product'
import InformationLaptop from 'components/Products/Laptop/Information-Laptop'
import InformationLaptopGaming from 'components/Products/Laptop-Gaming/Information-Laptop-Gaming'
import UpdateInformationLaptopGaming from 'components/Products/Laptop-Gaming/Update-Information-Product'
import CreateInformationLaptopGaming from 'components/Products/Laptop-Gaming/Create-New-Product'
import InformationPCKM from 'components/Products/PC-KM/Information-PCKM'
import UpdateInformationPCKM from 'components/Products/PC-KM/Update-Information-Product'
import CreateInformationPCKM from 'components/Products/PC-KM/Create-New-Product'
import InformationPCGaming from 'components/Products/PC-Gaming/Information-PCGaming'
import UpdateInformationPCGaming from 'components/Products/PC-Gaming/Update-Information-Product'
import CreateInformationPCGaming from 'components/Products/PC-Gaming/Create-New-Product'
import InformationPCCreator from 'components/Products/PC-Creator/Information-PCCreator'
import UpdateInformationPCCreator from 'components/Products/PC-Creator/Update-Information-Product'
import CreateInformationPCCreator from 'components/Products/PC-Creator/Create-New-Product'
import InformationPCCompany from 'components/Products/PC-Company/Information-PCCompany'
import UpdateInformationPCCompany from 'components/Products/PC-Company/Update-Information-Product'
import CreateInformationPCCompany from 'components/Products/PC-Company/Create-New-Product'
import InformationApple from 'components/Products/Apple/Information-Apple'
import CreateInformationApple from 'components/Products/Apple/Create-New-Product'
import UpdateInformationApple from 'components/Products/Apple/Update-Information-Product'
import InformationMonitor from 'components/Products/Monitor/Information-Monitor'
import CreateInformationMonitor from 'components/Products/Monitor/Create-New-Product'
import UpdateInformationMonitor from 'components/Products/Monitor/Update-Information-Product'
import InformationKeyboard from 'components/Products/Keyboard/Information-Keyboard'
import CreateInformationKeyboard from 'components/Products/Keyboard/Create-New-Product'
import UpdateInformationKeyboard from 'components/Products/Keyboard/Update-Information-Product'
import InformationMouse from 'components/Products/Mouse-Tabpad/Information-Mouse'
import CreateInformationMouse from 'components/Products/Mouse-Tabpad/Create-New-Mouse'
import UpdateInformationMouse from 'components/Products/Mouse-Tabpad/Update-Information-Mouse'
import InformationTabpad from 'components/Products/Mouse-Tabpad/Information-Tabpad'
import CreateInformationTabpad from 'components/Products/Mouse-Tabpad/Create-New-Tabpad'
import UpdateInformationTabpad from 'components/Products/Mouse-Tabpad/Update-Information-Tabpad'
import InformationPcAccessory from 'components/Products/PC-Accessory/Information-PCAccessory'
import CreateInformationPcAccessory from 'components/Products/PC-Accessory/Create-New-Product'
import UpdateInformationPcAccessory from 'components/Products/PC-Accessory/Update-Information-Product'
import InformationSpeaker from 'components/Products/Speaker/Information-Speaker'
import CreateInformationSpeaker from 'components/Products/Speaker/Create-New-Product-Speaker'
import UpdateInformationSpeaker from 'components/Products/Speaker/Update-Information-Speaker'
import InformationHeadPhone from 'components/Products/Speaker/Information-HeadPhone'
import CreateInformationHeadPhone from 'components/Products/Speaker/Create-New-Product-HeadPhone'
import UpdateInformationHeadPhone from 'components/Products/Speaker/Update-Information-HeadPhone'
import InformationChair from 'components/Products/Chair-Table/Information-Chair'
import CreateInformationChair from 'components/Products/Chair-Table/Create-New-Product-Chair'
import UpdateInformationChair from 'components/Products/Chair-Table/Update-Information-Chair'
import InformationTables from 'components/Products/Chair-Table/Information-Tables'
import CreateInformationTables from 'components/Products/Chair-Table/Create-New-Product-Tables'
import UpdateInformationTables from 'components/Products/Chair-Table/Update-Information-Tables'
import InformationApp from 'components/Products/App-Internet/Information-App'
import CreateInformationApp from 'components/Products/App-Internet/Create-New-Product-App'
import UpdateInformationApp from 'components/Products/App-Internet/Update-Information-App'
import InformationInternet from 'components/Products/App-Internet/Information-Internet'
import CreateInformationInternet from 'components/Products/App-Internet/Create-New-Product-Internet'
import UpdateInformationInternet from 'components/Products/App-Internet/Update-Information-Internet'
import InformationAccessory from 'components/Products/Accessory/Information-Accessory'
import CreateInformationAccessory from 'components/Products/Accessory/Create-New-Product'
import UpdateInformationAccessory from 'components/Products/Accessory/Update-Information-Product'
function App() {
  const [page, setPage] = useState([
    { path: "/", location: Dashboard },
    { path: "/banner-ads", location: BannerAds },
    { path: "/banner-ads/create", location: CreateBannerAds },
    { path: "/banner-ads/update/:id", location: UpdateBannerAds },
    { path: "/banner-slide", location: BannerSlide },
    { path: "/banner-slide/create", location: CreateBannerSlide },
    { path: "/banner-slide/update/:id", location: UpdateBannerSlide },
    { path: "/banner-content", location: BannerContent },
    { path: "/banner-content/create", location: CreateBannerContent },
    { path: "/banner-content/update/:id", location: UpdateBannerContent },
    { path: "/banner-head", location: BannerHead },
    { path: "/banner-head/create", location: CreateBannerHead },
    { path: "/banner-head/update/:id", location: UpdateBannerHead },
    { path: "/orders", location: Orders },
    { path: "/orders/:id", location: UpdateAndShowOrder },
    { path: "/laptop", location: Laptop },
    { path: "/laptop/:src", location: InformationLaptop },
    { path: "/laptop/update/:src", location: UpdateInformationLaptop },
    { path: "/laptop/create", location: CreateInformationLaptop },
    { path: "/laptop-gaming", location: LaptopGaming },
    { path: "/laptop-gaming/:id", location: InformationLaptopGaming },
    { path: "/laptop-gaming/update/:id", location: UpdateInformationLaptopGaming },
    { path: "/laptop-gaming/create", location: CreateInformationLaptopGaming },
    { path: "/pc-km", location: PcKm },
    { path: "/pc-km/:id", location: InformationPCKM },
    { path: "/pc-km/update/:id", location: UpdateInformationPCKM },
    { path: "/pc-km/create", location: CreateInformationPCKM },
    { path: "/pc-gaming", location: PcGaming },
    { path: "/pc-gaming/create", location: CreateInformationPCGaming },
    { path: "/pc-gaming/:id", location: InformationPCGaming },
    { path: "/pc-gaming/update/:id", location: UpdateInformationPCGaming },
    { path: "/pc-creator", location: PcCreator },
    { path: "/pc-creator/create", location: CreateInformationPCCreator },
    { path: "/pc-creator/:id", location: InformationPCCreator },
    { path: "/pc-creator/update/:id", location: UpdateInformationPCCreator },
    { path: "/pc-company", location: PcCompany },
    { path: "/pc-company/create", location: CreateInformationPCCompany },
    { path: "/pc-company/:id", location: InformationPCCompany },
    { path: "/pc-company/update/:id", location: UpdateInformationPCCompany },
    { path: "/pc-accessory", location: PcAccessory },
    { path: "/pc-accessory/:id", location: InformationPcAccessory },
    { path: "/pc-accessory/create", location: CreateInformationPcAccessory },
    { path: "/pc-accessory/update/:id", location: UpdateInformationPcAccessory },
    { path: "/apple", location: Apple },
    { path: "/apple/:id", location: InformationApple },
    { path: "/apple/create", location: CreateInformationApple },
    { path: "/apple/update/:id", location: UpdateInformationApple },
    { path: "/monitor", location: Monitor },
    { path: "/monitor/:id", location: InformationMonitor },
    { path: "/monitor/create", location: CreateInformationMonitor },
    { path: "/monitor/update/:id", location: UpdateInformationMonitor },
    { path: "/keyboard", location: Keyboard },
    { path: "/keyboard/:id", location: InformationKeyboard },
    { path: "/keyboard/create", location: CreateInformationKeyboard },
    { path: "/keyboard/update/:id", location: UpdateInformationKeyboard },
    { path: "/mouse-tabpad", location: MouseTabpad },
    { path: "/tabpad/:id", location: InformationTabpad },
    { path: "/tabpad/create", location: CreateInformationTabpad },
    { path: "/tabpad/update/:id", location: UpdateInformationTabpad },
    { path: "/mouse/:id", location: InformationMouse },
    { path: "/mouse/create", location: CreateInformationMouse },
    { path: "/mouse/update/:id", location: UpdateInformationMouse },
    { path: "/speaker", location: Speaker },
    { path: "/speaker/:id", location: InformationSpeaker },
    { path: "/speaker/create", location: CreateInformationSpeaker },
    { path: "/speaker/update/:id", location: UpdateInformationSpeaker },
    { path: "/headphone/:id", location: InformationHeadPhone },
    { path: "/headphone/create", location: CreateInformationHeadPhone },
    { path: "/headphone/update/:id", location: UpdateInformationHeadPhone },
    { path: "/chair-tables", location: ChairTables },
    { path: "/chair/:id", location: InformationChair },
    { path: "/chair/create", location: CreateInformationChair },
    { path: "/chair/update/:id", location: UpdateInformationChair },
    { path: "/tables/:id", location: InformationTables },
    { path: "/tables/create", location: CreateInformationTables },
    { path: "/tables/update/:id", location: UpdateInformationTables },
    { path: "/app-internet", location: AppInternet },
    { path: "/app/:id", location: InformationApp },
    { path: "/app/create", location: CreateInformationApp },
    { path: "/app/update/:id", location: UpdateInformationApp },
    { path: "/internet/:id", location: InformationInternet },
    { path: "/internet/create", location: CreateInformationInternet },
    { path: "/internet/update/:id", location: UpdateInformationInternet },
    { path: "/accessory", location: Accessory },
    { path: "/accessory/:id", location: InformationAccessory },
    { path: "/accessory/create", location: CreateInformationAccessory },
    { path: "/accessory/update/:id", location: UpdateInformationAccessory },
    { path: "/recruitment-apply", location: RecruitmentApply },
    { path: "/recruitment", location: Recruitment },
    { path: "/users", location: Users },
    { path: "/user/:id", location: UsersInformation },
    { path: "/employers", location: Employers },
    { path: "/discount", location: Discount },
    { path: "/discount/update/:id", location: UpdateInformationDiscount },
    { path: "/discount/create", location: CreateInformationDiscount },
    { path: "/charts-orders", location: ChartsOrders },
    { path: "/charts-products", location: ChartsProducts },
    { path: "/website", location: Website },
    { path: "/website/update", location: UpdateWebsite },
  ])
  const [chooseSettingThemePages, setChooseSettingThemePages] = useState(false)
  const [isChooseShowicons, setIsChooseShowicons] = useState(false)
  const [isShowSideBarRes, setIsShowSideBarRes] = useState(false)
  const [getChooseSettingThemePages, setGetChooseSettingThemePages] = useState("")
  const getSettingChooseShowIconOnly = (data) => {
    setIsChooseShowicons(data)
  }
  const getShowSideBarRes = (data) => {
    setIsShowSideBarRes(data)
  }
  const getDataChooseSettingThemePages = (data) => {
    setGetChooseSettingThemePages(data)
  }
  const getIsChooseSettingThemePages = (data) => {
    setChooseSettingThemePages(data)
  }

  return (
    <BrowserRouter>
      <Routes>
        {page.map((item, index) => {
          const TagName1 = item.location
          return <Route key={index} path={item.path} element={
            <div className={isChooseShowicons ? 'sidebar-icon-only' : null}>
              <div className="container-scroller" >
                <Header
                  getChooseSettingThemePages={getChooseSettingThemePages}
                  isChooseShowicons={isChooseShowicons}
                  getSettingChooseShowIconOnly={getSettingChooseShowIconOnly}
                  isShowSideBarRes={isShowSideBarRes}
                  getShowSideBarRes={getShowSideBarRes}
                />
                <div className="container-fluid page-body-wrapper">
                  <ThemeSetting
                    getDataChooseSettingThemePages={getDataChooseSettingThemePages}
                    chooseSettingThemePages={chooseSettingThemePages}
                    getIsChooseSettingThemePages={getIsChooseSettingThemePages}
                  />
                  <Sidebar
                    isChooseShowicons={isChooseShowicons}
                    getSettingChooseShowIconOnly={getSettingChooseShowIconOnly}
                    isShowSideBarRes={isShowSideBarRes} />
                  <TagName1 />
                </div>
              </div>
            </div>
          }>
          </Route>
        })}
        <Route path="/login" element={<><Login /></>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
