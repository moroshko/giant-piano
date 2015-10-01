import isNatural from './isNatural';

export default function createPagination({ itemsPerPage, maxPagesInPagination }) {
  if (!isNatural(itemsPerPage)) {
    throw new Error(`'itemsPerPage' must be a positive integer, not ${itemsPerPage}`);
    return;
  }

  if (!isNatural(maxPagesInPagination)) {
    throw new Error(`'maxPagesInPagination' must be a positive integer, not ${maxPagesInPagination}`);
    return;
  }

  const half = (maxPagesInPagination - 1) / 2;
  const smallerHalf = Math.floor(half);
  const largerHalf = Math.ceil(half);

  return function paginate({ currentPage, totalItemsCount }) {
    if (!isNatural(currentPage)) {
      throw new Error(`'currentPage' must be a positive integer, not ${currentPage}`);
      return;
    }

    if (totalItemsCount !== 0 && !isNatural(totalItemsCount)) {
      throw new Error(`'totalItemsCount' must be a non-negative integer, not ${totalItemsCount}`);
      return;
    }

    const pagesCount = Math.ceil(totalItemsCount / itemsPerPage);
    const minPage = Math.max(1, currentPage - smallerHalf);
    const maxPage = Math.min(pagesCount, currentPage + largerHalf);
    let pages = [];

    for (var page = minPage; page <= maxPage; page++) {
      pages.push(page);
    }

    const showFirst = (pages[0] > 1);
    const showPrev = (currentPage > 1);
    const showNext = (currentPage < pagesCount);

    return {
      showFirst,
      showPrev,
      pages,
      showNext
    };
  };
};
