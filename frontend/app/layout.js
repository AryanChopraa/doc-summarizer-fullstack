import { Navbar } from "@/components/Navbar/Navbar";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import { SummaryProvider } from "@/contexts/SummaryContext";
import AuthWrapper from "@/components/AuthWrapper";
import Footer from "@/components/Homepage/Footer";

export default function RootLayout({ children }) {
  return (
    <html className="h-full">
      <body className="bg-black flex flex-col min-h-screen">
        <div aria-hidden="true" className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-40 transition-opacity duration-1000 z-0">
          <div className="blur-[106px] h-56 bg-gradient-to-br from-primary to-purple-200 transition-all duration-1000 ease-in-out"></div>
          <div className="blur-[106px] h-32 bg-gradient-to-r from-blue-400 to-blue-800 transition-all duration-1000 ease-in-out"></div>
        </div>
        <div className="relative z-10 flex flex-col flex-grow">
          <AuthProvider>
            <AuthWrapper>
              <SummaryProvider>
                <Navbar />
                <main className="flex-grow">
                  {children}
                </main>
                <Toaster position="top-right" />
                <Footer />
              </SummaryProvider>
            </AuthWrapper>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}