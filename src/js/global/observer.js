(() => {
  function debounce(func, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  // Keep track of the last logged set of keys to avoid redundant logs
  let loggedKeysJson = '';

  const homeScrollHandler = debounce(() => {
    const postContainers = Array.from(document.querySelectorAll('article'));

    // Map all containers to their keys and filter out incomplete ones
    const currentKeys = postContainers.map((container) => ({
      pk: getValueByKey(container, 'pk'),
      code: getValueByKey(container, 'code'),
    }));

    const currentKeysJson = JSON.stringify(currentKeys);

    // Log only if the list of keys has changed
    if (currentKeysJson !== loggedKeysJson) {
      console.log('Current post keys:', currentKeys);
      loggedKeysJson = currentKeysJson;
    }
  }, Math.floor(1000 / 60));
  const observer = new MutationObserver(homeScrollHandler);
  function startObserve() {
    observer.disconnect();
    const mainNode = document.querySelector('main');
    if (mainNode)
      observer.observe(mainNode, {
        attributes: true,
        childList: true,
        subtree: true,
      });
    window.addEventListener('scroll', homeScrollHandler);
  }
  function stopObserve() {
    observer.disconnect();
    window.removeEventListener('scroll', homeScrollHandler);
  }
  window.addEventListener('pathChange', (e) => {
    if (e.detail.currentPath === '/') startObserve();
    else stopObserve();
  });
  if (window.location.pathname === '/') startObserve();
})();
