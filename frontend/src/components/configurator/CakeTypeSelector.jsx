import React from 'react';
import { motion } from 'framer-motion';
import { cakeTypes } from '../../data/mockData';
import { Card } from '../ui/card';
import { Check } from 'lucide-react';

const CakeTypeSelector = ({ configuration, updateConfiguration }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Cake Type</h2>
        <p className="text-gray-600">Select the perfect base for your creation</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cakeTypes.map((cake) => (
          <motion.div
            key={cake.id}
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className={`cursor-pointer overflow-hidden transition-all duration-300 ${
                configuration.cakeType === cake.id
                  ? 'ring-2 ring-rose-500 shadow-xl'
                  : 'hover:shadow-lg border-gray-200'
              }`}
              onClick={() => updateConfiguration('cakeType', cake.id)}
            >
              <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-rose-50 to-orange-50">
                <img
                  src={cake.image}
                  alt={cake.name}
                  className="w-full h-full object-cover"
                />
                {configuration.cakeType === cake.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-3 right-3 w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-900 mb-1">{cake.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{cake.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-rose-600">
                    From ${cake.basePrice}
                  </span>
                  <span className="text-xs text-gray-500">
                    {cake.servings} serving{cake.servings > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CakeTypeSelector;
