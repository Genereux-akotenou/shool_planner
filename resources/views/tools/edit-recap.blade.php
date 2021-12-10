@extends('layout')

@section('content')

<style>
    .current3{
        color: orangered;
        text-decoration: none;
    }
    .disabled{
        pointer-events: none !important;
        background-color: #ddd;
        color: #ddd;
    }
</style>

<div class="emptyResult" style="width: 17em; height: 4.5em; text-align: center;"> En cour de développement.</div>

@endsection
