function helpfn(){
    console.log(`List of all the commands
               1) Tree command - node FO.js tree <dirname>
               2) Organize Command - node FO.js oraganize <dirname>
               3) Help Command - node FO.js help `)//Her in this space is considered as well
}

module.exports = {//never call the function in an object instead just pass its name and dont call it
    helpkey : helpfn
}

