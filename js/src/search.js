
class search {


    constructor(form) {

        this.apiUrl = 'https://shop.easyspace.com/s2/api/fast.cfm';
        this.apiKey = 'HJDUE83832JHDUDH78HDU2882hd8d92jsdhUI880';
        this.searchForm = form;
        this.init();

    }

    domainSearch(searchTerm) {

        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src =  this.apiUrl+'?search=' + searchTerm + '&mock=multiple&key=' + this.apiKey + '&callback=callback';

        let jsonpdiv = document.querySelector('.jsonp');

        if (jsonpdiv) {

            jsonpdiv.innerHTML = '';
            jsonpdiv.appendChild(script);

        }

    }


    init() {

        this.searchForm.addEventListener("submit", (e) => {

            e.preventDefault();

            const searchTerm = this.searchForm.querySelector('.searchTerm');

            this.domainSearch(searchTerm.value);


        });

    }


}



document.addEventListener("DOMContentLoaded", function () {

    const searchForm = document.querySelector('.js-search-form');

    if (searchForm) {

        new search(searchForm);
        
    }

});