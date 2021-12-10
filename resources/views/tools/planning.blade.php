@extends('layout')

@section('content')

<style>
    .current1{
        color: orangered;
        text-decoration: none;
    }
</style>

@forelse($reservations as $reservation)
    <div class="planning-obj">
        <div class="t_type">{{ $reservation['type'] }}</div>
        <div class="t_name">{{ $reservation['libele'] }}</div>
        <div class="t_time">{{ $reservation['date'] }}</div>
        <div class="t_emtity">by {{ $reservation['occupant'] }}</div>
    </div>
@empty
    <div class="emptyResult">Oups! rien à aficher.</div>
@endforelse

<!-- <div class="emptyResult">Oups! rien à aficher.</div>
<img width="100px" class="loader" src="/img/gif/load2.gif" alt=""> -->

@endsection
