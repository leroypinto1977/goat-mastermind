'use client';

const Testimonial = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 items-center">
          {/* Customer Image */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              <img
                src="/assets/testimonial-customer.jpg"
                alt="Satisfied customer with elegant silverware"
                className="w-full max-w-sm h-72 lg:h-96 object-cover rounded-lg shadow-elegant"
              />
            </div>
          </div>

          {/* Testimonial Content */}
          <div className="bg-navy p-8 lg:p-12 rounded-lg">
            <div className="text-center lg:text-left">
              <div className="mb-6">
                <div className="text-gold text-4xl mb-4">"</div>
                <p className="font-serif text-white text-xl leading-relaxed">
                  Exceptional quality silverware, the team provided professional service and expert guidance. 
                  I felt truly valued as a customer throughout the entire experience
                </p>
                <div className="text-gold text-4xl text-right">"</div>
              </div>
              <div className="text-gold font-medium">
                — Svetlana
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;