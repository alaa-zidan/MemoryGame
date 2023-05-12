let namesdiv=document.querySelector(".allnames")
// Select The Start Game Button
    document.querySelector(".control_buttons span").onclick=function(){
         // Prompt Window To Ask For Name
    let yourname=prompt("enter your name");
    // If Name Is Empty
    if(yourname == null || yourname == ""){
        document.querySelector(".name span").innerHTML="unknown";
    }
    // If Name Is not Empty
    else{
            // Set Name To Your Name
        document.querySelector(".name span").innerHTML=yourname;
    }
     // Remove Splash Screen
    document.querySelector(".control_buttons").remove();
    document.getElementById('start').play();
    let countdown= document.querySelector(".seconds")
    let counter=setInterval(count,1000)
    function count(){
        countdown.innerHTML -= 1;
        
    if(countdown.innerHTML === "0"){
        clearInterval(counter);
    let num=document.querySelector(".tries span").innerHTML;   
    let confirmMsg = confirm("Do You Need to Try Again?");
    if (confirmMsg === true) {
        window.location.reload();
    }
     else {
         blocks.forEach((block)=>{
            block.classList.add('stop')
         });
     }
     addinfo(yourname,num)
      }
    }
    };
    // Effect Duration
    let duration=1000;
    // Select Blocks Container
    let blocksContainer=document.querySelector(".memory-game-blocks")
    // Create Array From Game Blocks
    let blocks=Array.from(blocksContainer.children)
    // Create Range Of Keys
    let  orderRange=[...Array(blocks.length).keys()]
    shuffel(orderRange)
    // Add Order Css Property To Game Blocks
    blocks.forEach((block,index)=>{
         // Add CSS Order Property
         block.style.order=orderRange[index]
         //trigger filiped function
         block.addEventListener('click',function(){
        flipflop(block)
         })
    })
    //create flip flop function
    function flipflop(selectedblock){
        //add is-filipped class
        selectedblock.classList.add('is-flipped');
        //collect all filiped cards
        let allFlippedBlocks=blocks.filter(flippedBlock=>flippedBlock.classList.contains('is-flipped'))
        if(allFlippedBlocks.length===2){
         // Stop Clicking Function
         stopclicking()
         CheckMatchedBlock(allFlippedBlocks[0],allFlippedBlocks[1])
         // Check Matched Block Function
        }
    }
    //create Check Matched Block
    let triesElement = document.querySelector('.tries span');
    function CheckMatchedBlock(block1,block2){
        if(block1.dataset.cartoon===block2.dataset.cartoon){
        block1.classList.remove('is-flipped')
        block2.classList.remove('is-flipped')
        block1.classList.add('has-match')
        block2.classList.add('has-match')
        document.getElementById('success').play();
        }
        else{
            triesElement.innerHTML = (parseInt(triesElement.innerHTML))+1;
            setTimeout(()=>{
                block1.classList.remove('is-flipped')
                block2.classList.remove('is-flipped')
            },duration)
            document.getElementById('fails').play();
        }
    }
     // create Stop Clicking Function
     function stopclicking(){
        // Add Class No Clicking on Main Container
        blocksContainer.classList.add('no-clikcing')
         // Wait Duration
         setTimeout(()=>{
          // Wait Duration
          blocksContainer.classList.remove('no-clikcing')
         },duration)
     }
    //create shuffle function
    function shuffel(array){
        let current=array.length,
            temp,
            random;
            while(current>0){
            random=Math.floor(Math.random()*current)
             current--;
             temp=array[current];
             array[current]=array[random];
             array[random]=temp
            }
           return  array; 
    }
    //local storge part

    //add name and triers num to array
      //creat empty array
      let arrayofinformations=[];
      if(localStorage.getItem("data")){
        arrayofinformations=JSON.parse(localStorage.getItem("data"))
      }
      getfromlocal();
      //create add function to add info to the array
      function addinfo(Name,Tries){
        const info={
            id:Date.now(),
            name:Name,
            tries:Tries,
            completed:false,
        }
        //push info to the array
        arrayofinformations.push(info)
        addinfotopagefrom(arrayofinformations)
        addtolocal(arrayofinformations)
      }
      function addinfotopagefrom(arrayofinformations){
        //empty information div
       namesdiv.innerHTML="";
       arrayofinformations.forEach((info)=>{
        let divname=document.createElement("div");
        divname.className=("name");
        divname.setAttribute("data-id",info.id)
        divname.appendChild(document.createTextNode(info.name))
        
        let divtries=document.createElement("div");
        divtries.className=("try");
        divtries.appendChild(document.createTextNode(info.tries))
        divname.appendChild(divtries)
        namesdiv.appendChild(divname)
       });
      }
      //add data to localstorage
      function addtolocal(arrayofinformations){
        window.localStorage.setItem("data",JSON.stringify(arrayofinformations))
      }
       //get data from localstorage and apply it in the home page
       function getfromlocal(){
        let data=localStorage.getItem("data")
        if(data){
          let informations=JSON.parse(data)
            addinfotopagefrom(informations)
        }
       }

