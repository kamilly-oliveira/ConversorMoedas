const form = document.querySelector("form")
const amount = document.getElementById("amount");
const moeda = document.getElementById("moeda"); 
const footer = document.querySelector("footer");
const description = document.getElementById("description");
const result = document.getElementById("result");





  let valueUsd = 5.87; //usdHigh; 
  let valueEur = 6.87; //eurHigh; 
  let valueGbp = 7.87; //gbpHigh; 

  

amount.addEventListener("input", () => {
    const hasCharactersRegex = /\D+/g;
    amount.value = amount.value.replace(hasCharactersRegex, "");
});

form.onsubmit = async (event) => {
    event.preventDefault()

    const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL') 
    const data = await response.json();
    

    // Todas as informações da api
    const objectKeys = Object.entries(data).forEach(([key, value]) => {
        console.log(key, value)
    })

    valueUsd = data.USDBRL.high;
    valueEur = data.EURBRL.high;
    valueGbp = data.GBPBRL.high;

    switch (moeda.value) {
        
        case "usd": 
        convertmoeda(amount.value, valueUsd, "US$"); 
        break; 

        case "eur": 
        convertmoeda(amount.value, valueEur, "€"); 
        break; 

        case "gbp": 
        convertmoeda(amount.value, valueGbp, "£"); 
        break; 

    }
}

function convertmoeda(amount, price, symbol) {
    try {
        description.textContent = `${symbol} 1 = R$ ${String(price).replace(".", ",")}`;
        let total = String(amount * price).replace(".", ",");
        result.textContent = `${total} Reais`; 
        footer.classList.add("show_result");

    } catch (error) {
        footer.classList.remove("show_result");
        console.log(error)
    }
}

