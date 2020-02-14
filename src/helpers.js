import React from 'react';

/**
 * \nを<br>に変換する
 *
 * @param text
 * @returns {any[]}
 */
export const nl2br = text => {
  const regex = /(\n)/g;
  return text.split(regex).map((line, index) => {
    if (line.match(regex)) {
      return React.createElement('br', { key: index });
    }
    return line;
  });
};

/**
 * 連続する\nを1つにまとめる
 *
 * @param text
 * @returns {any[]}
 */
export const mnl2nl = text => {
  const regex = /(\n){2,}/g;
  return text.replace(regex, '\n');
};

/**
 * multipleNewLine = true：文字列をトリミングし、連続する\nを1つにまとめ、\nを<br>に変換する
 * multipleNewLine = false：文字列をトリミングし、\nを<br>に変換する
 *
 * @param text
 * @param multipleNewLine
 * @returns {any[]}
 */
export const trim = (text, multipleNewLine = true) => {
  return multipleNewLine ? nl2br(mnl2nl(text.trim())) : nl2br(text.trim());
};
