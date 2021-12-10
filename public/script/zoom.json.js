/* ----------------------------
Permet de faire un effet zoom sur une image style le site de la redoute
l'image est identifiée par <img class="cnxzoom" ...
voir notamment:
http://www.laredoute.fr/vente-jupe-et-string-ficelle.aspx?productid=324196784&documentid=999999&categoryid=44596656&cod=4132fr4311144847141

Copyright et règles d'utilisation:
L'utilisation de ce code ou tout code dérivé est soumis à notre accord
Merci de laisser ces lignes
Merci de nous faire parvenir toutes les évolutions de code que vous pouvez apporter à ce logiciel
Pour nous contacter:
claudecnx@blanquefort.net

Pour insérer ce fichier: Penser à actualiser le chemin selon votre besoin
<script src="http://jpconnexion.free.fr/jpclibrary_script/cnx.json.js"></script>
<script src="http://jpconnexion.free.fr/jpclibrary_script/zoom.json.js"></script>
en localhost faire
<script src="../jpclibrary_script/cnx.json.js"></script>
<script src="../jpclibrary_script/zoom.json.js"></script>
---------------------------- */
cnx.zoom = function(){ //conteneur classe loupe {{{

	var style_zoomcnx = ".copiedivcnx{border-color: #cccccc; border-style: solid; border-width: 1px;position: absolute; z-index: 5; overflow: hidden;}"; //écrit le style 
	style_zoomcnx += ".curseurcnx {border-color: #cccccc;	border-style: solid; border-width: 1px;	height: 150px; left: -75px;	position: absolute;	top: -75px;	width: 150px; z-index: 5;}";
	style_zoomcnx += ".cnxzoom {border-color: #cccccc; border-style: solid;	border-width: 1px;}"
	cnx.appendStyle(style_zoomcnx); //ajoute le style className .copiedivcnx dans la balise <head>
	
zoom = { //	{{{
	version: "loupe JSON version 2011-12-22",
	iszoom: false, //contient l'image cible dont nous devons faire un effet zoom
	ratio: false, //ratio entre taille actuelle et taille réelle de l'image
	actualWidth: false, //largeur actuelle de l'image cible
	actualHeight: false, //hauteur actuelle de l'image cible
	realLeft: false, //postion réelle de l'image cible par rapport à la page web
	realTop: false, //postion réelle de l'image cible par rapport à la page web

	mouseover: function(e){ // identifie image et crée la copie {{{
		if (zoom.iszoom)	return false; //les div existe déjà
		var cible = cnx.getTarget(e);
		if (cnx.isClassName("cnxzoom", cible)){ //l'image doit effectivement avoir un effet zoom -teste le style class cnxzoom
			//cnx.surv("In: " + cible.id);
			zoom.iszoom = cible; //mémorise l'image cible
			
			/* recherche des dimensions et position de l'image cible */
			var realWidth = cnx.getTrueWidth(cible); //taille réelle de l'image
			var realHeight = cnx.getTrueHeight(cible); //taille réelle de l'image
			zoom.actualWidth = cnx.getWidth(cible); //taille actuelle de l'image
			zoom.actualHeight = cnx.getHeight(cible); //taille actuelle de l'image
			zoom.ratio = realWidth / zoom.actualWidth; //ratio entre taille réelle et taille actuelle de l'image à zoomer
			zoom.realLeft = cnx.getTrueLeft(cible); //position réelle de l'image
			zoom.realTop = cnx.getTrueTop(cible); //position réelle de l'image
			var decalage = 20; //décallage entre image actuelle et sa copie pour le zoom
			if (cnx.isClassName("cnxleft", cible)) var imagecopieàgauche = true;
			var copieLeft = (imagecopieàgauche) ? zoom.realLeft - zoom.actualWidth - decalage : zoom.realLeft + zoom.actualWidth + decalage; //position de la copie de l'image pour le zoom
			var copieTop = zoom.realTop; //position de la copie de l'image pour le zoom
			
			/* création de la div qui contiendra la copie de l'image en grandeur réelle */
			var copieDiv = document.getElementById("id_cnx_copiediv"); //teste si la <div> existe
			if (copieDiv == null) { //créer la <div> si elle n'existe pas encore
				var copieDiv = document.createElement("div"); //génère un objet virtuel pour la div copie
				copieDiv.id = "id_cnx_copiediv"; //attribution d'un id
				copieDiv.className = "copiedivcnx"; //ajoute un style de type class en HTML
				copieDiv.style.left = copieLeft + "px"; //position la div copie
				copieDiv.style.top= copieTop + "px"; //position la div copie
				copieDiv.style.width = zoom.actualWidth +"px"; //dimension de la div copie
				copieDiv.style.height = zoom.actualHeight + "px"; //dimension de la div copie
				
				/* insère l'image en taille réelle dans la div copie */
				var copieImg = new Image();// Declaration d'un objet Image
				copieImg.src = cible.src;// Affectation du chemin de l'image a l'objet
				copieImg.style.position = "absolute";
				copieImg.id = "id_cnx_copieimg"; //id de la copie de l'image
				
				cnx.appendTo(copieDiv, copieImg); //insère l'image en taille réelle dans la div copie
				cnx.appendTo(document.body, copieDiv); //document.body.appendChild(copieDiv); //insère la div copie dans la page web
			}
				
			/* création de la div curseur qui entoure le curseur de la souris */
			var curseurDiv = document.getElementById("id_cnx_divcurseur"); //teste si la <div> existe
			if (curseurDiv == null) { //créer la <div> si elle n'existe pas encore
				var curseurDiv = document.createElement("div"); //génère un objet virtuel pour la div curseur
				curseurDiv.className = "curseurcnx";
				curseurDiv.style.cursor = "crosshair";
				curseurDiv.id = "id_cnx_divcurseur";
				curseurDiv.style.backgroundColor = "#FFFFFF";
				cnx.appendTo(document.body, curseurDiv); //document.body.appendChild(curseurDiv); //dessine la div curseur dans la page web
				cnx.setOpacity(30, curseurDiv); //opacité à 30% - 0 => transparence totale - pour cet effet il faut un style type backgroundColor
			}
			
		}
	}, // }}}
	
	mouseout: function(e){ // ne détecte pas le out lors d'un mousewheel d'où la vérification dans mousemove {{{
		var cible = cnx.getTarget(e);
		if(cible.id == "id_cnx_divcurseur")	zoom.raz(); //teste si nous avons quitté la div curseur - efface tous les paramètres
		return false;
	}, // }}}
	
	raz: function(){ // efface les paramètres si la souris sort de l'image cible{{{
		cnx.removeElt("id_cnx_copieimg");//détruit image copie - taille réelle
		cnx.removeElt("id_cnx_copiediv");//détruit div copie
		cnx.removeElt("id_cnx_divcurseur"); //détruit la div autour du curseur de la souris
		
		zoom.iszoom = false; //contient l'image cible dont nous devons faire un effet zoom
		zoom.ratio = false; //ratio entre taille actuelle et taille réelle de l'image
		zoom.actualWidth = false; //largeur actuelle de l'image cible
		zoom.actualHeight = false; //hauteur actuelle de l'image cible
		zoom.realLeft = false; //postion réelle de l'image cible par rapport à la page web
		zoom.realTop = false; //postion réelle de l'image cible par rapport à la page web
	}, // }}}
	
	mousemove: function(e){ // gère  le zoom image {{{
		if (zoom.iszoom){ // teste si image zoom existe
			/**
			Détecte si je suis toujours au-dessus de l'image ou de la div curseur
			si ce n'est pas le cas zoom.raz() et return pour quitter le programme
			nécessaire car mouseout n'est pas actif lors d'un mousewheel - scrool roulette
			*/
			var cible = cnx.getTarget(e); //cible de l'event
			if (cible.id != "id_cnx_divcurseur" && cible != zoom.iszoom){ //je ne suis plus au-dessus de l'image - utile lors d'un mousewheel
				zoom.raz(); //efface tous les paramètres
				return false; // je quitte le programme
			}
			
			var cible = zoom.iszoom;
			x = cnx.pageScrollX(e); //left - position de la souris à l'écran
			y = cnx.pageScrollY(e); //top - position de la souris à l'écran
			
			/* dimension et position de la loupe curseur */
			var dim = 100; //dimension de la div autour du curseur
			cnx.setHeight(dim, "id_cnx_divcurseur"); //dimensionne la div qui suit le curseur
			cnx.setWidth(dim, "id_cnx_divcurseur"); //dimensionne la div qui suit le curseur
			var centre = dim / 2;
			var xLeft = x - centre;
			var yTop = y - centre;
			
			var maxLeft = zoom.realLeft + zoom.actualWidth - dim +2;
			if (xLeft > maxLeft)	xLeft = maxLeft; //bloque la div curseur dans l'image cible
			if(xLeft < zoom.realLeft)		xLeft = zoom.realLeft; //bloque la div curseur dans l'image cible

			var maxTop = zoom.realTop + zoom.actualHeight - dim + 2; //2 car cadre épaisseur 1px tout autour soit 1 en haut, 1 en bas => 2
			if (yTop > maxTop)	yTop = maxTop; //bloque la div curseur dans l'image cible
			if(yTop < zoom.realTop)		yTop = zoom.realTop;  //bloque la div curseur dans l'image cible
			
			var xLeft = cnx.setLeft(xLeft, "id_cnx_divcurseur"); //positionne la <div id="curseur"> de telle sorte que le pointer de la souris soit en son centre
			var yTop = cnx.setTop(yTop, "id_cnx_divcurseur"); //positionne la <div id="curseur"> de telle sorte que le pointer de la souris soit en son centre
			
			/*calcul du position de la souris par rapport à l'image cible pour l'effet zoom*/
			//cnx.surv("img ("+ zoom.realLeft +","+zoom.realTop + ") souris ("+x + ","+y+")"); //ligne de contrôle - alert()
			var relatif_left = zoom.realLeft - x; //distance entre bord gauche de l'image et la souris sur axe des x
			var relatif_top = zoom.realTop -y; //distance entre bord haut de l'image et la souris sur axe des y
			var dLeft = (relatif_left*(zoom.ratio-1)); //delta du déplacement de l'image en taille réelle
			var dTop = (relatif_top*(zoom.ratio-1)); // pourquoi ratio-1?
			cnx.setLeft(dLeft, "id_cnx_copieimg"); //positionne l'image agrandie
			cnx.setTop(dTop, "id_cnx_copieimg"); //positionne l'image agrandie
		}
	}, // }}}
	
	author: "claudecnx jpconnexion" //dernière instruction, ne pas mettre de virgule!
}; // }}}

cnx.addEvent("mouseover", zoom.mouseover, document); //onmouseover recherche image à zoomer
cnx.addEvent("mousemove", zoom.mousemove, document); //onmousemove fait deffiler l'image portant le zoom
cnx.addEvent("mouseout", zoom.mouseout, document); //onmouseout détruit les données mémorisée pour annuler le zoom

}(); //end of  cnx.loupe}}}