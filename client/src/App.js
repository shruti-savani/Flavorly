import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; 
import Home from "./Components/Home";
import Menu from "./Components/Menu";
import Feedback from "./Components/Feedback";
import OrderSummary from "./Components/OrderSummary";
import Gallery from "./Components/Gallery";
import About from "./Components/About";
import Reservation from "./Components/Reservation";
import DeliveryMenu from "./Components/OnlineDelivery/DeliveryMenu";
import Login from "./Components/OnlineDelivery/Login";
import Signup from "./Components/OnlineDelivery/Signup";
import Cookies from "js-cookie";
import UserDetails from "./Components/OnlineDelivery/UserDetails";
import DeliverySummary from "./Components/OnlineDelivery/DeliverySummary";
import History from "./Components/OnlineDelivery/History";
import InvoiceContent from "./Components/OnlineDelivery/InvoiceContent";

function App() {

  const isUser = Cookies.get("jwt");
  const isUserLength = isUser ? isUser.length : 0;

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/menu" element={<Menu/>}/>
          <Route path="/menu/:section" element={<Menu/>}/>
          <Route path="/order" element={<OrderSummary/>}/>
          <Route path="/gallery" element={<Gallery/>}/>
          <Route path="/feedback" element={<Feedback/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/about/:section" element={<About/>}/>
          <Route path="/reservation" element={<Reservation/>}/>
          <Route path="/delivery-menu" element={isUserLength !== 0 ? <DeliveryMenu/> : <Navigate to='/login'/>}/>
          <Route path="/user-details/:id" element= {<UserDetails/>}/>
          <Route path="/user-details/history/:id" element= {<History/>}/>
          <Route path="/signup" element={isUserLength === 0 ? <Signup/> : <Navigate to='/delivery-menu'/>}/>
          <Route path="/login" element={isUserLength === 0 ? <Login/> : <Navigate to='/delivery-menu'/>}/>
          <Route path="/delivery-summary" element={<DeliverySummary/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
