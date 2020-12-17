(function() {
    const STUDIO_SIZE = 46;
    if(!Uint8Array || !FileReader || !Blob){
        alert("Your browser is not supported.");
        return;
    }
    function getByteStr(byte){
        var str = byte.toString(16);
        if(str.length < 2)str = '0' + str;
        return str;
    }
    function getHexFromCharCode(code){
        if(code > 0x2F && code < 0x3A){
            return code - 0x30;
        }
        else if(code > 0x40 && code < 0x47){
            return code - 0x37;
        }else if(code > 0x60 && code < 0x67){
            return code - 0x57;
        }
        return -1;
    }
    function strToBytes(str){
        if(!str)return null;
        var hex
        var dest = new Uint8Array(str.length / 2);
        for(var i = 0;i < dest.length;i++){
            hex = getHexFromCharCode(str.charCodeAt(i * 2));
            if(hex < 0)return null;
            dest[i] = hex * 16;
            hex = getHexFromCharCode(str.charCodeAt(i * 2 + 1));
            if(hex < 0)return null;
            dest[i] += hex;
        }
        return dest;
    }
    var reader = new FileReader();
    reader.addEventListener("load",(event) => {
        var data = new Uint8Array(reader.result);
        input.value = "";
        if(data.length !== STUDIO_SIZE){
            alert("Invalid file.");
        }
        var miiData = "";
        for(var i = 0;i < STUDIO_SIZE;i++)miiData += getByteStr(data[i]);
        localStorage.setItem(storageURL, miiData);
        alert("The page will reload.(When the browser asks if you want to reload,Press reload.)\nPress \"Continue editing\" and the imported Mii should appear.");
        location.reload();
    });
    var input = document.createElement("input");
    input.setAttribute("type","file");
    input.setAttribute("accept",".studio");
    input.addEventListener("change",(event) => {
        var tmp = event.target.files;
        if(tmp){
            var f = tmp[0];
            reader.readAsArrayBuffer(f);
        }
    });
    const urlre = /^https:\/\/studio\.mii\.nintendo\.com\/miis\/([0-9a-f]*)\/edit\?client_id=([0-9a-f]*)/;
    const res = urlre.exec(window.location.href);
    if (!res || res.length < 2) {
        alert("This page isn't the correct page. Please edit the Mii you'd like to download and run this script again.");
        return;
    }
    const miiID = res[1];
    const clientID = res[2];
    const storageURL = `https%3A%2F%2Fstudio.mii.nintendo.com%2Fmiis%2F${miiID}%2Fedit%3Fclient_id%3D${clientID}`;
    const load = confirm("Press OK to load a Mii data file.\nPress Cancel to extract this Mii's Mii data file.");
    if (load) {
        input.click();
        return;
    }
    var extractedMiiData = strToBytes(localStorage.getItem(storageURL));
    if (!extractedMiiData || extractedMiiData.length !== STUDIO_SIZE) {
        alert("The Mii data is not currently stored. Please make a change to this Mii, revert the change, and refresh the page to try again.");
        return;
    }
    var blob = new Blob([extractedMiiData]);
    var d = document.createElement("a");
    d.href = window.URL.createObjectURL(blob);
    d.target = "_blank";
    d.download = `${miiID}.studio`;
    d.click();
}());