<?php

namespace App\Http\Controllers;

use App\Models\Materiel;
use App\Models\Reservation;
use App\Models\Salle;
use Illuminate\Http\Request;
use PhpParser\Node\Expr\Cast\Array_;

class reservationsControllers extends Controller
{
    public function reservation_step1() {
        request()->validate([
            'date_reservation'  => 'required | string',
            'debut_reservation' => 'required | string',
            'fin_reservation'   => 'required | string',
            'type_reservation'  => 'required | string',
            'occupant'          => 'required | string',
        ]);

        $data = [
            'date_reservation'  => request('date_reservation'),
            'debut_reservation' => request('debut_reservation'),
            'fin_reservation'   => request('fin_reservation'),
            'type_reservation'  => request('type_reservation'),
            'occupant'          => request('occupant'),
        ];

        if(request('date_reservation') == 'default' || request('type_reservation') == 'default') {
            return back()->with('state', 'Oups ! Veuillez remplir tous les champs.');
        }

        $date1 = request('date_reservation').' '.request('debut_reservation').':00';
        $date2 = request('date_reservation').' '.request('fin_reservation').':00';

        // get current reservation
        $current_reservation = Reservation::where([
            ['type',       '=',  request('type_reservation')],
            ['date_debut', '>=', $date1],
            ['date_fin',   '<=', $date2], // normally <=
        ])->pluck('material_id');

        // get reservation id
        $current_reservation_id = array();
        foreach($current_reservation as $element) {
            array_push($current_reservation_id, $element);
        }

        // get all material
        $all_material = null;
        if(request('type_reservation') == 'salle') {
            $all_material = Salle::all();
        }
        else {
            $all_material = Materiel::where('type', '=', request('type_reservation'))->get();
        }

        // select free material
        $material_free = array();
        foreach($all_material as $material) {
            if(!in_array($material['id'], $current_reservation_id)) {
                array_push($material_free, $material);
            }
        }

        // let store some data in session
        session(['debut_reservation' => $date1]);
        session(['fin_reservation' => $date2]);
        session(['type_reservation' => request('type_reservation')]);
        session(['occupant' => request('occupant')]);


        // return dump($material_free);
        return view('tools.reservation-step2', ["materials" => $material_free, "data" => $data]);
    }

    public function reservation_step2() {
        request()->validate([
            'choice'  => 'required'
        ]);

        $reservation = Reservation::create([
            'type'        => session('type_reservation'),
            'material_id' => request('choice'),
            'date_debut'  => session('debut_reservation'),
            'date_fin'    => session('fin_reservation'),
            'occupant'    => session('occupant'), //explode('@', auth()->user()['email'])[0],
        ]);

        // request()->session()->flush();
        return redirect('/reservation-step1')->with('state', '(-_-) Felicitation. Votre reservation est effective.');
    }

