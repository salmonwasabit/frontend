"use client";

import { motion } from "framer-motion";

interface Flavor {
  name: string;
  image: string;
  description?: string;
}

interface ProductGalleryProps {
  brand: string;
  flavors: Flavor[];
}

export default function ProductGallery({ brand, flavors }: ProductGalleryProps) {

  return (
    <div className="py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            รสชาติ {brand}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            เลือกรสชาติที่คุณชื่นชอบจากคอลเลกชั่นของเรา
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {flavors.map((flavor, index) => (
            <motion.div
              key={flavor.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="bg-card border border-border rounded-xl p-4 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
                <div className="w-20 h-20 mx-auto mb-3 overflow-hidden rounded-lg">
                  <img
                    src={flavor.image}
                    alt={flavor.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = `https://via.placeholder.com/80x80/6366f1/ffffff?text=${flavor.name}`;
                    }}
                  />
                </div>
                <h3 className="text-sm font-semibold text-foreground mb-1">
                  {flavor.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {flavor.name}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
}
