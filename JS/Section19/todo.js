let choice = prompt("Please choose a function");
let store = [];
while(choice !== "quit")
{
    if(choice === "new")//unshift
    {
        let data = prompt("Enter the task");
        store.push(data);
        console.log(`${data} is added to the list`);
    }
    else if(choice === "list")//display
    {
        console.log("**********");
        for(let x = 0; x<store.length; x++)
        {
            console.log(`${x+1}: ${store[x]}`);
        }
        console.log("**********");
    }
    else if(choice === "delete")//delete the element(using splice)
    {
        let pos = parseInt(prompt("Choose which task to delete"));
        if(!Number.isNaN(pos))
        {
            const deleted = store.splice(pos-1,1);
            console.log(`${deleted} deleted from the list`);
        }
        else
        console.log("Invalid Index");
    }
    else//invalid
    {
        alert("Please choose a valid function");
    }
    choice = prompt("Please choose a function");
}
console.log("You have quit the application");