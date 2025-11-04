import React from 'react';
import { motion } from 'framer-motion';
import { fillingOptions } from '../../data/mockData';
import { Card } from '../ui/card';
import { Check } from 'lucide-react';

const FillingSelector = ({ configuration, updateConfiguration }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Filling</h2>
        <p className="text-gray-600">Add delicious layers of flavor</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {fillingOptions.map((filling) => (
          <motion.div
            key={filling.id}
            whileHover={{ scale: 1.02, x: 2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className={`cursor-pointer p-4 transition-all duration-300 ${
                configuration.filling === filling.id
                  ? 'ring-2 ring-rose-500 shadow-lg bg-gradient-to-r from-rose-50 to-orange-50'
                  : 'hover:shadow-md border-gray-200 bg-white'
              }`}
              onClick={() => updateConfiguration('filling', filling.id)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{filling.name}</h3>
                  <p className="text-sm font-medium text-rose-600">
                    {filling.price === 0 ? 'Included' : `+$${filling.price}`}
                  </p>
                </div>
                {configuration.filling === filling.id && (
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    className="w-8 h-8 bg-rose-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default FillingSelector;
