import React from 'react';
import { motion } from 'framer-motion';
import { textOptions } from '../../data/mockData';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Check, Type } from 'lucide-react';

const TextCustomizer = ({ configuration, updateConfiguration }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Customize Text</h2>
        <p className="text-gray-600">Add a personal message to your cake</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {textOptions.map((option) => (
          <motion.div
            key={option.id}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <Card
              className={`cursor-pointer p-5 transition-all duration-300 ${
                configuration.textOption === option.id
                  ? 'ring-2 ring-rose-500 shadow-lg bg-gradient-to-br from-rose-50 to-orange-50'
                  : 'hover:shadow-md border-gray-200 bg-white'
              }`}
              onClick={() => updateConfiguration('textOption', option.id)}
            >
              <div className="flex flex-col items-center gap-3">
                <div className={`p-3 rounded-full ${
                  configuration.textOption === option.id
                    ? 'bg-rose-500'
                    : 'bg-gray-100'
                }`}>
                  <Type className={`w-6 h-6 ${
                    configuration.textOption === option.id ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-gray-900 mb-1">{option.name}</h3>
                  <p className="text-sm font-medium text-rose-600">
                    {option.price === 0 ? 'Free' : `+$${option.price}`}
                  </p>
                </div>
                {configuration.textOption === option.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-rose-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <Check className="w-4 h-4 text-white" />
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {configuration.textOption !== 'none' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Message
            </label>
            <Input
              type="text"
              placeholder="e.g., Happy Birthday Sarah!"
              value={configuration.customText || ''}
              onChange={(e) => updateConfiguration('customText', e.target.value)}
              maxLength={50}
              className="text-lg"
            />
            <p className="text-xs text-gray-500 mt-1">
              {(configuration.customText || '').length}/50 characters
            </p>
          </div>

          <div className="p-4 bg-gradient-to-r from-rose-50 to-orange-50 rounded-lg border border-rose-200">
            <h4 className="font-semibold text-sm text-gray-900 mb-2">Preview</h4>
            <div className="text-center p-6 bg-white rounded-lg shadow-inner">
              <p className={`font-serif ${
                configuration.textOption === 'elaborate' ? 'text-2xl' : 'text-xl'
              } text-gray-900`}>
                {configuration.customText || 'Your message here'}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TextCustomizer;
