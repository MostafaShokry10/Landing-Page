/*
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/
//~~~~~~~~creat sections dynamically --class
class Section{
 sectionIndex = 0;
  get SectionContent(){
    const sectionHtmlContent =  `<section id="section ${this.sectionIndex}" data-nav="Section ${this.sectionIndex}">
    <div class="landing__container">
      <h2>Section ${this.sectionIndex}</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi fermentum metus faucibus lectus pharetra
        dapibus. Suspendisse potenti. Aenean aliquam elementum mi, ac euismod augue. Donec eget lacinia ex. Phasellus
        imperdiet porta orci eget mollis. Sed convallis sollicitudin mauris ac tincidunt. Donec bibendum, nulla eget
        bibendum consectetur, sem nisi aliquam leo, ut pulvinar quam nunc eu augue. Pellentesque maximus imperdiet
        elit a pharetra. Duis lectus mi, aliquam in mi quis, aliquam porttitor lacus. Morbi a tincidunt felis. Sed leo
        nunc, pharetra et elementum non, faucibus vitae elit. Integer nec libero venenatis libero ultricies molestie
        semper in tellus. Sed congue et odio sed euismod.</p>

      <p>Aliquam a convallis justo. Vivamus venenatis, erat eget pulvinar gravida, ipsum lacus aliquet velit, vel
        luctus diam ipsum a diam. Cras eu tincidunt arcu, vitae rhoncus purus. Vestibulum fermentum consectetur
        porttitor. Suspendisse imperdiet porttitor tortor, eget elementum tortor mollis non.</p>
    </div>
  </section> `
    return sectionHtmlContent;
  }
  addNewSection(){
    this.sectionIndex += 1;
    document.getElementsByTagName("main")[0].insertAdjacentHTML('beforeend', this.SectionContent);
  }
}
//~~~~~~Section CLass end

/** Navbar Class */

class Navbar {
    /** Menu Elemnt Selected By Id */
  barElement = document.getElementById('navbar__list');
  /** Build Menu  */
  buildMenu() {
    //Clear Menu From "li" Elements
    this.barElement.innerHTML = '';
const allSec = document.querySelectorAll('section');
allSec.forEach(element=>{
  const itemList = document.createElement('li');
  //add item list text
  itemList.innerHTML = `<a class="menu__link" href="#${element.id}" data-section-id="${element.id}"  >${element.dataset.nav}</a>`;
  //add item to list menu
  this.barElement.appendChild(itemList);
})
this.goToSection();
   }

/** Go To Section */
goToSection() {
  this.barElement.addEventListener('click', (eve)=> {
    eve.preventDefault();
    if (eve.target.dataset.sectionId) {
      document.getElementById(eve.target.dataset.sectionId).scrollIntoView({ behavior: "smooth" });
   
    addActiveClass(eve.target.dataset.sectionId)
  }
  });
 
}

}//End Navbar Class




// save the icon used to go to the top and the header in variables
const topBtn = document.getElementById('scroll-up');
const header = document.querySelector(".page__header");
//new Instant
const section = new Section;
const menuBar = new Navbar();




function addActiveClass(id) {
  //Add Section Active
  allSec = document.querySelectorAll('section');
  actLinks = document.querySelectorAll('.link__active');
  
  //remove active class
  allSec.forEach(function (sec) {
    if (sec.classList.contains('your-active-class'))
      sec.classList.remove('your-active-class');
  })
  //remove active link
  actLinks.forEach(function (actLink){ 
    if (actLink.classList.contains('link__active'))
      actLink.classList.remove('link__active'); 
    });
    //add active class & active link
  document.getElementById(id).classList.add('your-active-class');
  document.querySelector(`[href="#${id}"]`).classList.add('link__active');
}

//viewport function
function inViewPort(sec){
  let pos = sec.getBoundingClientRect();
  //check if 55% of the section is still in viewport 
  return ((pos.bottom <= (pos.height + (pos.height*0.45))) && (pos.top >= -(pos.height * 0.45)));
}
//set active section in viewport function
function scrollActiveClass (){
  allSect = document.querySelectorAll('section');
  allSect.forEach(function(sec){
    if (inViewPort(sec)){
      addActiveClass(sec.id);
    }
  });
}
//create new section
function addNewSection(){
  section.addNewSection();
  menuBar.buildMenu();
}
/** Go To Top */
function goToTop() {
 
  // Clicking on the icon the document will scroll to the top smoothly
  topBtn.addEventListener("click", () => {
    document.documentElement.scrollTo({ top: 0, behavior: "smooth" });
  });
}
/**
 * disappear the header after 4 seconds and appear again when scrolling.
 * appearing the icon(to-top) after 600px to down
 */
function isScrolling(){
 
  topBtn.style.display = "none";
let scrolling;
document.onscroll = () => {
  header.style.display = "block"
  clearTimeout(scrolling)
scrolling = setTimeout(() => {
    header.style.display = "none";
  }, 4000);

  window.scrollY > 600
    ? (topBtn.style.display = "block")
    : (topBtn.style.display = "none");
};
}

//call functions
addNewSection();
addNewSection();
addNewSection();
addNewSection();
document.addEventListener('scroll', scrollActiveClass);
menuBar.buildMenu();
goToTop();
isScrolling();
