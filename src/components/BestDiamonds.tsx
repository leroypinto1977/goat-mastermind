"use client";

const silverwareTypes = [
  {
    id: 1,
    name: "Dinner Forks",
    image: "/assets/dinner-forks-collection.jpg",
  },
  {
    id: 2,
    name: "Soup Spoons",
    image: "/assets/soup-spoons-collection.jpg",
  },
  {
    id: 3,
    name: "Steak Knives",
    image: "/assets/steak-knives-set.jpg",
  },
  {
    id: 4,
    name: "Serving Utensils",
    image: "/assets/serving-utensils-collection.jpg",
  },
];

const BestDiamonds = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl font-bold text-navy mb-4">
            Premium Silverware Collection
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {silverwareTypes.map((type) => (
            <div key={type.id} className="group text-center cursor-pointer">
              <div className="relative mb-4 overflow-hidden rounded-full aspect-square mx-auto max-w-40">
                <img
                  src={type.image}
                  alt={type.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-full" />
              </div>
              <h3 className="font-medium text-navy group-hover:text-gold transition-colors">
                {type.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestDiamonds;