    public function get_today_reservation() {
        $date_start = date('Y-m-d', time()).' 00:00:00';
        $date_end = date('Y-m-d', time()).' 23:59:59'; //time()+(86400)

        $reservation_salle = Reservation::leftjoin('salles', 'reservations.material_id', '=', 'salles.id')
        ->where([
            ['reservations.type',       '=', 'salle'],
            ['reservations.date_debut', '>=', $date_start],
            ['reservations.date_fin',   '<=', $date_end],
        ])
        ->get();

        $reservation_material = Reservation::leftjoin('materiels', 'reservations.material_id', '=', 'materiels.id')
        ->where([
            ['reservations.type',       '<>', 'salle'],
            ['reservations.date_debut', '>=', $date_start],
            ['reservations.date_fin',   '<=', $date_end],
        ])
        ->get();

        // let format data
        $today_reservation = array();
        foreach($reservation_salle as $salle) {
            array_push($today_reservation, [
                'type'      => $salle['type'],
                'libele'    => $salle['libele'],
                'date'      => explode(' ', $salle['date_debut'])[1] . ' - ' . explode(' ', $salle['date_fin'])[1],
                'occupant'  => $salle['occupant'],
                'nature'    => 'real',
                'start_h'   => intval(explode(' ', $salle['date_debut'])[1][0] . explode(' ', $salle['date_debut'])[1][1]),
                'total_h'   => intval(explode(' ', $salle['date_fin'])[1][0] . explode(' ', $salle['date_fin'])[1][1]) - intval(explode(' ', $salle['date_debut'])[1][0] . explode(' ', $salle['date_debut'])[1][1]),
            ]);
            $last = $today_reservation[count($today_reservation)-1];
            if($last['total_h'] > 1) {
                for($i = 0; $i < $last['total_h']-1; $i++) {
                    array_push($today_reservation, [
                        'type'      => $last['type'],
                        'libele'    => $last['libele'],
                        'date'      => null,
                        'occupant'  => $last['occupant'],
                        'nature'    => 'fake',
                        'start_h'   => $last['start_h'] + $i + 1,
                        'total_h'   => 1,
                    ]);
                }
            }
        }
        foreach($reservation_material as $salle) {
            array_push($today_reservation, [
                'type'      => $salle['type'],
                'libele'    => $salle['libele'],
                'date'      => explode(' ', $salle['date_debut'])[1] . ' - ' . explode(' ', $salle['date_fin'])[1],
                'occupant'  => $salle['occupant'],
                'nature'    => 'real',
                'start_h'   => intval(explode(' ', $salle['date_debut'])[1][0] . explode(' ', $salle['date_debut'])[1][1]),
                'total_h'   => intval(explode(' ', $salle['date_fin'])[1][0] . explode(' ', $salle['date_fin'])[1][1]) - intval(explode(' ', $salle['date_debut'])[1][0] . explode(' ', $salle['date_debut'])[1][1]),
            ]);
            $last = $today_reservation[count($today_reservation)-1];
            if($last['total_h'] > 1) {
                for($i = 0; $i < $last['total_h']-1; $i++) {
                    array_push($today_reservation, [
                        'type'      => $last['type'],
                        'libele'    => $last['libele'],
                        'date'      => null,
                        'occupant'  => $last['occupant'],
                        'nature'    => 'fake',
                        'start_h'   => $last['start_h'] + $i + 1,
                        'total_h'   => 1,
                    ]);
                }
            }
        }

        // return dump($today_reservation);

        return view('tools.planning', [
            'reservations' => $today_reservation,
        ]);
    }

