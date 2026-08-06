-- Correcao (parte final) — 5 questoes IBC com citacao no meio da frase
BEGIN;
UPDATE public.quiz_questions SET question = 'An exterior curtain wall is installed with a gap between the floor slab edge and the back of the exterior wall. What must be installed in this voided space (the perimeter fire containment area)?' WHERE id = 'ibc-070' AND category = 'IBC';
UPDATE public.quiz_questions SET question = 'Where an underground building has occupied floor levels more than 30 feet below the lowest level of exit discharge, the code requires those levels to be divided into a minimum of how many smoke compartments?' WHERE id = 'ibc-195' AND category = 'IBC';
UPDATE public.quiz_questions SET question = 'Where a space is naturally ventilated, the minimum openable area of openings to the outdoors must be not less than what percentage of the floor area being ventilated?' WHERE id = 'ibc-204' AND category = 'IBC';
UPDATE public.quiz_questions SET question = 'A fire service access elevator requires the building to be provided with what fire protection feature?' WHERE id = 'ibc-214' AND category = 'IBC';
UPDATE public.quiz_questions SET question = 'Where occupant evacuation elevators are provided, they must be installed in relation to the required egress stairways in what way?' WHERE id = 'ibc-215' AND category = 'IBC';
COMMIT;
