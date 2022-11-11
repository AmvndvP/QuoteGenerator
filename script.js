const quoteContainer = document.getElementById('quote-container')
const quoteText = document.getElementById('quote')
const authorText = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

// Get quotes from an api using asynch fetch request
let apiQuotes = []

//Show loading
function loading() {
    loader.hidden = false
    quoteContainer.hidden = true;
}

//Hide loading
function complete(){
    quoteContainer.hidden = false
    loader.hidden = true
}

//Function show new quote

function newQuote() {
    loading()
    //Pick a random quote from quote array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)]
    //Check is author field is empty, replace with 'Unknown'
    if(!quote.author) {
        authorText.textContent = 'Unknown'
    }
    else {
     authorText.textContent = quote.author
    }



    if (quote.text.length > 50){
        quoteText.classList.add('long-quote')
    }
    else{
        quoteText.classList.remove('long-quote')
    }
    //Set quote and hide loader
    quoteText.textContent = quote.text
    complete()
    }

    async function getQuotes() {
    loading()
    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json'
    try { //allows to attempt to complete fetch request
        const response = await fetch(apiUrl); //Const used because api is never changing
        apiQuotes = await response.json()
        newQuote()
    } catch(error) {
        //Catch error here
    }
}

//Tweet a quote

function tweetQuote() {
    const TwitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`
    window.open(twitterUrl, '_blank') 
}

//Event listener
newQuoteBtn.addEventListener('click', newQuote)
twitterBtn.addEventListener('click', tweetQuote)
//On load
getQuotes()
