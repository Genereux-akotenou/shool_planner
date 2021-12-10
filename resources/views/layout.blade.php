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
            @if(auth()->check())
                <a href="/logout"><div class="gButton"><i style="position: relative; right: 0.5em;" class="fa fa-hand-o-left"></i> DECONNEXION</div></a>
            @else
                <a href="/login"><div class="gButton">CONNEXION</div></a>
            @endif
        </div>
    </header>
    <main>
        <div class="planning">
            <div class="planning-header planning-header-prof">
                <!-- -------------------------------------------- -->
                <div class="menu">
                    @if(auth()->check())
                        <a class="current1" href="/planning"><div class="menuBtn">VOIR PLANNING</div></a>
                        <a class="current2" href="/reservation-step1"><div class="menuBtn">RESERVATION</div></a>
                        <a class="current3" href="/edit-recap"><div class="menuBtn">EDITER RECAP.HORAIRE</div></a>
                        <a class="current4" href="/read-recap"><div class="menuBtn">VOIR RECAP.HORAIRE</div></a>

                    @endif
                </div>
                <!-- -------------------------------------------- -->
                <div>
                    <form action="/filterer-reservation" method="post" id="gBrainForm">
                        {{ csrf_field(); }}

                        <select class="kind-selector disabled" name="type_input" id="type" required>
                            <option value="default">type</option>
                            <option value="tous">tous</option>
                            <option value="salle">salle</option>
                            <option value="projecteur">projecteur</option>
                            <option value="ordinateur">ordinateur</option>
                        </select>
                        <select class="data-selector disabled" name="date_input" id="date" required>
                            <?php
                                setlocale(LC_ALL, 'fr_FR.utf8', 'fra').': ';
                            ?>
                            @for($i = 0; $i < 3; $i++)
                                <option value="{{ date('Y-m-d', time()+(86400*$i)) }}">{{ strftime('%A %d %B %Y', time()+(86400*$i)); }}</option>
                            @endfor
                        </select>
                    </form>
                </div>
                <script>
                    document.getElementById('type').addEventListener('change', () => {
                        if(document.getElementById('type').value == 'default'){
                            document.getElementById('type').style.borderColor = "red";
                        }
                        else{
                            document.forms['gBrainForm'].submit();
                        }
                    });
                    document.getElementById('date').addEventListener('change', () => {
                        if(document.getElementById('type').value == 'default'){
                            document.getElementById('type').style.borderColor = "red";
                        }
                        else{
                            document.forms['gBrainForm'].submit();
                        }
                    });
                </script>
            </div>
            <div class="planning-content">

            <!-- ----------------------------------------------- -->

                @yield('content')

            <!-- ----------------------------------------------- -->

            </div>
        </div>
    </main>
    <footer>

    </footer>
</body>
</html>
