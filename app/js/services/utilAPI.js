angular.module("marvelApp").service("utilAPI", function (){
  /* eslint-disable no-unused-vars */
/* eslint-disable */
this.paginate = (
  items = [],
  currentPage = 1,
  pageSize = 10,
  maxPages = 10
) => {
  let totalItems = items.length;
  // calculate total pages
  let totalPages = Math.ceil(totalItems / pageSize);
  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage = 0,
    endPage = 0;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  let offset = (currentPage - 1) * pageSize;
  let nextPage = totalPages > currentPage ? currentPage + 1 : null;
  let paginatedItems = items.slice(offset).slice(0, pageSize);

  // calculate start and end item indexes
  let startIndex = currentPage == 1 ? 1 : offset + 1;
  let endIndex =
    nextPage !== null ? currentPage * paginatedItems.length : items.length;

  // create an array of pages to ng-repeat in the pager control
  let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
    i => startPage + i
  );

  // return object with all pager properties required by the view
  return {
    page: currentPage,
    perPage: pageSize,
    prePage: currentPage - 1 ? currentPage - 1 : null,
    nextPage: nextPage,
    totalItems: totalItems,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages,
    data: paginatedItems
  };
};

this.logicPaginate = (
  totalItems,
  currentPage = 1,
  pageSize = 10,
  maxPages = 10
) => {
  // calculate total pages
  let totalPages = Math.ceil(totalItems / pageSize);

  // ensure current page isn't out of range
  if (currentPage < 1) {
    currentPage = 1;
  } else if (currentPage > totalPages) {
    currentPage = totalPages;
  }

  let startPage = 0,
    endPage = 0;
  if (totalPages <= maxPages) {
    // total pages less than max so show all pages
    startPage = 1;
    endPage = totalPages;
  } else {
    // total pages more than max so calculate start and end pages
    let maxPagesBeforeCurrentPage = Math.floor(maxPages / 2);
    let maxPagesAfterCurrentPage = Math.ceil(maxPages / 2) - 1;
    if (currentPage <= maxPagesBeforeCurrentPage) {
      // current page near the start
      startPage = 1;
      endPage = maxPages;
    } else if (currentPage + maxPagesAfterCurrentPage >= totalPages) {
      // current page near the end
      startPage = totalPages - maxPages + 1;
      endPage = totalPages;
    } else {
      // current page somewhere in the middle
      startPage = currentPage - maxPagesBeforeCurrentPage;
      endPage = currentPage + maxPagesAfterCurrentPage;
    }
  }

  // calculate start and end item indexes
  let startIndex = (currentPage - 1) * pageSize;
  let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

  // create an array of pages to ng-repeat in the pager control
  let pages = Array.from(Array(endPage + 1 - startPage).keys()).map(
    i => startPage + i
  );

  // return object with all pager properties required by the view
  return {
    totalItems: totalItems,
    currentPage: currentPage,
    pageSize: pageSize,
    totalPages: totalPages,
    startPage: startPage,
    endPage: endPage,
    startIndex: startIndex,
    endIndex: endIndex,
    pages: pages
  };
}

this.filterItemsBy = (property = {}) => {
  let data = [];
  let filtered = [];
  if (property.rows) {
    if (property.rows.lenght > 0) {
      data = property.rows;
      filtered = data.filter(item => {
        if (item.toString().includes(property.valueToFilter)) return data;
      });
    }
  }
  return filtered;
};

this.sortElementsBy = (property = {}) => {
  let data = null;
  if (property.key && property.order && property.rows) {
    data = property.rows;
    data.sort(compareValues(property.key, property.order));
  }
  return data;
};

this.compareObjects = (object1, object2) => {
  var equal = true;
  var attributes = Object.getOwnPropertyNames(object1);

  attributes.forEach(a => {
    if (
      (object1[a] != null &&
        typeof object1[a] == "object" &&
        !this.compareObjects(object1[a], object2[a])) ||
      (object1[a] == null && object2[a] != null) ||
      (object1[a] != null && object2[a] == null) ||
      (object1[a] != null && object1[a].toString() != object2[a].toString())
    ) {
      equal = false;
    }
  });

  return equal;
};

this.findInObjArray = (array, value) => {
  var found = [];
  // Helper to search obj for value
  const findInObj = (obj, value) => {
    return Object.values(obj).some(
      v =>
        typeof v == 'object' && v != 'null' ? findInObj(v, value) :
          typeof v == 'string' ? v.toLowerCase().indexOf(value.toLowerCase()) >= 0 :
            typeof v == 'number' ? v === value || isNaN(v) && isNaN(value) :
              v === value
    );
  };

  array.forEach(function (obj) {
    if (findInObj(obj, value)) found.push(obj);
  })
  return found;
}

this.findAllByKey = (obj, keyToFind) => {
  return Object.entries(obj)
    .reduce((acc, [key, value]) => (key === keyToFind)
      ? acc.concat(value)
      : (typeof value === 'object' && value)
        ? acc.concat(findAllByKey(value, keyToFind))
        : acc
      , []) || [];
}

this.compareValues = (key, order = "asc") => {
  if (!key || key.length == 0) {
    console.error("Param [key] cannot be undefined or empty.");
    return;
  }
  if (!order || order.length == 0) {
    console.error("Param [order] cannot be undefined or empty.");
    return;
  }
  return function innerSort(a, b) {
    const valA = findByPath(a, key);
    const valB = findByPath(b, key);

    const varA =
      typeof valA === "string"
        ? valA.toLowerCase() : typeof valA == 'number' ? String(valA)
          : valA.toLowerCase();
    
    const varB =
      typeof valB === "string"
        ? valB.toLowerCase() : typeof valB == 'number' ? String(valB)
          : valB.toLowerCase();

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return order === "desc" ? comparison * -1 : comparison;
  };
};

this.groupBy = (list, key) => {
  return list.reduce((a, b) => {
    (a[findByPath(b, key)] = a[findByPath(b, key)] || []).push(b);
    return a;
  }, {});
};

this.capitalize = str => {
  if (!str || str.length == 0) {
    console.error("Param [str] cannot be undefined or empty.");
    return;
  }
  let finalString = "";
  if (typeof str === "string") {
    finalString = str.charAt(0).toUpperCase() + str.slice(1);
  } else {
    finalString = str;
  }
  return finalString;
};

this.findByPath = (object, path) => {
  if (!object) {
    console.error("Param [object] cannot be undefined or empty.");
    return;
  }
  if (!path || path.length == 0) {
    console.error("Param [path] cannot be undefined or empty.");
    return;
  }
  path = path.split(".");
  let obj = object[path.shift()];
  while (obj && path.length) {
    obj = obj[path.shift()];
  }
  return obj;
};
});