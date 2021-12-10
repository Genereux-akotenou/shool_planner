@extends('layout')

@section('content')

<style>
    .current2{
        color: orangered;
        text-decoration: none;
    }
    .disabled{
        pointer-events: none !important;
        background-color: #ddd;
        color: #ddd;
    }
</style>

<form action="/reservation-step1" method="post">
    {{ csrf_field(); }}

    <div class="reservation">
        <h2>ETAPE 1</h2>
        <div class="gLineField">
            <label class="tBlack" for="">DATE DE RESERVATION</label>
            <select class="kind-selector ks2" name="date_reservation" id="date_reservation" required>
                <option value="default" selected>Choisir une date</option>
                <?php
                    setlocale(LC_ALL, 'fr_FR.utf8', 'fra').': ';
                ?>
                @for($i = 0; $i < 3; $i++)
                    <option value="{{ date('Y-m-d', time()+(86400*$i)) }}">{{ strftime('%A %d %B %Y', time()+(86400*$i)); }}</option>
                @endfor
            </select>
        </div>
        <div class="gLineField">
            <label class="tBlack" for="">DEBUT - HEURE DE RESERVATION</label>
            <input class="" type="time" name="debut_reservation" id="debut_reservation" required>
        </div>
        <div class="gLineField">
            <label class="tBlack" for="">FIN <pre style="display: inline;">  </pre> - HEURE DE RESERVATION</label>
            <input class="" type="time" name="fin_reservation" id="fin_reservation" required>
        </div>
        <div class="gLineField">
            <label class="tBlack" for="">TYPE DE RESERVATION</label>
            <select class="kind-selector ks2" name="type_reservation" id="type_reservation" required>
                <option value="default" selected>Choisissez un materiel</option>
                <option value="salle">salle</option>
                <option value="projecteur">projecteur</option>
                <option value="ordinateur">ordinateur</option>
            </select>
        </div>

        <div class="gLineField d-flex remb">
            <div class="r-memory" style="display: flex;">
                En attente . . .
            </div>
            <p><button id="login" class="login">Suivant</button></p>
        </div>

    </div>
    @if(session('state'))
        <span id="scriptAlert1" class="gAlert gBack-green">ffff {{ session('state') }}</span>
        <script>
            document.getElementById('scriptAlert1').style.opacity = 1;
            setTimeout(() => {
                document.getElementById('scriptAlert1').style.opacity = 0;
            }, 3000);
        </script>
    @endif
    <span id="scriptAlert" class="gAlert">Oups ! Veuillez remplir tous les champs.</span>
</form>

<script>
    document.getElementById('login').addEventListener('click', (event) => {
        if(document.getElementById('date_reservation').value == 'default' || document.getElementById('type_reservation').value == 'default' || document.getElementById('debut_reservation').value == '' || document.getElementById('fin_reservation').value == '') {
            event.preventDefault();
            if(!document.getElementById('scriptAlert'))
                return false;
            document.getElementById('scriptAlert').style.opacity = 1;
            setTimeout(() => {
                document.getElementById('scriptAlert').style.opacity = 0;
            }, 3000);
        }
    });
</script>

@endsection
