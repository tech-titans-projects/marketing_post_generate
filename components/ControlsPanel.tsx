
import React from 'react';
import type { GenerateOptions } from '../types';
import { CopyType, TONES, LENGTHS } from '../types';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { Slider } from './ui/Slider';
import { Label } from './ui/Label';
import { Textarea } from './ui/Textarea';
import { Input } from './ui/Input';

interface ControlsPanelProps {
  options: GenerateOptions;
  setOptions: React.Dispatch<React.SetStateAction<GenerateOptions>>;
  onGenerate: () => void;
  isLoading: boolean;
}

export const ControlsPanel: React.FC<ControlsPanelProps> = ({ options, setOptions, onGenerate, isLoading }) => {
  const handleInputChange = <K extends keyof GenerateOptions>(key: K, value: GenerateOptions[K]) => {
    setOptions(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-surface p-6 rounded-xl shadow-lg space-y-6 border border-gray-200">
      <h2 className="text-xl font-bold text-text-primary border-b pb-2">Customization</h2>

      <div className="space-y-2">
        <Label htmlFor="copyType">Content Type</Label>
        <Select
          id="copyType"
          value={options.copyType}
          onChange={e => handleInputChange('copyType', e.target.value as CopyType)}
        >
          {Object.values(CopyType).map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="productName">Product/Service Name</Label>
        <Input
          id="productName"
          type="text"
          value={options.productName}
          onChange={e => handleInputChange('productName', e.target.value)}
          placeholder="e.g., EcoFresh Air Purifier"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="targetAudience">Target Audience</Label>
        <Input
          id="targetAudience"
          type="text"
          value={options.targetAudience}
          onChange={e => handleInputChange('targetAudience', e.target.value)}
          placeholder="e.g., Health-conscious families"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Key Features/Benefits (1 per line)</Label>
        <Textarea
          id="features"
          value={options.features}
          onChange={e => handleInputChange('features', e.target.value)}
          rows={4}
          placeholder="- Removes 99.9% of allergens&#10;- Ultra-quiet operation&#10;- Smart-sensor technology"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="tone">Tone of Voice</Label>
        <Select
          id="tone"
          value={options.tone}
          onChange={e => handleInputChange('tone', e.target.value as typeof TONES[number])}
        >
          {TONES.map(tone => <option key={tone} value={tone}>{tone}</option>)}
        </Select>
      </div>

       <div className="space-y-2">
        <Label>Length</Label>
        <div className="flex space-x-2">
          {LENGTHS.map(len => (
             <button
              key={len}
              onClick={() => handleInputChange('length', len)}
              className={`flex-1 py-2 px-4 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary
              ${options.length === len ? 'bg-primary text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
            >
              {len}
            </button>
          ))}
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="creativity" className="flex justify-between">
          <span>Creativity Level</span>
          <span className="font-mono text-sm text-primary-dark">{options.creativity.toFixed(1)}</span>
        </Label>
        <Slider
          id="creativity"
          min="0"
          max="1"
          step="0.1"
          value={options.creativity}
          onChange={e => handleInputChange('creativity', parseFloat(e.target.value))}
        />
      </div>

      <Button onClick={onGenerate} disabled={isLoading} className="w-full">
        {isLoading ? 'Generating...' : 'Generate Copy'}
      </Button>
    </div>
  );
};
