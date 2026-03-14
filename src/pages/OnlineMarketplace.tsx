import { useState } from 'react';
import { useEcommerce } from '../hooks/useEcommerce';
import ProductCard from '../components/ProductCard';
import ShoppingCart from '../components/ShoppingCart';
import CheckoutForm from '../components/CheckoutForm';
import OrderHistory from '../components/OrderHistory';
import CategoryFilter from '../components/CategoryFilter';
import SuccessMessage from '../components/SuccessMessage';
import ErrorMessage from '../components/ErrorMessage';
import AddProductModal from '../components/AddProductModal';
import { Search, Plus, Filter, Sparkles, ShoppingBag, ArrowRight, Zap, ShoppingCart as CartIcon, History } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function OnlineMarketplace() {
  const {
    products,
    cartItems,
    orders,
    isLoading,
    error,
    addToCart,
    removeFromCart,
    updateCartQuantity,
    getCartTotal,
    placeOrder,
    addProduct,
    setError
  } = useEcommerce();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState('products');
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleAddToCart = (product: any) => {
    const success = addToCart(product, 1);
    if (success) {
      setSuccessMessage(`${product.name} added to your collection!`);
    }
  };

  const handleAddProduct = (productData: any) => {
    const success = addProduct(productData);
    if (success) {
      setSuccessMessage('Product listed successfully in the Hungerr Repository!');
    }
  };

  const handlePlaceOrder = async (customerInfo: any) => {
    const success = await placeOrder(customerInfo);
    if (success) {
      setSuccessMessage('Reservation confirmed. Thank you for supporting our mission.');
      setCurrentView('orders');
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesQuery = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const renderMainContent = () => {
    switch (currentView) {
      case 'checkout':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 md:p-12 bg-white rounded-[48px] shadow-sm border border-slate-100">
             <CheckoutForm
              onSubmit={handlePlaceOrder}
              isLoading={isLoading}
              total={getCartTotal()}
            />
          </motion.div>
        );
      
      case 'orders':
        return (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6 md:p-12 bg-white rounded-[48px] shadow-sm border border-slate-100">
             <OrderHistory orders={orders} />
          </motion.div>
        );
      
      default:
        return (
          <div className="space-y-12">
            {/* Premium Hero Banner */}
            <div className="relative overflow-hidden rounded-[48px] bg-slate-900 min-h-[400px] flex items-center px-10 md:px-20 text-white group shadow-2xl shadow-slate-200">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4240605/pexels-photo-4240605.jpeg')] bg-cover bg-center opacity-20 scale-105 group-hover:scale-100 transition-transform duration-[3000ms]" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
              
              <div className="relative z-10 max-w-3xl">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-4 py-1.5 text-[10px] font-black text-emerald-400 uppercase tracking-widest backdrop-blur-md mb-8"
                >
                  <Sparkles className="w-4 h-4" />
                  The Hungerr Collective
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] mb-8"
                >
                  Authentic Wisdom, <br />
                  <span className="text-emerald-400">Shared Future.</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-lg text-slate-400 font-medium max-w-xl leading-relaxed mb-10"
                >
                  Support localized artisans and access traditional surplus items. Every transaction preserves a ancestral practice.
                </motion.p>
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex gap-4"
                >
                   <button onClick={() => setIsAddModalOpen(true)} className="px-8 py-4 bg-emerald-500 hover:bg-white hover:text-slate-900 text-slate-900 font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-emerald-500/10 active:scale-95 flex items-center gap-3">
                      <Plus size={18} strokeWidth={3} />
                      List Your Product
                   </button>
                   <button className="px-8 py-4 bg-white/5 border border-white/20 hover:bg-white hover:text-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all active:scale-95">
                      View Documentaries
                   </button>
                </motion.div>
              </div>
            </div>

            {/* Smart Toolbar */}
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
               <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto pb-2 no-scrollbar">
                  {['all', 'Prepared', 'Raw', 'Packaged'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                        activeCategory === cat 
                          ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                          : 'bg-white text-slate-400 border border-slate-100 hover:bg-slate-50'
                      }`}
                    >
                      {cat === 'all' ? 'All Pulse' : cat}
                    </button>
                  ))}
               </div>
               
               <div className="relative w-full md:w-80 group">
                  <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-emerald-500 transition-colors" size={20} />
                  <input
                    type="text"
                    placeholder="Search the repository..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-14 pr-6 py-4 bg-white border border-slate-100 rounded-[24px] focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 transition-all font-bold text-slate-900 placeholder:text-slate-300 shadow-sm"
                  />
               </div>
            </div>

            {/* Main Listing Area */}
            <div className="space-y-10">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                   <ShoppingBag size={28} className="text-emerald-500" />
                   {activeCategory === 'all' ? 'Full Repository' : `${activeCategory} Items`}
                </h2>
                <span className="px-4 py-1.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {filteredProducts.length} Results
                </span>
              </div>

              {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onAddToCart={handleAddToCart}
                      isLoading={isLoading}
                    />
                  ))}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white rounded-[48px] border-4 border-dashed border-slate-50 p-24 text-center">
                  <div className="w-24 h-24 bg-slate-50 rounded-[32px] flex items-center justify-center mx-auto mb-8 text-slate-200">
                    <Search size={48} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-3 tracking-tight">Silent Repository</h3>
                  <p className="text-slate-400 font-medium max-w-sm mx-auto">No items matching your criteria were found in our current heritage pulse.</p>
                  <button onClick={() => {setSearchQuery(''); setActiveCategory('all');}} className="mt-10 px-8 py-3 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95">Clear Filters</button>
                </motion.div>
              )}
            </div>
            
            <AddProductModal 
              isOpen={isAddModalOpen}
              onClose={() => setIsAddModalOpen(false)}
              onSubmit={handleAddProduct}
            />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFE] font-outfit pt-10 pb-20">
      <AnimatePresence>
        {successMessage && (
          <SuccessMessage
            message={successMessage}
            onDismiss={() => setSuccessMessage(null)}
          />
        )}
        {error && (
          <ErrorMessage
            message={error}
            onDismiss={() => setError(null)}
          />
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-6">
        {/* Navigation / Breadcrumbs */}
        <div className="flex items-center justify-between mb-12">
            <nav className="flex items-center gap-3">
              <button
                onClick={() => setCurrentView('products')}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  currentView === 'products' ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-400 hover:text-slate-900 bg-white border border-slate-100'
                }`}
              >
                <ShoppingBag size={14} />
                Catalogue
              </button>
              <button
                onClick={() => setCurrentView('orders')}
                className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 ${
                  currentView === 'orders' ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' : 'text-slate-400 hover:text-slate-900 bg-white border border-slate-100'
                }`}
              >
                <History size={14} />
                My History
              </button>
            </nav>

            <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-4 bg-white rounded-2xl border border-slate-100 text-slate-900 hover:shadow-xl hover:shadow-slate-100 transition-all group active:scale-95"
            >
                <CartIcon size={24} className="group-hover:translate-y-[-2px] transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-6 h-6 bg-emerald-500 text-white text-[10px] font-black rounded-full flex items-center justify-center border-4 border-[#FBFBFE] group-hover:scale-110 transition-transform">
                    {cartCount}
                  </span>
                )}
            </button>
        </div>

        {renderMainContent()}
      </main>

      <ShoppingCart
        cartItems={cartItems}
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          setCurrentView('checkout');
        }}
        total={getCartTotal()}
      />

      {/* Modern Footer Detail */}
      <div className="mt-32 text-center opacity-30 group hover:opacity-100 transition-opacity">
         <div className="flex items-center justify-center gap-6 mb-6">
            <span className="h-px w-20 bg-slate-900" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-900">Exchange Relay V4.0</span>
            <span className="h-px w-20 bg-slate-900" />
         </div>
         <p className="text-[8px] font-bold text-slate-500 uppercase tracking-widest">Ensuring fair trade and heritage continuity through technology • 2025</p>
      </div>
    </div>
  );
}

export default OnlineMarketplace;