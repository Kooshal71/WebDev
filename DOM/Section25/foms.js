const tweetForm = document.querySelector("form");
const tweetContainer = document.querySelector("ul")
tweetForm.addEventListener('submit', function(e){
    // const usernameInp = document.querySelectorAll("input")[0];
    // const tweetInp = document.querySelectorAll("input")[1];
    // console.log(usernameInp.value,tweetInp.value);
    e.preventDefault();
    const name = (tweetForm.elements.username); 
    const tweet = (tweetForm.elements.tweet);
    addTweet(name.value, tweet.value);
    name.value = ""
    tweet.value = ""
    // console.log("SUBMIT!")
    
});
// const lis = document.querySelectorAll("li");
// for(li of lis)
// {
//     li.addEventListener('click', function(){
//         li.remove();
//     })
// }
function addTweet(name, tweet)
{
    const newTweet = document.createElement("li");
    const bTag = document.createElement("b");
    bTag.append(name);
    newTweet.append(bTag);
    newTweet.append(` - ${tweet}`)
    console.log(newTweet)
    tweetContainer.append(newTweet);
}

tweetContainer.addEventListener("click", function(e){
    console.log("click on UL");
    console.log(e.target.nodeName)
    e.target.remove();
})