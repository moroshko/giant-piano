import { expect } from 'chai';
import createPagination from '../src/createPagination';

let paginate1, paginate5, paginate6;

describe('createPagination', () => {
  describe('should throw an error if', () => {
    it('`itemsPerPage` is not a positive integer', () => {
      expect(createPagination.bind(null, { maxPages: 5 }))
        .to.throw(Error, /itemsPerPage/);
    });

    it('`maxPages` is not a positive integer', () => {
      expect(createPagination.bind(null, { itemsPerPage: 20 }))
        .to.throw(Error, /maxPages/);
    });
  });

  describe('paginate', () => {
    before(() => {
      paginate1 = createPagination({ itemsPerPage: 10, maxPages: 1 });
      paginate5 = createPagination({ itemsPerPage: 10, maxPages: 5 });
      paginate6 = createPagination({ itemsPerPage: 10, maxPages: 6 });
    });

    it('should be a function that gets one parameter', () => {
      expect(paginate1).to.be.a('function');
      expect(paginate1.length).to.equal(1);
    });

    describe('should throw an error if', () => {
      it('`currentPage` is not a positive integer', () => {
        expect(paginate1.bind(null, { currentPage: 0, totalItems: 10 }))
          .to.throw(Error, /currentPage/);
      });

      it('`totalItems` is not a positive integer', () => {
        expect(paginate1.bind(null, { currentPage: 1, totalItems: 0 }))
          .to.throw(Error, /totalItems/);
      });
    });

    describe('should return `showFirst` equals to', () => {
      it('true if page 1 is not displayed', () => {
        expect(paginate1({ currentPage: 2, totalItems: 62 }).showFirst)
          .to.equal(true);
        expect(paginate5({ currentPage: 4, totalItems: 62 }).showFirst)
          .to.equal(true);
      });

      it('false if page 1 is displayed', () => {
        expect(paginate1({ currentPage: 1, totalItems: 62 }).showFirst)
          .to.equal(false);
        expect(paginate5({ currentPage: 3, totalItems: 62 }).showFirst)
          .to.equal(false);
      });

      it('false if `currentPage` is larger than `lastPage`', () => {
        expect(paginate5({ currentPage: 8, totalItems: 62 }).showFirst)
          .to.equal(false);
      });
    });

    describe('should return `showPrev` equals to', () => {
      it('true if `currentPage` is not 1', () => {
        expect(paginate1({ currentPage: 2, totalItems: 62 }).showPrev)
          .to.equal(true);
      });

      it('false if `currentPage` is 1', () => {
        expect(paginate1({ currentPage: 1, totalItems: 62 }).showPrev)
          .to.equal(false);
      });

      it('false if `currentPage` is larger than `lastPage`', () => {
        expect(paginate5({ currentPage: 8, totalItems: 62 }).showPrev)
          .to.equal(false);
      });
    });

    describe('should return `pages`', () => {
      it('that contain all the page numbers when `maxPages` > `lastPage`', () => {
        expect(paginate5({ currentPage: 4, totalItems: 31 }).pages)
          .to.deep.equal([1, 2, 3, 4]);
        expect(paginate6({ currentPage: 1, totalItems: 1 }).pages)
          .to.deep.equal([1]);
      });

      it('with `currentPage` centered (when possible)', () => {
        expect(paginate1({ currentPage: 2, totalItems: 62 }).pages)
          .to.deep.equal([2]);
        expect(paginate5({ currentPage: 4, totalItems: 62 }).pages)
          .to.deep.equal([2, 3, 4, 5, 6]);
        expect(paginate6({ currentPage: 4, totalItems: 62 }).pages)
          .to.deep.equal([2, 3, 4, 5, 6, 7]);
      });

      it('with `currentPage` as centered as possible (when impossible to center)', () => {
        expect(paginate5({ currentPage: 6, totalItems: 62 }).pages)
          .to.deep.equal([3, 4, 5, 6, 7]);
        expect(paginate5({ currentPage: 7, totalItems: 62 }).pages)
          .to.deep.equal([3, 4, 5, 6, 7]);
        expect(paginate6({ currentPage: 5, totalItems: 62 }).pages)
          .to.deep.equal([2, 3, 4, 5, 6, 7]);
        expect(paginate6({ currentPage: 7, totalItems: 62 }).pages)
          .to.deep.equal([2, 3, 4, 5, 6, 7]);
      });

      it('equals to an empty array when `currentPage` is larger than `lastPage`', () => {
        expect(paginate5({ currentPage: 8, totalItems: 62 }).pages)
          .to.deep.equal([]);
      });
    });

    describe('should return `showNext` equals to', () => {
      it('true if `currentPage` is not the last page', () => {
        expect(paginate1({ currentPage: 6, totalItems: 62 }).showNext)
          .to.equal(true);
        expect(paginate5({ currentPage: 4, totalItems: 62 }).showNext)
          .to.equal(true);
      });

      it('false if `currentPage` is the last page', () => {
        expect(paginate1({ currentPage: 7, totalItems: 62 }).showNext)
          .to.equal(false);
        expect(paginate5({ currentPage: 7, totalItems: 62 }).showNext)
          .to.equal(false);
      });

      it('false if `currentPage` is larger than `lastPage`', () => {
        expect(paginate5({ currentPage: 8, totalItems: 62 }).showNext)
          .to.equal(false);
      });
    });

    describe('should return `showLast` equals to', () => {
      it('true if the last page is not displayed', () => {
        expect(paginate1({ currentPage: 6, totalItems: 62 }).showLast)
          .to.equal(true);
        expect(paginate6({ currentPage: 3, totalItems: 62 }).showLast)
          .to.equal(true);
      });

      it('false if the last page is displayed', () => {
        expect(paginate1({ currentPage: 7, totalItems: 62 }).showLast)
          .to.equal(false);
        expect(paginate6({ currentPage: 4, totalItems: 62 }).showLast)
          .to.equal(false);
      });

      it('false if `currentPage` is larger than `lastPage`', () => {
        expect(paginate5({ currentPage: 8, totalItems: 62 }).showLast)
          .to.equal(false);
      });
    });

    it('should return `lastPage` equals to total number of pages', () => {
      expect(paginate5({ currentPage: 3, totalItems: 62 }).lastPage)
        .to.equal(7);
      expect(paginate5({ currentPage: 8, totalItems: 62 }).lastPage)
        .to.equal(7);
    });
  });
});
