"use client"
import React, { useState, useEffect, ReactElement } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { 
  Home, 
  User, 
  Calendar, 
  Users, 
  Star, 
  MapPin, 
  MoreHorizontal, 
  Menu, 
  X, 
  Scissors,
  Crown,
  Award,
  Phone
} from 'lucide-react';

// Import your UserButton component
import { UserButton } from './user-button';

interface NavigationItem {
  name: string;
  path: string;
  icon: any;
}

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'default' | 'outline' | 'ghost';
  className?: string;
  onClick?: () => void;
  iconName?: any;
  iconPosition?: 'left' | 'right';
  iconSize?: number;
  fullWidth?: boolean;
}

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems: NavigationItem[] = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'Master Profiles', path: '/masters-profle', icon: Crown },
    { name: 'Services', path: '/components/service', icon: Scissors },
    { name: 'My Bookings', path: '/bookings', icon: Calendar },
  ];

  const secondaryItems: NavigationItem[] = [
    { name: 'Contact Us', path: '/contact', icon: MapPin },
    { name: 'About', path: '/about', icon: Award },
  ];

  const isActivePath = (path: string): boolean => {
    if (!mounted) return false;
    return pathname === path;
  };

  const handleNavigation = (path: string): void => {
    router.push(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = (): void => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const Button = ({ 
    children, 
    variant = 'default', 
    className = '', 
    onClick, 
    iconName, 
    iconPosition = 'left', 
    iconSize = 18,
    fullWidth = false 
  }: ButtonProps): ReactElement => {
    const renderIcon = (position: 'left' | 'right') => {
      if (!iconName || iconPosition !== position) return null;
      
      const IconComponent = iconName;
      return <IconComponent size={iconSize} />;
    };
    
    return (
      <button
        onClick={onClick}
        className={`
          inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-all duration-300
          ${variant === 'default' ? 'bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-black shadow-lg hover:shadow-xl' : ''}
          ${variant === 'outline' ? 'border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-black' : ''}
          ${variant === 'ghost' ? 'hover:bg-gray-100 text-gray-700' : ''}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
      >
        {renderIcon('left')}
        {children}
        {renderIcon('right')}
      </button>
    );
  };

  if (!mounted) {
    return (
      <>
        <header 
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            isScrolled 
              ? 'bg-black/95 backdrop-blur-xl shadow-2xl border-b border-amber-500/20' 
              : 'bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm'
          }`}
        >
          <div className="w-full px-3 sm:px-4 lg:px-8">
            <div className="flex items-center justify-between h-16 sm:h-18 lg:h-22">
              {/* Logo - Simplified for mobile */}
              <Link 
                href="/"
                className="flex items-center cursor-pointer group min-w-0"
              >
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-amber-300/30">
                      <Scissors size={16} color="black" className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                    </div>
                    <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-sm sm:text-xl lg:text-2xl text-white group-hover:text-amber-400 transition-colors duration-300 tracking-wide truncate">
                      ELITE
                    </span>
                    <span className="text-xs sm:text-sm text-amber-400 -mt-0.5 sm:-mt-1 font-medium  tracking-wider">
                      BARBERSHOP
                    </span>
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-2">
                {navigationItems.map((item) => {
                  const IconComponent = item.icon;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className="flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 text-gray-300 hover:text-amber-400 hover:bg-white/10 backdrop-blur-sm border border-transparent hover:border-amber-500/30"
                    >
                      <IconComponent size={18} className="text-current" />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
                
                {/* More Menu */}
                <div className="relative group">
                  <button className="flex items-center space-x-2 px-5 py-3 rounded-xl font-medium text-gray-300 hover:text-amber-400 hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-amber-500/30">
                    <MoreHorizontal size={18} />
                    <span>More</span>
                  </button>
                  
                  <div className="absolute top-full right-0 mt-3 w-56 bg-black/95 backdrop-blur-xl rounded-xl shadow-2xl border border-amber-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
                    {secondaryItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.path}
                          onClick={() => handleNavigation(item.path)}
                          className="w-full flex items-center space-x-3 px-5 py-4 text-left font-medium hover:bg-amber-500/10 transition-colors duration-300 first:rounded-t-xl last:rounded-b-xl text-gray-300 hover:text-amber-400"
                        >
                          <IconComponent size={16} />
                          <span>{item.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </nav>

              {/* Right Side - Mobile Optimized */}
              <div className="flex items-center space-x-1 sm:space-x-4 flex-shrink-0">
                {/* Call Button - Hidden on small mobile, icon only on medium */}
                <Button
                  variant="outline"
                  className="hidden md:flex border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black font-semibold"
                  onClick={() => window.open('tel:+1555123CUTS')}
                  iconName={Phone}
                  iconPosition="left"
                  iconSize={18}
                >
                  (555) 123-CUTS
                </Button>

                {/* Phone icon only for small screens */}
                <button
                  onClick={() => window.open('tel:+1555123CUTS')}
                  className="md:hidden p-2 sm:p-3 rounded-lg border-2 border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300"
                >
                  <Phone size={16} className="sm:w-5 sm:h-5" />
                </button>

                {/* User Button */}
                {status === 'authenticated' && session && (
                  <div className="flex items-center">
                    <UserButton {...session} />
                  </div>
                )}

                {/* Sign In Button - Hidden on mobile */}
                {status === 'unauthenticated' && (
                  <Button
                    variant="default"
                    className="hidden sm:flex"
                    onClick={() => handleNavigation('/login')}
                    iconName={User}
                    iconPosition="left"
                    iconSize={18}
                  >
                    Sign In
                  </Button>
                )}

                {/* Mobile Menu Toggle */}
                <button
                  onClick={toggleMobileMenu}
                  className="lg:hidden p-2 sm:p-3 rounded-lg text-white hover:text-amber-400 hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-amber-500/30 flex-shrink-0"
                  aria-label="Toggle mobile menu"
                >
                  {isMobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
                </button>
              </div>
            </div>
          </div>
        </header>
        
        <div className="h-16 sm:h-18 lg:h-22"></div>
      </>
    );
  }

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/95 backdrop-blur-xl shadow-2xl border-b border-amber-500/20' 
            : 'bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm'
        }`}
      >
        <div className="w-full px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-22">
            {/* Logo - Mobile Optimized */}
            <Link 
              href="/"
              className="flex items-center cursor-pointer group min-w-0 flex-shrink-0"
            >
              <div className="flex items-center space-x-2 sm:space-x-4">
                <div className="relative flex-shrink-0">
                  <div className="w-8 h-8 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-amber-400 via-yellow-500 to-amber-600 rounded-lg sm:rounded-xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 border border-amber-300/30">
                    <Scissors size={16} color="black" className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 rotate-45 group-hover:rotate-90 transition-transform duration-500" />
                  </div>
                  <div className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full animate-pulse shadow-lg"></div>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-bold text-sm sm:text-xl lg:text-2xl text-white group-hover:text-amber-400 transition-colors duration-300 tracking-wide">
                    ELITE CUTS
                  </span>
                  <span className="text-xs sm:text-sm text-amber-400 -mt-0.5 sm:-mt-1 font-medium tracking-wider">
                    BARBERSHOP
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navigationItems.map((item, index) => {
                const IconComponent = item.icon;
                const isActive = isActivePath(item.path);
                const uniqueDesktopKey = `desktop-${index}-${item.name.replace(/\s+/g, '-').toLowerCase()}`;
                return (
                  <button
                    key={uniqueDesktopKey}
                    onClick={() => handleNavigation(item.path)}
                    className={`flex items-center space-x-2 px-5 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 backdrop-blur-sm ${
                      isActive
                        ? 'text-black bg-gradient-to-r from-amber-400 to-yellow-500 shadow-lg border border-amber-300'
                        : 'text-gray-300 hover:text-amber-400 hover:bg-white/10 border border-transparent hover:border-amber-500/30'
                    }`}
                  >
                    <IconComponent 
                      size={18} 
                      className={isActive ? 'text-black' : 'text-current'} 
                    />
                    <span>{item.name}</span>
                  </button>
                );
              })}
              
              {/* More Menu */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-5 py-3 rounded-xl font-medium text-gray-300 hover:text-amber-400 hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-amber-500/30">
                  <MoreHorizontal size={18} />
                  <span>More</span>
                </button>
                
                <div className="absolute top-full right-0 mt-3 w-56 bg-black/95 backdrop-blur-xl rounded-xl shadow-2xl border border-amber-500/20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20">
                  {secondaryItems.map((item) => {
                    const IconComponent = item.icon;
                    const isActive = isActivePath(item.path);
                    return (
                      <button
                        key={item.path}
                        onClick={() => handleNavigation(item.path)}
                        className={`w-full flex items-center space-x-3 px-5 py-4 text-left font-medium hover:bg-amber-500/10 transition-colors duration-300 first:rounded-t-xl last:rounded-b-xl ${
                          isActive ? 'text-amber-400 bg-amber-500/20' : 'text-gray-300 hover:text-amber-400'
                        }`}
                      >
                        <IconComponent size={16} />
                        <span>{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </nav>

            {/* Right Side - Mobile Responsive */}
            <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4 flex-shrink-0">
              {/* Call Button - Responsive */}
              <Button
                variant="outline"
                className="hidden lg:flex border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black font-semibold shadow-lg"
                onClick={() => window.open('tel:+1555123CUTS')}
                iconName={Phone}
                iconPosition="left"
                iconSize={8}
              >
                (555) 123-CUTS
              </Button>

              {/* Phone icon only for medium screens */}
              <button
                onClick={() => window.open('tel:+1555123CUTS')}
                className="hidden sm:flex lg:hidden p-2 rounded-lg border border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black transition-all duration-300"
                title="Call us"
              >
                <Phone size={8} />
              </button>

              {/* User Button - Responsive */}
              {status === 'authenticated' && session && (
                <div className="flex items-center">
                  <UserButton {...session} />
                </div>
              )}

              {/* Sign In Button - Hidden on small screens */}
              {status === 'unauthenticated' && (
                <Button
                  variant="default"
                  className="hidden md:flex shadow-lg text-sm px-4"
                  onClick={() => handleNavigation('/login')}
                  iconName={User}
                  iconPosition="left"
                  iconSize={16}
                >
                  Sign In
                </Button>
              )}

              {/* Mobile Menu Toggle - Always visible on mobile */}
              <button
                onClick={toggleMobileMenu}
                className="lg:hidden p-2 rounded-lg text-white hover:text-amber-400 hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-amber-500/30 flex-shrink-0"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      
      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-black/90 backdrop-blur-md"
            onClick={() => setIsMobileMenuOpen(false)}
          ></div>
          
          <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-gradient-to-b from-gray-900 to-black shadow-2xl border-l border-amber-500/20 overflow-y-auto">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-amber-500/20">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-lg">
                  <Scissors size={18} color="black" />
                </div>
                <div>
                  <span className="font-bold text-lg text-white">
                    ELITE CUTS
                  </span>
                  <div className="text-xs text-amber-400 font-medium tracking-wider">
                    BARBERSHOP
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile User Profile Section */}
            {status === 'authenticated' && session && (
              <div className="p-4 sm:p-6 border-b border-amber-500/20 bg-gradient-to-r from-amber-500/10 to-yellow-500/10">
                <div className="flex items-center space-x-4">
                  <UserButton {...session} />
                  <div className="flex flex-col min-w-0">
                    <p className="font-semibold text-white truncate">
                      {session.user?.name}
                    </p>
                    <p className="text-sm text-amber-400 truncate">
                      {session.user?.email}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Navigation */}
            <nav className="p-4 sm:p-6 space-y-2">
              {[...navigationItems, ...secondaryItems].map((item, index) => {
                const IconComponent = item.icon;
                const isActive = isActivePath(item.path);
                const uniqueKey = `mobile-${index}-${item.name.replace(/\s+/g, '-').toLowerCase()}`;
                
                return (
                  <Link
                    key={uniqueKey}
                    href={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`w-full flex items-center space-x-4 px-4 py-4 rounded-xl font-medium text-left transition-all duration-300 ${
                      isActive
                        ? 'text-black bg-gradient-to-r from-amber-400 to-yellow-500 shadow-lg'
                        : 'text-gray-300 hover:text-amber-400 hover:bg-white/10 border border-transparent hover:border-amber-500/30'
                    }`}
                  >
                    <IconComponent 
                      size={20} 
                      className={isActive ? 'text-black' : 'text-current'} 
                    />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
              
              {/* Mobile Actions */}
              <div className="pt-4 mt-4 border-t border-amber-500/20 space-y-3">
                {/* Call Button for Mobile */}
                <Button
                  variant="outline"
                  fullWidth
                  className="border-amber-500 text-amber-400 hover:bg-amber-500 hover:text-black font-semibold"
                  onClick={() => window.open('tel:+1555123CUTS')}
                  iconName={Phone}
                  iconPosition="left"
                  iconSize={18}
                >
                  Call Now: (555) 123-CUTS
                </Button>

                {/* Sign In Button for Mobile */}
                {status === 'unauthenticated' && (
                  <Button
                    variant="default"
                    fullWidth
                    onClick={() => handleNavigation('/login')}
                    iconName={User}
                    iconPosition="left"
                    iconSize={18}
                  >
                    Sign In / Register
                  </Button>
                )}
              </div>

              {/* Mobile Contact Info */}
              <div className="pt-4 mt-4 border-t border-amber-500/20">
                <div className="text-center space-y-2">
                  <p className="text-amber-400 font-medium">Open 7 Days a Week</p>
                  <p className="text-gray-400 text-sm">Premium Grooming Experience</p>
                  <div className="flex justify-center space-x-4 pt-4">
                    <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <Crown size={16} className="text-amber-400" />
                    </div>
                    <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <Award size={16} className="text-amber-400" />
                    </div>
                    <div className="w-8 h-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <Star size={16} className="text-amber-400" />
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>
      )}
      
      {/* Spacer for fixed header */}
      <div className="h-16 sm:h-18 lg:h-22"></div>
    </>
  );
};

export default Header;