import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

const BuyHotel = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [rooms, setRooms] = useState(1);
  const [hotel, setHotel] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/api/v1/get-hotel-by-id/${id}`);
        setHotel(response.data.data);
      } catch (error) {
        console.error('Error fetching hotel details:', error);
      }
    };
    fetchHotelDetails();
  }, [id]);

  useEffect(() => {
    if (hotel && checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const days = Math.max((end - start) / (1000 * 60 * 60 * 24), 1);
      setTotalAmount(hotel.pricePerNight * days * rooms);
    }
  }, [rooms, hotel, checkInDate, checkOutDate]);

  const handlePayment = async (e) => {
    e.preventDefault();
    const bookingData = { fullName, email, address, checkInDate, checkOutDate, guests: rooms, totalAmount, hotelId: id };
    const headers = { id: localStorage.getItem('id'), authorization: `Bearer ${localStorage.getItem('token')}` };

    const options = {
      key: 'rzp_test_yUub2bdFAKhXLh',
      amount: totalAmount * 100,
      currency: 'INR',
      name: 'Hotel Booking',
      description: 'Test Transaction',
      handler: async function (response) {
        Swal.fire({ title: 'Success!', text: 'Payment ID: ' + response.razorpay_payment_id, icon: 'success', confirmButtonText: 'OK' });
        try {
          await axios.post('http://localhost:1000/api/v1/place-booking', bookingData, { headers });
          navigate('/profile/bookingHistory');
        } catch (error) {
          console.error('Error placing booking:', error);
          Swal.fire({ title: 'Error!', text: error.response?.data?.message, icon: 'error', confirmButtonText: 'OK' });
        }
      },
      prefill: { name: fullName, email, contact: '' },
      theme: { color: '#F37254' },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white dark:bg-zinc-900 px-4">
      <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-md">
        <h1 className="text-2xl text-white font-semibold mb-4">Book {hotel?.name}</h1>
        <form onSubmit={handlePayment}>
          <label className="text-sm text-white mb-1 block">Full Name:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} className="w-full p-2 mb-3 bg-white text-black" required />

          <label className="text-sm text-white mb-1 block">Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 mb-3 bg-white text-black" required />

          <label className="text-sm text-white mb-1 block">Address:</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-2 mb-3 bg-white text-black" required />

          <label className="text-sm text-white mb-1 block">Check-in Date:</label>
          <input type="date" value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} className="w-full p-2 mb-3 bg-white text-black" required />

          <label className="text-sm text-white mb-1 block">Check-out Date:</label>
          <input type="date" value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} className="w-full p-2 mb-3 bg-white text-black" required />

          <label className="text-sm text-white mb-1 block">Rooms:</label>
          <input type="number" value={rooms} onChange={(e) => setRooms(parseInt(e.target.value) || 1)} min="1" className="w-full p-2 mb-3 bg-white text-black" required />

          <p className="text-sm text-white">Total Amount: ₹{totalAmount}</p>
          <button type="submit" className="bg-yellow-400 w-full p-2 mt-4">Confirm Booking</button>
        </form>
      </div>
    </div>
  );
};

export default BuyHotel;