    public function get_filterer_reservation() {
        // validation rules
        request()->validate([
            'type_input' => 'required | string',
            'date_input' => 'required | string',
        ]);

        if(request('type_input') == 'default') {
            return redirect()->route('today');
        }

        // init param
        $type = request('type_input');
        $date_start = request('date_input').' 00:00:00';
        $date_end = date('Y-m-d', strtotime(request('date_input')) + 0).' 23:59:59';

        // filtering
        $reservation = null;
        if($type == 'tous') {
            $reservation_salle = Reservation::leftjoin('salles', 'reservations.material_id', '=', 'salles.id')
            ->where([
                ['reservations.type',       '=', 'salle'],
                ['reservations.date_debut', '>=', $date_start],
                ['reservations.date_fin',   '<=', $date_end],
            ])
            ->get();

            $reservation_material = Reservation::leftjoin('materiels', 'reservations.material_id', '=', 'materiels.id')
            ->where([
                ['reservations.type',       '<>', 'salle'],
                ['reservations.date_debut', '>=', $date_start],
                ['reservations.date_fin',   '<=', $date_end],
            ])
            ->get();

            // let format data
            $today_reservation = array();
            foreach($reservation_salle as $salle) {
                array_push($today_reservation, [
                    'type'      => $salle['type'],
                    'libele'    => $salle['libele'],
                    'date'      => explode(' ', $salle['date_debut'])[1] . ' - ' . explode(' ', $salle['date_fin'])[1],
                    'occupant'  => $salle['occupant'],
                    'nature'    => 'real',
                    'start_h'   => intval(explode(' ', $salle['date_debut'])[1][0] . explode(' ', $salle['date_debut'])[1][1]),
                    'total_h'   => intval(explode(' ', $salle['date_fin'])[1][0] . explode(' ', $salle['date_fin'])[1][1]) - intval(explode(' ', $salle['date_debut'])[1][0] . explode(' ', $salle['date_debut'])[1][1]),
                ]);
                $last = $today_reservation[count($today_reservation)-1];
                if($last['total_h'] > 1) {
                    for($i = 0; $i < $last['total_h']-1; $i++) {
                        array_push($today_reservation, [
                            'type'      => $last['type'],
                            'libele'    => $last['libele'],
                            'date'      => null,
                            'occupant'  => $last['occupant'],
                            'nature'    => 'fake',
                            'start_h'   => $last['start_h'] + $i + 1,
                            'total_h'   => 1,
                        ]);
                    }
                }
            }
            foreach($reservation_material as $salle) {
                array_push($today_reservation, [
                    'type'      => $salle['type'],
                    'libele'    => $salle['libele'],
                    'date'      => explode(' ', $salle['date_debut'])[1] . ' - ' . explode(' ', $salle['date_fin'])[1],
                    'occupant'  => $salle['occupant'],
                    'nature'    => 'real',
                    'start_h'   => intval(explode(' ', $salle['date_debut'])[1][0] . explode(' ', $salle['date_debut'])[1][1]),
                    'total_h'   => intval(explode(' ', $salle['date_fin'])[1][0] . explode(' ', $salle['date_fin'])[1][1]) - intval(explode(' ', $salle['date_debut'])[1][0] . explode(' ', $salle['date_debut'])[1][1]),
                ]);
                $last = $today_reservation[count($today_reservation)-1];
                if($last['total_h'] > 1) {
                    for($i = 0; $i < $last['total_h']-1; $i++) {
                        array_push($today_reservation, [
                            'type'      => $last['type'],
                            'libele'    => $last['libele'],
                            'date'      => null,
                            'occupant'  => $last['occupant'],
                            'nature'    => 'fake',
                            'start_h'   => $last['start_h'] + $i + 1,
                            'total_h'   => 1,
                        ]);
                    }
                }
            }

            $reservation = $today_reservation;
        }
        elseif($type == 'salle'){
            $reservation_salle = Reservation::leftjoin('salles', 'reservations.material_id', '=', 'salles.id')
            ->where([
                ['reservations.type',       '=', 'salle'],
                ['reservations.date_debut', '>=', $date_start],
                ['reservations.date_fin',   '<=', $date_end],
            ])
            ->get();

            // let format data
            $reservation_result = array();
            foreach($reservation_salle as $salle) {
                array_push($reservation_result, [
                    'type'      => $salle['type'],
                    'libele'    => $salle['libele'],
                    'date'      => explode(' ', $salle['date_debut'])[1] . ' - ' . explode(' ', $salle['date_fin'])[1],
                    'occupant'  => $salle['occupant'],
                    'nature'    => 'real',
                    'start_h'   => intval(explode(' ', $salle['date_debut'])[1][0] . explode(' ', $salle['date_debut'])[1][1]),
                    'total_h'   => intval(explode(' ', $salle['date_fin'])[1][0] . explode(' ', $salle['date_fin'])[1][1]) - intval(explode(' ', $salle['date_debut'])[1][0] . explode(' ', $salle['date_debut'])[1][1]),
                ]);
                $last = $reservation_result[count($reservation_result)-1];
                if($last['total_h'] > 1) {
                    for($i = 0; $i < $last['total_h']-1; $i++) {
                        array_push($reservation_result, [
                            'type'      => $last['type'],
                            'libele'    => $last['libele'],
                            'date'      => null,
                            'occupant'  => $last['occupant'],
                            'nature'    => 'fake',
                            'start_h'   => $last['start_h'] + $i + 1,
                            'total_h'   => 1,
                        ]);
                    }
                }
            }

            $reservation = $reservation_result;
        }
        elseif($type == 'projecteur'){
            $reservation_material = Reservation::leftjoin('materiels', 'reservations.material_id', '=', 'materiels.id')
            ->where([
                ['reservations.type',       '=', 'projecteur'],
                ['reservations.date_debut', '>=', $date_start],
                ['reservations.date_fin',   '<=', $date_end],
            ])
            ->get();

            // let format data
            $reservation_result = array();
            foreach($reservation_material as $material) {
                array_push($reservation_result, [
                    'type'      => $material['type'],
                    'libele'    => $material['libele'],
                    'date'      => explode(' ', $material['date_debut'])[1] . ' - ' . explode(' ', $material['date_fin'])[1],
                    'occupant'  => $material['occupant'],
                    'nature'    => 'real',
                    'start_h'   => intval(explode(' ', $material['date_debut'])[1][0] . explode(' ', $material['date_debut'])[1][1]),
                    'total_h'   => intval(explode(' ', $material['date_fin'])[1][0] . explode(' ', $material['date_fin'])[1][1]) - intval(explode(' ', $material['date_debut'])[1][0] . explode(' ', $material['date_debut'])[1][1]),
                ]);
                $last = $reservation_result[count($reservation_result)-1];
                if($last['total_h'] > 1) {
                    for($i = 0; $i < $last['total_h']-1; $i++) {
                        array_push($reservation_result, [
                            'type'      => $last['type'],
                            'libele'    => $last['libele'],
                            'date'      => null,
                            'occupant'  => $last['occupant'],
                            'nature'    => 'fake',
                            'start_h'   => $last['start_h'] + $i + 1,
                            'total_h'   => 1,
                        ]);
                    }
                }
            }

            $reservation = $reservation_result;
        }
        elseif($type == 'ordinateur'){
            $reservation_material = Reservation::leftjoin('materiels', 'reservations.material_id', '=', 'materiels.id')
            ->where([
                ['reservations.type',       '=', 'ordinateur'],
                ['reservations.date_debut', '>=', $date_start],
                ['reservations.date_fin',   '<=', $date_end],
            ])
            ->get();

            // let format data
            $reservation_result = array();
            foreach($reservation_material as $material) {
                array_push($reservation_result, [
                    'type'      => $material['type'],
                    'libele'    => $material['libele'],
                    'date'      => explode(' ', $material['date_debut'])[1] . ' - ' . explode(' ', $material['date_fin'])[1],
                    'occupant'  => $material['occupant'],
                    'nature'    => 'real',
                    'start_h'   => intval(explode(' ', $material['date_debut'])[1][0] . explode(' ', $material['date_debut'])[1][1]),
                    'total_h'   => intval(explode(' ', $material['date_fin'])[1][0] . explode(' ', $material['date_fin'])[1][1]) - intval(explode(' ', $material['date_debut'])[1][0] . explode(' ', $material['date_debut'])[1][1]),
                ]);
                $last = $reservation_result[count($reservation_result)-1];
                if($last['total_h'] > 1) {
                    for($i = 0; $i < $last['total_h']-1; $i++) {
                        array_push($reservation_result, [
                            'type'      => $last['type'],
                            'libele'    => $last['libele'],
                            'date'      => null,
                            'occupant'  => $last['occupant'],
                            'nature'    => 'fake',
                            'start_h'   => $last['start_h'] + $i + 1,
                            'total_h'   => 1,
                        ]);
                    }
                }
            }

            $reservation = $reservation_result;
        }

        // return dump($reservation);

        return view('tools.planning', [
            'reservations' => $reservation,
        ]);
    }

    public function set_calendar_preferences() {
        if(request('calendarForm') != null) {
            session(['calendarForm' => request('calendarForm')]);
            // return dump(session()->get('calendarForm'));
        }
        return back();
    }
}
