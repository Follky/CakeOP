import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Eye, Cake } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const CakePreview = ({ configuration, selectedCake }) => {
  if (!selectedCake) {
    return (
      <Card className="p-8 bg-white/80 backdrop-blur-sm border-rose-100 shadow-xl">
        <div className="text-center text-gray-500">
          <Cake className="w-16 h-16 mx-auto mb-4 text-rose-300" />
          <p>Select a cake type to see preview</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-rose-100 shadow-xl sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="w-5 h-5 text-rose-500" />
        <h3 className="font-semibold text-gray-900">Live Preview</h3>
      </div>

      <Tabs defaultValue="whole" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="whole">Whole Cake</TabsTrigger>
          <TabsTrigger value="slice">Slice View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="whole" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 shadow-inner"
          >
            <img
              src={selectedCake.image}
              alt={selectedCake.name}
              className="w-full h-full object-cover"
            />
            {configuration.customText && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white font-serif text-lg px-4 py-2 bg-black/20 backdrop-blur-sm rounded-lg shadow-lg"
                >
                  {configuration.customText}
                </motion.p>
              </div>
            )}
          </motion.div>
        </TabsContent>

        <TabsContent value="slice" className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50 shadow-inner"
          >
            <img
              src="https://images.unsplash.com/photo-1668887461930-44237b5eb558"
              alt="Slice view"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </TabsContent>
      </Tabs>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Cake Type:</span>
          <span className="font-medium text-gray-900">{selectedCake.name}</span>
        </div>
        {configuration.layers && (
          <div className="flex justify-between">
            <span className="text-gray-600">Layers:</span>
            <span className="font-medium text-gray-900">{configuration.layers}</span>
          </div>
        )}
      </div>
    </Card>
  );
};

export default CakePreview;
