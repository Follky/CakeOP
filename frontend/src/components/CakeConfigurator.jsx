import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Download, Upload, ShoppingCart, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { useToast } from '../hooks/use-toast';
import {
  cakeTypes,
  frostingOptions,
  fillingOptions,
  layerOptions,
  decorOptions,
  textOptions
} from '../data/mockData';
import CakeTypeSelector from './configurator/CakeTypeSelector';
import FrostingSelector from './configurator/FrostingSelector';
import FillingSelector from './configurator/FillingSelector';
import LayerSelector from './configurator/LayerSelector';
import DecorSelector from './configurator/DecorSelector';
import TextCustomizer from './configurator/TextCustomizer';
import CakePreview from './configurator/CakePreview';
import PricingSummary from './configurator/PricingSummary';

const steps = [
  { id: 1, name: 'Cake Type', component: CakeTypeSelector },
  { id: 2, name: 'Frosting', component: FrostingSelector },
  { id: 3, name: 'Filling', component: FillingSelector },
  { id: 4, name: 'Layers', component: LayerSelector },
  { id: 5, name: 'Decorations', component: DecorSelector },
  { id: 6, name: 'Text', component: TextCustomizer },
  { id: 7, name: 'Review', component: null }
];

const CakeConfigurator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [configuration, setConfiguration] = useState({
    cakeType: null,
    frosting: null,
    filling: null,
    layers: '2',
    decor: [],
    textOption: 'none',
    customText: '',
    referenceImages: []
  });
  const { toast } = useToast();

  const selectedCake = useMemo(
    () => cakeTypes.find(c => c.id === configuration.cakeType),
    [configuration.cakeType]
  );

  const selectedFrosting = useMemo(
    () => frostingOptions.find(f => f.id === configuration.frosting),
    [configuration.frosting]
  );

  const selectedFilling = useMemo(
    () => fillingOptions.find(f => f.id === configuration.filling),
    [configuration.filling]
  );

  const selectedLayer = useMemo(
    () => layerOptions.find(l => l.id === configuration.layers),
    [configuration.layers]
  );

  const selectedDecor = useMemo(
    () => decorOptions.filter(d => configuration.decor.includes(d.id)),
    [configuration.decor]
  );

  const selectedText = useMemo(
    () => textOptions.find(t => t.id === configuration.textOption),
    [configuration.textOption]
  );

  const pricing = useMemo(() => {
    if (!selectedCake) return { total: 0, servings: 0, breakdown: [] };

    const breakdown = [];
    let total = selectedCake.basePrice;
    breakdown.push({ label: `${selectedCake.name} (Base)`, price: selectedCake.basePrice });

    if (selectedFrosting) {
      total += selectedFrosting.price;
      if (selectedFrosting.price > 0) {
        breakdown.push({ label: selectedFrosting.name, price: selectedFrosting.price });
      }
    }

    if (selectedFilling) {
      total += selectedFilling.price;
      if (selectedFilling.price > 0) {
        breakdown.push({ label: selectedFilling.name, price: selectedFilling.price });
      }
    }

    if (selectedLayer) {
      const layerPrice = selectedCake.basePrice * (selectedLayer.priceMultiplier - 1);
      total += layerPrice;
      if (layerPrice > 0) {
        breakdown.push({ label: selectedLayer.name, price: layerPrice });
      }
    }

    selectedDecor.forEach(decor => {
      total += decor.price;
      breakdown.push({ label: decor.name, price: decor.price });
    });

    if (selectedText && selectedText.price > 0) {
      total += selectedText.price;
      breakdown.push({ label: `Text: ${selectedText.name}`, price: selectedText.price });
    }

    const servings = selectedCake.servings * (selectedLayer?.servingsMultiplier || 1);

    return { total, servings, breakdown };
  }, [selectedCake, selectedFrosting, selectedFilling, selectedLayer, selectedDecor, selectedText]);

  const updateConfiguration = (key, value) => {
    setConfiguration(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep === 1 && !configuration.cakeType) {
      toast({
        title: "Please select a cake type",
        variant: "destructive"
      });
      return;
    }
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleExport = () => {
    const exportData = {
      ...configuration,
      pricing,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cake-config-${Date.now()}.json`;
    a.click();
    toast({
      title: "Configuration exported!",
      description: "Your cake configuration has been downloaded."
    });
  };

  const handleSave = async () => {
    // Mock save - will be replaced with actual API call
    toast({
      title: "Configuration saved!",
      description: "Your cake design has been saved successfully."
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: `Total: $${pricing.total.toFixed(2)}`
    });
  };

  const CurrentStepComponent = steps[currentStep - 1]?.component;

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-rose-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-rose-500" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-600 to-orange-600 bg-clip-text text-transparent">
                Cake Atelier
              </h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleExport}>
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button variant="outline" size="sm" onClick={handleSave}>
                Save Design
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    currentStep >= step.id
                      ? 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg'
                      : 'bg-white border-2 border-gray-300 text-gray-400'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.id}
                </motion.div>
                <div className="ml-2 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {step.name}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-0.5 w-12 mx-2 transition-all duration-300 ${
                    currentStep > step.id ? 'bg-gradient-to-r from-rose-500 to-orange-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-rose-100 shadow-xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 7 ? (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold text-gray-900">Review Your Creation</h2>
                      <div className="space-y-4">
                        <div className="p-4 bg-gradient-to-r from-rose-50 to-orange-50 rounded-lg">
                          <h3 className="font-semibold mb-2">Configuration Summary</h3>
                          <ul className="space-y-1 text-sm">
                            {selectedCake && <li>Cake: {selectedCake.name}</li>}
                            {selectedFrosting && <li>Frosting: {selectedFrosting.name}</li>}
                            {selectedFilling && <li>Filling: {selectedFilling.name}</li>}
                            {selectedLayer && <li>Layers: {selectedLayer.name}</li>}
                            {selectedDecor.length > 0 && (
                              <li>Decorations: {selectedDecor.map(d => d.name).join(', ')}</li>
                            )}
                            {configuration.customText && <li>Text: {configuration.customText}</li>}
                          </ul>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Upload Reference Images (Optional)</label>
                          <Input type="file" multiple accept="image/*" className="mb-2" />
                          <p className="text-xs text-gray-500">Upload inspiration images for our bakers</p>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Special Instructions</label>
                          <Textarea
                            placeholder="Any special requests or dietary requirements?"
                            rows={4}
                            className="w-full"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    CurrentStepComponent && (
                      <CurrentStepComponent
                        configuration={configuration}
                        updateConfiguration={updateConfiguration}
                      />
                    )
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={currentStep === steps.length}
                  className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600"
                >
                  {currentStep === steps.length ? 'Complete' : 'Next'}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </Card>
          </div>

          {/* Preview & Pricing Sidebar */}
          <div className="space-y-6">
            <CakePreview configuration={configuration} selectedCake={selectedCake} />
            <PricingSummary pricing={pricing} onCheckout={handleCheckout} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CakeConfigurator;
