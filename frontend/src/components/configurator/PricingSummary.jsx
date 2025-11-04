import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { ShoppingCart, DollarSign, Users } from 'lucide-react';
import { Separator } from '../ui/separator';

const PricingSummary = ({ pricing, onCheckout }) => {
  return (
    <Card className="p-6 bg-white/80 backdrop-blur-sm border-rose-100 shadow-xl">
      <div className="flex items-center gap-2 mb-4">
        <DollarSign className="w-5 h-5 text-rose-500" />
        <h3 className="font-semibold text-gray-900">Pricing Summary</h3>
      </div>

      <div className="space-y-3 mb-4">
        {pricing.breakdown.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex justify-between items-center text-sm"
          >
            <span className="text-gray-600">{item.label}</span>
            <span className="font-medium text-gray-900">${item.price.toFixed(2)}</span>
          </motion.div>
        ))}
      </div>

      <Separator className="my-4" />

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-gray-900">Total</span>
          <span className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
            ${pricing.total.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>Serves {pricing.servings} people</span>
        </div>

        <div className="text-xs text-gray-500 text-center">
          ${(pricing.total / pricing.servings).toFixed(2)} per serving
        </div>
      </div>

      <Button
        onClick={onCheckout}
        className="w-full mt-6 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 shadow-lg hover:shadow-xl transition-all duration-300"
        size="lg"
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        Proceed to Checkout
      </Button>

      <div className="mt-4 p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
        <p className="text-xs text-green-800 text-center">
          ✨ Free delivery for orders over $75
        </p>
      </div>
    </Card>
  );
};

export default PricingSummary;
