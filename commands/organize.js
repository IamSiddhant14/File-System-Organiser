const fs = require('fs')//here rember to put every thing inside require in " '' "
const path = require('path')

let types = {
    media: ["mp4", "mkv", "mp3"],
    
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
    
    documents: ["docx","doc","pdf","xlsx","xls","odt","ods",
    "odp","odg","odf","txt","ps","tex","html"],
    
    app: ["exe", "dmg", "pkg", "deb"],

    image:["png","jpg"]
    
};

function organizeFn(dirpath){//input of a directory path

    let destPath ;

    if(dirpath == undefined){
        console.log('Please Enter a Directory Path')
        // break is to break out of a loop like for, while, switch etc which you don't have here, you need to use return to break the execution flow of the current function and return to the caller.
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

//We are writting this function to categories ourr files
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
    
    //Deleting the files which was present unorganised int the previous folder
    fs.unlinkSync(srcFilePath)

    console.log(fileName +"     is copied to       " + fileCategory)

}

module.exports = {
    organizekey : organizeFn
}