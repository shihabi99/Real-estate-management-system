import React, { useState } from 'react';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

export const UiPreview: React.FC = () => {
  const [chk1, setChk1] = useState(false);
  const [chk2, setChk2] = useState(true);

  return (
    <div className="animate-fadeIn max-w-5xl mx-auto space-y-12 pb-12">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white transition-colors">UI Preview</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 transition-colors">
          A catalog of all available interface components and their states.
        </p>
      </div>

      {/* Buttons Section */}
      <section>
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
          Buttons
        </h2>
        <div className="p-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
          <div className="flex flex-wrap gap-4 items-center mb-6">
            <Button variant="primary">Primary Action</Button>
            <Button variant="secondary">Secondary Action</Button>
            <Button variant="ghost">Ghost Action</Button>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <Button variant="primary" isLoading>Loading</Button>
            <Button variant="primary" disabled>Disabled</Button>
            <Button variant="secondary" disabled>Disabled</Button>
          </div>
        </div>
      </section>

      {/* Inputs Section */}
      <section>
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
          Inputs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
          <div className="space-y-6">
            <Input 
              id="preview-input-1"
              label="Default Input" 
              placeholder="Type something..." 
            />
            <Input 
              id="preview-input-2"
              label="Filled Input" 
              defaultValue="Pre-filled value"
            />
            <Input 
              id="preview-input-3"
              label="With Helper Text" 
              placeholder="Enter email"
            />
          </div>
          <div className="space-y-6">
             <Input 
              id="preview-input-error"
              label="Error State" 
              placeholder="Invalid input..." 
              defaultValue="Invalid Value"
              error="This field is required" 
            />
            <Input 
              id="preview-input-disabled"
              label="Disabled Input" 
              placeholder="Cannot type here..." 
              disabled 
            />
             <Input 
              id="preview-input-password"
              label="Password Type" 
              type="password"
              placeholder="••••••••" 
            />
          </div>
        </div>
      </section>

      {/* Checkboxes Section */}
      <section>
        <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider mb-6 border-b border-slate-200 dark:border-slate-700 pb-2">
          Checkboxes
        </h2>
        <div className="p-8 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Checkbox 
                id="chk-default" 
                label="Unchecked option" 
                checked={chk1} 
                onChange={(e) => setChk1(e.target.checked)} 
              />
              <Checkbox 
                id="chk-checked" 
                label="Checked option" 
                checked={chk2} 
                onChange={(e) => setChk2(e.target.checked)} 
              />
            </div>
            <div className="space-y-4">
              <Checkbox 
                id="chk-disabled" 
                label="Disabled option" 
                disabled 
              />
              <Checkbox 
                id="chk-disabled-checked" 
                label="Disabled & Checked" 
                checked 
                disabled 
              />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};