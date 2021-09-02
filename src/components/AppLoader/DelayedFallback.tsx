import React from 'react';
import './appLoader.css';
import { Waves } from './Waves';

export const DelayedFallback = () => {
  return (
    <div className="loading-wrap">
      <div className="custom-shape-divider-bottom-1630605953 fadaIn">
        <Waves />
        <div className="wall" />
      </div>
    </div>
  );
};
