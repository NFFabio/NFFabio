let TitleArray=["🎐_______","a🎐______","ab🎐_____","abi🎐____","abio🎐___","abio_🎐__","abio__🎐_","abio___🎐"]

let i =0;

        let Interval= setInterval(function(){
            i++;
            if(i>TitleArray.length-1)i=0;
            document.title=TitleArray[i]
        },300)