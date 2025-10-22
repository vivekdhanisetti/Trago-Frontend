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
import Flights from "./components/Flights";
import Trains from "./components/Trains";
import Hotels from "./components/Hotels";
import Buses from "./components/Buses";
import Cabs from "./components/Cabs";
import Offers from "./components/Offers";
import CustomerCare from "./components/CustomerCare";
import Help from "./components/Help";
import SearchResults from "./components/SearchResults";// ✅ imported
import BookingPage from "./components/BookingPage";
import SeatSelection from "./components/SeatSelection";
import PaymentPage from "./components/PaymentPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Main pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/viewstatus" element={<Viewstatus />} />

          {/* Booking pages */}
          <Route path="/flights" element={<Flights />} />
          <Route path="/trains" element={<Trains />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/buses" element={<Buses />} />
          <Route path="/cabs" element={<Cabs />} />

          {/* Extra pages */}
          <Route path="/offers" element={<Offers />} />
          <Route path="/customer-care" element={<CustomerCare />} />
          <Route path="/help" element={<Help />} />

          {/* ✅ Add Search Results Page */}
          <Route path="/search" element={<SearchResults />} />
           <Route path="/booking" element={<BookingPage />} />
           <Route path="/seats" element={<SeatSelection />} />
           <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
