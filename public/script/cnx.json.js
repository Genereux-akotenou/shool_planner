/* -----------------------------------------------------------------------
cnx est une librairie, bibliothèque développée en javascript par jpconnexion et claudecnx sous forme de classe.

Copyright et règles d'utilisation:
L'utilisation de ce code ou tout code dérivé est soumis à notre accord
Merci de laisser ces lignes
Merci de nous faire parvenir toutes les évolutions de code que vous pouvez apporter à cette classe
Pour nous contacter:
claudecnx@blanquefort.net

Pour insérer ce fichier: Penser à actualiser le chemin selon votre besoin
<script src="http://jpconnexion.free.fr/jpclibrary_script/cnx.json.js"></script>
en localhost faire
<script src="../jpclibrary_script/cnx.json.js"></script>
----------------------------------------------------------------------- */

(function(){ //conteneur classe  {{{
	
cnx = { // rappel: ne supporte pas var dans sa déclaration {{{ 
	version: "jpc cnx version: 2012-02-29",
	author: "jpc claude cnx",
	
	//debugger {{{
	debug: false, //mode debogage activé si true, désactif par défaut
	
	trace: {
		init: function(){ 
			/* -----------------
			créer la div si elle n'existe pas
			initialise this.objetDiv
			---------- */
			this.objetDiv=document.getElementById("id_print");//teste si la <div> existe
			if (this.objetDiv == null) { //créer la <div> si elle n'existe pas encore
				this.objetDiv = document.createElement("div");
				this.objetDiv.id = "id_print";
				this.objetDiv.style.position = "absolute";
				this.objetDiv.style.left = "900px";
				this.objetDiv.style.top="200px";
				this.objetDiv.style.width = "500px"; //dimensionne la <div>
				this.objetDiv.style.height= "250px"; //dimensionne la <div>
				this.objetDiv.style.overflow= "scroll"; //ajoute les ascenseurs
				this.objetDiv.style.visibility = "hidden";
				cnx.appendTo(document.body, this.objetDiv); //document.body.appendChild(objetDiv);
			}
		},
		
		print: function(str_print){
			/* ----------------------------------------
			code de la div asociée:
			<div  id="id_print" style="visibility:hidden; ">Surveillance et déboggage</div> 

			cnx.trace.debug = true; //ne s'affiche que si cnx.trace.debug = true
			cnx.trace.print(data);
			----------------------------------------- */
			cnx.trace.init(); //créer la div si elle n'existe pas
			if (cnx.trace.debug){ //ne s'affiche que si debug est vrai!
				this.objetDiv.style.visibility="visible"; //rend visible la <div> automatiquement
				var ecriture = this.objetDiv.innerHTML;
				ecriture = str_print + "<BR>" + ecriture;
				this.objetDiv.innerHTML = ecriture;
			} else this.objetDiv.style.visibility = "hidden";
		},
		top: function(str_value){
			cnx.trace.init(); //créer la div si elle n'existe pas
			cnx.setTop(str_value, this.objetDiv);
		},
		debug: false //si false n'affiche rien - dernière instruction, pas de virgule pour IE
	},
	
	surv: function(str_surveillance){
		/* ----------------------------------------
		Surveillance et débogage
		code de la div asociée:
		<div  id="id_surveillance" style="visibility:hidden; ">Surveillance et déboggage</div> 
		
		ne s'affiche que si cnx.debug = true
		
		cnx.debug = true;
		cnx.surv(data);
		----------------------------------------- */
		var objetDiv=document.getElementById("id_surveillance");//teste si la <div> existe
		if (objetDiv == null) { //créer la <div> si elle n'existe pas encore
			var objetDiv = document.createElement("div");
			objetDiv.id = "id_surveillance";
			objetDiv.style.position = "absolute";
			objetDiv.style.left = "900px";
			objetDiv.style.top="200px";
			this.appendTo(document.body, objetDiv); //document.body.appendChild(objetDiv);
		}
		if (cnx.debug){
			objetDiv.style.visibility="visible"; //rend visible la <div> automatiquement
			objetDiv.style.width = "500px"; //dimensionne la <div>
			objetDiv.style.height= "250px"; //dimensionne la <div>
			objetDiv.style.overflow= "scroll"; //ajoute les ascenseurs
			var ecriture = objetDiv.innerHTML;
			ecriture = str_surveillance + "<BR>" + ecriture;
			objetDiv.innerHTML = ecriture;
		} else objetDiv.style.visibility = "hidden";
		
		
	},	
	//fin de debugger }}}
	

	
	// file {{{
	searchExtension: function(chaine){ //	{{{
		var extension = chaine.substring(chaine.lastIndexOf("."));
		if (extension == -1)	extension = false; //retourne -1 si rien trouvé! pour mémoire -1 est différent de false
		return extension; 
	}, //	}}}
	
	include: function (){	//ajoute un fichier js ou css	{{{
		if (!document.getElementById)	return;
		for (i=0; i<arguments.length; i++){
			var str_fullFileName=arguments[i];
			var extension = cnx.searchExtension(str_fullFileName);
			if (extension == ".js"){ //Inclusion d'un fichier javascript
				var js_script = document.createElement("script");
				js_script.type = "text/javascript"; //js_script.setAttribute("type", "text/javascript");
				js_script.src = str_fullFileName; //js_script.setAttribute("src", str_fullFileName);
				document.getElementsByTagName("head")[0].appendChild(js_script); //document.getElementsByTagName("head").item(0).appendChild(js_script);
			}
			if (extension == ".css"){ //Inclusion d'une feuille de style css
				var css_style=document.createElement("link");
				css_cnx.setAttribute("rel", "stylesheet"); //css_cnx.rel = 'stylesheet';
				css_cnx.setAttribute("type", "text/css"); //css_cnx.type = 'text/css';
				css_cnx.setAttribute("href", str_fullFileName); //css_cnx.href = '../jpclibrary_script/slider.css';
				css_cnx.setAttribute("media", "screen"); //css_cnx.media = 'screen';
				document.getElementsByTagName("head")[0].appendChild(css_style);
			}
		}
	},	//	}}}
	
	isloadedCSS: function (stringFileCSS){	//	{{{
		/* -------------------------------------------------------------
		vérifie si un fichier CSS est chargé
		Parcours l'ensemble des fichiers CSS chargé
		Pour chacun des fichier CSS vérifie que les règles CSS sont bien présentes
		si le nombre de règles CSS = 0 le fichier n'est pas chargé ou ne contient aucun règle CSS, fichier vide!
		Ne gère pas les fichier CSS @import
		------------------------------------------ */
		var ie = document.all;
		var loading = false;
		for ( i = 0; i < document.styleSheets.length; i++ ){ //parcours tous les fichiers CSS chargés
			var fullfilenameCSS = document.styleSheets[i].href; //href retourne le chemin complet du fichier CSS
			if (isNotNull(fullfilenameCSS)){ //test si Null car @import retourne Null
				if (fullfilenameCSS.indexOf(stringFileCSS) > 0){ //si fullfilenameCSS contient stringFileCSS: le chemin complet contient le fichier CSS recherché
					//nota: indexOf() retourne -1 si la chaine recherchée (stringFileCSS) n'est pas contenue dans la chaine initiale (fullfilenameCSS)
					var nbr_reglesCSS = (ie)? document.styleSheets[i].rules.length : document.styleSheets[i].cssRules.length; //notation pour firefox, opera...
					if (nbr_reglesCSS > 0) loading = true; //si le fichier n'existe pas ou est vide ou ne contient que du commentaire, le nombre de rgle CSS = 0
				}
			}
		}
		if (!loading) alert('Style '+stringFileCSS+' non chargée!\n Insérer la ligne: \n <link rel="stylesheet" href="../jpclibrary_script/'+stringFileCSS+'"> \n Et vérifier le chemin.');
		return loading; //true si chargé avec ces règles CSS, autremant false
	},	//	}}}
	
	isloadedjs: function (string_variable, stringfichier){	//teste si un fichier javascript est chargé	{{{
		var string_error_msg = ' \n Classe '+stringfichier+' non chargée!\n Insérer la ligne: \n <script src="../jpclibrary_script/'+stringfichier+'"></script> \n Et vérifier le chemin.';
		isDefined(string_variable, string_error_msg, false);
	},	//	}}}
	// fin de fichiers }}}
		
	// node {{{
	appendTo: function(parent, child){	// ajoute un enfant à un parent	{{{
		
		/* ----------------------------
		Ajoute un élément enfant (child) à un élément parent
		this.parent = (this.parent)? this.parent: document.body;
		cnx.AppendTo(document.body, enfant);
		----------------------------- */
		parent.appendChild(child);
	},	//	}}}
	
	removeElt: function (elt){ //détruit un élément	{{{
		var elt = cnx.getElt(elt); //accepte id ou object, renvoie false si elt n'existe pas
		if (!elt) return false; // si elt n'existe pas retourne false
		var parent = cnx.nodeParent(elt); //recherche le parent
		parent.removeChild(elt); //retire l'enfant, donc le détruit
		/*
		for (prop in elt){
			prop = null;
		}
		elt = null;
		*/
		return true;
	},	//	}}}
	
	listeProp: function (elt){ //lit et affiche toutes les propriétés d'un élément HTML	{{{
		var elt = cnx.getElt(elt); //si elt est id, retourne objet HTML associé
		for (prop in elt) {
			document.write("Propriété : " + prop + " -> " + elt[prop] + "<br>");
		} 
		return false;
    },	//	}}}
	
	changeId: function(ancienID, newID){	// modifie l'id d'un élément	{{{
		var elt = document.getElementById(ancienID);
		if (isNotNull(elt)) {
			elt.id = newID;
			var retour = true;
		} else var retour= false;
		return retour;
	},	//	}}}
		
	getNodeInfo: function(elt, tagName) { //affiche des informations choisies sur un elt et ses enfants {{{
		/* 
		cnx.getChildNodes(document); //liste toute la page html mais c'est long! 
		cnx.getChildNodes("identificateur"); //liste les informations de l'objet ayant pour id = "identificateur"
		cnx.getChildNodes("identificateur", "INPUT"); //liste toutes les balises <INPUT> contenues dans elt
		*/
		elt = cnx.getElt(elt); //si id transmit trouve elt associé
		if (!tagName) tagName = false; //si tagName n'existe pas tagName = false
		var Container = "Object Container: "+elt.nodeName +" / "+elt;
		var Identifiant = "\n has for id : " + elt.id;
        var Parent;
        (cnx.nodeParent(elt)) ? Parent = "\n has for Parent: "+cnx.nodeParent(elt).nodeName + " / "+ cnx.nodeParent(elt) : Parent = "\n #document has no Parent";
        var GrandParent;
        (cnx.nodeParent(elt, 2)) ? GrandParent = "\n has for Grand-Parent: "+cnx.nodeParent(elt, 2).nodeName + " / "+ cnx.nodeParent(elt, 2) :GrandParent = "\n  has not Grand-Parent";
        var Children = "\n has " +cnx.nodeChild(elt) +" children";
        var Attributs = "\n has "+ cnx.nodeAttributes(elt)+" attributes : " ;
        //var Attribut2s = "\n has "+ cnx.nodeProp(elt)+" Propriétés : " ;
        var Type = "\n is type : " + cnx.nodeType(elt) + " / " + elt.nodeType;
        var Contents = "\n it's contents : " + cnx.nodeContents(elt);
        
        if (!tagName)	alert(Container+Identifiant+Parent+GrandParent+Children+Attributs+Type+Contents + "\n Search Mode: all Tag"); //liste tous les elt si tagName est faux

        if( (tagName) && (tagName.toLowerCase() == elt.nodeName.toLowerCase() ) ){ //ne liste que les elt correspondant à la balise
        	alert(Container+Identifiant+Parent+GrandParent+Children+Attributs+Type+Contents + "\n Search in Tag : " + elt.nodeName); 
        } 


        for (var i = 0; i < elt.childNodes.length; i++) { //cherche les enfants
                var child = elt.childNodes[i]; //liste les enfants
                cnx.getNodeInfo(child, tagName); //appel récurssif pour chaque enfant du node
        }
        return elt.childNodes.length; // retourne le nombre d'enfants pour listage éventuel

    }, // }}}
	
	nodeContents: function(elt){// retourne le contenu d'un élément{{{ 
		if (cnx.isString(elt))	elt = document.getElementById(elt); // si String cherche élément objet
		var contents;
		switch(elt.nodeType){
		case 1: //ELEMENT_NODE
			contents = elt.innerHTML;
			break;
		case 2:
			//contents = "ATTRIBUTE_NODE";
			break;
		case 3: //TEXT_NODE
			contents=elt.data;
			break;
		case 4:
			//contents="CDATA_SECTION_NODE";
			break;
		case 5:
			//contents="ENTITY_REFERENCE_NODE";
			break;
		case 6:
			//contents="ENTITY_NODE";
			break;
		case 7:
			//contents="PROCESSING_INSTRUCTION_NODE";
			break;
		case 8:
			//contents="COMMENT_NODE";
			break;
		case 9:
			//contents="DOCUMENT_NODE";
			break;
		case 10:
			//contents="DOCUMENT_TYPE_NODE"
			break;
		case 11:
			//contents="DOCUMENT_FRAGMENT_NODE";
			break;
		case 12:
			//contents="NOTATION_NODE";
			break;
		default:
			//contents="Undefined_Node";
			break;
		}
		return contents;
	},//}}}
	
	nodeType: function(elt){// retourne le type d'un élément{{{ 
		if (this.isString(elt))	elt = document.getElementById(elt); // si String cherche élément objet
		var type;
		switch(elt.nodeType){
		case 1:
			type = "ELEMENT_NODE";
			break;
		case 2:
			type = "ATTRIBUTE_NODE";
			break;
		case 3:
			type="TEXT_NODE";
			break;
		case 4:
			type="CDATA_SECTION_NODE";
			break;
		case 5:
			type="ENTITY_REFERENCE_NODE";
			break;
		case 6:
			type="ENTITY_NODE";
			break;
		case 7:
			type="PROCESSING_INSTRUCTION_NODE";
			break;
		case 8:
			type="COMMENT_NODE";
			break;
		case 9:
			type="DOCUMENT_NODE";
			break;
		case 10:
			type="DOCUMENT_TYPE_NODE";
			break;
		case 11:
			type="DOCUMENT_FRAGMENT_NODE";
			break;
		case 12:
			type="NOTATION_NODE";
			break;
		default:
			type="Undefined_Node";
			break;
		}
		return type;
	},//}}}
	
	nodeChild: function(elt, binary){// retourne le nombre d'enfants d'un élément HTML ou un Array() contenant les enfants {{{ 
		/*
		var n = cnx.nodeChild(elt); //retourne le nombre d'enfants
		var tab = cnx.nodeChild(elt, true); //retourne un Array() contenant la liste des enfants; utiliser split() pour le détail
		for (var i=0; i<tab.length; i++) {
			document.write("tableau[" + i + "] = " + tab[i] + "<BR>");
		}
		*/
		elt = cnx.getElt(elt); // si String cherche élément objet
		var tab = new Array();
		for (var i = 0; i < elt.childNodes.length; i++) {
			//elt.childNodes[i];
			tab[i] = elt.childNodes[i]; //penser à string.split(separateur)
		}
		if (binary) return tab; //penser à string.split(separateur)
		else	return i; //retourne le nombre d'enfants d'un élément HTML; elt.childNodes.length ne retourne rien! Donc il faut i!!!
	},// }}}
		
	nodeAttributes: function(elt, binary){// retourne le nombre d'attributs ou un tableau avec les attributs {{{ 
		/*
		var n = cnx.nodeAttributes(elt); //retourne le nombre d'attributs
		var tab = cnx.nodeAttributes(elt, true); //retourne un Array() contenant la liste des attributs; utiliser split() pour le détail
		for (var i=0; i<tab.length; i++) {
			document.write("tableau[" + i + "] = " + tab[i] + "<BR>");
		}
		*/
		elt = cnx.getElt(elt);  // si String cherche élément objet
		if (!elt.attributes) return 0;
		if (!binary)	return elt.attributes.length; //retourne le nombre d'attributs
		else {
			var tab = new Array();
			for (var i=0; i < elt.attributes.length; i++){
				tab[i] = elt.attributes[i].nodeName + "=>" +elt.attributes[i].nodeValue; //penser à string.split(separateur)
			}
			return tab;
		}
	},//}}}
	
	nodeParent: function(elt, niv){// renvoi l'élément parent quelque soit son tag, juste le parent ou grand parent{{{
		/*----------------------------------------------------
		Permet de récupérer l'élément parent
			- elt: élément source (this) - nota peut être un id
			- niv: niveau du parent à récupérer, optionnel permet de chercher un grand parent!
		exemple d'utilisation:
		var parent_table = searchParent(objetCellule); //retourne la row
		avec nodeName retourne le nom de l'élément et "BODY" pour document.body
		---------------------------------------------------- */
		if (cnx.isString(elt))		elt = document.getElementById(elt); // si string cherche élément objet
		(niv==undefined || niv<1) ? niv=1 : niv=niv;// On initialise le niveau à 1 si besoin est.
		if (elt.nodeName == "#document") return null; // "#document" est le premier ancestre de tous les objet HTML et n'a pas de parent
		if (niv != 1 && elt.parentNode){  // Si le nombre de niveaux demandé n'est pas atteint on continue
			return this.nodeParent(elt.parentNode, niv -= 1); 
		} else {
			return elt.parentNode; // retourne l'objet.
		}
	},//}}}
	
	searchParent: function(elt, tag, niv){// renvoi l'élément parent correspondant à un Tag donné {{{
		/*----------------------------------------------------
		Author: jsgorre Jean-sébastien sur javascript codes sources
		Permet de récupérer l'élément parent correspondant à un Tag donné
			- tag: Nom du type d'élément à récupérer: exemple TABLE
			- elt: élément source (this) - nota peut être un id
			- niv: niveau du parent à récupérer, optionnel
		exemple d'utilisation:
		var parent_table = searchParent(objetCellule, "TABLE"); //retourne la table parent
		---------------------------------------------------- */
		elt = cnx.getElt(elt); // si string cherche élément objet
		if(elt == false) return false; //gestion d'erreur

		(niv==undefined || niv<1) ? niv=1 : niv=niv;// On initialise le niveau à 1 si besoin est.
	
		if (elt.parentNode.nodeName == "#document")		return false;    // Le document a été parcouru entièrement et aucune balise n'a été trouvée        
		
		if (elt.parentNode.nodeName != tag){ // Si la balise ne correspond pas on continue la recherche                             
			return this.searchParent(elt.parentNode, tag, niv);	
		} else if (niv!=1 && elt.parentNode.parentNode.nodeName==tag){  // Si le nombre de niveaux demandé n'est pas atteint et qu'il reste des balises correspondantes on continue
			return this.searchParent(elt.parentNode, tag, niv-=1); 
		} else {
			return elt.parentNode; // Sinon on renvoie l'id de la balise correspondante
		}
	},//}}}
	
	firstChild: function (elt,tagName){ //retourne le premier tagName parmi la collection des tagName d'un elt, soit tagName[0] {{{
		if (this.isString(elt))		elt = document.getElementById(elt); // si string cherche élément objet
		var elts = elt.getElementsByTagName(tagName);
		return elts && elts.length>0 ? elts[0] : null;
	}, // }}}
	
	getElt: function (elt){ // retourne un objet même si id fournit {{{
		var object = cnx.isString(elt)	? document.getElementById(elt) : elt;
		if (cnx.isNull(object))	object = false;
		return object;
	}, // }}}
	
	isElt: function (elt){	//elt est soit un objet soit un id: renvoie true si objet HTML; sinon false	{{{
		if (cnx.isString(elt))	elt = document.getElementById(elt);
		return !!(elt && elt.nodeType == 1); // issu de la classe Prototype: true si elt HTML autrement false
	},	//	}}}
	
	
	
	// fin de node }}}

	// event {{{
	postCoord: false, //mettre à true dans votre programme pour afficher les coordonnées de la souris
	funcEvent: false, //contient le nom de la fonction associée pour les event non standards type mousewheel
	
	mouseWheel: function (e){ // Event handler for mouse wheel event - DOMMouseScroll{{{
		/** --------------------
		script trouvé sur:
		http://www.switchonthecode.com/tutorials/javascript-tutorial-the-scroll-wheel
		http://www.adomas.org/javascript-mouse-wheel/
		http://ajaxian.com/archives/javascript-and-mouse-wheels
		----------------------- */
		e = e ? e : window.event;
		var wheelData = e.detail ? e.detail * -1 : e.wheelDelta / 40; //mvt du scroll
		if (wheelData) eval("cnx.funcEvent(e, wheelData)"); //appel de la function associée: func(e, delta) - delta>0 scroll Up - delta<0 scroll down
		//return cnx.cancelEvent(e); //cancelEvent() inhibbe le scroll si besoin
		//return false; //ne pas utiliser return false car sous IE cela empêche l'exécution du scroll associé à mousewheel, donc même effet que cnx.cancelEvent()
	}, // }}}
	
	cancelEvent: function(e) { // arrête l'exécution d'un event ex: scroll wheel {{{
		e = e ? e : window.event;
		if(e.stopPropagation)	e.stopPropagation();
		if(e.preventDefault)	e.preventDefault();
		e.cancelBubble = true;
		e.cancel = true;
		e.returnValue = false;
		return false;
	}, // }}}
	
	onEvent: function(eventName, func, elt){ // affecte un event avec la méthode on...{{{
		/* -----------------
		normalement cette fonction est appelée par cnx.addEvent()
		mais elle peut aussi être appelée directement
		---------------------- */
		var elt = cnx.getElt(elt); // si String cherche élément objet
		eventName = eventName.toLowerCase(); //met en minuscule le nom de l'évènement
		if(eventName.indexOf("on") == 0) eventName = eventName.substring(2, eventName.length);//transforme onclick en click
		var oldEvent = elt["on" + eventName]; //mémorise les anciens évènements déjà appliqués: elt.onmousedown
		if (typeof oldEvent != "function")	elt["on" + eventName] = func; //applique directement la function
		else {
			elt["on" + eventName] = function() {
				if (oldEvent)	oldEvent(); //applique les anciens event
				func(); //ajoute le nouvel event
			}
		}
	}, // }}}
	
	addEvent: function (eventName, func, elt, propagation) {//{{{
		/*-----------------------------------
		elt est soit un objet soit un id d'un objet (donc string id)
		eventName est de type string "load" ou "onLoad" pour onload
		func est le nom de la fonction - ne pas mettre les parenthèses On écrira affiche et non pas affiche()
		
		sous Firefox mousedown nécessite un traitement spécial pour éviter les conflits avec mousemove lors des drag and drop
		
		exemple: addEvent( "load", affiche, window);
		function affiche() { alert(1); }
		--------------------------------------*/
		var elt = cnx.getElt(elt); // si String cherche élément objet
		
		eventName = eventName.toLowerCase(); //met en minuscule le nom de l'évènement
		if(eventName.indexOf("on") == 0) eventName = eventName.substring(2, eventName.length);//transforme onclick en click
		
		if (!propagation) 	propagation = false;
		
		switch(eventName) { //nom de l'event en minuscule sans le on
			case "mousedown":
				if (elt.attachEvent)	elt.attachEvent("on" + eventName, func); //Ne pas oublier le "on" pour IE
				else { //n'est pas IE
					cnx.onEvent("onmousedown", func, elt); //appelle l'event suivant la méthode onmousedown
				}
				break;
			
			case "mousewheel": //onmousewheel - transmet une fonction spécifique haut/bas 
				cnx.funcEvent = func; //transmet le nom de la fonction à cnx.wheel()
				if(elt.addEventListener)  {
					elt.addEventListener('DOMMouseScroll', cnx.mouseWheel, false); //FF only - name event spécifique pour FF
					elt.addEventListener(eventName, cnx.mouseWheel, false);
				}
				else if(elt.attachEvent){
					if (elt == window)	elt = document; //IE ne supporte pas window, seulement document
					elt.attachEvent("on" + eventName, cnx.mouseWheel); //IE
				}
				break;
			
			default:
				if (elt.attachEvent)	elt.attachEvent("on" + eventName, func); //Ne pas oublier le "on" pour IE
				else	elt.addEventListener(eventName, func, propagation);//mettre un 3ième argument pour les autres navigateurs FF - optionnel au delà de la version 6 de FF}
				break;
		}
		return false;
	},//}}}
	
	removeEvent: function(eventName, func, elt){ // retire un event d'un objet {{{
		var elt = cnx.getElt(elt); //existence de elt as object or as string - id
		if (eventName == "DOMMouseScroll")	eventName = "mousewheel"; //DOMMouseScroll est spécifique FF
		if(element.removeEventListener)	{
		if(eventName == 'mousewheel')	element.removeEventListener('DOMMouseScroll', func, false); // pour FF 
		element.removeEventListener(eventName, func, false);//chrome ou opéra ou (FF si pas mousewheel)
		}
		else if(element.detachEvent)	element.detachEvent("on" + eventName, func); //pour IE

	}, // }}}
	
	getEvent: function(e){//retourne l'évènement{{{ 
		if (!e) e = window.event; //IE ne returne pas (e) pas offre une propriété window.event
		return e; //  e.type 	fourni le type de l'évènement: ex mousedown
	},//}}}
	
	getTarget: function(e){ //renvoie la cible d'un évènement{{{
		var cible;
		if (!e) var e = window.event; //IE ne returne pas (e) pas offre une propriété window.event
		if (e.target) cible = e.target;
		else if (e.srcElement) cible = e.srcElement;
		if (cible.nodeType == 3) 	cible = cible.parentNode; // defeat Safari bug
		return cible;
		/* ------------------------------------------
		cible.id //identificateur de l'objet si il existe
		cible.name //nom de l'objet ou undefined
		cible.tagName //type de l'objet input, body H1 p ...
		cible.object //confirme que sa nature est un objet, fourni l'objet lui-même cad cible en fait!
		--------------------------------------- */
	},// }}}
	
	getType: function(e){ //renvoi le type de l'Event {{{
		if (!e) e = window.event; //IE ne returne pas (e)
		return e.type;
	}, // }}}
	
	isleft: function(e){	//	{{{
		var isleftbutton = (window.event)? (window.event.button==1): (e.type=="mousedown")? (e.which==1): false;
		return isleftbutton; //ex si bouton.right=true alors bouton droit cliqué
	},	//	}}}
	
	isright: function(e){	//	{{{
		var isrightbutton = (window.event)?(window.event.button==2): (e.which==3); //window.event pour browser clone IEX et e.which pour browser clone FF
		return isrightbutton; //ex si bouton.right=true alors bouton droit cliqué
	},	//	}}}
	
	
	ismiddle: function(e){	//	{{{
		var ismiddlebutton = (window.event)? ((window.event.button==3) || (window.event.button==4)): (e.which==2);
		return ismiddlebutton; //ex si bouton.right=true alors bouton droit cliqué
	},	//	}}}
	
	clientX: function(e){	//	{{{
		var clientX = (window.event)?(window.event.clientX): (e.clientX);// Position horizontale sur le client
		return clientX;
	},	//	}}}
	
	clientY: function(e){	//	{{{
		var clientY = (window.event)?(window.event.clientY): (e.clientY);// Position verticale sur le client
		return clientY;
	},	//	}}}
	
	screenX: function(e){	//	{{{
		var screenX = (window.event)?(window.event.screenX): (e.screenX);// Position horizontale à l'ecran du pointeur de la souris
		return screenX;
	},	//	}}}
	
	screenY: function(e){	//	{{{
		var screenY = (window.event)? (window.event.screenY): (e.screenY);// Position verticale à l'ecran du pointeur de la souris
		return screenY;
	},	//	}}}
	
	pageScrollX: function(e){	//pageX avec le scroll pour IE: X correspond à left	{{{
		var pageX = (window.event) ? (window.event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft) : (e.pageX);// Position horizontale sur la page du pointeur de la souris
		return pageX; //position par rapport à left
	},	//	}}}
	
	pageScrollY: function(e){	//pageY avec le scroll pour IE: Y correspond à top	{{{
		var pageY = (window.event) ? (window.event.clientY + document.body.scrollTop + document.documentElement.scrollTop) : (e.pageY);// Position verticale sur la page du pointeur de la souris
		return pageY; //position par rapport à top
	},	//	}}}

	pageX: function(e){	//sous IE ne tient pas compte du scroll, utiliser pageScrollX pour coordonnées avec le scroll	{{{
		var pageX = (window.event)?(window.event.clientX): (e.pageX);// Position horizontale sur la page du pointeur de la souris
		return pageX;
	},	//	}}}
	
	pageY: function(e){	//sous IE ne tient pas compte du scroll, utiliser pageScrollY pour coordonnées avec le scroll	{{{
		var pageY = (window.event)?(window.event.clientY): (e.pageY);// Position verticale sur la page du pointeur de la souris
		return pageY;
	},	//	}}}


	
	
	
	ismousedown: function(e){	//	{{{
		var rep; //variable pour la réponse
		var nomEvent = cnx.getType(e); //nom ou type du dernier Event
		(nomEvent == "mousedown")? rep=true: rep=false; //vrai si Event = mousedown
		return rep;
	},	//	}}}
	
	ismouseup:  function(e){	//	{{{
		var rep; //variable pour la réponse
		var nomEvent = cnx.getType(e); //nom ou type du dernier Event
		(nomEvent == "mouseup")? rep=true: rep=false; //vrai si Event = mousedown
		return rep;
	},	//	}}}
	
	ismousemove: function(e){	//	{{{
		var rep; //variable pour la réponse
		var nomEvent = cnx.getType(e); //nom ou type du dernier Event
		(nomEvent == "mousemove")? rep=true: rep=false; //vrai si Event = mousedown
		return rep;
	},	//	}}}

	isclick: function(e){	//	{{{
		var rep; //variable pour la réponse
		var nomEvent = cnx.getType(e); //nom ou type du dernier Event
		(nomEvent == "click")? rep=true: rep=false; //vrai si Event = mousedown
		return rep;
	},	//	}}}
	
	isdblclick: function(e){	//	{{{
		var rep; //variable pour la réponse
		var nomEvent = cnx.getType(e); //nom ou type du dernier Event
		(nomEvent == "dblclick")? rep=true: rep=false; //vrai si Event = mousedown
		return rep;
	},	//	}}}
	
	iscontextmenu: function(e){	//	{{{
		var rep; //variable pour la réponse
		var nomEvent = cnx.getType(e); //nom ou type du dernier Event
		(nomEvent == "contextmenu")? rep=true: rep=false; //vrai si Event = mousedown
		return rep;
	},	//	}}}
	
	
	mousemove_afficheCoord: function(e){ //affiche les coord de la souris qui suivent le curseur de la souris	{{{
		if (!document.getElementById("cnxMouseCoordId" || cnx.postCoord == true || document.body)){
			var cnxMouseCoord = document.createElement("div");
			cnxMouseCoord.id = "cnxMouseCoordId";
			cnxMouseCoord.style.position = "absolute";
			cnxMouseCoord.style.visible = "hidden";
			document.body.appendChild(cnxMouseCoord);
		}
		var cursor = document.getElementById("cnxMouseCoordId");
		if (cnx.postCoord== true){
			cursor.style.visible = "visible";
			cursor.style.backGroundColor = "Transparent";
			cursor.innerHTML = "Left: "+cnx.pageScrollX(e) + "px"+ " Top: "+cnx.pageScrollY(e) + "px"; //Left
			cursor.style.top = cnx.pageScrollY(e)  + 1 + "px"; //décalage pour even mouseover et lecture
			cursor.style.left = cnx.pageScrollX(e) + 1 + "px";
		} 
		else cursor.style.visible = "hidden";

		return false;
	},	//	}}}
	
	// fin de gestion des évènements   }}}
	
	//styles {{{
	appendStyle: function (styles) {// permet ajouter un style CSS via un fichier js, le CSS est inclus dans le js{{{
		/* -------------------------------------------
		Appending Style Nodes with Javascript by Jon Raasch
		
		Permet d'ajouter des styles directement dans un js
		Il faut définir les styles comme ceci:
		
		var styles = '#header { color: red; font-size: 40px; font-family: Verdana, sans; }';
		styles += ' .content { color: blue; text-align: left; }';
		---------------------------------------- */
		var css = document.createElement('style');
		css.type = 'text/css';
		
		if (css.styleSheet) css.styleSheet.cssText = styles;
		else css.appendChild(document.createTextNode(styles));
		
		document.getElementsByTagName("head")[0].appendChild(css); //ajoute le style
	},//}}}

	isClassName: function (sClassName, elt){//search className{{{
		/*
		Cherche tous les syles de type className appliqué à un objet elt
		puis recherche si le style est trouvé dans l'ensemble de ces styles
		*/
		var recherche = false;
		elt = cnx.getElt(elt); // si String cherche élément objet
		if(elt == false)	return false;
		var liste_className = elt.className;//retourne tous les styles de type className en une seule liste séparée par un espace
		tab_className = liste_className.split(" ");//transforme la liste en un tableau contenant chacun des className appliqués à elt
		for(var i = 0 ; i < tab_className.length ; i++){ //parcours le tableau pour voir si l'objet est un contener
			if(tab_className[i] == sClassName){
				recherche = true;
			}
		}
		return recherche;
	}, //}}}
	
	addClassName: function(sClassName, elt) { //ajoute un className{{{
		var s = elt.className;
		var p = s.split(" ");
		var l = p.length;
		for (var i = 0; i < l; i++) {
			if (p[i] == sClassName)
				return;
		}
		p[p.length] = sClassName;
		elt.className = p.join(" ").replace( /(^\s+)|(\s+$)/g, "" );
		return true;
	}, //}}}

	removeClassName: function(sClassName, elt) {//retire un className{{{
		var s = elt.className;
		var p = s.split(" ");
		var np = [];
		var l = p.length;
		var j = 0;
		for (var i = 0; i < l; i++) {
			if (p[i] != sClassName)
				np[j++] = p[i];
		}
		elt.className = np.join(" ").replace( /(^\s+)|(\s+$)/g, "" );
		return true;
	}, //}}}
	
	elt: "", //élément HTML sur lequel nous pointons
	
	unit: "", //fourni l'unité de mesure: exemple: "px"

	getStyle: function(str_style, elt) { //lit la valeur du style {{{
		/* -----------------------------------
		getstyle() renvoie la valeur du style
		id_element est l'identificateur de l'élément (div, img ...), donc String, mais gère aussi les object
		style est le nom du style dont la valeur sera retournée: width, height, top, left ...
		en fonction de la propriété testée getstyle retourne une String ou un Interger, voire #FFF ou rgb() ...
		------------------------- */
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		var str_value = (cnx.elt).style[cnx.toJavascriptStyleName(str_style)]; //lecture des styles intégré au code HTML
		if(!str_value){ //lecture de style dans un fichier CSS ou équivallent
			if(document.defaultView)	str_value = document.defaultView.getComputedStyle(cnx.elt, null).getPropertyValue(str_style); //FF et Opera
			else if((cnx.elt).currentStyle)	str_value = (cnx.elt).currentStyle[cnx.toJavascriptStyleName(str_style)]; //IEX
		}
		return str_value; //String: => width: "100px",  faire:  parseInt(str_value) pour integer
	}, // }}}
	
		
	
	setStyle: function(str_style, str_value, elt) {	// applique un style {{{
		/* ------------------------------
		setstyle() sert à définir, à appliquer une valeur à une style
		(cnx.elt) est l'identificateur de l'élément: div, img, donc String, mais gère aussi les object
		str_style est le nom du style à modifier: width, top, ... au format html avec tiret et String
		str_value est la nouvelle valeur du style à appliquer à id_element
		----------------------------- */
		cnx.elt = cnx.getElt(elt);
		var op_correct = false;
		if (cnx.elt)	op_correct = (cnx.elt).style[cnx.toJavascriptStyleName(str_style)] = str_value; //retourne str_value si opération correctement effectuée
		return op_correct;
	},	// }}}
	
	
	getUnit: function(str_value){ // retourne l'unité utilisée; exemple: "px"  {{{
		var modele = /[0-9]/g; //recherche tous les nombres
		cnx.unit = str_value.replace(modele, ""); //retourne la partie texte, donc l'unité utilisée
		return cnx.unit; //String
	},	// }}}
	
	getWidth: function(elt){	// {{{

		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		var str_value = cnx.getStyle("width", cnx.elt);
		if (str_value == "auto"){ //gestion pour IE qui retourne auto si la table s'ajsute automatiquement à la fenetre
			var largeur = cnx.elt.offsetWidth;
			cnx.unit = "px";
		}
		else {
			var largeur =  parseInt(str_value); 
			cnx.unit = cnx.getUnit(str_value); //unité utilisée: cnx.unit
		}
		return parseInt(largeur); // c'est un integer
	},	// }}}
	
	setWidth: function(str_value, elt){	//	{{{
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		str_value = (cnx.isString(str_value)) ? str_value : str_value + "px"; //vérifie que c'est un String
		cnx.unit = cnx.getUnit(str_value); //unité utilisée: cnx.unit
		cnx.setStyle("width", str_value, cnx.elt); //applique le style
		return parseInt(str_value); //retourne un integer
	},	//	}}}
	
	getTruePosition: function(elt){ // retourne la position d'un elt par rapport à la page (y compris avec ascenseur et parent en position absolue) {{{
		/*----------
		script trouvé sur: http://forum.hardware.fr/hfr/Programmation/HTML-CSS-Javascript/javascript-connaitre-position-sujet_45951_1.htm
		code de Hermés le messager sur ce forum
		
		<img src="../images/back.gif" width="116" height="16" id="smile01" class="dragRelative" >
		var pos = cnx.getpos("smile01");
		pos.x contient la position par rapport au bord gauche de la page web, soit un offsetLeft global
		pos.y contient la position par rapport au bord haut de la page web, soit un offsetTop global
		-------- */
		elt = cnx.getElt(elt); //gère id ou objet HTML
		var objet = new Object(); //genère un objet; si objet = elt on provoque une erreur avec FF version 3, mais avec les nouvelles versions de FF ni IE
		var x = 0;
		var y = 0;
		while (elt.tagName != 'BODY'){ //tant que BODY n'est pas le parent
			x += elt.offsetLeft;
			y += elt.offsetTop;
			elt = elt.offsetParent;
		}
		objet.x = x; //offsetLeft global à la page web
		objet.y = y; //offsetTop global à la page web
		//alert("getPos: "+x+" : "+y);
		return objet; //contient l'objet HTML initial avec 2 propriétés x=left; y=top par rapport à la page web même si ascenseur
	}, // }}}
	 
	getTrueLeft: function(elt){ // position left par rapport à la page y compris si ascenseur et parent en position absolue {{{
		var elt = cnx.getTruePosition(elt); //retourne x, y postion de elt par rapport à la page y compris si ascenseur et parent en position absolue
		return elt.x; // x => left: as integer
	}, // }}}
	
	getTrueTop: function(elt){ // position top par rapport à la page y compris si ascenseur et parent en position absolue {{{
		var elt = cnx.getTruePosition(elt); //retourne x, y postion de elt par rapport à la page y compris si ascenseur et parent en position absolue
		return elt.y; // y => top: as integer
	}, // }}}
	
	getTrueHeight: function(elt) { //taille réelle d'une image ici height{{{
		var image = cnx.getElt(elt); //récupère l'image soit par id soit par objet
		var newImg = new Image();// Declaration d'un objet Image
		newImg.src = image.src;// Affectation du chemin de l'image a l'objet
		var h = newImg.height;// On recupere les tailles reelles
		var w = newImg.width;// On recupere les tailles reelles
		newImg = null; //détruit image
		return h; //as integer
	}, // }}}
	
	getTrueWidth: function(elt) { //taille réelle d'une image ici width{{{
		var image = cnx.getElt(elt); //récupère l'image soit par id soit par objet
		var newImg = new Image();// Declaration d'un objet Image
		newImg.src = image.src;// Affectation du chemin de l'image a l'objet
		var h = newImg.height;// On recupere les tailles reelles
		var w = newImg.width;// On recupere les tailles reelles
		newImg = null; //détruit image
		return w; //as integer
	}, // }}}

	
	setTop: function(str_value, elt){	//	{{{
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		str_value = (cnx.isString(str_value)) ? str_value : str_value + "px"; //vérifie que c'est un String
		cnx.unit = cnx.getUnit(str_value); //unité utilisée: cnx.unit
		cnx.setStyle("top", str_value, cnx.elt); //applique le style
		return parseInt(str_value); //retourne un integer
	},	//	}}}
	
	getTop: function(elt){	//	{{{
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		var str_value = cnx.getStyle("top", cnx.elt);
		if (str_value == "auto")	str_value = cnx.elt.offsetTop + "px";
		cnx.unit = cnx.getUnit(str_value); //unité utilisée: cnx.unit
		return parseInt(str_value); //integer
	}, 	//	}}}
	
	setLeft: function(str_value, elt){	//	{{{
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		str_value = (cnx.isString(str_value)) ? str_value : str_value + "px"; //vérifie que c'est un String
		cnx.unit = cnx.getUnit(str_value); //unité utilisée: cnx.unit
		cnx.setStyle("left", str_value, cnx.elt); //applique le style
		return parseInt(str_value); //retourne un integer
	},	//	}}}
	
	getLeft: function(elt){	//	{{{
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		var str_value = cnx.getStyle("left", cnx.elt);
		if (str_value == "auto")	str_value = cnx.elt.offsetLeft + "px";
		cnx.unit = cnx.getUnit(str_value); //unité utilisée: cnx.unit
		return parseInt(str_value); //integer
	}, 	//	}}}
	
	setPosition: function(strPosition, elt){ //	{{{
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		cnx.setStyle("position", strPosition, cnx.elt); 
		return strPosition;
	},	//	}}}
	
	getPosition: function(elt){	//	{{{
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		var strPosition = cnx.getStyle("position", cnx.elt); 
		return strPosition;
	},	//	}}}
	
	getRight: function(elt){ //	{{{
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		var str_value = cnx.getStyle("right", cnx.elt);
		if (str_value == "auto")	str_value = cnx.elt.offsetRight + "px";
		cnx.unit = cnx.getUnit(str_value); //unité utilisée: cnx.unit
		return parseInt(str_value); //integer
	}, //	}}}
	
	setRight: function(str_value, elt){	//	{{{
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		str_value = (cnx.isString(str_value)) ? str_value : str_value + "px"; //vérifie que c'est un String
		cnx.unit = cnx.getUnit(str_value); //unité utilisée: cnx.unit
		cnx.setStyle("right", str_value, cnx.elt); //applique le style
		return parseInt(str_value); //retourne un integer
	}, // }}}
	
	getHeight: function(elt){ //	{{{
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		var str_value = cnx.getStyle("height", cnx.elt);
		if (str_value == "auto")	str_value = cnx.elt.offsetHeight + "px";
		cnx.unit = cnx.getUnit(str_value); //unité utilisée: cnx.unit
		return parseInt(str_value); //integer
	}, //	}}}
	
	setHeight: function(str_value, elt){	//	{{{
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		str_value = (cnx.isString(str_value)) ? str_value : str_value + "px"; //vérifie que c'est un String
		cnx.unit = cnx.getUnit(str_value); //unité utilisée: cnx.unit
		cnx.setStyle("height", str_value, cnx.elt); //applique le style
		return parseInt(str_value); //retourne un integer
	}, // }}}
	
	
	setBottom: function(str_value, elt){	//	{{{
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		str_value = (cnx.isString(str_value)) ? str_value : str_value + "px"; //vérifie que c'est un String
		cnx.unit = cnx.getUnit(str_value); //unité utilisée: cnx.unit
		cnx.setStyle("bottom", str_value, cnx.elt); //applique le style
		return parseInt(str_value); //retourne un integer
	},	//	}}}
	
	getBottom: function(elt){	//	{{{
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		var str_value = cnx.getStyle("bottom", cnx.elt);
		if (str_value == "auto")	str_value = cnx.elt.offsetBottom + "px";
		cnx.unit = cnx.getUnit(str_value); //unité utilisée: cnx.unit
		return parseInt(str_value); //integer
	}, 	//	}}}
	
	setVisibility: function(strVisibility, elt){ //	{{{
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		if (strVisibility == true) strVisibility = "visible";
		if (strVisibility == false) strVisibility = "hidden";
		cnx.setStyle("visibility", strVisibility, cnx.elt); 
		return strVisibility;
	},	//	}}}
	
	getVisibility: function(elt){	//	{{{
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		var strVisibility = cnx.getStyle("visibility", cnx.elt); 
		return strVisibility;
	},	//	}}}
	
	setMultipleStyle: function(str_style, elt){ // {{{
		/* ----------------------------
		Reçoit une chaine de caractères de type : position:absolute; left: 10px; top: 20px;
		Applique alors chacun de ces styles
		--------------------- */
		cnx.elt = (elt) ?  cnx.getElt(elt) : cnx.elt;
		var table_array = cnx.styleExtraction(str_style); //retourne la liste des styles et leur valeur décomposée en un seul array
		for (var i=0; i<table_array.length; i = i+2) { //parcours le tableau contenant le nom et la valeur des styles à appliquer
			cnx.setStyle(table_array[i], table_array[i+1], cnx.elt); //i est le nom du style, i+1 sa valeur à appliquer
		}
	}, // }}}

	styleExtraction: function(chaine){ // {{{
		/* -----------------------------------------
		En HTML il est possible de définir un style comme suit:
		<img src="image.gif" style="position: absolute; border: 1px;" />
		Nous avons souhaité reproduire dans la classe style cette possibilité
		Ecrire sur une seule ligne plusieurs instructions de style
		Tout en gardant également un format similaire au HTML
		Il nous fallait alors pouvoir décomposer cette ligne en instruction pour chacun des styles employés
		Tel est le rôle de styleExtraction()
		------------------------------------------- */
		chaine = trim(chaine); //supprime les espaces en début et fin de chaine
		var reg=new RegExp("[ :;]+", "g"); //expression régulière, recherche dans toute la chaineles caractères : et ; en éliminant les espaces interne
		var tableau = chaine.split(reg); //transforme la chaine de caractères en tableau en fonction des critères de recherche de l'expression régulière
		var fin = tableau.length -1; //cherche l'indice du dernier élément du tableau
		if (tableau[fin].length == 0) tableau.pop(); //supprime le dernier élément si son contenu est null
		return tableau; //retourne un tableau à partir de la chaine de caractères passée en paramètre
	}, // }}}
	
	toJavascriptStyleName: function(text){ // {{{
		/* ----------------------------------------
		En HTML le nom de certains styles s'écrive avec un tiret comme: background-color
		Ce même style en javascript s'écrit	en supprimant le tiret: backgroundColor
		toJavascriptStyleName() permet de transformer un style composé avec tiret en un style format javascript
		sur les autres nom de style, rien ne se produit
		---------------------------- */
		var modele= /-/;
		while(modele.test(text)){
			var pos=text.search(modele);
			text=text.substring(0, pos) + text.charAt(pos+1).toUpperCase() + text.substring(pos+2, text.length);
		}
		return text;
	}, // }}}
	
	setOpacity: function(opacity, elt) { // Opacité {{{
		/* ---------------------
		script trouvé sur: http://www.supportduweb.com/scripts_tutoriaux-code-source-32-changer-l-opacite-d-un-div-alpha-compatibles-avec-tous-les-navigateurs.html
		opacity as integer between 0 /100
		100 => opacité = 100% le texte est normal
		0 => opacité = 0% le texte est totalement transparent, donc un texte en noir sur fond blanc avec opacity=0 disparaît! => totalement transparent
		------------------------- */
		var elt = cnx.getElt(elt); //reçoit id ou object HTML, retourne Object HTML
		if (!elt) return false;
		//var color = cnx.getStyle("background-color", elt);

		elt.style["filter"] = "alpha(opacity="+opacity+")";
		elt.style["-moz-opacity"] = opacity/100;
		elt.style["-khtml-opacity"] = opacity/100;
		elt.style["opacity"] = opacity/100;
		return true;
	}, // }}}
	
	// fin de styles }}}

	// logique et is quelquechose {{{
	trim: function (aString) { // Supprime les espaces inutiles en début et fin de la chaîne passée en paramètre.{{{
		/* ---------------------------------------------------
		Retourne la chaîne sans ses espaces
		Trouver sur: http://anothergeekwebsite.com/fr/2007/03/trim-en-javascript
		Trim en Javascript
		Posted 20. March 2007 - 10:28 by papy.reno
		----------------------------------------------------- */
		if (aString.trim())		return aString.trim(); //new browser
		var regExpBeginning = /^\s+/;
		var regExpEnd = /\s+$/;
		return aString.replace(regExpBeginning, "").replace(regExpEnd, "");
	},//}}}
	
	ltrim: function (aString) { // Supprime les espaces inutiles en début de la chaîne passée en paramètre{{{
		/* ---------------------------------------------------
		Retourne la chaîne sans ses espaces
		Trouver sur: http://anothergeekwebsite.com/fr/2007/03/trim-en-javascript
		Trim en Javascript
		Posted 20. March 2007 - 10:28 by papy.reno
		----------------------------------------------------- */
		if (aString.trimLeft())		return aString.trimLeft(); //new browser
		var regExpBeginning = /^\s+/;
		return aString.replace(regExpBeginning, "");
		},//}}}


	rtrim:function (aString) { // Supprime les espaces inutiles en fin de la chaîne passée en paramètre.{{{
		/* ---------------------------------------------------
		Retourne la chaîne sans ses espaces
		Trouver sur: http://anothergeekwebsite.com/fr/2007/03/trim-en-javascript
		Trim en Javascript
		Posted 20. March 2007 - 10:28 by papy.reno
		----------------------------------------------------- */
		if (aString.trimRight())	return aString.trimRight(); //new browser
		var regExpEnd = /\s+$/;
		return aString.replace(regExpEnd, "");
	},	//	}}}
	
	leftSubstring: function(chaine, strSearch){ //recherche la racine d'un élément; partie gauche d'une chaine de caractère; équivallent à search_racine {{{
		if(cnx.isObject(chaine)) chaine = chaine.id; //transforme un objet en id en cas de besoin
		var leftRacine = chaine.substring(0, chaine.indexOf(strSearch)); //retourne la partie à gauche de chaine par rapport à strSearch
		return leftRacine;
	},	//	}}}

	d2b: function (int_d) {return int_d.toString(2);}, //transforme un nombre décimal en une chaine binaire
	b2d: function (str_h) {return parseInt(str_h,2);}, //transforme une chaine binaire en un entierdécimal
	d2o: function (int_d) {return int_d.toString(8);}, //transforme un nombre décimal en une chaine octal
	o2d: function (str_h) {return parseInt(str_h,8);}, //transforme une chaine octal en un entier décimal
	d2h: function (int_d) {return int_d.toString(16);}, //transforme un nombre décimal en une chaine hexadécimale
	h2d: function (str_h) {return parseInt(str_h,16);}, //transforme une chaine hexadécimale en un entier décimal
	chr: function (int_ascii) {return String.fromCharCode(int_ascii);}, //retourne le caractère correspondant au code ASCII fournit en argument (type décimal)
	asc: function (str_chaine, int_pos) {return str_chaine.charCodeAt(int_pos);}, //retourne le caractère ASCII situé à int_pos dans la chaine de caractère str_chaine

	RGBtoHex: function(int_R,int_G,int_B) { //Conversion Couleur: fournie en RGB en un code hexa{{{
		return cnx.toHex(int_R)+cnx.toHex(int_G)+cnx.toHex(int_B); //return a string, penser à ajouter "#" pour afficher une couleur
		},//}}}

	toHex: function(N) {//{{{
		if (N==null) return "00";
		N=parseInt(N);
		if (N==0 || isNaN(N)) return "00";
		N=Math.max(0,N);
		N=Math.min(N,255);
		N=Math.round(N);
		return "0123456789ABCDEF".charAt((N-N%16)/16) + "0123456789ABCDEF".charAt(N%16);
	},//}}}

	HextoRGB: function(str_Hex){ //Conversion Couleur: attention il faut le # dans str_Hex; Converti une couleur fournie en hexa en un code RGB{{{
		var colorRGB = new Object();
		colorRGB.R = this.HexToR(str_Hex);
		colorRGB.G = this.HexToG(str_Hex);
		colorRGB.B = this.HexToB(str_Hex);
		return colorRGB; //il faut récupérer chacune des composantes R G B de l'objet colorRGB
	}, //}}}
	
	HexToR: function(h) {	//Conversion Couleur	{{{
		return parseInt((this.cutHex(h)).substring(0,2),16);
	},	//	}}}
	HexToG: function(h) {	//Conversion Couleur	{{{
		return parseInt((this.cutHex(h)).substring(2,4),16);
	},	//	}}}
	HexToB: function(h) {	//Conversion Couleur	{{{
		return parseInt((this.cutHex(h)).substring(4,6),16);
	},	//	}}}
		
	cutHex: function(h) {	//Conversion Couleur	{{{
		return (h.charAt(0)=="#") ? h.substring(1,7):h;
	},	//	}}}
	
	isNotNull: function(elt){ //{{{
		(elt == null)?  retour = false:  retour = true;
		return retour; //renvoie true si la donnée n'est pas null
	}, //}}}

	isNull: function(elt){ //{{{
		(elt == null)?  retour = true:  retour = false;
		return retour; //renvoie true si le donées est null
	}, //}}}

	isNumber: function(elt){	//	{{{
		return typeof elt === "number";
	},	//	}}}

	isString: function(elt){	//	{{{
		return typeof elt === "string";
	},	//	}}}

	isUndefined: function(elt) {	//	{{{
		return typeof elt === "undefined"; //retourne true si undefined
	},	//	}}}
	
	isNotUndefined: function(elt) {	//	{{{
		return !cnx.isUndefined(elt); //revoie true si la variable est définie, autrement false
	},	//	}}}
		

	isArray: function(elt) {	//	{{{
		/* ---------------------------------------
		Array et Object avec typeof retourne "object";
		Array possède une propriété length qui peut être 0 si aucun élément dans le tableau;
		Object n'a pas de propriété length et Object.length => undefined
		-------------------------------------------- */
		return typeof elt === "object" && (elt.length > -1); 
	},	//	}}}

	isObject: function(elt) {	//	{{{
		/* -------------------------------------------------
		Object et Array avec typeof retourne "object";
		Object n'a pas de propriété length et Object.length => undefined;
		Array a toujours une propriété length qui peut être égale à 0 en l'absence d'élément dans le tableau
		------------------------------------------ */
		return	typeof elt === "object" && typeof elt.length === "undefined";
	},	//	}}}

	isTable: function(elt){	//	{{{
		/* --------------------------
		on cherche à tester un objet <table>
		<table> est un objet avec une collection rows
		-------------------------------- */
		return this.isObject(elt) && this.isNotNull(elt.rows);
	},	//	}}}

	isFunction: function(elt) {	//	{{{
		/* ------------------------------------------
		une classe JSON: var a={} retourne "object" et non pas "function" avec typeof;
		une classe closure retourne "function"
		les "function" ont une propriété length qui semble toujours = 0!
		----------------------------------------- */
		return typeof elt === "function"; 
	},	//	}}}

	isWhat: function(elt){ //return un "string" donnant le type de l'élément {{{
		if (this.isNull(elt)) return "null";
		else {
			if (this.isNumber(elt)) return "number";
			if (this.isString(elt)) return "string";
			if (this.isUndefined(elt)) return "undefined";
			if (this.isArray(elt)) return "array";
			if (this.isObject(elt)) return "object";
			if (this.isFunction(elt)) return "function";
		}		
	},	//	}}}
	
	isDefined: function(variableAsString, defaultValue) {	//	{{{
		/* ------------------------------------------------------------------
		variableAsString:  c'est à dire si data est le nom de la variable, reçoit "data"
		defaultValue: valeur par défaut à appliquer si la variable n'existe pas
		si defaultValue est ommis il aura la valeur false
		
		Permet de tester l'existence d'une variable: non pas son contenu, mais sa déclaration.
		Permet de tester is not Defined qui est différend de undefined!
		is not defined signifie que la variable n'existe pas!
		Cela entraine donc une erreur d'où la gestion d'erreur associée à ce programme!
		
		Par défaut créer la variable si elle nexiste pas en lui affectant defaultValue qui vaut false en absence d'autre valeur
		cnx.isDefined("variable"); ou	 cnx.isDefined("variable", 2);
		----------------------------------------------- */
		if (!defaultValue) 	defaultValue = false;//teste l'existence de la variable defaultValue et lui affecte par défaut la valeur: false
		var existe = true; //nous supposons que la variable existe, est définie!
		try {
			eval(variableAsString); //evalue, calcule la variable
		} 
		catch(error) {
			existe = false; //il y a une erreur, donc la variable n'est pas définie
			//alert("catch: "+error); 
		}
		finally {
			if(!existe)	{eval(variableAsString+"='"+defaultValue+"';")}; //donne une valeur par defaut à la variable testée si elle n'existe pas
			return existe;
		}
	},	//	}}}
	
	isNotDefined: function(variableAsString, valeur) {	//	{{{
		/* ------------------------------------------------------------------
		variableAsString:  c'est à dire si data est le nom de la variable, reçoit "data"
		valeur: valeur par défaut à appliquer si la variable n'existe pas
		si valeur est ommis il aura la valeur false
		
		Permet de tester l'existence d'une variable: non pas son contenu, mais sa déclaration.
		Permet de tester is not Defined qui est différend de undefined!
		is not defined signifie que la variable n'existe pas!
		Cela entraine donc une erreur d'où la gestion d'erreur associée à ce programme!
		
		Par défaut créer la variable si elle nexiste pas en lui affectant valeur qui vaut false en absence d'autre valeur
		if (cnx.isNotDefined("essai")) { //est true si essai n'existe pas, autrement est false
		essai = cnx.isNotDefined("essai"); 	//si essai n'existe pas, génère une variable essai qui contient true, si essai existe déjà elle conserve sa valeur intiale  
		essai = cnx.isNotDefined("essai", 2); //si essai n'existe pas, génère une variable essai qui contiendra 2, autrement essai conserve sa valeur initiale
		----------------------------------------------- */
		var erreur = false; //nous supposons qu'il n'y a pas d'erreur donc que la variable existe, est définie!
		try {
			eval(variableAsString); //evalue, calcule la variable
		} 
		catch(error) {
			erreur = true; //il y a une erreur, donc la variable n'est pas définie
			//alert("catch: "+error); 
		}
		finally {
			if(erreur)	{ //une erreur existe, donc la variable n'est pas définie
				if (valeur || valeur == 0 || valeur == false){ //valeur existe, je veux créer la variable
					/*
					var texte = variableAsString+'="'+valeur+'";';
					eval(texte); //génére la variable; en fait pas utile
					*/
					return valeur;
				}
				else{ //valeur n'existe pas, je ne veux pas créer la variable
					return erreur;
				}
			}
			else { //la variable existe
				return eval(variableAsString); //je retourne la valeur de la variable qui existe
			}
		}
	},	// retourne true ou false: true si erreur, donc variable non définie initialement et mise à false par défaut}}}
	
	isHash: function(object) { // fonction issu de la classe Prototype {{{
		return object instanceof Hash;
	},	//	}}}
	
	// fin de logique et is quelquechose }}}
	
	// divers {{{
	generatePassword: function(plength){ //	{{{
		//Un generateur de mot de passe - par lecodejava.com
		if (this.isNull(plength)) var plength=16; //alloue une longueur par défaut
		var keylist="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789";
		var password=""; //initialise le password
		for (var i=0; i<plength; i++)
			password += keylist.charAt(Math.floor(Math.random()*keylist.length)); //calcule le mot de passe rendu aléatoire pat Math.random, Math.floor retourne un entier
		return password;
	},	//	}}}
	
	aleatoire: function(nombreTirages, nombreMax, nombreMini){
		/* --------------------------
		PLF- http://www.jejavascript.net/
		Ce script effectue un tirage où chaque numéro ne peut être tiré qu'une seule fois.
		On tire nombreTirages nombre compris entre nombreMini et nombreMax
		si nombreMini est ommis, alors nombreMini vaut 1
		----------------------------- */
		var contenuTirage = new Array;
		var nombre;
		if (!nombreMini)	nombreMini = 1; //gestion d'erreur
		var nombreMaxTirages = nombreMax - nombreMini +1;
		if (nombreTirages > nombreMaxTirages)		nombreTirages = nombreMaxTirages; //gestion erreur
		for (i=0; i < nombreTirages ;i++){
			nombre = Math.floor(Math.random() * nombreMax)+1; //retourne un nombre au hasard entre 1 et nombreMax
			if (nombre >= nombreMini){
				contenuTirage[i]= nombre;
				for (t=0 ; t < i ;t++){
					if (contenuTirage[t]==nombre){ //si nombre existe déjà refait un tirage en décrémentant i
						i--;
					}
				}
			}
			else i--;
		}
		if (nombreTirages == 1){
			var retour = contenuTirage[0];
			return retour;
		}
		return contenuTirage;
	},
	// fin de divers }}}
	
	// browser navigateur {{{

	IE: navigator.userAgent.indexOf('MSIE') > -1,
	FF: navigator.userAgent.indexOf('Firefox') > -1,
	Opera:  Object.prototype.toString.call(window.opera) == '[object Opera]',
	WebKit:         navigator.userAgent.indexOf('AppleWebKit/') > -1,
	Gecko:          navigator.userAgent.indexOf('Gecko') > -1 && navigator.userAgent.indexOf('KHTML') === -1,
	Chrome:			navigator.userAgent.indexOf('Chrome') > -1,
	MobileSafari:   /Apple.*Mobile/.test(navigator.userAgent),

	// fin de browser navigateur }}}
	
	generator: "jEdit" //ne pas mettre de virgule ou point virgule
	
};  //	}}}

cnx.addEvent( "mousemove", cnx.mousemove_afficheCoord, document, false); //document.onmousemove = drag_mousemove;

})(); //end of class claudecnx.cnx}}}
