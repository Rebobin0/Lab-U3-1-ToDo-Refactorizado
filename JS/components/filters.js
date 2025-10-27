export default class Filters{
    constructor(){
        this.form = document.getElementById('filters');
        
        this.searchButton = document.getElementById('search');
    }

    onClick(callback){
        this.searchButton.onclick = (event) => {
            event.preventDefault(); // Prevent form submission
            const data = new FormData(this.form);       

            callback({
                type : data.get('type'),
                words: data.get('words')
            });
            
        }
    }
}