import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyboardIcon } from '@heroicons/react/24/outline';

export const KeyboardHelp = () => {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { keys: ['Ctrl/⌘', 'H'], description: 'Use hint (if available)' },
    { keys: ['Ctrl/⌘', 'S'], description: 'Skip puzzle (if power-up active)' },
    { keys: ['Ctrl/⌘', 'Esc'], description: 'Return to menu' },
    { keys: ['Enter'], description: 'Submit answer' },
    { keys: ['Tab'], description: 'Navigate between interactive elements' },
  ];

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 p-2 rounded-full bg-gray-800/50 hover:bg-gray-800/70 transition-colors z-50"
        aria-label="Show keyboard shortcuts"
      >
        <KeyboardIcon className="w-6 h-6 text-gray-400" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md p-6 bg-gray-900/90 rounded-lg shadow-xl z-50"
            >
              <h2 className="text-xl font-bold mb-4 text-purple-300">Keyboard Shortcuts</h2>
              <div className="space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between text-sm"
                  >
                    <div className="flex items-center gap-1">
                      {shortcut.keys.map((key, keyIndex) => (
                        <span 
                          key={keyIndex}
                          className="px-2 py-1 bg-gray-800 rounded border border-gray-700 text-gray-300 font-mono text-xs"
                        >
                          {key}
                        </span>
                      ))}
                    </div>
                    <span className="text-gray-400">{shortcut.description}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 w-full py-2 rounded bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 transition-colors"
              >
                Close
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};