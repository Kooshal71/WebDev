/*
Objects can have a prototype object which will behave like an template object
The objects contain a copy of the method __proto__ which will have all the methods that are applicable on the object
There is 1 prototype which consists of all the methods 
All objects will have a reference to __proto__
*/

String.prototype.yell = function(){
    return `${this.toUpperCase()} !!! fiuvbuevi`;
}

Array.prototype.pop = function(){
    return "This is not going to work! :("
}


// function hex(r, g, b)
// {
    //     return '#' + ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1)
    // }
    
    // function rgb(r,g,b)
    // {
        //     return `rgb(${r}, ${g}, ${b})`;
        // }
        
        function makeColor(r, g, b)
        {
            const color = {}
            color.r = r
            color.g = g
            color.b = b
            color.rgb = function(){
                return `rgb(${this.r}, ${this.g}, ${this.b})`;
            }
            color.hex = function(){
                const {r, g, b} = this
                return '#' + ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1).toUpperCase()
            }
            return color
        }
        
        // function Color(r, g, b)
        // {
            //     this.r = r
//     this.g = g
//     this.b = b
//     console.log(this)
// }

// Color.prototype.rgb = function()
// {
//     return `rgb(${this.r}, ${this.g}, ${this.b})`;
// }

// Color.prototype.hex = function()
// {
//     const {r,g,b} = this
//     return '#' + ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1).toUpperCase()
// }

// Color.prototype.rgba = function(a = 1.0)
// {
    //     return `rgba(${this.r}, ${this.g}, ${this.b}, ${a})`;
    // }
    
    class Color{
        constructor(r, g, b, name){
            this.r = r
            this .g = g
            this.b = b
            this.name = name
    }
    greet(){
        return `Hello from ${this.name}`
    }
    rgb(){
        return `rgb(${this.r}, ${this.g}, ${this.b})`;
    }
    hex(){
        const {r,g,b} = this
        return '#' + ((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1).toUpperCase()
    }
    rgba(a = 1.0){
        return `rgba(${this.r}, ${this.g}, ${this.b}, ${a})`;
    }
}

//const navColor = new Color("carrot", [230, 126, 34])
//const logoColor = new Color("emerald", [46, 204, 113])
const c1 = new Color(250, 67, 0, "Tomato")

class Pet{
    constructor(name, age){
        this.name = name
        this.age = age
    }
    eat(){
        return `${this.name} is eating`
    }
}

class Cat extends Pet{
    // constructor(name, age){
    //     this.name = name
    //     this.age = age
    // }
    // eat(){
    //     return `${this.name} is eating`
    // }
    constructor(name, age, livesLeft = 9){
        super(name, age)
        this.livesLeft = livesLeft
    }
    meow(){
        return "Meow!"
    }
}

class Dog extends Pet{
    // constructor(name, age){
    //     this.name = name
    //     this.age = age
    // }
    bark(){
        return "Woof!"
    }
    eat(){
        return `${this.name} is not eating his food`
    }
}

