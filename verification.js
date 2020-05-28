//Méthode de vérification si une série de mots est dans une chaîne de caractères 
function listeVerif(wikiListe,str){
    let bool=false;
    for(let i=0;i<wikiListe[ntheme].length;i++){
                if(wikiListe[ntheme][i].length>3){
                if(str.indexOf(wikiListe[ntheme][i])>=0){
                    bool=true
                }
                }else{
                    if(wikiListe[ntheme][i][0]!="Non"){
                        if(str.indexOf(wikiListe[ntheme][i][0])>=0 && str.indexOf(wikiListe[ntheme][i][1])>=0){
                        bool=true
                    }
                    }else{
                        if(str.indexOf(wikiListe[ntheme][i][1])>=0){
                            bool=false;
                        }
                    }
                }
            }
    return bool;
}

//Verification des categories wikipedia
function verification(str){
            let bool=false;
            let verifWikipedia=[["Pays","pays"],
            ["Capitale","capitale"],
            ["Communes de France"],
            ["Botanique"],
            ["Animaux","Zoologie"],
            ["Marque","Entreprise"],
            ["Métier","métier"],
            ["Naissance","Personnage de fiction","Patronyme","patronyme",["Homonymie","Histoire"]],
            ["Catégorie:Bataille","Homonymie de batailles","Catégorie:Conflit","Catégorie:Portail:Histoire",["Traité","Catégorie:Homonymie"],["Non","Naissance"]],
            ["Objet","Technologie","Portail:Mode","objet","vêtement","Vêtement","Outils"],
            ["Prénom","prénom"],
            ["Géographie","toponyme",["Non","Homonymie"]],
            ["Ville d'Europe","Communes de France",["Ville","Europe"]],
            ["Ville du Monde","Ville","ville","Localités","Commune"],
            ["Œuvre d'Art","Série","Architecture","Sculpture","Peinture","Dessin","Musique","Littérature","Danse","Théâtre","Cinéma","Photographie","Bande dessinée","Jeu video","Homonymie de titre"]
            ];
            
            bool=listeVerif(verifWikipedia,str);
            
            
            if(bool){
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
                let data2={categorie:theme,mot:mot};
                $.ajax({
                    type:"post",
                    url:"/PetitBac/ajoutMot.php",
                    data:data2,
                })
                $("#lb").css("display","none");
                $("#suivant").css("display","inline");
            }else{
                bdd2();
            }
        }
        //Verification  de l'article wiktionary
        function verification2(str){
            let bool=false;
            let verifWiktionary=[
            ["<title>pays</title>","Catégorie:Pays","Ancien pays"],
            ["Catégorie:Capitales","<value>capitales</value>","Ville et capitale"],
            ["[[commune|Commune]] [[français]]e","ville de France","ville française","ville de [[France]]"],
            ["<value>fruit","Catégorie:Fruits","<title>fruits</title>","plante","fleur"],
            ["animal","Catégorie:Animaux","zoologie","Catégorie:Coléoptères en français"],
            ["marque"],
            ["Métier","Religieux en français","métier"],
            ["pays"],
            ["Catégorie:Bataille","Homonymie de batailles","Catégorie:Conflit","Catégorie:Portail:Histoire",["Traité","Catégorie:Homonymie"],["Non","Naissance"]],
            ["Objet","Armement","boîte","Instrument","objet","vêtement","Vêtement","Outils"],
            ["Prénom","prénom"],
            ["Géographie","géographie","Lexique en français de la géographie",["Non","Noms propres"]],
            ["Ville d'Europe","Localités d'Allemagne",["Ville","Angleterre"],["Ville","Europe"]],
            ["Ville du Monde","Ville","ville"],
            ["Œuvre d'Art","Série","Architecture","Sculpture","Peinture","Dessin","Musique","Littérature","Danse","Théâtre","Cinéma","Photographie","Bande dessinée","Jeu video","Homonymie de titre"]
            ];
                str=strwiki+str;
            bool=listeVerif(verifWiktionary,str);
    if(bool){
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
        let data2={categorie:theme,mot:mot};
        $.ajax({
            type:"post",
            url:"/PetitBac/ajoutMot.php",
            data:data2,
        })
        $("#lb").css("display","none");
        $("#suivant").css("display","inline");
    }else{
        nbp++;
        $("#nbp").text(nbp);
        let moy;
        if(nbp!=0){
        moy=Math.round(score/nbp*100);
        }else{
        moy=0;    
        }
        $("#moy").text(moy);
        $("#res").text("Mauvaise Réponse");
        let data={pseudo:pseudo,score:score,nb_partie:nbp,en_attente:ea};
        $.ajax({type:"post",
        url:"/PetitBac/saveScore.php",
        data:data,
        })
        $("#spanajout").css("display","block");
        $("#lb").css("display","none");
        $("#suivant").css("display","inline");
    }
        }