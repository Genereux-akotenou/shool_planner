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

@if(!empty($materials))
<form action="/reservation-step2" method="post">
    {{ csrf_field(); }}

    <div class="reservation">
        <h2>ETAPE 2</h2>

        @if(!empty($data))
            <div class="gLineField d-flex jc-sb border-b1 pb-2">
                <label class="tBlack orange" for="">LISTE DE {{ strtoupper($data['type_reservation']) }} DISPONIBLE</label>
                <label class="tBlack fw-bold" for="">FAITE VOTRE CHOIX PUIS RESERVEZ</label>
            </div>
        @endif

        <div style="width: 100%; min-height: 35vh;">
            @forelse ($materials as $material)
                <div class="planning-obj matreel" onclick="document.getElementById('{{ $material->id() }}').click();">
                    <div style="width: 4em !important;" class="d-flex jc-c">
                        <input type="radio" name="choice" id="{{ $material->id() }}" value="{{ $material->id() }}">
                    </div>
                    <div style="width: 80%;" class="">{{ $material->libele() }}</div>
                    <div style="width: 10em !important;" class="t_time">{{ $data['type_reservation'] == 'salle' ? $material->place().' places' : $material->desc(); }}</div>
                </div>
            @empty
                <div class="emptyResult">Oups! rien à aficher.</div>
            @endforelse
        </div>

        <div class="gLineField d-flex remb" style="margin-bottom: 3em;">
            <div class="r-memory" style="display: flex;">
                En attente . . .
            </div>
            <p><button id="login" class="login">Reserver</button></p>
        </div>

    </div>
    <span id="scriptAlert" class="gAlert">Oups ! Veuillez sélectionner l'equipement à reserver.</span>
    @if(session('state'))
        <span id="hideMe" class="gAlert">{{ session('state') }}</span>
    @endif
</form>

<script>
    document.getElementById('login').addEventListener('click', (event) => {
        var radios = document.querySelectorAll('input[type="radio"]:checked');
        var value = radios.length>0 ? radios[0].value: null;

        if(value == null) {
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
@else
    <div class="emptyResult">Oups! rien à aficher.</div>
@endif

<!-- <div class="emptyResult">Oups! rien à aficher.</div>
<img width="100px" class="loader" src="/img/gif/load2.gif" alt=""> -->
@endsection
