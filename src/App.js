import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Components
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Travel from "./components/Travel";
import Viewstatus from "./components/Viewstatus";
import Hotels from "./components/Hotels";
import Buses from "./components/Buses";
import BusesResult from "./components/BusesResult";
import SelectSeats from "./components/SelectSeats";
import Payment from "./components/Payment";
import BookingConfirm from "./components/BookingConfirm";
import TicketPrint from "./components/TicketPrint";


import Cabs from "./components/Cabs";
import Offers from "./components/Offers";
import CustomerCare from "./components/CustomerCare";
import Help from "./components/Help";
import About from "./components/About";
import ContactUs from "./components/ContactUs";


function App() {
  return (
    <Router>
      <div className="App">
        {/* ✅ Wrap all routes inside <Routes> */}
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/viewstatus" element={<Viewstatus />} />

          {/* Booking pages */}
          <Route path="/hotels" element={<Hotels />}s />
          <Route path="/buses" element={<Buses />} />
          <Route path="/busesresult" element={<BusesResult />} />
          <Route path="/select-seats" element={<SelectSeats />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirm-booking" element={<BookingConfirm />} />

          {/* ✈️ Flight booking routes */}

          <Route path="/ticket" element={<TicketPrint />} />
          <Route path="/cabs" element={<Cabs />} />

          {/* Extra pages */}
          <Route path="/offers" element={<Offers />} />
          <Route path="/customer-care" element={<CustomerCare />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
