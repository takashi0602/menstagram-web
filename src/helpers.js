import React from 'react';

export const nl2br = text => {
  const regex = /(\n)/g;
  return text.split(regex).map((line, index) => {
    if (line.match(regex)) {
      return React.createElement('br', {key: index})
    }
    else {
      return line;
    }
  });
};
