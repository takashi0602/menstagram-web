import punycode from 'punycode';

/**
 * サニタイジング
 *
 * @param text
 * @returns {*}
 */
export const sanitize = text => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
};

/**
 * 連続する\nを1つにまとめる
 *
 * @param text
 * @returns {*}
 */
export const mnl2nl = text => {
  const regex = /(\n){2,}/g;
  return text.replace(regex, '\n');
};

/**
 * \nを<br>に変換する
 *
 * @param text
 * @returns {*}
 */
export const nl2br = text => {
  const regex = /(\n)/g;
  return text.replace(regex, '<br>');
};

/**
 * PunycodeをUnicodeに変換する
 *
 * @param url
 * @returns {String}
 */
export const puny2uni = url => {
  return punycode.toUnicode(url.replace(/(https?:\/\/)/, ''));
};

/**
 * urlを<a>に変換する
 *
 * @param text
 * @returns {string}
 */
export const url2a = text => {
  const regex = /(https?:\/\/\S+)/g;
  return text
    .split(regex)
    .map(line => {
      if (line.match(regex)) {
        return `<a href="${line}" target="_blank" rel="noreferrer noopener" >${puny2uni(
          line
        )}</a>`;
      }
      return line;
    })
    .join('');
};

/**
 * スラープや自己紹介の内容をSNSに適した形式で表示する
 *
 * multipleNewLine = true: 複数の改行を１つの改行にまとめる
 *
 * @param text
 * @param multipleNewLine
 * @returns {*}
 */
export const appearance = (text, multipleNewLine = true) => {
  if (!text) return '';
  return multipleNewLine
    ? url2a(nl2br(mnl2nl(sanitize(text.trim()))))
    : url2a(nl2br(sanitize(text.trim())));
};

/**
 * オブジェクトにkeyが存在するかどうかを返す
 *
 * @param obj
 * @param key
 * @returns {boolean}
 */
export const has_prop = (obj, key) => {
  return !!obj && Object.prototype.hasOwnProperty.call(obj, key);
};
