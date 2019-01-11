const loadPage = link => {
  if(link.target != link.currentTarget){
    link.preventDefault();
    const data = link.target.getAttribute('data-href');
    const url = link.target.href;
    console.log(url);
    animateOut();
    setTimeout(function(){
      requestContent(url);
      history.pushState(data, null, url);
      animateIn();
    }, 3000);
  }
  //link.stopPropogation();
};
const requestContent = file => {
  $('.cc').load(file + ' .cc');
}
const animateOut = () => {
  console.log("animating out");
  $("main").animate({height: "50px"}, {duration:1000, queue: false});
  $("main").animate({margin: "auto"}, {duration: 1000, queue: false});
  $("main").animate({width: "50px"}, {duration: 1000, queue: false});
  // $("main").css({
  //   "width": "50px",
  //   "height": "50px",
  //   "margin": "auto"
  // });
};
const animateIn = () => {
  console.log("animating in");
  $("main").css({
    "margin": "2em auto",
    "width": "94%",
    "height": "inherit"
  });
};

$("nav").on("click", function(clickElement){
  loadPage(clickElement);
});


// $("window").on("popstate", function(link){
//   var character = link.state;

//   if (character == null) {
//     removeCurrentClass();
//     $("main").innerHTML = " ";
//     $(".cc").innerHTML = " ";
//     document.title = defaultTitle;
//   } else {
//       updateText(character);
//       requestContent(character + ".html");
//       addCurrentClass(character);
//       document.title = "Ghostbuster | " + character;
//   }
// });














// const navLink = $(".nav-link");
// const main = $("main");
// const ttlAniLnth = 1000; //Total animation length
// const cache = {};
// const loadPage = url => {
//     if(cache[url]){
//         return new Promise(resolve => resolve(cache[url]));
//     } else{
//         return fetch(url, {
//         method: 'GET'
//         }).then(response => {cache[url] = response.text; return cache[url]});
//     }
// };
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

// const animateContent = (bfor, aftr) => {
//     bfor.style.position = 'absolute';
//     const fadeOut = bfor.animate({
//         opacity: [1, 0],
//     }, ttlAniLnth);
//     const fadeIn = aftr.animate({
//         opacity: [0, 1], 
//     }, ttlAniLnth);
//     fadeIn.onfinish = function() {
//         bfor.parent().remove(bfor);
//     };
// };
//function animate(oldContent, newContent) {
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
// const switchPage = () => {
//     const url = location.href;
//     loadPage(url).then(responseText => {
//         const loadedDiv = $("<div>");
//         loadedDiv.html(responseText);
//     });
//     const oldStuff = $(".cc");
//     const newStuff = loadedDiv.querySelector(".cc");
//     main.append(newStuff);
//     //animateContent(oldStuff, newStuff);
// };

// const listen = x => {
//     let target = x.target;
//     while (target && !target.href) {
//         target = target.parentNode;
//     } 
//     if (target) {
//         console.log(history);
//         console.log(target);
//         console.log("href", target.href);
//         x.preventDefault();
//         history.pushState(null, null, target.href);
//         console.log(history);
//         //switchPage();
//         return true;
//     }
// };
// 
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
// window.addEventListener('popstate', switchPage);
// document.addEventListener('click', listen);





// var main = document.querySelector('main');


// var transitionTime = 1000;


// window.addEventListener('popstate', changePage);
// document.addEventListener('click', listener);