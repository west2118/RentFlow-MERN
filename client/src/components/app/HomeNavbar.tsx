import { Home, Menu } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

const HomeNavbar = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <a href="/" className="flex items-center space-x-2">
            <Home className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">RentFlow</span>
          </a>

          <div className="hidden md:flex items-center space-x-6">
            <a
              href="#features"
              className="text-sm font-medium hover:text-primary">
              Features
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium hover:text-primary">
              Pricing
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium hover:text-primary">
              Testimonials
            </a>
            <div className="flex items-center space-x-4">
              <a
                href="/signin"
                className="text-sm font-medium hover:text-primary">
                Sign In
              </a>
              <a href="/signup">
                <Button size="sm">Get Started</Button>
              </a>
            </div>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default HomeNavbar;
