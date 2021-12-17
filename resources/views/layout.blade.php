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
    <script src="/script/jquery.min.js"></script>
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
            <div class="planning-header planning-header-prof d-flex flex-column">
                <!-- -------------------------------------------- -->
                <div class="menu">
                    @if(auth()->check())
                        <a class="current1" href="/planning"><div class="menuBtn">VOIR PLANNING</div></a>
                        <a class="current2" href="/reservation-step1"><div class="menuBtn">RESERVATION</div></a>
                        <a class="current3" href="/edit-recap"><div class="menuBtn">EDITER RECAP.HORAIRE</div></a>
                        <a class="current4" href="/read-recap"><div class="menuBtn">VOIR RECAP.HORAIRE</div></a>

                        <a class="current1" href="/planning"><div class="menuBtn menuBtn-mobil"><i class="fa fa-eye"></i></div></a>
                        <a class="current2" href="/reservation-step1"><div class="menuBtn menuBtn-mobil"><i class="fa fa-tasks"></i></div></a>
                        <a class="current3" href="/edit-recap"><div class="menuBtn menuBtn-mobil"><i class="fa fa-edit"></i></div></a>
                        <a class="current4" href="/read-recap"><div class="menuBtn menuBtn-mobil"><i class="fa fa-print"></i></div></a>
                    @endif
                </div>
                <!-- -------------------------------------------- -->
                <div>
                    <form action="/planning" method="post" id="gBrainForm">
                        {{ csrf_field(); }}

                        <span id="resultSwiper" class="result-swiper">
                            <!-- {{ session()->get('calendarForm') }} -->
                            @if(session()->get('calendarForm') == 'calendar' || session()->get('calendarForm') == null)
                                <i id="calendar" class="fa fa-calendar"></i>
                                <i id="listshow" class="fa fa-tasks hidden"></i>
                            @else
                                <i id="listshow" class="fa fa-tasks"></i>
                                <i id="calendar" class="fa fa-calendar hidden"></i>
                            @endif
                        </span>
                        <script>
                            $("#resultSwiper").on('click', function () {
                                // $.ajax({
                                //     method: 'GET',
                                //     url: '/preferences',
                                //     data: { calendarForm: document.getElementById('resultSwiper').children[0].id }
                                // })
                                window.location.href = '/preferences/'+document.getElementById('resultSwiper').children[1].id;
                            });
                        </script>

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
