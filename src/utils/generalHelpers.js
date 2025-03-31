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

export function removeTailwindClasslist(elt, classString) {
  const classArray = classString.split(' ');
  elt.classList.remove(...classArray)
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

/**
 * Finds the first milestone element of the specified type that appears before the given node in the document.
 * This function searches recursively through siblings and their descendants.
 * @param {HTMLElement} node - The starting element node.
 * @param {string} milestoneType - The tag name of the milestone element to find.
 * @returns {HTMLElement|null} - The first milestone element of the specified type, or null if none is found.
 */
export function findPreviousMilestone(node, milestoneType) {
  if (!node || !milestoneType) {
      console.warn('Node or milestone type is not provided');
      return null;
  }

  // Convert milestoneType to lowercase to match tagName comparisons
  milestoneType = milestoneType.toLowerCase();

  // Helper function to search recursively for the milestone in a node's descendants
  function searchInDescendants(element) {
      if (!element) return null;

      for (let child of element.children) {
          if (child.tagName.toLowerCase() === milestoneType) {
              return child;
          }
          const found = searchInDescendants(child);
          if (found) {
              return found;
          }
      }
      return null;
  }

  // Traverse siblings and parents to find the previous milestone
  while (node) {
      // Check previous siblings and their descendants
      let sibling = node.previousElementSibling;
      while (sibling) {
          // Check if the sibling itself is the milestone
          if (sibling.tagName.toLowerCase() === milestoneType) {
              return sibling;
          }

          // Check if the milestone exists in the sibling's descendants
          const foundInDescendants = searchInDescendants(sibling);
          if (foundInDescendants) {
              return foundInDescendants;
          }

          sibling = sibling.previousElementSibling;
      }

      // Move up to the parent node and continue searching
      node = node.parentElement;
  }

  // If no milestone is found, return null
  return null;
}

/**
 * Finds the last milestone element of the specified type that appears before the given node in the document.
 * This function searches recursively through siblings, their descendants, and parent nodes.
 * @param {HTMLElement} node - The starting element node.
 * @param {string} milestoneType - The tag name of the milestone element to find.
 * @returns {HTMLElement|null} - The last milestone element of the specified type before the node, or null if none is found.
 */
export function findLastMilestoneBefore(node, milestoneType) {
  if (!node || !milestoneType) {
      console.warn('Node or milestone type is not provided');
      return null;
  }

  // Convert milestoneType to lowercase to match tagName comparisons
  milestoneType = milestoneType.toLowerCase();

  // Helper function to search recursively for the milestone in a node's descendants
  function searchInDescendants(element) {
      if (!element) return null;

      let lastFound = null;
      for (let child of element.children) {
          if (child.tagName.toLowerCase() === milestoneType) {
              lastFound = child; // Update the last found milestone
          }
          const foundInDescendants = searchInDescendants(child);
          if (foundInDescendants) {
              lastFound = foundInDescendants; // Update if a deeper milestone is found
          }
      }
      return lastFound;
  }

  // Traverse siblings and parents to find the last milestone before the node
  while (node) {
      // Check previous siblings and their descendants
      let sibling = node.previousElementSibling;
      while (sibling) {
          // Check if the sibling itself is the milestone
          if (sibling.tagName.toLowerCase() === milestoneType) {
              return sibling;
          }

          // Check if the milestone exists in the sibling's descendants
          const foundInDescendants = searchInDescendants(sibling);
          if (foundInDescendants) {
              return foundInDescendants;
          }

          sibling = sibling.previousElementSibling;
      }

      // Move up to the parent node and continue searching
      node = node.parentElement;
  }

  // If no milestone is found, return null
  return null;
}

export function findInDescendant(node, targetName, targetList = []) {
  for (let child of node.children) {
    if (child.tagName.toLowerCase() === targetName) {
      targetList.push(child);
    } else if (child.children) {
      targetList = findInDescendant(child, targetName, targetList)
    }
  }
  return targetList
}

export function findAncestor(node, targetNode) {
  // checks if node is a descendent of targetNode and returns ancestor if so; returns null if it reaches <html>;
  if (node.parentNode.tagName.toLowerCase() === 'html') {
    return null;
  } else if (node.parentNode.tagName.toLowerCase() === targetNode.toLowerCase()) {
    return node.parentNode;
  } else {
    return findAncestor(node.parentNode, targetNode);
  }
}


export function findIfAncestor(node, targetNode) {
  // checks if node is a descendent of targetNode; returns false if it reaches <html>;
  if (node.parentNode.tagName.toLowerCase() === 'html') {
    return false;
  } else if (node.parentNode.tagName.toLowerCase() === targetNode.toLowerCase()) {
    return true;
  } else {
    return findIfAncestor(node.parentNode, targetNode);
  }
}

export function wrapChildren(elt, wrapper) {
  // wraps all children of elt in wrapper
  while (elt.firstChild) {
    wrapper.appendChild(elt.firstChild);
  }
  elt.appendChild(wrapper);
  elt.setAttribute('data-wrapped', 'true');
}

export function findFirstDescendantByTagName(parentElement, tagName) {
  if (!parentElement || !tagName) {
      console.warn('Parent element or tag name is not provided');
      return null;
  }

  // Convert tagName to uppercase to match the tagName property of elements
  tagName = tagName.toUpperCase();

  // Helper function to recursively search for the element
  function search(element) {
      for (let child of element.children) {
          if (child.tagName === tagName) {
              return child;
          }
          const found = search(child);
          if (found) {
              return found;
          }
      }
      return null;
  }

  return search(parentElement);
}

// General purpose version of the equivalent function in teiBehavioursHelper.js
// Only provides current status, does not observe until it is in view
export function isElementVisibleUntracked(elt, callback) {
  if (!elt) {
      console.warn('Element is not provided');
      return;
  }
  const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              // Element is visible in the viewport
              callback(true);
              observer.unobserve(entry.target);
          } else {
              // Element is not visible in the viewport
              callback(false);
              observer.unobserve(entry.target);
          }
      });
  }, {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.001 // Trigger callback when 0.1% of the element is visible
  });

  observer.observe(elt);
}
