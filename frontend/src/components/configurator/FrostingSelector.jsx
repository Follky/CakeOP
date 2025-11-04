import React from 'react';
import { motion } from 'framer-motion';
import { frostingOptions } from '../../data/mockData';
import { Card } from '../ui/card';
import { Check } from 'lucide-react';

const FrostingSelector = ({ configuration, updateConfiguration }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Your Frosting</h2>
        <p className="text-gray-600">Choose the perfect finishing touch</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {frostingOptions.map((frosting) => (
          <motion.div
            key={frosting.id}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className={`cursor-pointer p-4 transition-all duration-300 ${
                configuration.frosting === frosting.id
                  ? 'ring-2 ring-rose-500 shadow-lg'
                  : 'hover:shadow-md border-gray-200'
              }`}
              onClick={() => updateConfiguration('frosting', frosting.id)}
            >
              <div className="relative">
                <div
                  className="w-full aspect-square rounded-lg mb-3 shadow-inner"
                  style={{ backgroundColor: frosting.color }}
                />
                {configuration.frosting === frosting.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
              <h3 className="font-medium text-sm text-gray-900 mb-1 text-center">
                {frosting.name}
              </h3>
              <p className="text-xs text-center font-medium text-rose-600">
                {frosting.price === 0 ? 'Included' : `+$${frosting.price}`}
              </p>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FrostingSelector;
