@extends('layout')

@section('content')

<style>
    .current1{
        color: orangered !important;
        text-decoration: none;
    }
</style>

@if(session()->get('calendarForm') == 'calendar' || session()->get('calendarForm') == null)
    <div class="gCalendar">
        <div class="calendarLine">
            <div class="calendarTime">
                <!-- <span>07:00</span> -->
            </div>
            <div class="TaskContainer noBorder">
                <div class="separator"></div>
                <div class="TaskList">

                </div>
            </div>
        </div>

        <div class="calendarLine">
            <div class="calendarTime">
                <span>07:00</span>
            </div>
            <div class="TaskContainer">
                <div class="separator"></div>
                <div class="TaskList">
                    <div style="position:absolute; display: flex;">
                        @include('tools.inc.calendarLoader', array('time' => 7))
                    </div>

                </div>
            </div>
        </div>
        <div class="calendarLine">
            <div class="calendarTime">
                <span>08:00</span>
            </div>
            <div class="TaskContainer">
                <div class="separator"></div>
                <div class="TaskList">
                    <div style="position:absolute; display: flex;">
                        @include('tools.inc.calendarLoader', array('time' => 8))
                    </div>
                </div>
            </div>
        </div>
        <div class="calendarLine">
            <div class="calendarTime">
                <span>09:00</span>
            </div>
            <div class="TaskContainer">
                <div class="separator"></div>
                <div class="TaskList">
                    <div style="position:absolute; display: flex;">
                        @include('tools.inc.calendarLoader', array('time' => 9))
                    </div>
                </div>
            </div>
        </div>
        <div class="calendarLine">
            <div class="calendarTime">
                <span>10:00</span>
            </div>
            <div class="TaskContainer">
                <div class="separator"></div>
                <div class="TaskList">
                    <div style="position:absolute; display: flex;">
                        @include('tools.inc.calendarLoader', array('time' => 10))
                    </div>
                </div>
            </div>
        </div>

        <div class="calendarLine">
            <div class="calendarTime">
                <span>11:00</span>
            </div>
            <div class="TaskContainer">
                <div class="separator"></div>
                <div class="TaskList">
                    <div style="position:absolute; display: flex;">
                        @include('tools.inc.calendarLoader', array('time' => 11))
                    </div>
                </div>
            </div>
        </div>
        <div class="calendarLine">
            <div class="calendarTime">
                <span>12:00</span>
            </div>
            <div class="TaskContainer">
                <div class="separator"></div>
                <div class="TaskList">
                    <div style="position:absolute; display: flex;">
                        @include('tools.inc.calendarLoader', array('time' => 12))
                    </div>
                </div>
            </div>
        </div>
        <div class="calendarLine">
            <div class="calendarTime">
                <span>13:00</span>
            </div>
            <div class="TaskContainer">
                <div class="separator"></div>
                <div class="TaskList">
                    <div style="position:absolute; display: flex;">
                        @include('tools.inc.calendarLoader', array('time' => 13))
                    </div>
                </div>
            </div>
        </div>
        <div class="calendarLine">
            <div class="calendarTime">
                <span>14:00</span>
            </div>
            <div class="TaskContainer">
                <div class="separator"></div>
                <div class="TaskList">
                    <div style="position:absolute; display: flex;">
                        @include('tools.inc.calendarLoader', array('time' => 14))
                    </div>
                </div>
            </div>
        </div>

        <div class="calendarLine">
            <div class="calendarTime">
                <span>15:00</span>
            </div>
            <div class="TaskContainer">
                <div class="separator"></div>
                <div class="TaskList">
                    <div style="position:absolute; display: flex;">
                        @include('tools.inc.calendarLoader', array('time' => 15))
                    </div>
                </div>
            </div>
        </div>
        <div class="calendarLine">
            <div class="calendarTime">
                <span>16:00</span>
            </div>
            <div class="TaskContainer">
                <div class="separator"></div>
                <div class="TaskList">
                    <div style="position:absolute; display: flex;">
                        @include('tools.inc.calendarLoader', array('time' => 16))
                    </div>
                </div>
            </div>
        </div>
        <div class="calendarLine">
            <div class="calendarTime">
                <span>17:00</span>
            </div>
            <div class="TaskContainer">
                <div class="separator"></div>
                <div class="TaskList">
                    <div style="position:absolute; display: flex;">
                        @include('tools.inc.calendarLoader', array('time' => 17))
                    </div>
                </div>
            </div>
        </div>
        <div class="calendarLine">
            <div class="calendarTime">
                <span>18:00</span>
            </div>
            <div class="TaskContainer">
                <div class="separator"></div>
                <div class="TaskList">
                    <div style="position:absolute; display: flex;">
                        @include('tools.inc.calendarLoader', array('time' => 18))
                    </div>
                </div>
            </div>
        </div>

        <div class="calendarLine">
            <div class="calendarTime">
                <span>19:00</span>
            </div>
            <div class="TaskContainer">
                <div class="separator"></div>
                <div class="TaskList">
                    <div style="position:absolute; display: flex;">
                        @include('tools.inc.calendarLoader', array('time' => 19))
                    </div>
                </div>
            </div>
        </div>
        <div class="calendarLine">
            <div class="calendarTime">
                <span>20:00</span>
            </div>
            <div class="TaskContainer">
                <div class="separator"></div>
                <div class="TaskList">
                    <div style="position:absolute; display: flex;">
                        @include('tools.inc.calendarLoader', array('time' => 20))
                    </div>
                </div>
            </div>
        </div>
        <div class="calendarLine">
            <div class="calendarTime">
                <span>21:00</span>
            </div>
            <div class="TaskContainer">
                <div class="separator"></div>
                <div class="TaskList">
                    <div style="position:absolute; display: flex;">
                        @include('tools.inc.calendarLoader', array('time' => 21))
                    </div>
                </div>
            </div>
        </div>
        <!-- ------------------------------- -->
        <div>
            <p class="notaBiene">Note : Ce programme est susceptible de connaitre des modifications.</p>
        </div>
        <!-- ------------------------------- -->
    </div>
@else
    @forelse($reservations as $reservation)
        @if($reservation['nature'] != 'fake')
            <div class="planning-obj">
                <div class="t_type">{{ $reservation['type'] }}</div>
                <div class="t_name">{{ $reservation['libele'] }}</div>
                <div class="t_time">{{ $reservation['date'] }}</div>
                <div class="t_emtity">by {{ $reservation['occupant'] }}</div>
            </div>
        @endif
    @empty
        <div class="emptyResult">Oups! rien à aficher.</div>
    @endforelse
@endif

<!-- <div class="emptyResult">Oups! rien à aficher.</div>
<img width="100px" class="loader" src="/img/gif/load2.gif" alt=""> -->

@endsection
