import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Forgot Password Components
import ForgotPassword from "./components/ForgotPassword";
import OtpVerification from "./components/OtpVerification";
import ResetPassword from "./components/ResetPassword";
import TrainFood from "./components/TrainFood";

// Components
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Travel from "./components/Travel";
import Viewstatus from "./components/Viewstatus";

// Travel categories
import Flights from "./components/Flights";
import Trains from "./components/Trains";
import Hotels from "./components/Hotels";
import Buses from "./components/Buses";
import Cabs from "./components/Cabs";

// Bus-related pages
import BusesResult from "./components/BusesResult";
import SelectSeats from "./components/SelectSeats";
import Payment from "./components/Payment";
import BookingConfirm from "./components/BookingConfirm";

// ✅ Live tracking feature
import LiveTracking from "./components/LiveTracking";

// Train-related pages
import TrainBook from "./components/TrainBook";
import TrainResults from "./components/TrainResults";
import BookingConfirmation from "./components/BookingConfirmation";
import BankTransition from "./components/BankTransition";

// Flight booking pages
import SearchResults from "./components/SearchResults";
import BookingPage from "./components/BookingPage";
import SeatSelection from "./components/SeatSelection";
import PaymentPage from "./components/PaymentPage";

// Other pages
import TicketPrint from "./components/TicketPrint";
import Offers from "./components/Offers";
import CustomerCare from "./components/CustomerCare";
import Help from "./components/Help";
import About from "./components/About";
import ContactUs from "./components/ContactUs";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* 🌍 Main Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/travel" element={<Travel />} />
          <Route path="/viewstatus" element={<Viewstatus />} />

          {/* 🚌 Bus Booking */}
          <Route path="/buses" element={<Buses />} />
          <Route path="/busesresult" element={<BusesResult />} />
          <Route path="/select-seats" element={<SelectSeats />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/confirm-booking" element={<BookingConfirm />} />
          <Route path="/live-tracking" element={<LiveTracking />} /> {/* ✅ New */}

          {/* 🚆 Train Booking */}
          <Route path="/train-results" element={<TrainResults />} />
          <Route path="/train-book" element={<TrainBook />} />
          <Route path="/train-food" element={<TrainFood />} />
          <Route path="/bank-transition" element={<BankTransition />} />
          <Route
            path="/booking-confirmation"
            element={<BookingConfirmation />}
          />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<OtpVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          
          {/* ✈️ Flight Booking */}
          <Route path="/search" element={<SearchResults />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/seats" element={<SeatSelection />} />
          <Route path="/payment-page" element={<PaymentPage />} />

          {/* 🚖 Cabs, Hotels, and Offers */}
          <Route path="/flights" element={<Flights />} />
          <Route path="/trains" element={<Trains />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/cabs" element={<Cabs />} />
          <Route path="/offers" element={<Offers />} />

          {/* 📞 Support & Info */}
          <Route path="/customer-care" element={<CustomerCare />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />

          {/* 🎫 Tickets */}
          <Route path="/ticket" element={<TicketPrint />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
