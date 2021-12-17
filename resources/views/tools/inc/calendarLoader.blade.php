@foreach($reservations as $reservation)
    @if($reservation['start_h'] == $time)
        @if($reservation['nature'] == 'fake')
            <div class="task task-h1 task-space">
                <div class="taskHead">
                    <div class="taskType">{{ strtoupper($reservation['type']) }}</div>
                    <div class="taskName">{{ strtoupper($reservation['libele']) }}</div>
                </div>
            </div>
        @endif
    @endif
@endforeach

@foreach($reservations as $reservation)
    @if($reservation['start_h'] == $time)
        @if($reservation['total_h'] > 1)
            <div class="task task-anim task-h{{ $reservation['total_h'] }}">
                <div class="taskHead">
                    <div class="taskType">{{ strtoupper($reservation['type']) }}</div>
                    <div class="taskName">{{ strtoupper($reservation['libele']) }}</div>
                </div>
                <div>
                    <p>( {{ $reservation['occupant'] }} )</p>
                </div>
            </div>
        @endif
    @endif
@endforeach

@foreach($reservations as $reservation)
    @if($reservation['start_h'] == $time)
        @if($reservation['total_h'] <= 1 && $reservation['nature'] != 'fake')
            <div class="task task-anim task-h{{ $reservation['total_h'] }}">
                <div class="taskHead">
                    <div class="taskType">{{ strtoupper($reservation['type']) }}</div>
                    <div class="taskName">{{ strtoupper($reservation['libele']) }}</div>
                </div>
                <div>
                    <p>( {{ $reservation['occupant'] }} )</p>
                </div>
            </div>
        @endif
    @endif
@endforeach
