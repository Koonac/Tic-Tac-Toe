$(function(){
 
    var contJogadas = 0
    var playerBoxesMarked = []
    var pcBoxesMarked = []
    
    var pcPlays = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'c1', 'c2', 'c3']
    var rPlay = pcPlays[Math.floor(Math.random()*pcPlays.length)];

    var combinacoes = [['a1', 'a2', 'a3'],['a1', 'b1', 'c1'],['a1', 'b2', 'c3'],['a2', 'b2', 'c2'],['a3', 'b3', 'c3'],['a3', 'b2', 'c1'],['b3', 'b2', 'b1'],['c3', 'c2', 'c1']]
    
    function playPc(minibox){
        pcBoxesMarked.push(minibox);
        if(contJogadas <= 4){
            $('#'+minibox+'>img')
                .delay(300)
                .attr('src', 'img/circle.png')
                .fadeIn(200);

            contJogadas = contJogadas + 1

            // console.log(playerBoxesMarked)
            // console.log(pcBoxesMarked)     
        }else{
            console.log("joagadas do pc acabaram");
        }
        
    }

    function playDef(){
        combinacoes.find(function(element){
            if(element.filter(a => !playerBoxesMarked.includes(a)).length == 1){
                filter = element.filter(a => !playerBoxesMarked.includes(a));
                if(playerBoxesMarked.includes(rPlay) == false && pcBoxesMarked.includes(rPlay) == false){
                    console.log("Verificando se o valor que passou no filtro nao esta marcado \nValor do filtro: "+filter )
                    playPc(filter);
                }
            }else{
                console.log("(else)Valor não é 1 ainda");
            }
        });

    };
    

    // ----------------- Backup -------------
    // function playDef(){
    //     combinacoes.find(function (element, index){

    //         var playStrategic = element.filter(a => !playerBoxesMarked.includes(a));
    
    //         console.log("Array: ["+index+"] "+element+"\nValores do playStrategic: "+playStrategic );
            
    //         if(playStrategic.length < 2){
    //             console.log("Sobrou somente: "+ playStrategic)
    //             playPc(playStrategic[0]);
    //         }else{
    //             console.log("nada para jogar")
    //         };
    //     });
    // };

    function playRandom(){
        if(playerBoxesMarked.includes(rPlay) == false && pcBoxesMarked.includes(rPlay) == false){
            console.log('(if)Pc jogou no:' + rPlay);
            playPc(rPlay);
            
        }else{
            while(playerBoxesMarked.includes(rPlay) == true || pcBoxesMarked.includes(rPlay) == true){
                rPlay = pcPlays[Math.floor(Math.random()*pcPlays.length)];
                // console.log('Escolha atual foi: '+rPlay);
            }
            console.log("(else)Pc jogou no: " + rPlay)
            playPc(rPlay);
        
        }
    }

    $('.miniBox > img').hide()
    $(".miniBox")
        .click(function(){
            // Pega a ID do minibox
            var idBox = $(this).attr('id')

            // Acrescenta a id em uma array e cria a img de X no tabuleiro
            if(playerBoxesMarked.includes(idBox) == false && pcBoxesMarked.includes(idBox) == false ){
                // Adiciona o X do player
                $('#'+idBox+'>img')
                    .attr('src', 'img/X.png')
                    .fadeIn(500)
                playerBoxesMarked.push(idBox)

                playDef();
                // if(playDef()){
                //     console.log('---------- Play def verdadeiro')
                //     // playDef()
                // }else{
                //     console.log('---------- Play def falso')
                //     playRandom();
                // }
            }else{
                console.log(playerBoxesMarked)
                console.log("ID ja incluido")
            }
            
        })
        
});
