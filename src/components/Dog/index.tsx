
import './styles.css';
import React from 'react';

export const Dog = ({ dog, className = '' }: { dog: string, className: string }) => {

  return (
    <div className={`dog ${className}`}>
      <img src={dog} className="dog-image" alt="Dog" />
    </div>
  );
}
