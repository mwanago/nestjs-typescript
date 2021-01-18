import 'core-js/es/object/from-entries';

function recursivelyStripNullValues(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(recursivelyStripNullValues);
  }
  if (value !== null && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(<Object>value).map(([key, value]) => [key, recursivelyStripNullValues(value)])
    );
  }
  if (value !== null) {
    return value;
  }
}

export default recursivelyStripNullValues;