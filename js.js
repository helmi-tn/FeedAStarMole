let score=0;
function getSadOrLeavingInterval(){
    return Date.now() + 1000;
}
function getGoneInterval(){
    return Date.now()+ Math.floor(Math.random()*18000) + 2000; /*random seconds between 2-20*/
}
function getHungryInterval(){
    return Date.now() + Math.floor(Math.random()*1000)+2000;
}
const moles = [
    {
        status: "sad",
        next: getSadOrLeavingInterval(),
        king: false,
        node : document.getElementById('hole-0')
        //node : document.querySelector('#hole-0')
    },
    {
        status: "sad",
        next: getSadOrLeavingInterval(),
        king: false,
        node : document.getElementById('hole-1')
    },
    {
        status: "sad",
        next: getSadOrLeavingInterval(),
        king: false,
        node : document.getElementById('hole-2')
    },
    {
        status: "sad",
        next: getSadOrLeavingInterval(),
        king: false,
        node : document.getElementById('hole-3')
    },
    {
        status: "sad",
        next: getSadOrLeavingInterval(),
        king: false,
        node : document.getElementById('hole-4')
    },
    {
        status: "sad",
        next: getSadOrLeavingInterval(),
        king: false,
        node : document.getElementById('hole-5')
    },
    {
        status: "sad",
        next: getSadOrLeavingInterval(),
        king: false,
        node : document.getElementById('hole-6')
    },
    {
        status: "sad",
        next: getSadOrLeavingInterval(),
        king: false,
        node : document.getElementById('hole-7')
    },
    {
        status: "sad",
        next: getSadOrLeavingInterval(),
        king: false,
        node : document.getElementById('hole-8')
    },
    {
        status: "sad",
        next: getSadOrLeavingInterval(),
        king: false,
        node : document.getElementById('hole-9')
    },
]
function getKingStatus(){
    return Math.random() > 0.8; //80% false
}

function getNextStatus(mole){
    switch (mole.status){
        case "fed":
        case "sad":
            mole.status="leaving";
            mole.next=getSadOrLeavingInterval();    
            if (mole.king){
            mole.node.children[0].src= 'king-mole-leaving.png';
           }
            else{
                mole.node.children[0].src= 'mole-leaving.png';
            }
            break;
        case "leaving":
            mole.status="gone";
            mole.next=getGoneInterval();
            mole.node.children[0].classList.add("molegone");
            break;
        case "gone":
            mole.status="hungry";
            mole.king=getKingStatus(); //assign if its a king or not
            mole.next=getHungryInterval();
            mole.node.children[0].classList.remove("molegone");
            mole.node.children[0].classList.add("molehungry");
            if(mole.king){
                mole.node.children[0].src="king-mole-hungry.png";
            }
            else{
            mole.node.children[0].src="mole-hungry.png";
            }
            break;
        case "hungry":
            mole.status="sad";
            mole.next=getSadOrLeavingInterval();
            mole.node.children[0].classList.remove("molehungry");
            if(mole.king){            
                mole.node.children[0].src="king-mole-sad.png";
            }else{
            mole.node.children[0].src="mole-sad.png";
            }
            break;

    }
}

function feed(event){
    if(!event.target.classList.contains('molehungry')){
        return; //if its not hungry
    }
    //else he clicked on a hungry
    const mole = moles[parseInt(event.target.dataset.index)];

    mole.status='fed';
    mole.next=getSadOrLeavingInterval();
    if(mole.king){    
        mole.node.children[0].src='king-mole-fed.png';
    }
    else{    
        mole.node.children[0].src='mole-fed.png';
    }
    mole.node.children[0].classList.remove('molehungry');
    if(mole.king){
        score+=2;
    }
    else{
        score++;
    }
    if(score >=10){
        wingame();
    }
    document.querySelector('.worm-container').style.width= `${10 * score}%`;
}


function wingame(){
    document.querySelector('.bg-flexbox').classList.add("hide");
    document.querySelector('.win').classList.remove("hide");
    document.querySelector('.button').classList.remove("hide");
}

let runAgainAt = Date.now() + 100;
/*setInterval(function(){..},100)*/
function nextFrame(){
    const now = Date.now()
    if(runAgainAt <= now){  //run this block every 100 ms (infinite loop)
    for(let i=0;i<moles.length;i++){
            if(moles[i].next <= now){
                getNextStatus(moles[i]);
            }
        }
        runAgainAt= now + 100;
    }
    requestAnimationFrame(nextFrame);
}

document.querySelector('.button').addEventListener('click',reload);
function reload(){
    setTimeout(() => {
        location.reload();
    }, 1500); 
}

document.querySelector('.bg-flexbox').addEventListener('click',feed);

nextFrame();