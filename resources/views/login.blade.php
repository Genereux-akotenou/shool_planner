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
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="../css/responsive.css">
    <!-- Icon package  -->
    <link rel="stylesheet" href="../css/font-awesome.min.css">
    <!-- Scripts link  -->
    <script src="../script/my_script.js"></script>
    <!-- window title  -->
    <title>Atelier GL</title>
    <!-- 20210914_0921 -->
</head>
<body>
    <!-- --------------- -->
    <script>
        function swiperGate() {
            document.getElementsByClassName('gConnect1')[0].style.display="none"
            setTimeout(() => {
            document.getElementsByClassName('gConnect1')[0].style.opacity="0"

            }, 500);
            document.getElementsByClassName('gConnect2')[0].style.display="block"
            setTimeout(() => {
                document.getElementsByClassName('gConnect2')[0].style.opacity="1"
            }, 500);
        }
    </script>
    <!-- --------------- -->
    <header>
        <div class="header">
            <a href="/"><div class="gButton gLogo"> <span class="dot"></span> SCHOOL PLANNER</div></a>
            <a href="/"><div class="gButton"><i style="position: relative; right: 0.5em;" class="fa fa-hand-o-left"></i> ACCEUIL</div></a>
        </div>
    </header>
    <main>
        <!-- login gate-->
        <form class="gConnect gConnect1" action="/login" method="post">
            {{ csrf_field() }}

            <div class="login-form">
                <div class="teacherGate"><span>Portail enseignant</span></div>
                <br>

                @if($errors->has('status'))
                    <span id="hideMe" class="fail-login">{{ $errors->first('status') }}</span>
                @endif

                @if(session('state'))
                    <span id="hideMe" class="fail-login gBack-green">{{ session('state') }}</span>
                @endif

                <div class="gLineField m1-2 R-login">
                    <label for="">ADRESSE EMAIL</label>
                    <input class="" type="email" name="email" placeholder="email" value="{{ old('email') }}">
                    @if($errors->has('email'))
                        <span class="error-form">{{ $errors->first('email') }}</span>
                    @endif
                </div>

                <div class="gLineField">
                    <label for="">MOT DE PASSE</label>
                    <input class="" type="password" name="password" placeholder="">
                    @if($errors->has('password'))
                        <span class="error-form">{{ $errors->first('password') }}</span>
                    @endif
                </div>

                <div class="gLineField d-flex remb">
                    <div class="r-memory" style="display: flex;">
                        <input type="checkbox" name="remenber_me" id="remenber_me" style=" margin-right: 0.3em;" checked>
                        <label for="remenber_me">Se souvenir</label>
                    </div>
                    <p><button class="login">Se connecter</button></p>
                </div>

                <br>
                <div class="gLineFieldLast">
                    <p class="ttx gMt-2">Vous n'avez pas de compte? <a id="goToRegistration" class="float-right swp baseColor2-text">Inscrivez-vous</a></p>
                </div>
            </div>
        </form>

        <!-- registration gate-->
        <form class="gConnect gConnect2" action="/register" method="post">
            {{ csrf_field() }}


            <div class="login-form register-form">
                <div class="teacherGate"><span>Portail enseignant</span></div>

                @if($errors->has('status'))
                    <span id="hideMe" class="fail-login">{{ $errors->first('status') }}</span>
                @endif

                @if(session('state'))
                    <span id="hideMe" class="fail-login gBack-green">{{ session('state') }}</span>
                @endif

                <div class="gLineField m1-2">
                    <label for="">ADRESSE EMAIL</label>
                    <input class="" type="email" name="email-register" placeholder="email" value="{{ old('email-register') }}">
                    @if($errors->has('email-register'))
                        <span class="error-form">{{ $errors->first('email-register') }}</span>
                        <script> swiperGate(); </script>
                    @endif
                </div>

                <div class="gLineField">
                    <label for="">MOT DE PASSE</label>
                    <input class="" type="password" name="password-register" placeholder="">
                    @if($errors->has('password-register'))
                        <span class="error-form">{{ $errors->first('password-register') }}</span>
                        <script> swiperGate(); </script>
                    @endif
                </div>

                <div class="gLineField">
                    <label for="">CONFIRMATION DU MOT DE PASSE</label>
                    <input class="" type="password" name="password-register_confirmation" placeholder="">
                    @if($errors->has('password-register_confirmation'))
                        <span class="error-form">{{ $errors->first('password-register_confirmation') }}</span>
                        <script> swiperGate(); </script>
                    @endif
                </div>

                <div class="gLineField d-flex remb">
                    <div class="r-memory" style="display: flex;">
                        <!-- <input type="checkbox" name="remenber_me" id="remenber_me" style=" margin-right: 0.3em;" checked>
                        <label for="remenber_me">Se souvenir</label> -->
                    </div>
                    <p><button class="login">S'inscrire</button></p>
                </div>

                <div class="gLineFieldLast" style="margin-top: 1.1em;">
                    <p class="ttx gMt-2">Vous avez déjà un compte? <a id="goToLoginBox" class="float-right swp baseColor2-text">Connectez-vous</a></p>
                </div>
            </div>
        </form>
    </main>
    <footer>

    </footer>
    <script>
        document.getElementById('goToRegistration').addEventListener('click', function() {
            document.getElementsByClassName('gConnect1')[0].style.display="none"

            setTimeout(() => {
            document.getElementsByClassName('gConnect1')[0].style.opacity="0"

            }, 500);
            document.getElementsByClassName('gConnect2')[0].style.display="block"
            setTimeout(() => {
                document.getElementsByClassName('gConnect2')[0].style.opacity="1"
            }, 500);
        });
        document.getElementById('goToLoginBox').addEventListener('click', function() {
            document.getElementsByClassName('gConnect1')[0].style.display="block"

            setTimeout(() => {
            document.getElementsByClassName('gConnect1')[0].style.opacity="1"

            }, 500);
            document.getElementsByClassName('gConnect2')[0].style.display="none"
            setTimeout(() => {
                document.getElementsByClassName('gConnect2')[0].style.opacity="0"
            }, 500);
        });
    </script>
</body>
</html>
