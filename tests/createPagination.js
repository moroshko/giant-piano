import { expect } from 'chai';
import createPagination from '../src/createPagination';

let paginate1, paginate5, paginate6;

describe('createPagination', () => {
  describe('should throw an error if', () => {
    it('`itemsPerPage` is not a positive integer', () => {
      expect(createPagination.bind(null, { maxPagesInPagination: 5 }))
        .to.throw(Error, /itemsPerPage/);
    });

    it('`maxPagesInPagination` is not a positive integer', () => {
      expect(createPagination.bind(null, { itemsPerPage: 20 }))
        .to.throw(Error, /maxPagesInPagination/);
    });
  });

  describe('paginate', () => {
    before(() => {
      paginate1 = createPagination({ itemsPerPage: 10, maxPagesInPagination: 1 });
      paginate5 = createPagination({ itemsPerPage: 10, maxPagesInPagination: 5 });
      paginate6 = createPagination({ itemsPerPage: 10, maxPagesInPagination: 6 });
    });

    it('should be a function that gets one parameter', () => {
      expect(paginate1).to.be.a('function');
      expect(paginate1.length).to.equal(1);
    });

    describe('should throw an error if', () => {
      it('`currentPage` is not a positive integer', () => {
        expect(paginate1.bind(null, { currentPage: 0, totalItemsCount: 10 }))
          .to.throw(Error, /currentPage/);
      });

      it('`totalItemsCount` is not a positive integer or 0', () => {
        expect(paginate1.bind(null, { currentPage: 1 }))
          .to.throw(Error, /totalItemsCount/);
      });
    });

    describe('should return `showFirst` equals', () => {
      it('true if page 1 is not displayed', () => {
        expect(paginate1({ currentPage: 2, totalItemsCount: 62 }).showFirst)
          .to.equal(true);
        expect(paginate5({ currentPage: 4, totalItemsCount: 62 }).showFirst)
          .to.equal(true);
      });

      it('false if page 1 is displayed', () => {
        expect(paginate1({ currentPage: 1, totalItemsCount: 62 }).showFirst)
          .to.equal(false);
        expect(paginate5({ currentPage: 3, totalItemsCount: 62 }).showFirst)
          .to.equal(false);
      });
    });

    describe('should return `showPrev` equals', () => {
      it('true if current page is not 1', () => {
        expect(paginate1({ currentPage: 2, totalItemsCount: 62 }).showPrev)
          .to.equal(true);
      });

      it('false if current page is 1', () => {
        expect(paginate1({ currentPage: 1, totalItemsCount: 62 }).showPrev)
          .to.equal(false);
      });
    });

    describe('should return `pages`', () => {
      it('with current page centered (when possible)', () => {
        expect(paginate1({ currentPage: 2, totalItemsCount: 62 }).pages)
          .to.deep.equal([2]);
        expect(paginate5({ currentPage: 4, totalItemsCount: 62 }).pages)
          .to.deep.equal([2, 3, 4, 5, 6]);
        expect(paginate6({ currentPage: 4, totalItemsCount: 62 }).pages)
          .to.deep.equal([2, 3, 4, 5, 6, 7]);
      });

      it('with current page as centered as possible (when impossible to center)', () => {
        expect(paginate5({ currentPage: 6, totalItemsCount: 62 }).pages)
          .to.deep.equal([3, 4, 5, 6, 7]);
        expect(paginate6({ currentPage: 7, totalItemsCount: 62 }).pages)
          .to.deep.equal([2, 3, 4, 5, 6, 7]);
      });
    });

    describe('should return `showNext` =', () => {
      it('true if current page is not the last page', () => {
        expect(paginate1({ currentPage: 6, totalItemsCount: 62 }).showNext)
          .to.equal(true);
        expect(paginate5({ currentPage: 4, totalItemsCount: 62 }).showNext)
          .to.equal(true);
      });

      it('false if current page is the last page', () => {
        expect(paginate1({ currentPage: 7, totalItemsCount: 62 }).showNext)
          .to.equal(false);
        expect(paginate5({ currentPage: 7, totalItemsCount: 62 }).showNext)
          .to.equal(false);
      });
    });
  });
});
