        //Chargement des stats du joueur en fonction de son pseudo
        let pseudo;
        let score=0;
        let nbp=0; //Nombre de Partie
        let ea=0; // En Attente

            $("#bps").on("click",function(){
                if($("#pseudo").val()!=""){
                //Suppression du bouton et empêche la modification du pseudo
                $("#bps").css("display","none");
                $("#pseudo").prop("readonly","true");
                //Affichage de la partie jeu
                $("#disp").css("display","block");
            
                pseudo=$("#pseudo").val();
                //récupération des stats du joueur
                $.get("/PetitBac/chargeScore.php?pseudo="+pseudo,function(data){
                //Sauvegarde des données
                data=JSON.parse(data);
                pseudo=data.pseudo;
                score=data.score;
                nbp=data.nb_partie;
                ea=data.en_attente;
                let moy;
                if(nbp!=0){
                moy=Math.round(score/nbp*100);
                }else{
                moy=0;    
                }
                //Affichage des données
                $("#score").text(score);
                $("#nbp").text(nbp);
                $("#moy").text(moy);
                $("#ea").text(ea);
                suivant();
                })
                }
            })