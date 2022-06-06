const left = document.querySelector('#left');
const right = document.querySelector('#right');

const totalCountDiv = document.querySelector('.totalCount');
const totalPriceDiv = document.querySelector('.totalPrice');

let totalCount = 0;
let totalPrice = 0;

//! Query Selector functions
const getImagesInLeft = () => document.querySelectorAll('#left .image');
const getImagesInRight = () => document.querySelectorAll('#right .image');
const getImgByIndexFromLeft = (index) =>
  [...document.querySelectorAll('#left .image')].find(
    (div) => div.children[2].dataset.index == index
  );
const getImgByIndexFromRight = (index) =>
  [...document.querySelectorAll('#right .image')].find(
    (div) => div.children[2].dataset.index == index
  );

// todo From Right to Left
// #region From Right to Left
left.addEventListener('mouseover', () => {
  getImagesInRight().forEach((img) => {
    //! Start Drag
    img.addEventListener('dragstart', function (e) {
      const index = e.target.dataset.index;
      e.dataTransfer.setData('imgIndex', index);
      e.dataTransfer.setData('from', 'right');
    });

    //! End Drag
    img.addEventListener('dragend', function (e) {
      e.preventDefault();
      left.classList.remove('dragenter');
    });
  });
});

// ! Left
left.addEventListener('dragenter', function (e) {
  e.preventDefault();
  this.classList.add('dragenter');
});

left.addEventListener('dragover', function (e) {
  e.preventDefault();
});

left.addEventListener('dragleave', function (e) {
  e.preventDefault();
  this.classList.remove('dragenter');
});

left.addEventListener('drop', function (e) {
  e.preventDefault();
  const index = +e.dataTransfer.getData('imgIndex');
  const isFromRight = e.dataTransfer.getData('from') == 'right' ? true : false;
  const imageDiv = getImgByIndexFromRight(index);
  if (!imageDiv || !isFromRight) return;
  const price = imageDiv.children[2].dataset.price;
  let copyImageDiv;

  if (+imageDiv.children[2].dataset.count > 1) {
    imageDiv.children[2].dataset.count =
      +imageDiv.children[2].dataset.count - 1;
    imageDiv.children[0].innerText = imageDiv.children[2].dataset.count;
    // if left have the same image increament count this image.
    const sameImgInLeft = getImgByIndexFromLeft(index);
    if (sameImgInLeft) {
      sameImgInLeft.children[2].dataset.count =
        +sameImgInLeft.children[2].dataset.count + 1;
      sameImgInLeft.children[0].innerText =
        sameImgInLeft.children[2].dataset.count;
    } else {
      copyImageDiv = imageDiv.cloneNode(true);
      copyImageDiv.children[2].dataset.count = 1;
      copyImageDiv.children[0].innerText = 1;
      left.appendChild(copyImageDiv);
    }
  } else {
    // if left have the same image increament count this image.
    const sameImgInLeft = getImgByIndexFromLeft(index);
    if (sameImgInLeft) {
      sameImgInLeft.children[2].dataset.count =
        +sameImgInLeft.children[2].dataset.count + 1;
      sameImgInLeft.children[0].innerText =
        sameImgInLeft.children[2].dataset.count;
      imageDiv.remove();
    } else {
      left.appendChild(imageDiv);
    }
  }
  totalCount++;
  totalPrice += +price;
  totalCountDiv.innerText = totalCount;
  totalPriceDiv.innerText = totalPrice;
});

// #endregion

// todo From Left to Right
// #region From Left to Right
left.addEventListener('mousedown', () => {
  getImagesInLeft().forEach((img) => {
    // ! Start Drag
    img.addEventListener('dragstart', function (e) {
      const index = e.target.dataset.index;
      e.dataTransfer.setData('imgIndex', index);
      e.dataTransfer.setData('from', 'left');
    });

    //! End Drag
    img.addEventListener('dragend', function (e) {
      e.preventDefault();
      right.classList.remove('dragenter');
    });
  });
});
// ! Right
right.addEventListener('dragenter', function (e) {
  e.preventDefault();
  this.classList.add('dragenter');
});

right.addEventListener('dragover', function (e) {
  e.preventDefault();
});

right.addEventListener('dragleave', function (e) {
  e.preventDefault();
  this.classList.remove('dragenter');
});

right.addEventListener('drop', function (e) {
  e.preventDefault();
  const index = +e.dataTransfer.getData('imgIndex');
  const imageDiv = getImgByIndexFromLeft(index);
  const isFromLeft = e.dataTransfer.getData('from') == 'left' ? true : false;
  if (!imageDiv || !isFromLeft) return;
  const price = imageDiv.children[2].dataset.price;
  let copyImageDiv;

  if (+imageDiv.children[2].dataset.count > 1) {
    imageDiv.children[2].dataset.count =
      +imageDiv.children[2].dataset.count - 1;
    imageDiv.children[0].innerText = imageDiv.children[2].dataset.count;
    // if left have the same image increament count this image.
    const sameImgInRight = getImgByIndexFromRight(index);
    if (sameImgInRight) {
      sameImgInRight.children[2].dataset.count =
        +sameImgInRight.children[2].dataset.count + 1;
      sameImgInRight.children[0].innerText =
        sameImgInRight.children[2].dataset.count;
    } else {
      copyImageDiv = imageDiv.cloneNode(true);
      copyImageDiv.children[2].dataset.count = 1;
      copyImageDiv.children[0].innerText = 1;
      right.appendChild(copyImageDiv);
    }
  } else {
    // if Right have the same image increament count this image.
    const sameImgInRight = getImgByIndexFromRight(index);
    if (sameImgInRight) {
      sameImgInRight.children[2].dataset.count =
        +sameImgInRight.children[2].dataset.count + 1;
      sameImgInRight.children[0].innerText =
        sameImgInRight.children[2].dataset.count;
      imageDiv.remove();
    } else {
      right.appendChild(imageDiv);
    }
  }
  totalCount--;
  totalPrice -= +price;
  totalCountDiv.innerText = totalCount;
  totalPriceDiv.innerText = totalPrice;
});

// #endregion
