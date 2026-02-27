import React from 'react';
import { Quote, Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  location: string;
  product: string;
  comment: string;
  rating: number;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Rafiq Ahmed",
    location: "DHAKA",
    product: "PREMIUM OVERSIZED TEE",
    comment: '"The quality is unmatched. I\'ve been buying from BEMEN for 2 years and every piece still looks brand new. The attention to detail is incredible."',
    rating: 5,
  },
  {
    id: 2,
    name: "Tanvir Hassan",
    location: "CHITTAGONG",
    product: "DARK WASH SLIM JEANS",
    comment: '"Finally found a brand that understands modern Bangladeshi fashion. The slim jeans fit perfectly and the fabric quality is premium."',
    rating: 5,
  },
  {
    id: 3,
    name: "Mahir Khan",
    location: "SYLHET",
    product: "STREETWEAR HOODIE",
    comment: '"Fast delivery, amazing packaging, and the hoodie exceeded my expectations. This is now my go-to brand for everything."',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  return (
    /* Background white করা হয়েছে */
    <section className="bg-white py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-[#c59d5f] text-xs tracking-[0.3em] uppercase font-bold">
            Reviews
          </span>
          {/* Text color black করা হয়েছে */}
          <h2 className="text-4xl md:text-5xl text-black font-serif mt-4">
            What Our <span className="italic text-[#c59d5f]">Customers Say</span>
          </h2>
        </div>

        {/* Review Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div 
              key={review.id} 
              /* Card background হালকা grey এবং border gray-100 করা হয়েছে */
              className="bg-[#fcfcfc] p-10 border border-gray-100 flex flex-col h-full shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Quote Icon - Light mode এর জন্য opacity কমানো হয়েছে */}
              <Quote size={40} className="text-gray-200 mb-4 fill-current" />

              {/* Stars - Real Golden Color preserved */}
              <div className="flex gap-1 mb-6">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="#c59d5f" className="text-[#c59d5f]" />
                ))}
              </div>

              {/* Comment - Dark gray for better readability */}
              <p className="text-gray-700 text-sm leading-relaxed mb-8 flex-grow">
                {review.comment}
              </p>

              {/* Customer Info */}
              <div className="border-t border-gray-100 pt-6">
                {/* Name black করা হয়েছে */}
                <h4 className="text-black font-bold text-lg">{review.name}</h4>
                <p className="text-gray-400 text-[10px] tracking-widest mt-1 uppercase">
                  {review.location} • {review.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;