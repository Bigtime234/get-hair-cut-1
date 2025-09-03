import React from 'react';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter, Youtube, Clock } from 'lucide-react';

const Footer = () => {
  const services = [
    'Classic Haircuts',
    'Beard Trimming & Styling',
    'Hot Towel Shaves',
    'Hair Washing & Styling',
    'Mustache Grooming',
    'Scalp Treatments',
    'Wedding Packages',
    'Group Bookings'
  ];

  const quickLinks = [
    'Home',
    'Book Appointment',
    'Services',
    'About Us',
    'Gallery',
    'Contact',
    'Reviews',
    'Gift Cards'
  ];

  const masterBarbers = [
    'Marcus "The Precision" Johnson',
    'Sofia "Style Maven" Rodriguez',
    'David "Classic Cut" Thompson',
    'Isabella "Trend Setter" Chen',
    'Antonio "The Artist" Morales',
    'Emma "Sharp Lines" Wilson',
    'View All Masters',
    'Book with Your Favorite'
  ];

  const operatingHours = [
    { day: 'Monday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 8:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 9:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 9:00 PM' },
    { day: 'Sunday', hours: '10:00 AM - 6:00 PM' }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white relative overflow-hidden">
      {/* Golden accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Logo Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-yellow-400 mb-2 tracking-wider">
            ✂️ BARBERPRO
          </h2>
          <p className="text-gray-300 italic text-lg">Premium Grooming Experience</p>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          
          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-yellow-400 mb-6 relative">
              Quick Links
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-yellow-400 mt-2"></div>
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index} className="text-gray-300 hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer border-b border-transparent hover:border-yellow-400 pb-1">
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-yellow-400 mb-6 relative">
              Our Services
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-yellow-400 mt-2"></div>
            </h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index} className="text-gray-300 hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer border-b border-transparent hover:border-yellow-400 pb-1">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Master Profiles */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-yellow-400 mb-6 relative">
              Master Profiles
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-yellow-400 mt-2"></div>
            </h3>
            <ul className="space-y-3">
              {masterBarbers.map((master, index) => (
                <li key={index} className="text-gray-300 hover:text-yellow-400 hover:translate-x-2 transition-all duration-300 cursor-pointer border-b border-transparent hover:border-yellow-400 pb-1">
                  {master}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-yellow-400 mb-6 relative">
              Contact & Hours
              <div className="absolute bottom-0 left-0 w-12 h-0.5 bg-yellow-400 mt-2"></div>
            </h3>
            
            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 p-3 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 hover:translate-x-1 transition-all duration-300">
                <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">123 Grooming Street, Style District</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 hover:translate-x-1 transition-all duration-300">
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">(555) 123-CUTS</span>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-white bg-opacity-5 rounded-lg hover:bg-opacity-10 hover:translate-x-1 transition-all duration-300">
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">book@barberpro.com</span>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="mb-6">
              <h4 className="text-yellow-400 font-medium mb-4 flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Operating Hours
              </h4>
              <div className="space-y-2">
                {operatingHours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-white bg-opacity-5 rounded hover:bg-opacity-10 transition-all duration-300">
                    <span className="text-yellow-400 font-medium text-sm">{schedule.day}</span>
                    <span className="text-gray-300 text-sm">{schedule.hours}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 justify-center lg:justify-start">
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-gray-900 hover:scale-110 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/30">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-gray-900 hover:scale-110 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/30">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-gray-900 hover:scale-110 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/30">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center text-gray-900 hover:scale-110 hover:-translate-y-1 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-400/30">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © 2025 BarberPro. All rights reserved. | Privacy Policy | Terms of Service
            </div>
            <div className="flex items-center space-x-2 text-yellow-400 font-medium">
              <span className="text-lg">⚡</span>
              <span>Developed by @codebyriven</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;