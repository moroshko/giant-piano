export default function isNatural(something) {
  return typeof something === 'number' &&
         something % 1 === 0 &&   // not float
         something > 0;
};
