"use strict";

let header = document.querySelector('.header');
function offset(el){
    const rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {top: rect.top + scrollTop, left: rect.left + scrollLeft}
};
window.addEventListener('scroll', ()=>{
    if(window.pageYOffset>(header.offsetHeight)/2){
        header.classList.add('_fixed');
    }
    else header.classList.remove('_fixed');
});

//-------------------filter-----------------

let links =  document.querySelectorAll('.portfolio_filter li');
let filter = document.querySelectorAll('.filter');
let galery = document.querySelector('.portfolio_galery');
for(let i=0; i<links.length; i++){
    links[i].addEventListener('click', (event)=> {
        for(let j=0; j<links.length; j++){
            links[j].classList.remove('on_click_link');

        };
        links[i].classList.add('on_click_link');
        let filterClass = event.target.dataset['filter'];
        let num = 10;
        let count=0;
        let widthGalery = galery.offsetWidth;
        filter.forEach((elem) => {
            elem.classList.remove('hide');
            galery.classList.remove('flex-box');                
            
            if (!elem.classList.contains(filterClass) && filterClass !== 'all') {
                elem.classList.add('hide');
                count+=1;
                if(count==3&&widthGalery>1004) {
                    galery.classList.add('flex-box');
                }                
            }
            
        });
    });
}
//-------------------Burger-----------------

let header_burger = document.querySelector('.header_burger');
let header_menu = document.querySelector('.header_menu');

header_burger.addEventListener('click', ()=>{
    header_burger.classList.toggle('active');
    header_menu.classList.toggle('active');

});


//----Adding a hover class when hovering over next and prev

let next =  document.getElementById('next');
let prev =  document.getElementById('prev');
let next_slide =  document.querySelector('.next_slide');
let prev_slide =  document.querySelector('.prev_slide');

next.addEventListener('mouseout', ()=>{
    next_slide.classList.remove('_hover');
});
next.addEventListener('mouseover', ()=>{
    next_slide.classList.add('_hover');
});
prev.addEventListener('mouseout', ()=>{
    prev_slide.classList.remove('_hover');
});
prev.addEventListener('mouseover', ()=>{
    prev_slide.classList.add('_hover');
});

//----------------Timer bar-------------------


let slider = document.querySelector('.slider');
let afterTime = document.querySelector('.after-time');

let x=-100;
function moveRight(){
    x+=0.1;
    afterTime.style.left = x+'%';	    
    if(x>0)	{
        x=-100;
        changePictures();
    };
};

let intR;
slider.addEventListener('mouseout', (e)=>{
    intR = setInterval(moveRight, 10);
    next.style.opacity = "0";
    prev.style.opacity = "0";
    for(let j=0; j<circles.length; j++){
        circles[j].style.opacity = "0";
    }

});
slider.addEventListener('mouseover', ()=>{
    clearInterval(intR);
    next.style.opacity = "1";
    prev.style.opacity = "1";
    for(let j=0; j<circles.length; j++){
        circles[j].style.opacity = "1";
    }
});
intR = setInterval(moveRight, 10);

//----------------------Slider filter-----------------

let magnifiers = document.querySelectorAll('.magnifier');
let viewing_container = document.querySelector('.viewing_container');
let pics = ['images/images-img1-1.jpg', 'images/images-img1-4.jpg', 'images/images-img1-2.jpg', 'images/images-img1-5.jpg', 'images/images-img1-3.jpg', 'images/images-img1-6.jpg'];
let imgBig = document.querySelector('.viewing_foto>img');
let nextPic = document.querySelector('.viewing_next');
let prevPic = document.querySelector('.viewing_prew');
let countImg = 0;

for (let y = 0; y < magnifiers.length; y++){
    magnifiers[y].addEventListener('click', (e)=>{
        // const widthScroll = window.innerWidth - document.body.clientWidth + 'px'; 
        e.preventDefault();
        countImg=y;
        viewing_container.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.paddingRight = '19px';
        imgBig.src = pics[countImg];
    });
};

viewing_container.addEventListener('click', ()=>{
    document.body.style.overflow = "visible";
    viewing_container.style.display = "none";
    document.body.style.paddingRight = '0px';
});

nextPic.addEventListener('click', (e)=>{
    e.stopPropagation();
    countImg++;
    if (countImg>=pics.length) countImg=0;
    imgBig.src = pics[countImg];
    imgBig.alt = 'The image №'+ countImg;
});

prevPic.addEventListener('click', (e)=>{
    e.stopPropagation();
    countImg--;
    if (countImg < 0) countImg = pics.length-1;
    imgBig.src = pics[countImg];
    imgBig.alt = 'The image №'+ countImg;
});


