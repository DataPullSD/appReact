import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import DashboardHome from "./pages/Dashboard/Home";
import PersonalSearch from "./pages/phonora/PersonalSearch";
import MapSearch from "./pages/phonora/MapSearch";
import CompanyTrace from "./pages/B2B/companyTrace";
import GMail from "./pages/B2B/GMail";
import HomePage from "./pages/homepage";
import Home from "./pages/home";
import SearchStatistics from "./pages/phonora/SearchStatistics";
import StatisticsDashboard from "./pages/Dashboard/StatisticsDashboard";
import FoodDeliveryPage from "./pages/B2B/B2BMap";
import HomepageSolutions from "./pages/home";
export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes >
          <Route path="/" element={<HomePage />} />
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/home" element={<Home />} />
            <Route path="/statistics" element={<StatisticsDashboard />} />
            <Route index path="/home" element={<DashboardHome />} />
            <Route path="/solutions" element={<HomepageSolutions />} />


            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />
            
             {/* Phonora */}
             <Route path="/personal-search" element={<PersonalSearch />} />
             <Route path="/map-search" element={<MapSearch />} />
              {/* B2B */}
              <Route path="/company-trace" element={<CompanyTrace />} />
              <Route path="/gMail" element={<GMail />} />
              <Route path="/B2BMap" element={<FoodDeliveryPage />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />


          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
} 