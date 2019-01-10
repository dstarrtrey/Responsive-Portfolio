const navLink = $(".nav-link");
const main = $("main");
const ttlAniLnth = 1000; //Total animation length
const cache = {};
const loadPage = url => {
    if(cache[url]){
        return new Promise(resolve => resolve(cache[url]));
    } else{
        return fetch(url, {
        method: 'GET'
        }).then(response => {cache[url] = response.text; return cache[url]});
    }
};
const animateContent = (bfor, aftr) => {
    bfor.style.position = 'absolute';
    const fadeOut = bfor.animate({
        opacity: [1, 0],
    }, ttlAniLnth);
    const fadeIn = aftr.animate({
        opacity: [0, 1], 
    }, ttlAniLnth);
    fadeIn.onfinish = function() {
        bfor.parent().remove(bfor);
    };
};
// const animateHeader = (bfor, aftr) => {
//     //bfor.style.position = 'absolute';
//     const fadeOut = bfor.animate({
//         position: "absolute",
//         max-width: "100%"
//     }, ttlAniLnth);
//     const fadeIn = setTimeout(function(){
//         aftr.animate({
//             position: "relative",
//             max-width: "150px" 
//         }, ttlAniLnth);
//     }, ttlAniLnth);
//     fadeIn.onfinish = function() {
//         bfor.parent().remove(bfor);
//     };
// };
const switchPage = () => {
    const url = location.href;
    loadPage(url).then(responseText => {
        const loadedDiv = $("<div>");
        loadedDiv.html(responseText);
    });
    const oldStuff = $(".cc");
    const newStuff = loadedDiv.querySelector(".cc");
    main.append(newStuff);
    animateContent(oldStuff, newStuff);
};
const listen = x => {
    let target = x.target;
    while (target && !target.href) {
        target = target.parentNode;
    } 
    if (target) {
        x.preventDefault();
        history.pushState(null, null, target.href);
        changePage();
        return true;
    }
};
window.addEventListener('popstate', switchPage);
document.addEventListener('click', listen);



// var cache = {};
// function loadPage(url) {
//   if (cache[url]) {
//     return new Promise(function(resolve) {
//       resolve(cache[url]);
//     });
//   }

//   return fetch(url, {
//     method: 'GET'
//   }).then(function(response) {
//     cache[url] = response.text();
//     return cache[url];
//   });
// }

// var main = document.querySelector('main');

// function changePage() {
//   var url = window.location.href;

//   loadPage(url).then(function(responseText) {
//     var wrapper = document.createElement('div');
//         wrapper.innerHTML = responseText;

//     var oldContent = document.querySelector('.cc');
//     var newContent = wrapper.querySelector('.cc');

//     main.appendChild(newContent);
//     animate(oldContent, newContent);
//   });
// }
// var transitionTime = 1000;

// function animate(oldContent, newContent) {
//   var fadeOut = oldContent.animate({
//     opacity: [1, 0], 
//   }, transitionTime);

//   var fadeIn = newContent.delay(transitionTime).animate({
//     opacity: [0, 1], 
//   }, transitionTime);

//   fadeIn.onfinish = function() {
//     oldContent.parentNode.removeChild(oldContent);
//   };
// }
// function listener(e) {
//   document.removeEventListener('click', listener);
//   setTimeout(function(){
//     document.addEventListener('click', listener);
//   }, transitionTime);
//   var el = e.target;

//   while (el && !el.href) {
//     el = el.parentNode;
//   }

//   if (el) {
//     e.preventDefault();
//     history.pushState(null, null, el.href);
//     changePage();
//     return;
//   }
// }
// window.addEventListener('popstate', changePage);
// document.addEventListener('click', listener);