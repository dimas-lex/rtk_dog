import './styles.css';
import React from 'react';

export const Loader = ({ className = '', isLoading = false }: { className?: string, isLoading?: boolean }) => {
  if (!isLoading) return null;

  return (
    <div className={`loader ${className}`}> 
      <div className="loader__bar"></div>
    </div>
  );
}
