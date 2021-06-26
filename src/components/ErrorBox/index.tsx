
import './styles.css';
import React from 'react';

export const ErrorBox = ({ className = '', error = '' }: { className?: string, error?: string | null | undefined, }) => {
  if (!error) return null;
  
  return (
    <div className={`error-box ${className}`}>
      {error}
    </div>
  );
}
