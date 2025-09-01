"use client";

import React from "react";
import Image from "next/image";
import {
  Award,
  Trophy,
  Shield,
  CheckCircle,
  Newspaper,
  ExternalLink,
  Users,
  Star,
  Crown,
  Scissors,
  Medal,
  Zap,
  Heart,
  Clock,
} from "lucide-react";

type AwardType = {
  title: string;
  organization: string;
  year: string;
};

type CertificationType = {
  name: string;
  issuer: string;
  expiry: string;
};

type MediaFeatureType = {
  logo: string;
  publication: string;
  headline: string;
  date: string;
};

type AssociationType = {
  logo: string;
  name: string;
};

interface TrustSignalsProps {
  awards?: AwardType[];
  certifications?: CertificationType[];
  mediaFeatures?: MediaFeatureType[];
  associations?: AssociationType[];
}

const TrustSignals: React.FC<TrustSignalsProps> = ({
  awards,
  certifications,
  mediaFeatures,
  associations,
}) => {
  return (
    <div className="relative bg-gradient-to-br from-slate-50 via-white to-amber-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-amber-900/10 rounded-3xl border-2 border-slate-200/50 dark:border-slate-700/50 shadow-2xl backdrop-blur-sm overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-amber-100/20 to-transparent dark:from-amber-900/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-slate-100/30 to-transparent dark:from-slate-800/30 rounded-full blur-2xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-amber-500/5 to-transparent rounded-full"></div>

      <div className="relative p-10">
        {/* Enhanced Heading */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-amber-500 via-amber-600 to-orange-500 p-4 rounded-2xl shadow-xl">
              <Crown className="w-8 h-8 text-white" />
            </div>
          </div>
          <h3 className="font-bold text-4xl bg-gradient-to-r from-slate-800 via-slate-700 to-amber-700 dark:from-slate-100 dark:via-slate-200 dark:to-amber-200 bg-clip-text text-transparent mb-3">
            Recognition & Trust
          </h3>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Certified excellence and community recognition that sets us apart
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Trust Metrics - Enhanced and Moved Up */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 p-6 rounded-2xl shadow-xl transform group-hover:scale-105 transition-all duration-300 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 inline-block">
                <Clock className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
              5+
            </div>
            <p className="text-slate-600 dark:text-slate-300 font-medium">Years Experience</p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl shadow-xl transform group-hover:scale-105 transition-all duration-300 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 inline-block">
                <Heart className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
              500+
            </div>
            <p className="text-slate-600 dark:text-slate-300 font-medium">Happy Clients</p>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl transform group-hover:scale-105 transition-all duration-300 mb-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 inline-block">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              98%
            </div>
            <p className="text-slate-600 dark:text-slate-300 font-medium">Satisfaction Rate</p>
          </div>
        </div>

        {/* Awards Section - Enhanced */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-xl shadow-lg mr-4">
              <Award className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-2xl text-slate-800 dark:text-slate-100">
                Awards & Recognition
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Industry honors and achievements
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {awards?.map((award, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-amber-50/50 dark:from-slate-800 dark:to-amber-900/10 p-6 rounded-2xl border-2 border-slate-200/50 dark:border-slate-700/50 hover:border-amber-300 dark:hover:border-amber-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-amber-400 to-amber-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">
                      {award?.title}
                    </h5>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                      {award?.organization}
                    </p>
                    <div className="inline-flex items-center bg-amber-100 dark:bg-amber-900/30 px-3 py-1 rounded-full">
                      <Medal className="w-3 h-3 text-amber-600 dark:text-amber-400 mr-1" />
                      <span className="text-xs font-medium text-amber-700 dark:text-amber-300">
                        {award?.year}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section - Enhanced */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl shadow-lg mr-4">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-2xl text-slate-800 dark:text-slate-100">
                Professional Certifications
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Verified skills and qualifications
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {certifications?.map((cert, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-emerald-50/30 dark:from-slate-800 dark:to-emerald-900/10 p-6 rounded-2xl border-2 border-slate-200/50 dark:border-slate-700/50 hover:border-emerald-300 dark:hover:border-emerald-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-4 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-lg text-slate-800 dark:text-slate-100 mb-1">
                      {cert?.name}
                    </h5>
                    <p className="text-slate-600 dark:text-slate-300 text-sm mb-2">
                      {cert?.issuer}
                    </p>
                    <div className="inline-flex items-center bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1 rounded-full">
                      <Shield className="w-3 h-3 text-emerald-600 dark:text-emerald-400 mr-1" />
                      <span className="text-xs font-medium text-emerald-700 dark:text-emerald-300">
                        Valid until {cert?.expiry}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Media Features Section - Enhanced */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-3 rounded-xl shadow-lg mr-4">
              <Newspaper className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-2xl text-slate-800 dark:text-slate-100">
                Media Features
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Press coverage and recognition
              </p>
            </div>
          </div>
          
          <div className="space-y-4">
            {mediaFeatures?.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-r from-white to-blue-50/30 dark:from-slate-800 dark:to-blue-900/10 p-6 rounded-2xl border-2 border-slate-200/50 dark:border-slate-700/50 hover:border-blue-300 dark:hover:border-blue-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-center space-x-6">
                  <div className="bg-white dark:bg-slate-700 p-4 rounded-xl shadow-md border border-slate-200 dark:border-slate-600 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={feature?.logo}
                      alt={feature?.publication}
                      width={64}
                      height={48}
                      className="w-16 h-12 object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {feature?.headline}
                    </h5>
                    <div className="flex items-center space-x-4">
                      <span className="text-slate-600 dark:text-slate-300 font-medium">
                        {feature?.publication}
                      </span>
                      <span className="text-slate-400 dark:text-slate-500">•</span>
                      <span className="text-slate-500 dark:text-slate-400 text-sm">
                        {feature?.date}
                      </span>
                    </div>
                  </div>
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-xl group-hover:bg-blue-200 dark:group-hover:bg-blue-800/40 transition-colors duration-300">
                    <ExternalLink className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Professional Associations - Enhanced */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-3 rounded-xl shadow-lg mr-4">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="font-bold text-2xl text-slate-800 dark:text-slate-100">
                Professional Associations
              </h4>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Trusted industry memberships
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {associations?.map((association, index) => (
              <div
                key={index}
                className="group text-center bg-white/80 dark:bg-slate-800/80 p-6 rounded-2xl border-2 border-slate-200/50 dark:border-slate-700/50 hover:border-purple-300 dark:hover:border-purple-600 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Image
                    src={association?.logo}
                    alt={association?.name}
                    width={80}
                    height={80}
                    className="w-20 h-20 object-contain mx-auto"
                  />
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-semibold group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                  {association?.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Credibility Badges */}
        <div className="bg-gradient-to-r from-slate-100/50 to-slate-50/50 dark:from-slate-800/50 dark:to-slate-700/50 rounded-2xl p-8 border border-slate-200/50 dark:border-slate-700/50">
          <div className="text-center mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-3 rounded-full shadow-lg mb-4">
              <Scissors className="w-5 h-5 mr-2" />
              <span className="font-bold">Master Barber Certified</span>
            </div>
            <h4 className="font-bold text-xl text-slate-800 dark:text-slate-100 mb-2">
              Why Choose Our Barbershop?
            </h4>
            <p className="text-slate-600 dark:text-slate-300">
              Excellence backed by credentials and community trust
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-600/50 hover:border-amber-300 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-6 h-6 text-amber-600 dark:text-amber-400 mx-auto fill-current" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                5-Star Rated
              </p>
            </div>

            <div className="text-center p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-600/50 hover:border-emerald-300 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-emerald-100 to-emerald-200 dark:from-emerald-900/30 dark:to-emerald-800/30 p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400 mx-auto" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Licensed & Insured
              </p>
            </div>

            <div className="text-center p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-600/50 hover:border-blue-300 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Quality Guaranteed
              </p>
            </div>

            <div className="text-center p-4 bg-white/60 dark:bg-slate-800/60 rounded-xl border border-slate-200/50 dark:border-slate-600/50 hover:border-purple-300 transition-all duration-300 group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 p-3 rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300">
                <Crown className="w-6 h-6 text-purple-600 dark:text-purple-400 mx-auto" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                Premium Service
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 p-[2px] rounded-2xl shadow-xl">
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-8">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-3 rounded-full shadow-lg animate-pulse">
                  <Scissors className="w-6 h-6 text-white" />
                </div>
              </div>
              <h5 className="font-bold text-2xl bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-2">
                Ready for the Best Cut of Your Life?
              </h5>
              <p className="text-slate-600 dark:text-slate-300 mb-6">
                Join hundreds of satisfied customers who trust our expertise
              </p>
              <button className="bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                Book Your Appointment Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;