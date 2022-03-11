$(function(){
 
    var contPcJogadas = 0
    var contWinPlayer = 0
    var contWinPC = 0
    var contDraw = 0

    var playerBoxesMarked = []
    var pcBoxesMarked = []
    
    var pcPlays = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3']
    var rPlay = pcPlays[Math.floor(Math.random()*pcPlays.length)];

    var combinacoes = [['a1', 'a2', 'a3'],['a1', 'b1', 'c1'],['a1', 'b2', 'c3'],['a2', 'b2', 'c2'],['a3', 'b3', 'c3'],['a3', 'b2', 'c1'],['b3', 'b2', 'b1'],['c3', 'c2', 'c1']]


    //Function para o player jogar
    function playPlayer(minibox){
        //Adiciona o X na box selecionada
        $('#'+minibox+'>img')
            .attr('src', 'img/X.png')
            .fadeIn(500)
        playerBoxesMarked.push(minibox)
    }

    // Function para o Pc jogar
    function playPc(minibox){
       //Adiciona o X na box selecionada
        pcBoxesMarked.push(minibox);
        $('#'+minibox+'>img')
            .delay(300)
            .attr('src', 'img/circle.png')
            .fadeIn(500);

        console.log("Player Boxes: "+playerBoxesMarked)
        console.log("Pc Boxes: "+pcBoxesMarked)

    }

    // Function para identificar quais as possibilidades do player ganhar e assim impedi-lo
    function playDef(){
        combinacoes.find(function (element){

            var playStrategic = element.filter(a => !playerBoxesMarked.includes(a));
            
            if(playStrategic.length <= 1){
        
                if(pcBoxesMarked.includes(playStrategic[0]) == true){
                    // console.log("Sobrou somente: "+ playStrategic+" Porem ja foi jogado")
                    return false
                }else{
                    console.log("Sobrou somente: "+ playStrategic+" Jogada final")
                    playPc(playStrategic[0]);
                    return true
                }

            }else{
                console.log("Nada para jogar")
            };
        });
    };
    
    //Function para pegar um valor aleatoriamente par ao pc jogar
    function playRandom(){
        contPcJogadas = contPcJogadas + 1
        if(playerBoxesMarked.includes(rPlay) == false && pcBoxesMarked.includes(rPlay) == false){
            console.log('(if)Pc jogou no:' + rPlay);
            playPc(rPlay);
            
        }else{
            if (contPcJogadas <= 4){
                while(playerBoxesMarked.includes(rPlay) == true || pcBoxesMarked.includes(rPlay) == true){
                    rPlay = pcPlays[Math.floor(Math.random()*pcPlays.length)];
                    // console.log('Escolha atual foi: '+rPlay);
                }
                console.log("(else)Pc jogou no: " + rPlay)
                playPc(rPlay);
            }else{
                contDraw++
                winModal("Empate")
                console.log("Jogadas PC acabaram")
            }
        }
    }

    // Function apra identificar quando é feita uma vitória
    function winPlay(){
        combinacoes.find(function(e){
            var winPlayer = e.filter(a => playerBoxesMarked.includes(a));
            var winPC = e.filter(a => pcBoxesMarked.includes(a));

            if(winPlayer.length == 3 || winPC.length == 3){
                if(winPlayer.length == 3){
                    contWinPlayer++
                    winModal("Player")
                }else{
                    contWinPC++
                    winModal("PC")
                }
            }
        })
    }

    //Function para abrir o modal mostrando o vencedor
    function winModal(winner){
        $("#openModal").click()
        winReset()
        if(winner == "PC"){
            blink(".blink", 300, "red")
            $("#winsPc").html("").append(contWinPC)
            $(".blink").html("").append(
                "<h1>Você perdeu :(</h1><h1>Tente novamente</h1>"
            )
        }else if(winner == "Player"){
            blink(".blink", 300, "rgb(0, 255, 0)")
            $("#winsPlayer").html("").append(contWinPlayer)
            $(".blink").html("").append(
                "<h1>Você ganhou, Parabens !!!</h1><h1>Ihuulll !!!</h1>"
            )
        }else{
            blink(".blink", 300, "white")
            $(".blink").html("").append(
                "<h1>Deu empate, você pensa como uma maquina :)</h1>"
            )
        }

        $("#divPlacar").html("").append(
            '<div><h2>Você</h2><p>'+contWinPlayer+'</p></div><div class="mt-20"><h2>Empates</h2><p>'+contDraw+'</p></div><div><h2>Máquina</h2><p>'+contWinPC+'</p></div>'
        )
    }

    //Function pisca-pisca
    function blink(selector, time, color) {
        $(selector)
                .css({"color":color, "border-color":color})
                .fadeOut(time, function() {
                $(this).fadeIn(time, function() {
                    blink(this, time)
                });
            })
    }
    
    //function para resetar a partida
    function winReset(){
        for(i = playerBoxesMarked.length; i > 0; i--){
            $("#"+playerBoxesMarked[i-1]+">img").attr("src", "img/transparent.png")
            console.log("player Boxes lenght: "+playerBoxesMarked[i-1])
            playerBoxesMarked.pop()
            console.log(playerBoxesMarked);
        }
        for(i = pcBoxesMarked.length; i > 0; i--){
            $("#"+pcBoxesMarked[i-1]+">img").attr("src", "img/transparent.png")
            pcBoxesMarked.pop()
        }
        contPcJogadas = 0
    }

    $("#btnReplay").click(function(){
        $("#closeModal").click()
    }) 

    $("#btnReset").click(function(){
        contDraw = 0
        contWinPC = 0
        contWinPlayer = 0
        $("#winsPc").html("").append(0)
        $("#winsPlayer").html("").append(0)
        $("#closeModal").click()
    })

    //Seleção da box e verificação se a box ja foi marcada ou nao e assim fazer a jogada
    $('.miniBox > img').hide()
    $(".miniBox")
        .click(function(){
            // Pega a ID do minibox
            var idBox = $(this).attr('id')
            if(playerBoxesMarked.includes(idBox) == false && pcBoxesMarked.includes(idBox) == false ){
                playPlayer(idBox)
                playDef()
                if(pcBoxesMarked.length != contPcJogadas){
                    contPcJogadas = contPcJogadas + 1
                    console.log("ContPcJogadas(depois do PlayDef): "+contPcJogadas)
                }else{
                    playRandom()
                }
                winPlay()
            }else{

                console.log(playerBoxesMarked)
                console.log(pcBoxesMarked)
                console.log("ID ja incluido")
            }
            
        }) 
});


