"use client";

import Image from "next/image";

const categories = [
  {
    id: 1,
    name: "Complete Flatware Sets",
    image: "/assets/complete-flatware-set.jpg",
  },
  {
    id: 2,
    name: "Serving Pieces & Utensils",
    image: "/assets/professional-serving-pieces.jpg",
  },
  {
    id: 3,
    name: "Specialty Cutlery",
    image: "/assets/specialty-cutlery-collection.jpg",
  },
  {
    id: 4,
    name: "Professional Dinnerware",
    image: "/assets/professional-dinnerware.jpg",
  },
  {
    id: 5,
    name: "Elegant Serving Trays",
    image: "/assets/elegant-serving-trays.jpg",
  },
];

const ProductCategories = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-gray-800 mb-4">
            Silverware Categories
          </h2>
        </div>

        <div className="grid grid-cols-4 grid-rows-3 gap-4 h-[600px]">
          {/* Complete Flatware Sets - Large card */}
          <div className="col-span-2 row-span-2 col-start-1 row-start-1 group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <Image
              src={categories[0].image}
              alt={categories[0].name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h3 className="font-serif text-3xl font-bold mb-4 text-center px-4">
                {categories[0].name}
              </h3>
              <button className="bg-white text-gray-800 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Explore Now
              </button>
            </div>
          </div>

          {/* Serving Pieces & Utensils - Tall card */}
          <div className="col-span-1 row-span-3 col-start-3 row-start-1 group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <Image
              src={categories[1].image}
              alt={categories[1].name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h3 className="font-serif text-2xl font-bold mb-4 text-center px-2">
                {categories[1].name}
              </h3>
              <button className="bg-white text-gray-800 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Explore Now
              </button>
            </div>
          </div>

          {/* Specialty Cutlery - Small card */}
          <div className="col-span-1 row-span-1 col-start-4 row-start-1 group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <Image
              src={categories[2].image}
              alt={categories[2].name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h3 className="font-serif text-xl font-bold mb-2 text-center px-2">
                {categories[2].name}
              </h3>
              <button className="bg-white text-gray-800 px-4 py-1.5 text-sm rounded-full font-medium hover:bg-gray-100 transition-colors">
                Explore Now
              </button>
            </div>
          </div>

          {/* Professional Dinnerware - Wide card */}
          <div className="col-span-2 row-span-1 col-start-1 row-start-3 group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <Image
              src={categories[3].image}
              alt={categories[3].name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h3 className="font-serif text-2xl font-bold mb-3 text-center px-4">
                {categories[3].name}
              </h3>
              <button className="bg-white text-gray-800 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Explore Now
              </button>
            </div>
          </div>

          {/* Elegant Serving Trays - Tall card */}
          <div className="col-span-1 row-span-2 col-start-4 row-start-2 group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <Image
              src={categories[4].image}
              alt={categories[4].name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <h3 className="font-serif text-xl font-bold mb-3 text-center px-2">
                {categories[4].name}
              </h3>
              <button className="bg-white text-gray-800 px-6 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors">
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
