import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';

class RevealOnScroll {
    constructor(els, thresholdPercent){
        this.itemsToReveal = els;
        this.browserHeight = window.innerHeight;
        this.thresholdPercent = thresholdPercent;
        this.hideInitially();
        this.scrollThrottle = throttle(this.calcCaller, 300).bind(this);
        this.events();
        
    }

    hideInitially() {
        this.itemsToReveal.forEach( el => {
            el.classList.add('reveal-item');
            el.isRevealed = false;
        
        });
    }

    events(){
        window.addEventListener('scroll', this.scrollThrottle);
        window.addEventListener( 'resize', debounce(() => {
            console.log('Resize Just Ran!');
            this.browserHeight = window.innerHeight;
        }, 333) )
    }

    calculateIfScrolledTo(el){

        if(window.scrollY + this.browserHeight > el.offsetTop){
            console.log(el.getBoundingClientRect().y)
            let scrollPercent = (el.getBoundingClientRect().y  / this.browserHeight) * 100;
            
            if(scrollPercent < this.thresholdPercent){
                //console.log(scrollPercent);
                el.classList.add('reveal-item--is-visible');
                el.isRevealed = true;
                if(el.isLastItem){
                    window.removeEventListener('scroll', this.scrollThrottle);
                }
            }           
        }
    }

    calcCaller(){
        console.log('Scrolling!');
        this.itemsToReveal.forEach( el => {
            if(el.isRevealed == false){
                this.calculateIfScrolledTo(el);
            }
        })
        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
    }
}

export default RevealOnScroll;