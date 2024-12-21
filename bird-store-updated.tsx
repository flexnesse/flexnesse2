import React from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';

const BirdStore = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [cartCount, setCartCount] = React.useState(0);
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [currentPage, setCurrentPage] = React.useState('home');

  // Navigation Handlers
  const navigateToCategory = (category) => {
    setCurrentPage(`category-${category.toLowerCase()}`);
    setIsMenuOpen(false);
  };

  const navigateToHome = () => {
    setCurrentPage('home');
  };

  const navigateToCart = () => {
    setCurrentPage('cart');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setCurrentPage(`search-${searchQuery}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleUserAction = (action) => {
    switch (action) {
      case 'signin':
        setCurrentPage('signin');
        break;
      case 'signup':
        setCurrentPage('signup');
        break;
      case 'orders':
        setCurrentPage('orders');
        break;
      case 'wishlist':
        setCurrentPage('wishlist');
        break;
    }
    setIsUserMenuOpen(false);
  };

  const handleExternalLink = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button 
              onClick={navigateToHome}
              className="flex-shrink-0 flex items-center cursor-pointer"
            >
              <svg className="h-8 w-8 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4zm0 0V3m0 14c-2.2 0-4-1.8-4-4m8 0c0 2.2-1.8 4-4 4m0 0v3"
                />
              </svg>
              <span className="ml-2 text-xl font-bold text-gray-900">BIRD</span>
            </button>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {['Men', 'Women', 'Kids', 'Sale'].map((category) => (
                <button
                  key={category}
                  onClick={() => navigateToCategory(category)}
                  className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {category}
                </button>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-700 hover:text-blue-500"
              >
                <Search className="h-6 w-6" />
              </button>
              
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="text-gray-700 hover:text-blue-500"
              >
                <User className="h-6 w-6" />
              </button>
              
              <button 
                onClick={navigateToCart}
                className="text-gray-700 hover:text-blue-500 relative"
              >
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cartCount}
                  </span>
                )}
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden text-gray-700 hover:text-blue-500"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Search Dropdown */}
        {isSearchOpen && (
          <div className="absolute top-16 right-0 w-full md:w-96 bg-white shadow-lg rounded-b-lg p-4 z-50">
            <form onSubmit={handleSearch}>
              <div className="flex items-center border rounded-md">
                <Search className="h-5 w-5 text-gray-400 ml-2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for products..."
                  className="w-full p-2 focus:outline-none"
                />
              </div>
            </form>
          </div>
        )}

        {/* User Menu */}
        {isUserMenuOpen && (
          <div className="absolute top-16 right-0 w-48 bg-white shadow-lg rounded-lg z-50">
            <div className="py-1">
              <button
                onClick={() => handleUserAction('signin')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign In
              </button>
              <button
                onClick={() => handleUserAction('signup')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Create Account
              </button>
              <button
                onClick={() => handleUserAction('orders')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Orders
              </button>
              <button
                onClick={() => handleUserAction('wishlist')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Wishlist
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['Men', 'Women', 'Kids', 'Sale'].map((category) => (
              <button
                key={category}
                onClick={() => navigateToCategory(category)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-500 hover:bg-gray-50"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <div className="relative">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                <div className="p-8 sm:p-12">
                  <h1 className="text-4xl font-bold text-white sm:text-5xl">
                    New Summer Collection
                  </h1>
                  <p className="mt-4 text-xl text-gray-300">
                    Discover the latest trends in fashion
                  </p>
                  <button 
                    onClick={() => navigateToCategory('new')}
                    className="mt-8 bg-blue-500 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-600 transition-colors"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900">Shop by Category</h2>
              <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {['Men', 'Women', 'Kids'].map((category) => (
                  <button
                    key={category}
                    onClick={() => navigateToCategory(category)}
                    className="relative rounded-lg overflow-hidden group cursor-pointer"
                  >
                    <div className="aspect-w-3 aspect-h-2 bg-gray-200">
                      <div className="p-4">
                        <h3 className="text-xl font-bold text-gray-900">{category}</h3>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg">About Bird</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <button 
                    onClick={() => setCurrentPage('about')}
                    className="text-gray-400 hover:text-white"
                  >
                    Our Story
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('careers')}
                    className="text-gray-400 hover:text-white"
                  >
                    Careers
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('press')}
                    className="text-gray-400 hover:text-white"
                  >
                    Press
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Customer Service</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <button 
                    onClick={() => setCurrentPage('contact')}
                    className="text-gray-400 hover:text-white"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('shipping')}
                    className="text-gray-400 hover:text-white"
                  >
                    Shipping
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setCurrentPage('returns')}
                    className="text-gray-400 hover:text-white"
                  >
                    Returns
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Connect</h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <button 
                    onClick={() => handleExternalLink('https://facebook.com')}
                    className="text-gray-400 hover:text-white"
                  >
                    Facebook
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleExternalLink('https://instagram.com')}
                    className="text-gray-400 hover:text-white"
                  >
                    Instagram
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => handleExternalLink('https://twitter.com')}
                    className="text-gray-400 hover:text-white"
                  >
                    Twitter
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Newsletter</h3>
              <p className="mt-4 text-gray-400">
                Subscribe to get special offers and updates
              </p>
              <form onSubmit={(e) => {
                e.preventDefault();
                // Add newsletter subscription logic
              }}>
                <div className="mt-4">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-2 rounded-md"
                  />
                  <button 
                    type="submit"
                    className="mt-2 w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BirdStore;
