"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import HeroSection from "./components/HeroSection";
import PhilosophySection from "./components/PhilosophySection";
import JourneySection from "./components/JourneySection";
import SignatureTechniques from "./components/SignatureTechniques";
import CredentialsSection from "./components/CredentialsSection";
import PersonalStorySection from "./components/PersonalStorySection";
import TestimonialSection from "./components/TestimonialSection";
import CTASection from "./components/CTASection";

const MasterProfile = () => {
  const router = useRouter();

  const handleBookNow = () => {
    router.push("/booking-engine");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Main Content */}
      <main>
        <HeroSection onBookNow={handleBookNow} />
        <PhilosophySection />
        <JourneySection />
        <SignatureTechniques />
        <CredentialsSection />
        <PersonalStorySection />
        <TestimonialSection />
        <CTASection onBookNow={handleBookNow} />
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                  <span className="font-headline font-bold text-primary">B</span>
                </div>
                <span className="font-headline font-bold text-xl">
                  BarberBook Pro
                </span>
              </div>
              <p className="font-body text-white/80 leading-relaxed mb-6 max-w-md">
                Where traditional craftsmanship meets modern convenience.
                Experience the difference of a master barber who cares about
                your transformation.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300 cursor-pointer">
                  <span className="font-body font-bold text-sm">f</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300 cursor-pointer">
                  <span className="font-body font-bold text-sm">ig</span>
                </div>
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors duration-300 cursor-pointer">
                  <span className="font-body font-bold text-sm">tw</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-headline font-bold text-lg mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/homepage"
                    className="font-body text-white/80 hover:text-accent transition-colors duration-300"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/booking-engine"
                    className="font-body text-white/80 hover:text-accent transition-colors duration-300"
                  >
                    Book Now
                  </Link>
                </li>
                <li>
                  <Link
                    href="/reviews-testimonials"
                    className="font-body text-white/80 hover:text-accent transition-colors duration-300"
                  >
                    Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-location"
                    className="font-body text-white/80 hover:text-accent transition-colors duration-300"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-headline font-bold text-lg mb-4">
                Contact Info
              </h4>
              <div className="space-y-3">
                <p className="font-body text-white/80">
                  123 Main Street
                  <br />
                  Downtown, City 12345
                </p>
                <p className="font-body text-white/80">(555) 123-4567</p>
                <p className="font-body text-white/80">
                  hello@barberbookpro.com
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="font-body text-white/60">
              © {new Date().getFullYear()} BarberBook Pro. All rights reserved. |
              Crafted with passion for excellence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MasterProfile;