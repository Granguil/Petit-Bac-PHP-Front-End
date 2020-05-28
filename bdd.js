//Création du mot à analyser et chargement des catégories de l'article wikipedia correspondant
function bddLoad(){
    $("#b").off();
    $("#prop").off();
    $("#nom").off();
    $("#prenom").off();
    $("#article").off();
    $("#oeuvre").off();
    $("#type").off();
    $("#jonction").off();
    $("#eh").off();
    $("select").off();
        $("#res").text("");
        $("#AffRes").css("display","block");
        $("#lb").css("display","none");
    if((ntheme!=7 && ntheme!=8 && ntheme!=14 && $("#prop").val()!="")||(ntheme==7 && $("#nom").val()!="") || (ntheme==8 && $("#eh").val()!="")|| (ntheme==14 && $("oeuvre").val()!="")){
        
        let bl=false;
        let pliste;
        if(ntheme!=7 && ntheme!=8 && ntheme!=14){
            
            if($("#prop").val()[0].toUpperCase().sansAccent()==lettre.toUpperCase()){
                bl=true;
                let pl=$("#prop").val().split("");
                pl[0]=pl[0].toUpperCase();
                pliste=pl.join("");
                mot=pliste;
                
            }
        }else if(ntheme==7){
            
            if($("#nom").val()[0].toUpperCase().sansAccent()==lettre.toUpperCase()){
                bl=true;
                let prop;
                if($("#prenom").val()!=""){
                    let pl=$("#nom").val().split("");
                    pl[0]=pl[0].toUpperCase();
                    pliste=pl.join("");
                    
                    prop=$("#prenom").val()+" "+pliste;
                }else{
                    prop=$("#nom").val();
                }
                let pl=prop.split("");
                pl[0]=pl[0].toUpperCase();
                pliste=pl.join("");
                mot=pliste;
                
            }
        }else if(ntheme==8){
            bl=true;
            let nom=$("#eh").val();
            if(nom[0].toUpperCase().sansAccent()==lettre.toUpperCase()){
            
            if($("select").val()!="Aucun"){
            if($("select").val()=="Autre"){
                mot=$("#type").val();
            }else{
                mot=$("select").val();
            }
            if($("#jonction").val()!=""){
                mot+=" "+$("#jonction").val();
            }
            if(mot[mot.length-1]!="'"){
                mot+=" "+nom;
            }else{
                mot+=nom;
            }
            
            }else{
            mot=nom;
            }
            }
        }else if(ntheme==14){
            bl=true;
            let nom=$("#oeuvre").val();
            if(nom[0].toUpperCase().sansAccent()==lettre.toUpperCase()){
                if($("#article").val()!=""){
                    let art=$("#article").val();
                    if(art[art.length-1]=="'"){
                        mot=$("#article").val()+""+$("#oeuvre").val();
                    }else{
                    mot=$("#article").val()+" "+$("#oeuvre").val();
                    }
                }else{
                    mot=$("#oeuvre").val();
                }
            }
        }
        
    
    if(bl){
        moturl=encodeURIComponent(mot);
        $.get("/PetitBac/verifMot.php?categorie="+theme+"&mot="+moturl,function(data){
            if(data){
                $("#res").text("Bonne Réponse");
                score=score+1;
                $("#score").text(score);
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
                $("#lb").css("display","none");
                $("#suivant").css("display","inline");
            }else{
                let prop="un";
    
                if(ntheme<=2 || ntheme==5 || ntheme==7 || ntheme==8 || ntheme==10 || ntheme>=12){
                    let p=mot.split("");
                    p[0]=p[0].toUpperCase();
                    mot=p.join("");
                }else{
                    let p=mot.split("");
                    p[0]=p[0].toLowerCase();
                    mot=p.join("");
                }
                moturl=encodeURIComponent(mot);
                $.get("https://fr.wikipedia.org/w/api.php?action=query&format=json&titles="+moturl+"&prop=categories&cllimit=100&redirect=1&origin=*",function(data){
                    let str=JSON.stringify(data);
                    strwiki=str;
                    
                    verification(str);
                    $("#lb").css("display","none");
                    $("#suivant").css("display","inline");
                })
            }
        })
    }else{
        $("#res").text("Lettre Incorrecte");
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
        $("#lb").css("display","none");
        $("#suivant").css("display","inline");
        
    }
    }
}

//wiktionary
function bdd2(){
    
    $.get('https://fr.wiktionary.org/w/api.php?action=query&titles='+moturl+'&prop=revisions&rvprop=content&rvgeneratexml=&format=json&origin=*',function(data){
        let str=JSON.stringify(data);
        
        verification2(str);
    })
}

//Ajout si le mot est refusé, et que le joueur pense qu'il devrait être accepté
$("#ajout").on("click",function(){
    nbp--;
    ea++;
    $("#nbp").text(nbp);
    let moy;
    if(nbp!=0){
    moy=Math.round(score/nbp*100);
    }else{
    moy=0;    
    }
    $("#moy").text(moy);
    $("#ea").text(ea);
    let data={pseudo:pseudo,score:score,nb_partie:nbp,en_attente:ea};
    $.ajax({type:"post",
    url:"/PetitBac/saveScore.php",
    data:data,
    })
    $.ajax({type:"post",
    url:"/PetitBac/addAjout.php",
    data:{pseudo:pseudo,categorie:theme,mot:mot}
    })
    $("#spanajout").css("display","none");
})