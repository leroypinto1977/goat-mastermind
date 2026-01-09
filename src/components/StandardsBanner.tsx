'use client';

import { Diamond, Award, Shield } from "lucide-react";

const StandardsBanner = () => {
  return (
    <section className="bg-gray-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <p className="text-white text-lg leading-relaxed max-w-4xl mx-auto">
            Our silverware is certified by top laboratories, ensuring our sterling silver products 
            meet the highest quality and craftsmanship standards.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <Award className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-white font-medium text-lg">Full-Service Production</h3>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <Shield className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-white font-medium text-lg">Customer-First Approach</h3>
          </div>

          <div className="flex flex-col items-center space-y-3">
            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
              <Diamond className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-white font-medium text-lg">European Quality</h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StandardsBanner;