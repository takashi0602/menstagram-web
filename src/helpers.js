import React from 'react';

const nl2br = text => {
  const regex = /(\n)/g;
  return text.split(regex).map((line, index) => {
    if (line.match(regex)) {
      return React.createElement('br', { key: index });
    }
    return line;
  });
};

export const trim = text => {
  return nl2br(text.trim());
};
