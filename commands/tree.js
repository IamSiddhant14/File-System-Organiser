const fs = require('fs')//here rember to put every thing inside require in " '' "
const path = require('path')

function treeFn(dirpath){

    if(dirpath == undefined){
        Console.log("Please entre a valid Command")
    }else{
        let doesExist = fs.existsSync(dirpath)
        if(doesExist == true){
            treeHelper(dirpath," ")
        }else{
            console.log("Please entre a valid directory name")
        }
    }

    // treeHelper(dirpath, " ")

}

function treeHelper(targetPath , indent){
      
    //This is to determine whether the link given is of an folder path or its an file path
    let isFile = fs.lstatSync(targetPath).isFile()

    if(isFile == true){
        //To determine file name
        let filename = path.basename(targetPath)
        console.log(indent +"├──"+filename)

    }else{
        let dirName = path.basename(targetPath)
        console.log(indent + "└──"+ dirName)

        let children = fs.readdirSync(targetPath)
        // console.log(children) , as it will result in an array 

        for(let i =0; i<children.length; i++){
            let childPath = path.join(targetPath, children[i])
            treeHelper(childPath , indent +'\t')
        }

    }


}

module.exports = {
    treekey : treeFn
}