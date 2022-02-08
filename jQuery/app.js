$(document).ready(function(){
    $("h1").addClass("head")
    $("button").css("backgroundColor", "yellow")
    // $("h1").removeClass("head")
    $("button").addClass("margin50")
    $("h1").text("GoodBye")
    $("button").html("Don't Touch <b>ME</b>")
    setInterval(() => {
        $("img").attr("src", "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.oVQxMFaSW1BcBdr5Cuv1-AHaEK%26pid%3DApi&f=1")
    }, 3000);
    $("h1").click(function(){
        $("h1").css("color", "purple")
    })
    $("button").click(function(){
        $("h1").css("color", "blue")
    })
    $("input").keypress(function(evnt){
        $("h1").text(evnt.key)
    })
    $("h1").on("mouseover", function(){
        $("button").css("color", "blue")
    })
    $("h1").before("<button>New</button>")
    $("h1").after("<span>This came after</span>")
    // $("button").remove()
    $("h1").hide()
    $("h1").show()
    $("button").on("click", function(){
        $("h1").fadeToggle()
        $("img").animate({
            opacity: 0.5
        })
    })
})
// alert("Welcome");