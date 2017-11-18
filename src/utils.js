export const multilineRegExp = (regs, options) => {
  return new RegExp(regs.map(reg => reg.source).join(''), options)
}

export const prefixedStr = (str, prefix = '') => str ? `${prefix}${str}` : ''

export const screamingSnakeCase = s => {
  return s.replace(/(?:^|\.?)([A-Z])/g, (_, c) => `_${c}`).replace(/^_/, '').toUpperCase()
}

export const capitalizedCamelCase = s => {
  const camel = s.toLowerCase().replace(/\W+(.)/g, (_, c) => c.toUpperCase())
  return camel.charAt(0).toUpperCase() + camel.slice(1)
}

export const valueFinder = (object, fullPath) => {
  let [args, setting, value, i] = [fullPath.split('.'), undefined, object, 0]

  for (i = 0; i < args.length - 1; i += 1) {
    setting = value
    value = value[capitalizedCamelCase(args[i])] || {}
  }
  setting = setting[screamingSnakeCase(args[i - 1])]
  value = value[args[i]]
  return typeof(value) !== 'object' ? { value, setting } : {}
}
