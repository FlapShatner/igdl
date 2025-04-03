function insertDivIntoArticleSections() {
  const articles = document.querySelectorAll('article');

  if (!articles || articles.length === 0) {
    console.error('No <article> elements found on the page.');
    return;
  }

  articles.forEach((article, articleIndex) => {
    const firstSection = article.querySelector('section');

    if (!firstSection) {
      console.warn(
        `No <section> element found within article ${articleIndex + 1}.`
      );
      return;
    }

    const targetDiv = firstSection.querySelector(':scope > div');

    if (!targetDiv) {
      console.warn(
        `No direct <div> child found within the first <section> of article ${
          articleIndex + 1
        }.`
      );
      return;
    }

    const newDiv = document.createElement('div');

    const svgString =
      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 15.575q-.2 0-.375-.062T11.3 15.3l-3.6-3.6q-.3-.3-.288-.7t.288-.7q.3-.3.713-.312t.712.287L11 12.15V5q0-.425.288-.712T12 4t.713.288T13 5v7.15l1.875-1.875q.3-.3.713-.288t.712.313q.275.3.288.7t-.288.7l-3.6 3.6q-.15.15-.325.213t-.375.062M6 20q-.825 0-1.412-.587T4 18v-2q0-.425.288-.712T5 15t.713.288T6 16v2h12v-2q0-.425.288-.712T19 15t.713.288T20 16v2q0 .825-.587 1.413T18 20z"/></svg>';

    newDiv.innerHTML = svgString;
    newDiv.style.padding = '4px';
    newDiv.style.lineHeight = '0';
    targetDiv.appendChild(newDiv);
  });

  console.log(
    'SVG icons successfully inserted into the first direct div child of the first section of each article.'
  );
}

insertDivIntoArticleSections();
