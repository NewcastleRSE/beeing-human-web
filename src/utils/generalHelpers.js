// MIT Licensed
// Author: jwilson8767

/**
 * Waits for an element satisfying selector to exist, then resolves promise with the element.
 * Useful for resolving race conditions.
 *
 * @param selector
 * @returns {Promise}
 */
export function elementReady(selector) {
  return new Promise((resolve, reject) => {
    const el = document.querySelector(selector);
    if (el) { resolve(el); }
    new MutationObserver((mutationRecords, observer) => {
      // Query for elements matching the specified selector
      Array.from(document.querySelectorAll(selector)).forEach((element) => {
        resolve(element);
        //Once we have resolved we don't need the observer anymore.
        observer.disconnect();
      });
    })
      .observe(document.documentElement, {
        childList: true,
        subtree: true
      });
  });
}

export function wrapElement(elt, wrapper) {
  if (elt && elt.parentNode) {
    elt.parentNode.insertBefore(wrapper, elt);
    wrapper.appendChild(elt);
  }
}

export function addTailwindClasslist(elt, classString) {
  const classArray = classString.split(' ');
  elt.classList.add(...classArray)
}

export function findPreviousElement(node, targetName) {
  // finds the closest element that precedes the node in the run of the document (i.e., milestone elements)
  if (node && node.parentNode) {
    const siblings = [...node.parentNode.children];
    let closest = undefined;
    for (let child of siblings) {
      if (child.tagName.toLowerCase() === targetName.toLowerCase()) {
        closest = child;
      }
      if (child === node && closest != undefined) {
        return closest;
      } else if (child === node && closest === undefined) {
        return findPreviousElement(node.parentNode, targetName);
      }
    }
  } else {
    return undefined;
  }
}