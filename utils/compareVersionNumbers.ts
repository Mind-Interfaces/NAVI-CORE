/**
 * compareVersionNumbers
 * Compare two software version numbers (e.g. 1.7.1)
 * Returns:
 *
 *  0 if they're identical
 *  negative if v1 < v2
 *  positive if v1 > v2
 *  Nan if they in the wrong format
 *
 *  E.g.:
 *
 *  assert(version_number_compare("1.7.1", "1.6.10") > 0);
 *  assert(version_number_compare("1.7.1", "1.7.10") < 0);
 *
 *  "Unit tests": http://jsfiddle.net/ripper234/Xv9WL/28/
 *
 *  Taken from http://stackoverflow.com/a/6832721/11236
 */

const isPositiveInteger = (x: any) => {
  // http://stackoverflow.com/a/1019526/11236
  return /^\d+$/.test(x)
}

export const compareVersionNumbers = (v1: any, v2: any) => {
  const v1parts = v1.split('.')
  const v2parts = v2.split('.')

  // First, validate both numbers are true version numbers
  function validateParts(parts: any) {
    for (let i = 0; i < parts.length; ++i) {
      if (!isPositiveInteger(parts[i])) {
        return false
      }
    }
    return true
  }
  if (!validateParts(v1parts) || !validateParts(v2parts)) {
    return NaN
  }

  for (let i = 0; i < v1parts.length; ++i) {
    // parse as integers otherwise we compare as strings and 10 < 4
    v1parts[i] = parseInt(v1parts[i], 10)
    v2parts[i] = parseInt(v2parts[i], 10)

    if (v2parts.length === i) {
      return 1
    }

    if (v1parts[i] === v2parts[i]) {
      continue
    }
    if (v1parts[i] > v2parts[i]) {
      return 1
    }
    return -1
  }

  if (v1parts.length !== v2parts.length) {
    return -1
  }

  return 0
}