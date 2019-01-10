var cache = {};
function loadPage(url) {
  if (cache[url]) {
    return new Promise(function(resolve) {
      resolve(cache[url]);
    });
  }

  return fetch(url, {
    method: 'GET'
  }).then(function(response) {
    cache[url] = response.text();
    return cache[url];
  });
}

var main = document.querySelector('main');

function changePage() {
  var url = window.location.href;

  loadPage(url).then(function(responseText) {
    var wrapper = document.createElement('div');
        wrapper.innerHTML = responseText;

    var oldContent = document.querySelector('.cc');
    var newContent = wrapper.querySelector('.cc');

    main.appendChild(newContent);
    animate(oldContent, newContent);
  });
}
var transitionTime = 1000;

function animate(oldContent, newContent) {
  oldContent.style.position = 'absolute';
  var fadeOut = oldContent.animate({
    opacity: [1, 0],
  }, transitionTime);

  var fadeIn = newContent.animate({
    opacity: [0, 1], 
  }, transitionTime);

  fadeIn.onfinish = function() {
    oldContent.parentNode.removeChild(oldContent);
  };
}
function listener(e) {
  document.removeEventListener('click', listener);
  setTimeout(function(){
    document.addEventListener('click', listener);
  }, transitionTime);
  var el = e.target;

  while (el && !el.href) {
    el = el.parentNode;
  }

  if (el) {
    e.preventDefault();
    history.pushState(null, null, el.href);
    changePage();
    return;
  }
}
window.addEventListener('popstate', changePage);
document.addEventListener('click', listener);