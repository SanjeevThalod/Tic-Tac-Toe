const cell_element = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const message = document.getElementById('message');
const btn = document.getElementById('btn');
var p = document.querySelector('p');
let x_turn = true;
const arr = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

startgame();

btn.addEventListener('click',startgame);

function startgame(){
    cell_element.forEach(cell => {
        cell.classList.remove('x');
        cell.classList.remove('o');
        cell.classList.remove('a');
        cell.classList.remove('b');
        cell.style.removeProperty('background-color');
        cell.removeEventListener('click',clickhandler);
        cell.addEventListener('click',clickhandler,{once: true});
    });
    message.classList.remove('show');
};

function clickhandler(e){
    //Place_Mark
    let cell = e.target
    let cur_class = x_turn ? 'x' : 'o';
    marker(cur_class,cell);

    //Check_WIN
    win(cur_class);

    //Check_DRAW
    draw();

    //Switch_Turns
    x_turn = !x_turn;

    //Set_Hover
    hoverclass(cur_class);
};
function marker(cur_class,cell){
    cell.classList.add(cur_class);
}
function hoverclass(cur_class){
    for(var i = 0; i < board.children.length; i++){
        var child = board.children[i];
        child.classList.remove('a');
        child.classList.remove('b');
    }
    if(x_turn){
        for(var i = 0; i < board.children.length; i++){
            var child = board.children[i];
            child.classList.add('b');
        }
    }else{
        for(var i = 0; i < board.children.length; i++){
            var child = board.children[i];
            child.classList.add('a');
        }
    }
}

function win(cur_class){
    for(var i = 0; i < 8; i++){
        var temp = true;
        for(var j = 0; j < 3; j++){
            temp = board.children[arr[i][j]].classList.contains(cur_class);
            if(temp == false) break;
        }
        if(temp == true){
            for(var j = 0; j < 3; j++){
                board.children[arr[i][j]].style.backgroundColor = "green";
            }
            setTimeout(function(){
                message.classList.add('show');
                p.innerText = cur_class.toUpperCase() + "-Win";
            },500);
        }
        
    }
}

function draw(){
    var temp = 0;
    for(var i = 0; i < 9; i++){
        if(board.children[i].classList.contains('x') || board.children[i].classList.contains('o')){
            temp++;
        }
    }
    if(temp == 9){
        message.classList.add('show');
        p.innerText = "Draw";
    }
}
