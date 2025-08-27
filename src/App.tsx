// import React, { useState } from 'react';

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "react-query";
// import { Toaster } from "react-hot-toast";
// import Layout from "./components/Layout";
// import HomePage from "./pages/HomePage";
// import MapPage from "./pages/MapPage";
// import DashboardPage from "./pages/DashboardPage";
// import ContributePage from "./pages/ContributePage";
// import ProfilePage from "./pages/ProfilePage";
// import RTEEnrollmentPage from "./pages/RTEEnrollmentPage";
// // import ClimateResources from "./pages/ClimateResources";
// // import ResourceLibrary from "./pages/ResourseLibrary";
// import { LanguageProvider } from "./contexts/LanguageContext";
// import { AuthProvider } from "./contexts/AuthContext";
// import AuthWrapper from "./auth/AuthWrapper";
// import { Search } from 'lucide-react';
// // import { useCoinSystem } from './hooks/useCoinSystem';

// import OnlineMarketplace from './pages/OnlineMarketplace';

// const queryClient = new QueryClient();

// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <LanguageProvider>
//         <AuthProvider>
//           <AuthWrapper>
//             <Router>
//               <div className="min-h-screen bg-gray-50">
//                 <Layout>
//                   <Routes>
//                     <Route path="/" element={<HomePage />} />
//                     <Route path="/map" element={<MapPage />} />
//                     <Route path="/dashboard" element={<DashboardPage />} />
//                     {/* <Route path="/useCoinSystem" element={<useCoinSystem />} /> */}
//                     <Route path="/contribute" element={<ContributePage />} />
//                     <Route path="/profile" element={<ProfilePage />} />
//                     <Route path="/marketplace" element={<OnlineMarketplace />} />
//                     <Route
//                       path="/rte"
//                       element={<RTEEnrollmentPage />}
//                     />
//                     {/* <Route
//                       path="/climate-resources"
//                       element={<ClimateResources />}
//                     /> */}
//                     {/* <Route
//                       path="/resource-library"
//                       element={<ResourceLibrary />}
//                     /> */}
//                   </Routes>
//                 </Layout>
//                 <Toaster position="top-right" />
//               </div>
//             </Router>
//           </AuthWrapper>
//         </AuthProvider>
//       </LanguageProvider>
//     </QueryClientProvider>
//   );
// }

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";

import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import useCoinSystem from "./pages/DashboardPage";
import CoinSystemPage from "./pages/coinSystemPage";
import ContributePage from "./pages/ContributePage";
import ProfilePage from "./pages/ProfilePage";
import RTEEnrollmentPage from "./pages/RTEEnrollmentPage";
import OnlineMarketplace from "./pages/OnlineMarketplace";

import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import AuthWrapper from "./auth/AuthWrapper";
import ShoppingCart from "./components/ShoppingCart";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <AuthProvider>
          <AuthWrapper>
            <Router>
              <div className="min-h-screen bg-gray-50">
                <Layout>
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/map" element={<MapPage />} />
                    <Route path="/useCoin" element={<CoinSystemPage />} />
                    <Route path="/contribute" element={<ContributePage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route
                      path="/marketplace"
                      element={<OnlineMarketplace />}
                    />
                    {/* <Route path="/cart" element={<ShoppingCart />} /> */}

                    <Route path="/rte" element={<RTEEnrollmentPage />} />
                  </Routes>
                </Layout>
                <Toaster position="top-right" />
              </div>
            </Router>
          </AuthWrapper>
        </AuthProvider>
      </LanguageProvider>
    </QueryClientProvider>
  );
}

export default App;
