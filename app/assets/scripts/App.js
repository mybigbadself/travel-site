import "../styles/styles.css";
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
//import Modal from './modules/Modal';


let stickyHeader = new StickyHeader();

//new Modal();

new RevealOnScroll(document.querySelectorAll('.feature-item'), 75 );
new RevealOnScroll(document.querySelectorAll('.testimonial'),  60 );
//revealOnScroll.hideInitially();

let mobileMenu = new MobileMenu();

let modal;
//mobileMenu.events();

document.querySelectorAll('.open-modal').forEach(el => {
    el.addEventListener('click', e => {
        e.preventDefault();
        if(typeof modal == 'undefined'){
            import(/* webpackChunkName: "modal"*/ './modules/Modal').then(x => {
                modal = new x.default();
                setTimeout(() => modal.openTheModal(), 20);
            }).catch(() => console.log(`Modal JS didn't Load !!!`));
        }else{
            modal.openTheModal();
        }
    })
})

if(module.hot){
    module.hot.accept()
}


