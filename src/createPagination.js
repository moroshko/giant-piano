import isNatural from './isNatural';

export default function createPagination({ itemsPerPage, maxPages }) {
  if (!isNatural(itemsPerPage)) {
    throw new Error(`'itemsPerPage' must be a positive integer, not ${itemsPerPage}`);
    return;
  }

  if (!isNatural(maxPages)) {
    throw new Error(`'maxPages' must be a positive integer, not ${maxPages}`);
    return;
  }

  const half = (maxPages - 1) / 2;
  const smallerHalf = Math.floor(half);
  const largerHalf = Math.ceil(half);

  return function paginate({ currentPage, totalItems }) {
    if (!isNatural(currentPage)) {
      throw new Error(`'currentPage' must be a positive integer, not ${currentPage}`);
      return;
    }

    if (!isNatural(totalItems)) {
      throw new Error(`'totalItems' must be a positive integer, not ${totalItems}`);
      return;
    }

    const lastPage = Math.ceil(totalItems / itemsPerPage);

    if (currentPage > lastPage) {
      return {
        showFirst: false,
        showPrev: false,
        pages: [],
        showNext: false,
        showLast: false,
        lastPage
      };
    }

    let minPage;

    if (currentPage - smallerHalf <= 1) {
      minPage = 1;
    } else if (currentPage + largerHalf >= lastPage) {
      minPage = Math.max(1, lastPage - maxPages + 1);
    } else {
      minPage = currentPage - smallerHalf;
    }

    const maxPage = Math.min(lastPage, minPage + maxPages - 1);

    let pages = [];

    for (var page = minPage; page <= maxPage; page++) {
      pages.push(page);
    }

    const showFirst = (pages[0] > 1);
    const showPrev = (currentPage > 1);
    const showNext = (currentPage < lastPage);
    const showLast = (pages[pages.length - 1] < lastPage);

    return {
      showFirst,
      showPrev,
      pages,
      showNext,
      showLast,
      lastPage
    };
  };
};
