let p1Btn = document.querySelector(".p1")
let p2Btn = document.querySelector(".p2")
let resetBtn = document.querySelector(".reset")
let scorePrint = document.querySelector(".score")
let scr = document.querySelector("input")
let maxScore = 1;
let p1Score = 0;
let p2Score = 0;
let score = `${p1Score} to ${p2Score}`
scorePrint.append(score)
scr.addEventListener("input", function(){
    maxScore = parseInt(scr.value)
})

    p1Btn.addEventListener("click", function(){
        console.log("This is player 1")
        p1Score += 1;
        scorePrint.innerHTML = ""
        score = `${p1Score} to ${p2Score}`
        scorePrint.append(score)
        if(p1Score === maxScore || p2Score === maxScore)
        {
            p1Btn.disabled = "true"
            p2Btn.disabled = "true"
        }
        
    })
    
    p2Btn.addEventListener("click", function(){
        console.log("This is player 2")
        p2Score = p2Score + 1
        scorePrint.innerHTML = ""
        score = `${p1Score} to ${p2Score}`
        scorePrint.append(score)
        if(p1Score === maxScore || p2Score === maxScore)
        {
            p1Btn.disabled = "true"
            p2Btn.disabled = "true"
        }

    })
    
    resetBtn.addEventListener("click", function(){
        console.log("This is reset")
        p1Score = 0
        p2Score = 0
        maxScore = 1
        scorePrint.innerHTML = ""
        score = `${p1Score} to ${p2Score}`
        scorePrint.append(score)
        p1Btn.removeAttribute("disabled")
        p2Btn.removeAttribute("disabled")
    })
    
