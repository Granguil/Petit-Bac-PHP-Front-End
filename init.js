        let theme;
        let ntheme;
        let lettre;
        let mot,moturl;
        let strwiki;
        let alphabet="abcdefghijklmnopqrstuvwxyz";
        let liste=["Pays","Capitale","Ville Française","Végétal","Animal","Marque","Métier","Personnage Célébre","Événement Historique","Objet","Prénom","Terme Géographique","Ville d'Europe","Ville du Monde","Œuvre d'Art"];
        let interdit=[[0,22],[0,23],[1,20],[1,23]];
        
        function suivant(){
            let b=false;
            let random, randomt;
            //Choix aléatoire de la lettre et du thème
            do{
            b=false;
            random=Math.floor(Math.random()*26);
            randomt=Math.floor(Math.random()*15);
            for(let i=0;i<interdit.length;i++){
                if(JSON.stringify([randomt,random])==JSON.stringify(interdit[i])){
                    b=true;
                }
            }
            }while(b);
            lettre=alphabet[random].toUpperCase();
            ntheme=randomt;
            theme=liste[randomt];
            //Afficahge de la lettre et du thème
            $("#lettre").text(lettre);
            $("#theme").text(theme);
            //Affichage selon le thème
            if(ntheme==7){
                $("#pc").css("display","inline");
                $("#ehc").css("display","none");
                $("#prop").css("display","none");
                $("#OA").css("display","none");
                $("#nom").select();
            }else if(ntheme==8){
                $("#prop").css("display","none");
                $("#pc").css("display","none");
                $("#ehc").css("display","inline");
                $("#OA").css("display","none");
                $('option[value="Aucun"]').prop("selected",true);
                $("select").select();
            }else if(ntheme==14){
                $("#prop").css("display","none");
                $("#pc").css("display","none");
                $("#ehc").css("display","none");
                $("#OA").css("display","inline");
                $("#article").select();
            }else{
                $("#OA").css("display","none");
                $("#ehc").css("display","none");
                $("#pc").css("display","none");
                $("#prop").css("display","inline");
                $("#prop").select();
            }
            //Remise à Zéro des inputs et des events
            $("#prop").val("");
            $("#nom").val("");
            $("#prenom").val("");
            $("#type").val("");
            $("#jonction").val("");
            $("#eh").val("");
            $("#article").val("");
            $("#oeuvre").val("");
            $("#spanajout").css("display","none");
            $("#AffRes").css("display","none");
            $("#b").on("click",function(){
                    
                    bddLoad();
                })
                $("#prop").on("keypress",function(event){
                    if(event.which==13){
                        bddLoad();
                    }
                })
                $("#nom").on("keypress",function(event){
                    if(event.which==13){
                        $("#prenom").select();
                    }
                })
                $("#prenom").on("keypress",function(event){
                    if(event.which==13){
                    bddLoad();
                    }
                })
                $("#article").on("keypress",function(event){
                    if(event.which==13){
                    $("#oeuvre").select();
                    }
                })
                $("#oeuvre").on("keypress",function(event){
                    if(event.which==13){
                    bddLoad();
                    }
                })
                $("#type").on("keypress",function(event){
                    if(event.which==13){
                        $("#jonction").select();
                    }
                })
                $("#jonction").on("keypress",function(event){
                    if(event.which==13){
                        $("#eh").select();
                    }
                })
                $("#eh").on("keypress",function(event){
                    if(event.which==13){
                        bddLoad();
                    }
                })
                $("select").on("change",function(){
                if($("select").val()=="Autre"){
                    $("#type").prop("readOnly",false);
                    $("#type").select()
                }else{
                    $("#type").prop("readOnly",true);
                    if($("select").val()=="Aucun"){
                    $("#type").val("");
                    $("#eh").select();
                    }else{
                        $("#type").val($("select").val());
                        $("#jonction").select();
                    }
                }
                
            })
        }
        //Event pour passer au suivant si on ne trouve pas
        $("#abandon").on("click",function(){
            nbp++;
            $("#nbp").text(nbp);
            let moy;
            if(nbp!=0){
            moy=Math.round(score/nbp*100);
            }else{
            moy=0;    
            }
            $("#moy").text(moy);
            let data={pseudo:pseudo,score:score,nb_partie:nbp,en_attente:ea};
            $.ajax({type:"post",
            url:"/PetitBac/saveScore.php",
            data:data,
            })
            suivant();
        })
        //Event pour passer au suivant après avoir répondu
        $("#suivant").on("click",function(){
            $("#lb").css("display","inline");
            $("#suivant").css("display","none");
            suivant();
        })