import React from 'react';
import { motion } from 'framer-motion';
import { layerOptions } from '../../data/mockData';
import { Card } from '../ui/card';
import { Layers } from 'lucide-react';

const LayerSelector = ({ configuration, updateConfiguration }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Select Number of Layers</h2>
        <p className="text-gray-600">More layers, more deliciousness</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {layerOptions.map((layer) => (
          <motion.div
            key={layer.id}
            whileHover={{ scale: 1.05, y: -4 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className={`cursor-pointer p-6 transition-all duration-300 text-center ${
                configuration.layers === layer.id
                  ? 'ring-2 ring-rose-500 shadow-xl bg-gradient-to-br from-rose-500 to-orange-500 text-white'
                  : 'hover:shadow-lg border-gray-200 bg-white'
              }`}
              onClick={() => updateConfiguration('layers', layer.id)}
            >
              <div className="flex flex-col items-center gap-3">
                <div className={`p-3 rounded-full ${
                  configuration.layers === layer.id
                    ? 'bg-white/20'
                    : 'bg-gradient-to-br from-rose-100 to-orange-100'
                }`}>
                  <Layers className={`w-8 h-8 ${
                    configuration.layers === layer.id ? 'text-white' : 'text-rose-600'
                  }`} />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${
                    configuration.layers === layer.id ? 'text-white' : 'text-gray-900'
                  }`}>
                    {layer.name}
                  </h3>
                  <p className={`text-sm mt-1 ${
                    configuration.layers === layer.id ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    ×{layer.servingsMultiplier} servings
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border border-orange-200">
        <p className="text-sm text-gray-700">
          <strong>Tip:</strong> Each additional layer increases servings and creates stunning visual appeal.
        </p>
      </div>
    </div>
  );
};

export default LayerSelector;
