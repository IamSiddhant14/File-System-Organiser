// CMD category project project

// We will be creating a File System Organizer

//******************************************************************************* Features of the Project **************************************************************************//

//If you have numerous Files in a folder and they are not Properly arranged

//So you can use this tool to arrange them in specific directory according to their extension

// like text files will go into text File Folder .exe files will go into application folder and so on

// so at the end you will have a arranged set of files in specific folders



// Argv stands for argument vector

///////////////////////////////////////////////

// In the terminal we will write" node Fo.js <-tree/organize/help--/> '<--path to the dir whose files need to be organized--/>'"
// eg : node Fo.js organize 'C:\Users\Acer\Desktop\PROJECTS\File System Organiser\testfolder'

// ALLWAYS OPEN THE INTEGRATED TERMINAL IN FO.JS FOLDER OR ONLY OR IT WOULD RESULT IN AN ERROR

//////////////////////////////////////////////

const { Console } = require('console');


const fs = require('fs')//here rember to put every thing inside require in " '' "
const path = require('path')

const help = require('./commands/help')

const organize = require('./commands/organize')

const tree = require('./commands/tree')

let inputArr = process.argv.slice(2);
// let input = process.argv[2]


let types = {
    media: ["mp4", "mkv", "mp3"],
    
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    
    documents: ["docx","doc","pdf","xlsx","xls","odt","ods",
    "odp","odg","odf","txt","ps","tex","html"],
    
    app: ["exe", "dmg", "pkg", "deb"],

    image:["png","jpg"]
    
};

//This will only give us the second index of the character that is -- Siddhant
// console.log(inputArr)

let command = inputArr[0]

// var input = process.argv , This will give us the entire array that is -- node FO.js Siddhant
// console.log(input)

switch(command){

    case 'tree':
        tree.treekey(inputArr[1])
        break;
    case 'organize'://node Fo.js organize '<--Filepath of folder which we wish to organize-->'
         organize.organizekey(inputArr[1])
        break;
    case 'help'://node Fo.js help
        help.helpkey()//node Fo.js tree '<--Filepath of folder which we wish to organize-->'
        break;
    default:
        console.log("Please entre a valid input")
        break;

}



// This function will create an folder named organized files in which we would be having sevrals files like that of media , document , app , archives where the files would be sorted in a proper manner

 









