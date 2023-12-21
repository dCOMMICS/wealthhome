let techBrands = [
    "Netflix",
    "Facebook",
    "Instagram",
    "Youtube",
    "Amazon"

]

let object = 
{...techBrands}

console.log(object);

// algorithm in JS
// k - nearest neighbour 

const kNearestNeighbors = (data, labels, point, k = 3) => {
    const kNearest = data
      .map((el, i) => ({
        dist: Math.hypot(...Object.keys(el).map(key => point[key] - el[key])),
        label: labels[i]
      }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, k);
  
    return kNearest.reduce(
      (acc, { label }, i) => {
        acc.classCounts[label] =
          Object.keys(acc.classCounts).indexOf(label) !== -1
            ? acc.classCounts[label] + 1
            : 1;
        if (acc.classCounts[label] > acc.topClassCount) {
          acc.topClassCount = acc.classCounts[label];
          acc.topClass = label;
        }
        return acc;
      },


      {
        classCounts: {},
        topClass: kNearest[0].label,
        topClassCount: 0
      }
    ).topClass;
  };
  
  const data = [[0, 0], [0, 1], [1, 3], [2, 0]];
  const labels = [0, 1, 1, 0];
  
  kNearestNeighbors(data, labels, [1, 2], 2); // 1
  kNearestNeighbors(data, labels, [1, 0], 2); // 0


  //  

  const slideGallery = document.querySelector('.slides');
const slides = slideGallery.querySelectorAll('div');
const scrollbarThumb = document.querySelector('.thumb');
const slideCount = slides.length;
const slideHeight = 720;
const marginTop = 16;

const scrollThumb = () => {
  const index = Math.floor(slideGallery.scrollTop / slideHeight);
  scrollbarThumb.style.height = `${((index + 1) / slideCount) * slideHeight}px`;
};

const scrollToElement = el => {
  const index = parseInt(el.dataset.id, 10);
  slideGallery.scrollTo(0, index * slideHeight + marginTop);
};

document.querySelector('.thumbnails').innerHTML += [...slides]
  .map(
    (slide, i) => `<img src="${slide.querySelector('img').src}" data-id="${i}">`
  )
  .join('');

document.querySelectorAll('.thumbnails img').forEach(el => {
  el.addEventListener('click', () => scrollToElement(el));
});

slideGallery.addEventListener('scroll', e => scrollThumb());

scrollThumb();