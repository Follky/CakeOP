import React from 'react';
import { motion, Reorder } from 'framer-motion';
import { decorOptions } from '../../data/mockData';
import { Card } from '../ui/card';
import { Check, GripVertical, X } from 'lucide-react';
import { Button } from '../ui/button';

const DecorSelector = ({ configuration, updateConfiguration }) => {
  const toggleDecor = (decorId) => {
    const currentDecor = configuration.decor || [];
    if (currentDecor.includes(decorId)) {
      updateConfiguration('decor', currentDecor.filter(id => id !== decorId));
    } else {
      updateConfiguration('decor', [...currentDecor, decorId]);
    }
  };

  const reorderDecor = (newOrder) => {
    updateConfiguration('decor', newOrder);
  };

  const selectedDecorItems = decorOptions.filter(d => 
    (configuration.decor || []).includes(d.id)
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Add Decorations</h2>
        <p className="text-gray-600">Select multiple decorations and drag to reorder</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {decorOptions.map((decor) => {
          const isSelected = (configuration.decor || []).includes(decor.id);
          return (
            <motion.div
              key={decor.id}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Card
                className={`cursor-pointer p-4 transition-all duration-300 ${
                  isSelected
                    ? 'ring-2 ring-rose-500 shadow-lg bg-gradient-to-br from-rose-50 to-orange-50'
                    : 'hover:shadow-md border-gray-200 bg-white'
                }`}
                onClick={() => toggleDecor(decor.id)}
              >
                <div className="relative">
                  <div className="text-4xl mb-3 text-center">{decor.image}</div>
                  {isSelected && (
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
                  {decor.name}
                </h3>
                <p className="text-xs text-center font-medium text-rose-600">
                  +${decor.price}
                </p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {selectedDecorItems.length > 0 && (
        <div className="mt-6">
          <h3 className="font-semibold text-gray-900 mb-3">Selected Decorations (Drag to Reorder)</h3>
          <Reorder.Group
            axis="y"
            values={configuration.decor || []}
            onReorder={reorderDecor}
            className="space-y-2"
          >
            {(configuration.decor || []).map((decorId) => {
              const decor = decorOptions.find(d => d.id === decorId);
              if (!decor) return null;
              return (
                <Reorder.Item
                  key={decor.id}
                  value={decor.id}
                  className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <GripVertical className="w-5 h-5 text-gray-400" />
                      <span className="text-2xl">{decor.image}</span>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{decor.name}</p>
                        <p className="text-xs text-rose-600">+${decor.price}</p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDecor(decor.id);
                      }}
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                </Reorder.Item>
              );
            })}
          </Reorder.Group>
        </div>
      )}
    </div>
  );
};

export default DecorSelector;
