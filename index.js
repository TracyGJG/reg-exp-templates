export function escapeRegExp(pattern = '') {
  return pattern.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function isRegExpPattern(pattern = '') {
  try {
    RegExp(pattern);
    return !!pattern.length;
  } catch {
    return false;
  }
}

export function regExpString({ raw }) {
  return String.raw({ raw });
}

export function regExpTemplate(regExpFlags = '') {
  return ({ raw }, ...values) => {
    const regExpPattern = String.raw({ raw }, ...values)
      .split('\n')
      .filter(line => !/^#[^#].*$/.exec(line))
      .map(line => line.replaceAll(/(?<=[^\\])#[^#].*$/g, ''))
      .join('\n')
      .replaceAll(/\s+/g, '')
      .replaceAll(/\#/g, '#');
    return RegExp(regExpPattern, regExpFlags);
  };
}
