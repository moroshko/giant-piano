import styles from './App.less';

import React, { Component } from 'react';
import createPagination from 'createPagination';

export default class App extends Component {
  constructor() {
    super();

    const itemsPerPage = 10;
    const maxPages = 5;
    const currentPage = 4;
    const totalItems = 127;
    const paginationData =
      createPagination({ itemsPerPage, maxPages })({ currentPage, totalItems });

    this.state = {
      itemsPerPage,
      maxPages,
      currentPage,
      totalItems,
      ...paginationData
    };

    this.updateItemsPerPage = ::this.updateItemsPerPage;
    this.updateMaxPages = ::this.updateMaxPages;
    this.updateCurrentPage = ::this.updateCurrentPage;
    this.updateTotalItems = ::this.updateTotalItems;
    this.setCurrentPage = ::this.setCurrentPage;
  }

  updateState(newState) {
    const nextState = {
      ...this.state,
      ...newState
    };
    const { itemsPerPage, maxPages, currentPage, totalItems } = nextState;

    try {
      const newPaginationData =
        createPagination({ itemsPerPage, maxPages })({ currentPage, totalItems });

      this.setState({
        ...nextState,
        ...newPaginationData
      });
    } catch (error) {
      console.info(error); // eslint-disable-line no-console
    }
  }

  updateItemsPerPage(event) {
    this.updateState({
      itemsPerPage: parseInt(event.target.value, 10)
    });
  }

  updateMaxPages(event) {
    this.updateState({
      maxPages: parseInt(event.target.value, 10)
    });
  }

  updateCurrentPage(event) {
    this.updateState({
      currentPage: parseInt(event.target.value, 10)
    });
  }

  updateTotalItems(event) {
    this.updateState({
      totalItems: parseInt(event.target.value, 10)
    });
  }

  setCurrentPage(page) {
    this.updateState({
      currentPage: page
    });
  }

  render() {
    const { itemsPerPage, maxPages, currentPage, totalItems,
            showFirst, showPrev, pages, showNext, showLast, lastPage } = this.state;
    const maxItemsPerPage = Math.floor((totalItems - 1) / (currentPage - 1));
    const minTotalItems = itemsPerPage * (currentPage - 1) + 1;

    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img src="https://github.com/moroshko/giant-piano/raw/master/giant-piano.gif" />
          <a href="https://github.com/moroshko/giant-piano" target="_blank">
            <img src="https://img.shields.io/github/stars/moroshko/giant-piano.svg?style=social&label=Star" />
          </a>
        </div>
        <div className={styles.fieldsContainer}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="items-per-page">
              Items per page:
            </label>
            <input id="items-per-page" className={styles.input}
                   type="number" min="1" max={maxItemsPerPage}
                   value={itemsPerPage} onChange={this.updateItemsPerPage} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="max-pages">
              Max pages:
            </label>
            <input id="max-pages" className={styles.input}
                   type="number" min="1"
                   value={maxPages}  onChange={this.updateMaxPages} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="current-page">
              Current page:
            </label>
            <input id="current-page" className={styles.input}
                   type="number" min="1" max={lastPage}
                   value={currentPage} onChange={this.updateCurrentPage} />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="total-items">
              Total items:
            </label>
            <input id="total-items" className={styles.input}
                   type="number" min={minTotalItems}
                   value={totalItems} onChange={this.updateTotalItems} />
          </div>
        </div>
        <div className={styles.pagination}>
          {
            <button className={`${styles.button} ${showFirst ? '' : styles.hidden}`}
               onClick={this.setCurrentPage.bind(null, 1)}>
              First
            </button>
          }
          {
            <button className={`${styles.button} ${showPrev ? '' : styles.hidden}`}
               onClick={this.setCurrentPage.bind(null, currentPage - 1)}>
              Prev
            </button>
          }
          {
            pages.map(page =>
              <button className={`${styles.button} ${styles.page} ${page === currentPage ? styles.currentPage : ''}`}
                 onClick={this.setCurrentPage.bind(null, page)}
                 key={page}>
                {page}
              </button>
            )
          }
          {
            <button className={`${styles.button} ${showNext ? '' : styles.hidden}`}
               onClick={this.setCurrentPage.bind(null, currentPage + 1)}>
              Next
            </button>
          }
          {
            <button className={`${styles.button} ${showLast ? '' : styles.hidden}`}
               onClick={this.setCurrentPage.bind(null, lastPage)}>
              Last
            </button>
          }
        </div>
        <div className={styles.footer}>
          <img src="https://gravatar.com/avatar/e56de06f4b56f6f06e4a9a271ed57e26?s=32"
               alt="Misha Moroshko" />
          <span>
            Crafted with <span className={styles.love}>love</span> by
            {' '}<a href="https://twitter.com/moroshko"
                    target="_blank">@moroshko</a>
          </span>
        </div>
      </div>
    );
  }
};
