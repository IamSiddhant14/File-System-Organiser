// CMD category project project

// We will be creating a File System Organizer

//******************************************************************************* Features of the Project **************************************************************************//

//If you have numerous Files in a folder and they are not Properly arranged

//So you can use this tool to arrange them in specific directory according to their extension

// like text files will go into text File Folder .exe files will go into application folder and so on

// so at the end you will have a arranged set of files in specific folders

//In the terminal we will write" node FO.js <--Siddhant-->"

// Argv stands for argument vector

///////////////////////////////////////////////

// ALLWAYS OPEN THE INTEGRATED TERMINAL IN FO.JS FOLDER OR ONLY OR IT WOULD RESULT IN AN ERROR

//////////////////////////////////////////////

const fs = require('fs')
const path = require('path')

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
        console.log('Tree implemented')
        break;
    case 'organize'://node Fo.js organize '<--Filepath of folder which we wish to organize-->'
        organizeFn(inputArr[1])
        break;
    case 'help'://node Fo.js help
        helpfn()
        break;
    default:
        console.log("Please entre a valid input")
        break;

}

function helpfn(){
    console.log(`List of all the commands
               1) Tree command - node FO.js tree <dirname>
               2) Organize Command - node FO.js oraganize <dirname>
               3) Help Command - node FO.js help `)
}

// This function will create an folder named organized files in which we would be having sevrals files like that of media , document , app , archives where the files would be sorted in a proper manner

 
function organizeFn(dirpath){//input of a directory path

    let destPath ;

    if(dirpath == undefined){
        console.log('Please Enter a Directory Path')
        return;
    }else{
        let doesExist = fs.existsSync(dirpath)
        // console.log(doesExist)

        if(doesExist == true){
            destPath = path.join(dirpath ,"organized_files")

            if( fs.existsSync(destPath) == false ){
                fs.mkdirSync(destPath)
            }else{
                console.log('This folder already exist')
            }

        }else{
            console.log('Please entre a valid path')
        }
    }

    organizeHelper(dirpath, destPath)
}

//We are writting this function to categories outr files
function organizeHelper(src , dest){

    //Name of files and folder inside the src
    let childNames = fs.readdirSync(src)

    // console.log(childNames)

    for( let i =0; i< childNames.length ; i++){

        let childAddress = path.join(src , childNames[i])
        // console.log(childAddress)

        //Determing whther its a file or a directory
        let isFile = fs.lstatSync(childAddress).isFile()
        // console.log(isFile)

        if( isFile == true){
            let fileCategory = getCategory(childNames[i]);
            // console.log("------ "+childNames[i]+" ----- "+ " belongs to " +" ---- "+fileCategory)

            sendFiles(childAddress, dest , fileCategory)
        }

    }
}

function getCategory(name){
    let ext = path.extname(name)
    //Used to eleminate the dot in front of the extension name
    ext = ext.slice(1)
    // console.log(ext)

    for( let key in types){
        let cTypeArr = types[key]

        for(let i =0; i<cTypeArr.length ; i++){
            if( ext == cTypeArr[i]){
                //We match the extension with the values present in cTypeArr

                return key
            }

        }
    }

}

function sendFiles(srcFilePath , dest , fileCategory ){
    let catPath = path.join(dest , fileCategory)

    if( fs.existsSync(catPath) == false){

        fs.mkdirSync(catPath)

    }

    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(catPath , fileName)

    fs.copyFileSync(srcFilePath,destFilePath)

}





