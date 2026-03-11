import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Pilates from "./pages/Pilates";
import Tennis from "./pages/Tennis";
import BioBar from "./pages/BioBar";
import Downloads from "./pages/Downloads";
import FlyerMain from "./pages/FlyerMain";
import FlyerSocial from "./pages/FlyerSocial";
import FlyerBanner from "./pages/FlyerBanner";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/pilates" element={<Pilates />} />
          <Route path="/tennis" element={<Tennis />} />
          <Route path="/biobar" element={<BioBar />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/flyer/main" element={<FlyerMain />} />
          <Route path="/flyer/social" element={<FlyerSocial />} />
          <Route path="/flyer/banner" element={<FlyerBanner />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
