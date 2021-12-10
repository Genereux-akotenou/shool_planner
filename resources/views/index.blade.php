<!DOCTYPE html>
<html lang="fr">
<head>
    <!-- basic config  -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- webpage icon  -->
    <link rel="icon" type="image/png" sizes="48x48" href="/favicon.png">
    <!-- Style sheet   -->
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/responsive.css">
    <!-- Icon package  -->
    <link rel="stylesheet" href="css/font-awesome.min.css">
    <!-- Scripts link  -->
    <script src="script/my_script.js"></script>
    <!-- window title  -->
    <title>Atelier GL</title>
    <!-- 20210914_0921 -->
</head>
<body>
    <header> 
        <div class="header">
            <a href="/"><div class="gButton gLogo"> <span class="dot"></span> SCHOOL PLANNER</div></a>
            <a href="/login"><div class="gButton">CONNEXION</div></a>
        </div>
    </header>
    <main>
        <div class="planning">
            <div class="planning-header">
                <select class="kind-selector" name="" id="">
                    <option value="all">tous</option>
                    <option value="room">salle</option>
                    <option value="projector">projecteur</option>
                    <option value="computer">ordinateur</option>
                </select>
                <select class="data-selector" name="" id="">
                    <option value="07 / 12 / 2021">07 / 12 / 2021</option>
                    <option value="08 / 12 / 2021">08 / 12 / 2021</option>
                    <option value="09 / 12 / 2021">09 / 12 / 2021</option>
                </select>
            </div>
            <div class="planning-content">
                <div class="planning-obj"> 
                    <div class="t_type">Salle</div>
                    <div class="t_name">Amphi B1000</div>
                    <div class="t_time">07:45 - 12:30</div>
                    <div class="t_emtity">by FLAAC/ISST - Vague 1</div>
                </div>
                <div class="planning-obj"> 
                    <div class="t_type">Salle</div>
                    <div class="t_name">Amphi Teleton</div>
                    <div class="t_time">07:45 - 12:30</div>
                    <div class="t_emtity">by FLAAC/ISST - Vague 2</div>
                </div>
                <div class="planning-obj"> 
                    <div class="t_type">Salle</div>
                    <div class="t_name">Amphi Amoussouga</div>
                    <div class="t_time">15:00 - 18:30</div>
                    <div class="t_emtity">by EPAC - Cycle Ingenerie 2</div>
                </div>
                <div class="planning-obj"> 
                    <div class="t_type">Projecteur</div>
                    <div class="t_name">ISS82/B01/IFRI/DEV</div>
                    <div class="t_time">08:00 - 12:30</div>
                    <div class="t_emtity">by IFRI-IM3</div>
                </div>
                <div class="planning-obj"> 
                    <div class="t_type">Salle</div>
                    <div class="t_name">Amphi Etisalat</div>
                    <div class="t_time t_free">non occupé</div>
                    <div class="t_emtity">-</div>
                </div>
                <div class="planning-obj"> 
                    <div class="t_type">Salle</div>
                    <div class="t_name">Salle MOOCS</div>
                    <div class="t_time t_free">non occupé</div>
                    <div class="t_emtity">-</div>
                </div>
                <div class="planning-obj"> 
                    <div class="t_type">Salle</div>
                    <div class="t_name">Amphi Jean-Pliya</div>
                    <div class="t_time t_free">non occupé</div>
                    <div class="t_emtity">-</div>
                </div>
                <!-- <div class="emptyResult">Oups! rien à aficher.</div> -->
                <!-- <img width="100px" class="loader" src="/img/gif/load2.gif" alt=""> -->
            </div>
        </div>
    </main>
    <footer>
        
    </footer>
</body>
</html>