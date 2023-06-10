let bankHeader = document.getElementById("bankHeader").innerHTML

let bankGoods = []

for(let i=0;i<17;i++) {
    if(bankHeader.includes(`<div class="bankGood" id="bankGood-${i}" style="display: inline-block;">`)) { 
        bankGoods.push(i)
    }
}

function buyOrSell(bankGoods) {
    let bankLevel = parseInt(document.getElementById("productLevel5").innerHTML.replace("lvl ", ""))
    for(let i=0; i<bankGoods.length;i++) {
        let bankGood = bankGoods[i]
        let bankGoodStock = parseInt(document.getElementById(`bankGood-${bankGoods[i]}-stock`).innerHTML)
        let bankGoodStockMax = parseInt(document.getElementById(`bankGood-${bankGoods[i]}-stockMax`).innerHTML.replace("/", ""))
        if(bankGoodStock == bankGoodStockMax) {
            tryToSellGoods(bankGood, bankLevel)
        }
        else if(bankGoodStock == 0) {
            tryToBuyGoods(bankGood, bankLevel)
        }
        else if(bankGoodStock < bankGoodStockMax) {
            tryToSellGoods(bankGood, bankLevel)
            tryToBuyGoods(bankGood, bankLevel)
        }
    }
}



function tryToBuyGoods(bankGood, bankLevel) {
    let goodPrice = document.getElementById(`bankGood-${bankGood}-val`).innerHTML.replace("$", "")
    let restingValue = 10*(bankGood+1) + bankLevel + 1
    if(goodPrice < restingValue - restingValue*0.1) {
        console.log("buy " + bankGood + ", resting value = " + restingValue + ", price = " + goodPrice)
        document.getElementById(`bankGood-${bankGood}_Max`).click()
    }
}

function tryToSellGoods(bankGood, bankLevel) {
    let goodPrice = document.getElementById(`bankGood-${bankGood}-val`).innerHTML.replace("$", "")
    let restingValue = 10*(bankGood+1) + bankLevel + 1
    if(restingValue + restingValue*0.2 < goodPrice) {
        console.log("sell " + bankGood + ", resting value = " + restingValue + ", price = " + goodPrice)
        document.getElementById(`bankGood-${bankGood}_-All`).click()
    }
}

buyOrSell(bankGoods)

loop = setInterval(() => {
    buyOrSell(bankGoods)
    console.log("tick")
}, 61*1000)