//----------------------- Slider------------------- 

let insideSlides = document.querySelectorAll('.inside_slide');
let previewImg = document.querySelectorAll('.prev_slide img');
let nextImg = document.querySelectorAll('.next_slide img');
let circles =  document.querySelectorAll('.circle');
let k = 0;

function changePictures(){
    k+=1;
    x=-100;
    afterTime.style.left = x+'%';
    nullingСlasses();

    if (k>=insideSlides.length) {
        k = 0;
        insideSlides[0].classList.remove('slide_hidden');        
        circles[0].classList.add('hover_circle');

        launchOfTheSlider();
        launchPreview();
    }
    else {
        nullingСlasses();
        insideSlides[k].classList.remove('slide_hidden');        
        addingСlass(k);
        preview(k);
    }
}

next.addEventListener('click', changePictures);
prev.addEventListener('click', changePicturesBack);

function changePicturesBack(){
    x=-100;	
    afterTime.style.left = x+'%';
    if(k==0){
        k = insideSlides.length-1;        
        nullingСlasses();
        insideSlides[k].classList.remove('slide_hidden');
        addingСlass(k);
        nextImg[0].classList.remove('img_hide');
        previewImg[k-1].classList.remove('img_hide');
    }
    else {
        k-=1;
        nullingСlasses();
        insideSlides[k].classList.remove('slide_hidden');
        addingСlass(k);
        preview(k);
    };       
};

function nullingСlasses(){
    nextImg.forEach(nextI => {
        nextI.classList.add('img_hide');
    });
    previewImg.forEach(previewI => {
        previewI.classList.add('img_hide');
    });
    circles.forEach(circle => {
        circle.classList.remove('hover_circle');
    });
    for (let n = 0; n < insideSlides.length; n++){
        insideSlides[n].classList.add('slide_hidden');
        
        let lis = insideSlides[n].getElementsByTagName('li');
        let ps = insideSlides[n].getElementsByTagName('p');
        for(let p = 0; p < ps.length; p++){
            if(ps[p].classList.contains('_anim-items')){
                ps[p].classList.remove('_active');
            }
        }
        for(let l = 0; l < lis.length; l++){
            if(lis[l].classList.contains('_anim-items')){
                lis[l].classList.remove('_active');
            }
        }            
    }    
}


function addingСlass(k){
    let lis = insideSlides[k].getElementsByTagName('li');
    let ps = insideSlides[k].getElementsByTagName('p');
        for(let p = 0; p < ps.length; p++){
            if(ps[p].classList.contains('_anim-items')){
                ps[p].classList.add('_active');
            };
        };
        for(let l = 0; l < lis.length; l++){
            if(lis[l].classList.contains('_anim-items')){
                lis[l].classList.add('_active');
            };
        };
    circles[k].classList.add('hover_circle');
};

for (let t = 0; t<circles.length; t++){
    circles[t].addEventListener('click', ()=>{
        x=-100;	
        afterTime.style.left = x+'%';
        nullingСlasses();
        circles[t].classList.add('hover_circle');
        insideSlides[t].classList.remove('slide_hidden');
        preview(t);
        addingСlass(t);
        k=t;
        
    });
};

//------------------------------------

window.onload = function() {
    launchOfTheSlider();
    launchPreview();
};

function launchOfTheSlider(){
    let lis0 = insideSlides[0].getElementsByTagName('li');        
    let ps0 = insideSlides[0].getElementsByTagName('p');
        for(let j = 0; j < ps0.length; j++){            
            ps0[j].classList.add('_active');           
        };
        for(let m = 0; m < lis0.length; m++){            
                lis0[m].classList.add('_active');             
        };
};

function launchPreview(){
    for(let j = 0; j < previewImg.length; j++){            
        previewImg[j].classList.add('img_hide');           
    };
    previewImg[previewImg.length-1].classList.remove('img_hide');
    for(let i = 0; i < nextImg.length; i++){            
        nextImg[i].classList.add('img_hide');           
    }; 
    nextImg[1].classList.remove('img_hide');
};
function preview(t){
    if (t>=insideSlides.length-1) {
        nextImg[0].classList.remove('img_hide');
        previewImg[t-1].classList.remove('img_hide');
    }
    else if (t==0) {
        previewImg[2].classList.remove('img_hide');
        nextImg[1].classList.remove('img_hide');
    }        
    else {
        nextImg[t+1].classList.remove('img_hide');
        previewImg[t-1].classList.remove('img_hide');
    };
};


