import { expect } from 'chai';
import isNatural from '../src/isNatural';

describe('isNatural', () => {
  describe('should return true for', () => {
    it('natural numbers', () => {
      expect(isNatural(1)).to.equal(true);
      expect(isNatural(6)).to.equal(true);
    });
  });

  describe('should return false for', () => {
    it('not numbers', () => {
      expect(isNatural(undefined)).to.equal(false);
      expect(isNatural(null)).to.equal(false);
      expect(isNatural('5')).to.equal(false);
      expect(isNatural(true)).to.equal(false);
      expect(isNatural({ x: 5 })).to.equal(false);
      expect(isNatural(NaN)).to.equal(false);
    });

    it('not integer numbers', () => {
      expect(isNatural(4.6)).to.equal(false);
      expect(isNatural(-2.9)).to.equal(false);
      expect(isNatural(Infinity)).to.equal(false);
    });

    it('non-positive integers', () => {
      expect(isNatural(0)).to.equal(false);
      expect(isNatural(-9)).to.equal(false);
    });
  });
});
